#pragma once

#include <string>

#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>

struct admin
{
    char *user_ptr;
    char *pass_ptr;
    std::string username;
    std::string password;
    int fd;
    int max_clients;
    int max_time;
    int cooldown;
    int concurrent;
    int disable;
    int admin;
    int authenticated;
};

#define MYSQL_HOST "127.0.0.1:3306"
#define MYSQL_USERNAME "root"
#define MYSQL_PASSWORD "noskidsallowed"
#define MYSQL_DATABASE "fbot"
