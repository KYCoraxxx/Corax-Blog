---
title: "DHCP专题"
date: 2023-01-31
math: true
image: cover.jpg
tags: [ network ]
comments: true
draft: false
summary: "南京大学2021级软件学院大二上学期计算机网络课程笔记"
---

## DHCP原理

### DHCP概述

$Dynamic~Host~Configuration~Protocol$

主机上网之前必须具备IP地址，但是将紧缺的IP地址资源固定地分配给主机相当低效，DHCP（动态用户配置协议）可以动态高效地分配IP地址，但是它只能工作在局域网，通过UDP来实现

### DHCP工作过程

- DHCP服务器启动DHCP进程，并保持侦听状态（只要启动DHCP进程就可以作为DHCP服务器）
- 客户端启动之后，广播DHCP Discover报文，寻找DHCP服务器
- 服务器收到Discover报文后就**广播回复**DHCP Offer报文，应答自己划分的IP地址，网关，服务器IP地址等，由于此时客户端还没有IP地址，所以只能广播回复
- 客户端通过自己的机制决定使用的IP地址（可能收到多个服务器的Offer报文，一般选择最先应答Offer报文的服务器）之后，广播DHCP Request报文应答自己选择的IP地址
- 收到Request报文的服务端如果发现客户端使用的是自己的IP地址，就**广播应答**DHCP ACK报文，并开始提供服务，如果出错就广播DHCP NAK表示否定确认
- DHCP服务器提供服务的时段称为主机IP的租期，在租期中，客户端可以**点对点**向服务器发送DHCP Request表示续租，待DHCP服务器应答ACK消息后就更新自己的配置，如果客户端长时间不续租，服务器就自动释放租约
- 如果客户端不再需要使用服务器分配的IP地址，就会主动点对点发送DHCP Release报文释放被绑定的租约

可以注意的是，由于在获取IP地址期间客户端并没有IP地址，所以DHCP的报文有自己特殊的结构，但具体内容课程不做要求，可做了解

![](dhcp.png)

### DHCP报文类型

- DHCP Discover表示寻找服务器
- DHCP Offer表示提供IP地址
- DHCP Request表示客户端续约
- DHCP ACK表示确认
- DHCP NAK表示服务器撤销之前分配的IP地址
- DHCP Release表示释放IP地址租约
- DHCP Decline表示客户端发现IP地址不能使用
- DHCP Inform

## DHCP欺骗与防范

### 原理

由于任何启动DHCP进程的主机都可称为DHCP服务器，因此未授权的DHCP服务器应答客户端，分配未授权的网络参数给客户端导致客户端受到欺骗。属于内部安全问题的隐式攻击。

在实际的DHCP网络中，一般会使用DHCP中继（即服务器的物理距离较远），导致了作为邻居的非授权DHCP服务器一般会更先给予DHCP Offer报文的应答，导致了DHCP欺骗更容易完成

### 危害

如果DHCP伪装者将自己的IP地址作为网关参数分配给客户端，就会导致客户端的所有报文都会先经过伪装者，才转发给真正的网关；发送给客户端的数据都会先经过伪装者，才转发给客户端，即客户端数据被窃听，由于整个过程数据并未损失，所以这种欺骗较难防范

### 防范措施

在交换机上启用DHCP Snooping功能即可，该技术通过建立并维护DHCP Snooping绑定表过滤不被信任的DHCP信息，管理者需要将授权的DHCP服务器所连接的端口配置为信任端口（默认不信任），这样经过其他端口传输的DHCP信息都会被丢弃掉，保证了DHCP服务器的安全性
