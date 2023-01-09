---
title: "CPL2022网络编程与多线程教程(Windows)"
date: 2023-01-09
image: images/blog/cpl2022socket/cover.jpg
visible: true
feature_image: images/blog/cpl2022socket/flag.png
author: Corax
summary: "本教程将简单介绍利用WINAPI进行网络编程的环境配置和基础使用，同时还会附带一些简单的多线程内容"
---



本教程面向CPL2022期末大作业，简单介绍利用`WINAPI`进行**网络编程**的环境配置和基础使用，同时还会附带一些简单的**多线程**内容

### 环境配置

C语言利用`WINAPI`进行网络编程时的环境配置比较简单，首先需要引入头文件

~~~~c

#include <winsock2.h>

#include <windows.h>

#include <ws2tcpip.h>

//注意不要改变上述include的顺序，否则编译可能出warning
int main(){
    
    return 0;
}
~~~~

接下来，为了编译器能够成功链接到这两个库，只需要在C盘中找到`ws2_32.dll`文件，将它复制到项目文件夹下

![](./cpl2022socket/pic1.png)
