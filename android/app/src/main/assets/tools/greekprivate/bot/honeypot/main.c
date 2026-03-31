#include <stdio.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <string.h>
#include <signal.h>
#include <stdlib.h>

void userconnection(int fd)
{
	int statement = 0;
	char buf[4096], *token;
	char busyboxprompt[4096];

	
	send(fd, "\x1b[1;35mHoney\x1b[30m ", strlen("\x1b[1;35mHoney\x1b[30m "), MSG_NOSIGNAL);



send(fd, "\x1b[1;34mPot\x1b[30m ", strlen("\x1b[1;34mPot\x1b[30m "), MSG_NOSIGNAL);

	while(1)
	{
		recv(fd, buf, sizeof(buf), MSG_NOSIGNAL);

		printf("buf -> %s\n", buf);

		switch(statement)
		{
			case 0:
				if(strcasestr(buf, "busybox"))
				{
		token = strtok(buf, "busybox ");

					token[strcspn(token, "\r\n")] = 0;
					strcpy(busyboxprompt, token);
					strcat(busyboxprompt, ": ");
					strcat(busyboxprompt, "applet not found\r\n");
					send(fd, busyboxprompt, strlen(busyboxprompt), MSG_NOSIGNAL);
					send(fd, "root@Honeypot-> ", strlen("root@Honeypot-> "), MSG_NOSIGNAL);
				}
				else
				{
					send(fd, "root@Honeypot-> ", strlen("root@Honeypot-> "), MSG_NOSIGNAL);
					statement = 0;
				}
			break;	
		}
		memset(token, 0, sizeof(token));
		memset(busyboxprompt, 0, sizeof(busyboxprompt));
		memset(buf, 0, sizeof(buf));
	}
}

int main(int argc, char *argv[])
{
	int fd, accepted, ret, connections = 0;

	if(argc < 2)
	{
		printf("Usage: %s port\n", argv[0]);
		exit(0);
	}


	int port = atoi(argv[1]);

	printf("-(status)- binding to port: %d\n", port);


	struct sockaddr_in addr;
	struct sockaddr_in binding;
	binding.sin_port = htons(port);
	binding.sin_addr.s_addr = INADDR_ANY;
	binding.sin_family = AF_INET;

	fd = socket(AF_INET, SOCK_STREAM, 0);

	ret = bind(fd, (struct sockaddr *)&binding, sizeof(struct sockaddr_in));

	if(ret == -1)
	{
		perror("(error) failed to bind? error:");
		exit(0);
	}

	listen(fd, 999);

	socklen_t socklength = sizeof(struct sockaddr_in);

	while(1)
	{
		if((accepted = accept(fd, (struct sockaddr *)&addr, &socklength)) != -1)
		{
			pthread_t connectionThread[connections];
			printf("[Honeypot] Scanner process initialized. from: %s\n", inet_ntoa(addr.sin_addr));

			pthread_create(&connectionThread, NULL, (void *)&userconnection, accepted);

			connections++;
		}
	}
}