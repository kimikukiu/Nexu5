package main

import (
    "net"
    "time"
    "encoding/binary"
)

type Bot struct {
    uid     int
    conn    net.Conn 
    source  string
}

func NewBot(conn net.Conn, source string) *Bot {
    return &Bot{-1, conn, source}
}

func pack_bytes(b uint16) ([]byte) {
    var tmp []byte
    tmp = make([]byte, 2)
    binary.BigEndian.PutUint16(tmp, b)
    return tmp
}

func (this *Bot) Handle() {
    clientList.AddClient(this)
    defer clientList.DelClient(this)

    buf := make([]byte, 32)
    // Pack 505 into a uint16
    r := pack_bytes(505)

    for {
        this.conn.SetDeadline(time.Now().Add(180 * time.Second))
        l, err := this.conn.Read(buf)
        if err != nil || l <= 1 {
            return
        }
        l, err = this.conn.Write(r)
        if err != nil || l <= 1 {
            return
        }
    }
}

func (this *Bot) QueueBuf(buf []byte) {
    this.conn.Write(buf)
}
