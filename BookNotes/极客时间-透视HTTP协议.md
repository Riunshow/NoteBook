## 透视HTTP协议

### 02-破冰篇

#### 01 | 时势与英雄：HTTP的前世今生

1. HTTP 协议始于三十年前蒂姆·伯纳斯 - 李的一篇论文；
2. HTTP/0.9 是个简单的文本协议，只能获取文本资源；
3. HTTP/1.0 确立了大部分现在使用的技术，但它不是正式标准；
4. HTTP/1.1 是目前互联网上使用最广泛的协议，功能也非常完善；
5. HTTP/2 基于 Google 的 SPDY 协议，注重性能改善，但还未普及；
6. HTTP/3 基于 Google 的 QUIC 协议，是将来的发展方向。

> 从历史的进程来看，就是互联网的用户推动协议的发展的。刚刚开始只有文本，都只是文字；后来有了超文本，不仅仅是文字；后来嫌弃速度慢，有了持久连接，缓存机制；后来为了安全，有了加密通信。一切都是以用户的需求为导向的，用户的需要越来越高，协议就越来越高级，越来越完善。

#### 02 | HTTP是什么？HTTP又不是什么？

##### HTTP是什么

HTTP 就是超文本传输协议，也就是**H**yper**T**ext **T**ransfer **P**rotocol。

> HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范

##### HTTP 不是什么

1. **HTTP 不是互联网**。
2. **HTTP 不是编程语言**。
3. **HTTP 不是 HTML**
4. **HTTP 不是一个孤立的协议**。

___

1. HTTP 是一个用在计算机世界里的协议，它确立了一种计算机之间交流通信的规范，以及相关的各种控制和错误处理方式。
2. HTTP 专门用来在两点之间传输数据，不能用于广播、寻址或路由。
3. HTTP 传输的是文字、图片、音频、视频等超文本数据。
4. HTTP 是构建互联网的重要基础技术，它没有实体，依赖许多其他的技术来实现，但同时许多技术也都依赖于它。

#### 03 | HTTP世界全览（上）：与HTTP相关的各种概念

1. 互联网上绝大部分资源都使用 HTTP 协议传输；
2. 浏览器是 HTTP 协议里的请求方，即 User Agent；
3. 服务器是 HTTP 协议里的应答方，常用的有 Apache 和 Nginx；
4. CDN 位于浏览器和服务器之间，主要起到缓存加速的作用；
5. 爬虫是另一类 User Agent，是自动访问网络资源的程序。

#### 04 | HTTP世界全览（下）：与HTTP相关的各种协议

1. TCP/IP 是网络世界最常用的协议，HTTP 通常运行在 TCP/IP 提供的可靠传输基础上；
2. DNS 域名是 IP 地址的等价替代，需要用域名解析实现到 IP 地址的映射；
3. URI 是用来标记互联网上资源的一个名字，由“协议名 + 主机名 + 路径”构成，俗称 URL；
4. HTTPS 相当于“HTTP+SSL/TLS+TCP/IP”，为 HTTP 套了一个安全的外壳；
5. 代理是 HTTP 传输过程中的“中转站”，可以实现缓存加速、负载均衡等功能。

#### 05 | 常说的“四层”和“七层”到底是什么？“五层”“六层”哪去了？

> 第二个网络分层模型：**OSI**，全称是“**开放式系统互联通信参考模型**”（Open System Interconnection Reference Model）

> 第一层叫“**链接层**”（link layer），负责在以太网、WiFi 这样的底层网络上发送原始数据包，工作在网卡这个层次，使用 MAC 地址来标记网络上的设备，所以有时候也叫 MAC 层。
>
> 第二层叫“**网际层**”或者“**网络互连层**”（internet layer），IP 协议就处在这一层。因为 IP 协议定义了“IP 地址”的概念，所以就可以在“链接层”的基础上，用 IP 地址取代 MAC 地址，把许许多多的局域网、广域网连接成一个虚拟的巨大网络，在这个网络里找设备时只要把 IP 地址再“翻译”成 MAC 地址就可以了。
>
> 第三层叫“**传输层**”（transport layer），这个层次协议的职责是保证数据在 IP 地址标记的两点之间“可靠”地传输，是 TCP 协议工作的层次，另外还有它的一个“小伙伴”UDP。
>
> TCP 是一个有状态的协议，需要先与对方建立连接然后才能发送数据，而且保证数据不丢失不重复。而 UDP 则比较简单，它无状态，不用事先建立连接就可以任意发送数据，但不保证数据一定会发到对方。两个协议的另一个重要区别在于数据的形式。TCP 的数据是连续的“字节流”，有先后顺序，而 UDP 则是分散的小数据包，是顺序发，乱序收。
>
> 关于 TCP 和 UDP 可以展开讨论的话题还有很多，比如最经典的“三次握手”和“四次挥手”，一时半会很难说完，好在与 HTTP 的关系不是太大，以后遇到了再详细讲解。
>
> 协议栈的第四层叫“**应用层**”（application layer），由于下面的三层把基础打得非常好，所以在这一层就“百花齐放”了，有各种面向具体应用的协议。例如 Telnet、SSH、FTP、SMTP 等等，当然还有我们的 HTTP。

> 1. 第一层：物理层，网络的物理形式，例如电缆、光纤、网卡、集线器等等；
> 2. 第二层：数据链路层，它基本相当于 TCP/IP 的链接层；
> 3. 第三层：网络层，相当于 TCP/IP 里的网际层；
> 4. 第四层：传输层，相当于 TCP/IP 里的传输层；
> 5. 第五层：会话层，维护网络中的连接状态，即保持会话和同步；
> 6. 第六层：表示层，把数据转换为合适、可理解的语法和语义；
> 7. 第七层：应用层，面向具体的应用传输数据。

1. TCP/IP 分为四层，核心是二层的 IP 和三层的 TCP，HTTP 在第四层；
2. OSI 分为七层，基本对应 TCP/IP，TCP 在第四层，HTTP 在第七层；
3. OSI 可以映射到 TCP/IP，但这期间一、五、六层消失了；
4. 日常交流的时候我们通常使用 OSI 模型，用四层、七层等术语；
5. HTTP 利用 TCP/IP 协议栈逐层打包再拆包，实现了数据传输，但下面的细节并不可见。

> 有一个辨别四层和七层比较好的（但不是绝对的）小窍门，“**两个凡是**”：凡是由操作系统负责处理的就是四层或四层以下，否则，凡是需要由应用程序（也就是你自己写代码）负责处理的就是七层。

1.  二层转发：设备工作在链路层，帧在经过交换机设备时，检查帧的头部信息，拿到目标mac地址，进行本地转发和广播

2. 三层路由：设备工作在ip层，报文经过有路由功能的设备时，设备分析报文中的头部信息，拿到ip地址，根据网段范围，进行本地转发或选择下一个网关

3. dns，网络请求的第一步是域名解析，所以工作在应用层
4. cdn是“内容分发网络”，要看到内容就必须在应用层。

#### 06 | 域名里有哪些门道？

1. 域名使用字符串来代替 IP 地址，方便用户记忆，本质上一个名字空间系统；
2. DNS 就像是我们现实世界里的电话本、查号台，统管着互联网世界里的所有网站，是一个“超级大管家”；
3. DNS 是一个树状的分布式查询系统，但为了提高查询效率，外围有多级的缓存；
4. 使用 DNS 可以实现基于域名的负载均衡，既可以在内网，也可以在外网。

> 1. 在浏览器地址栏里随便输入一个不存在的域名，比如就叫“www. 不存在.com”，试着解释一下它的 DNS 解析过程。
>
>    Ans: 浏览器缓存 操作系统缓存 host文件 根域名 顶级域名 返回失败
>
> 2. 如果因为某些原因，DNS 失效或者出错了，会出现什么后果？
>
>    Ans: 我们的目标的 IP 地址就会因此无法被正确解析到，因此将无法打开页面，即域名屏蔽；如果 DNS 错误得将域名解析道错误的 IP 地址上，即域名污染

#### 08 | 键入网址再按下回车，后面究竟发生了什么？

1. HTTP 协议基于底层的 TCP/IP 协议，所以必须要用 IP 地址建立连接；
2. 如果不知道 IP 地址，就要用 DNS 协议去解析得到 IP 地址，否则就会连接失败；
3. 建立 TCP 连接后会顺序收发数据，请求方和应答方都必须依据 HTTP 规范构建和解析报文；
4. 为了减少响应时间，整个过程中的每一个环节都会有缓存，能够实现“短路”操作；
5. 虽然现实中的 HTTP 传输过程非常复杂，但理论上仍然可以简化成实验里的“两点”模型。

#### 09 | HTTP报文是什么样子的？
1. HTTP 报文结构就像是“大头儿子”，由“起始行 + 头部 + 空行 + 实体”组成，简单地说就是“header+body”；
2. HTTP 报文可以没有 body，但必须要有 header，而且 header 后也必须要有空行，形象地说就是“大头”必须要带着“脖子”；
3. 请求头由“请求行 + 头部字段”构成，响应头由“状态行 + 头部字段”构成；
4. 请求行有三部分：请求方法，请求目标和版本号；
5. 状态行也有三部分：版本号，状态码和原因字符串；
6. 头部字段是 key-value 的形式，用“:”分隔，不区分大小写，顺序任意，除了规定的标准头，也可以任意添加自定义字段，实现功能扩展；
7. HTTP/1.1 里唯一要求必须提供的头字段是 Host，它必须出现在请求头里，标记虚拟主机名。

#### 10 | 应该如何理解请求方法？
1. 请求方法是客户端发出的、要求服务器执行的、对资源的一种操作；
2. 请求方法是对服务器的“指示”，真正应如何处理由服务器来决定；
3. 最常用的请求方法是 GET 和 POST，分别是获取数据和发送数据；
4. HEAD 方法是轻量级的 GET，用来获取资源的元信息；
5. PUT 基本上是 POST 的同义词，多用于更新数据；
6. “安全”与“幂等”是描述请求方法的两个重要属性，具有理论指导意义，可以帮助我们设计系统。

#### 11 | 你能写出正确的网址吗？
1. URI 是用来唯一标记服务器上资源的一个字符串，通常也称为 URL；
2. URI 通常由 scheme、host:port、path 和 query 四个部分组成，有的可以省略；
3. scheme 叫“方案名”或者“协议名”，表示资源应该使用哪种协议来访问；
4. “host:port”表示资源所在的主机名和端口号；
5. path 标记资源所在的位置；
6. query 表示对资源附加的额外要求；
7. 在 URI 里对“@&/”等特殊字符和汉字必须要做编码，否则服务器收到 HTTP 报文后会无法正确处理。

#### 12 | 响应状态码该怎么用？
1. 状态码在响应报文里表示了服务器对请求的处理结果；
2. 状态码后的原因短语是简单的文字描述，可以自定义；
3. 状态码是十进制的三位数，分为五类，从 100 到 599；
4. 2××类状态码表示成功，常用的有 200、204、206；
5. 3××类状态码表示重定向，常用的有 301、302、304；
6. 4××类状态码表示客户端错误，常用的有 400、403、404；
7. 5××类状态码表示服务器错误，常用的有 500、501、502、503。

#### 13 | HTTP有哪些特点？
1. HTTP 是灵活可扩展的，可以任意添加头字段实现任意功能；
2. HTTP 是可靠传输协议，基于 TCP/IP 协议“尽量”保证数据的送达；
3. HTTP 是应用层协议，比 FTP、SSH 等更通用功能更多，能够传输任意数据；
4. HTTP 使用了请求 - 应答模式，客户端主动发起请求，服务器被动回复请求；
5. HTTP 本质上是无状态的，每个请求都是互相独立、毫无关联的，协议不要求客户端或服务器记录请求相关的信息。

#### 14 | HTTP有哪些优点？又有哪些缺点？
1. HTTP 最大的优点是简单、灵活和易于扩展；
2. HTTP 拥有成熟的软硬件环境，应用的非常广泛，是互联网的基础设施；
3. HTTP 是无状态的，可以轻松实现集群化，扩展性能，但有时也需要用 Cookie 技术来实现“有状态”；
4. HTTP 是明文传输，数据完全肉眼可见，能够方便地研究分析，但也容易被窃听；
5. HTTP 是不安全的，无法验证通信双方的身份，也不能判断报文是否被窜改；
6. HTTP 的性能不算差，但不完全适应现在的互联网，还有很大的提升空间。

#### 15 | 海纳百川：HTTP的实体数据
1. 数据类型表示实体数据的内容是什么，使用的是 MIME type，相关的头字段是 Accept 和 Content-Type；
2. 数据编码表示实体数据的压缩方式，相关的头字段是 Accept-Encoding 和 Content-Encoding；
3. 语言类型表示实体数据的自然语言，相关的头字段是 Accept-Language 和 Content-Language；
4. 字符集表示实体数据的编码方式，相关的头字段是 Accept-Charset 和 Content-Type；
5. 客户端需要在请求头里使用 Accept 等头字段与服务器进行“内容协商”，要求服务器返回最合适的数据；
6. Accept 等头字段可以用“,”顺序列出多个可能的选项，还可以用“;q=”参数来精确指定权重。

#### 16 | 把大象装进冰箱：HTTP传输大文件的方法
1. 压缩 HTML 等文本文件是传输大文件最基本的方法；
2. 分块传输可以流式收发数据，节约内存和带宽，使用响应头字段“Transfer-Encoding: chunked”来表示，分块的格式是 16 进制长度头 + 数据块；
3. 范围请求可以只获取部分数据，即“分块请求”，实现视频拖拽或者断点续传，使用请求头字段“Range”和响应头字段“Content-Range”，响应状态码必须是 206；
4. 也可以一次请求多个范围，这时候响应报文的数据类型是“multipart/byteranges”，body 里的多个部分会用 boundary 字符串分隔。

```
Q: 如果对一个被 gzip 的文件执行范围请求，比如“Range: bytes=10-19”，那么这个范围是应用于原文件还是压缩后的文件呢？
A: 需要分情况，看原文件是什么形式。如果原来的文件是gzip的，那就正确。如果原文件是文本，而是在传输过程中被压缩，那么就应用于压缩前的数据。总之，range是针对原文件的。
```

#### 17 | 排队也要讲效率：HTTP的连接管理
1. 早期的 HTTP 协议使用短连接，收到响应后就立即关闭连接，效率很低；
2. HTTP/1.1 默认启用长连接，在一个连接上收发多个请求响应，提高了传输效率；
3. 服务器会发送“Connection: keep-alive”字段表示启用了长连接；
4. 报文头里如果有“Connection: close”就意味着长连接即将关闭；
5. 过多的长连接会占用服务器资源，所以服务器会用一些策略有选择地关闭长连接；
6. “队头阻塞”问题会导致性能下降，可以用“并发连接”和“域名分片”技术缓解。

> “keepalive_timeout 60”和“keepalive_requests 5”，意思是空闲连接最多 60 秒，最多发送 5 个请求。所以，如果连续刷新五次页面，就能看到响应头里的“Connection: close”了。

#### 18 | 四通八达：HTTP的重定向和跳转
1. 重定向是服务器发起的跳转，要求客户端改用新的 URI 重新发送请求，通常会自动进行，用户是无感知的；
2. 301/302 是最常用的重定向状态码，分别是“永久重定向”和“临时重定向”；
3. 响应头字段 Location 指示了要跳转的 URI，可以用绝对或相对的形式；
4. 重定向可以把一个 URI 指向另一个 URI，也可以把多个 URI 指向同一个 URI，用途很多；
5. 使用重定向时需要当心性能损耗，还要避免出现循环跳转。

#### 19 | 让我知道你是谁：HTTP的Cookie机制
1. Cookie 是服务器委托浏览器存储的一些数据，让服务器有了“记忆能力”；
2. 响应报文使用 Set-Cookie 字段发送“key=value”形式的 Cookie 值；
3. 请求报文里用 Cookie 字段发送多个 Cookie 值；
4. 为了保护 Cookie，还要给它设置有效期、作用域等属性，常用的有 Max-Age、Expires、Domain、
5. HttpOnly 等；
6. Cookie 最基本的用途是身份识别，实现有状态的会话事务。

#### 20 | 生鲜速递：HTTP的缓存控制
1. 缓存是优化系统性能的重要手段，HTTP 传输的每一个环节中都可以有缓存；
2. 服务器使用“Cache-Control”设置缓存策略，常用的是“max-age”，表示资源的有效期；
3. 浏览器收到数据就会存入缓存，如果没过期就可以直接使用，过期就要去服务器验证是否仍然可用；
4. 验证资源是否失效需要使用“条件请求”，常用的是“if-Modified-Since”和“If-None-Match”，收到 304 就可以复用缓存里的资源；
5. 验证资源是否被修改的条件有两个：“Last-modified”和“ETag”，需要服务器预先在响应报文里设置，搭配条件请求使用；
6. 浏览器也可以发送“Cache-Control”字段，使用“max-age=0”或“no_cache”刷新数据。