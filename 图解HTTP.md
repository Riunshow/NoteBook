## 图解 HTTP

___

### 第 1 章　了解 Web 及网络基础

#### TCP/IP

* 应用层 -> 传输层 -> 网络层 -> 链路层
  * HTTP -> TCP -> IP -> 网络
* IP 地址指明了节点被分配到的地址，MAC 地址是指网卡所属的固定 地址。
* 使用 ARP 协议凭借 MAC 地址进行通信
  * ARP 是一种用以解析地址的协议，根据通信方 的 IP 地址就可以反查出对应的 MAC 地址。
* TCP 三次握手
  * 发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后， 回传一个带有 SYN/ACK 标志的数据包以示传达确认信息。最后，发 送端再回传一个带 ACK 标志的数据包，代表“握手”结束。
  * 若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发 送相同的数据包。
  * **除了上述三次握手，TCP 协议还有其他各种手段来保证通信的可靠性.**

#### DNS

DNS（Domain Name System）服务是和 HTTP 协议一样位于应用层的 协议。它提供域名到 IP 地址之间的解析服务。

#### URI  URL 的区别

* URI 统一资源标识符,  URL 统一资源定位符
* URI 用字符串标识某一互联网资源，而 URL 表示资源的地点（互联 网上所处的位置）。可见 URL 是 URI 的子集
* URI是定义  URL 是标识

___

### 第 2 章　简单的 HTTP 协议

#### HTTP

* HTTP 是一种不保存状态，即无状态（stateless）协议。
* 在 HTTP/1.1 中，所有的连接默认都是持久连接
* 持久连接使得多数请求以管线化（pipelining）方式发送成为可能, 管线化技术则比持久连接还 要快。请求数越多，时间差就越明显。
* 基于 cookie 的状态管理

| 方法    | 说明                   | 支持的 HTTP 协议版本 |
| ------- | ---------------------- | -------------------- |
| GET     | 获取资源               | 1.0、1.1             |
| POST    | 传输实体主体           | 1.0、1.1             |
| PUT     | 传输文件               | 1.0、1.1             |
| HEAD    | 获得报文首部           | 1.0、1.1             |
| DELETE  | 删除文件               | 1.0、1.1             |
| OPTIONS | 询问支持的方法         | 1.1                  |
| TRACE   | 追踪路径               | 1.1                  |
| CONNECT | 要求用隧道协议连接代理 | 1.1                  |
| LINK    | 建立和资源之间的联系   | 1.0                  |
| UNLINE  | 断开连接关系           | 1.0                  |

___

### 第 3 章　HTTP 报文内的 HTTP 信息

#### 编码提升传输速率

* 常用的内容编码有以下几种。
  * gzip（GNU zip） compress（UNIX 系统的标准压缩） deflate（zlib） identity（不进行编码）

* 分割发送的分块传输编码

#### 获取部分内容的范围请求

* 执行范围请求时，会用到首部字段 Range 来指定资源的 byte 范围。

  ```
  byte 范围的指定形式如下。
  
  5001~10 000 字节
  
  > Range: bytes=5001-10000
  
  从 5001 字节之后全部的
  
  > Range: bytes=5001-
  
  从一开始到 3000 字节和 5000~7000 字节的多重范围
  
  > Range: bytes=-3000, 5000-7000
  ```

#### 内容协商返回最合适的内容

> 同一个 Web 网站有可能存在着多份相同内容的页面。比如英语版和 中文版的 Web 页面，它们内容上虽相同，但使用的语言却不同。
>
> 当浏览器的默认语言为英语或中文，访问相同 URI 的 Web 页面时， 则会显示对应的英语版或中文版的 Web 页面。这样的机制称为内容 协商（Content Negotiation）。

* 涉及到的头部字段
  * Accept
  * Accept-Charset
  * Accept-Encoding
  * Accept-Language
  * Content-Language
* 内容协商技术有以下 3 种类型。
  * 服务器驱动协商（Server-driven Negotiation） 由服务器端进行内容协商。以请求的首部字段为参考，在服务器端自 动处理。但对用户来说，以浏览器发送的信息作为判定的依据，并不 一定能筛选出最优内容。
  * 客户端驱动协商（Agent-driven Negotiation） 由客户端进行内容协商的方式。用户从浏览器显示的可选项列表中手 动选择。还可以利用 JavaScript 脚本在 Web 页面上自动进行上述选 择。比如按 OS 的类型或浏览器类型，自行切换成 PC 版页面或手机 版页面。
  * 透明协商（Transparent Negotiation） 是服务器驱动和客户端驱动的结合体，是由服务_器端和客户端各自进 行内容协商的一种方法。

___

### 第 4 章　返回结果的 HTTP 状态 码

#### 状态码的类别

|      | 类别                             | 原因短语                   |
| ---- | -------------------------------- | -------------------------- |
| 1XX  | Informational（信息性状态码）    | 接收的请求正在处理         |
| 2XX  | Success（成功状态码）            | 请求正常处理完毕           |
| 3XX  | Redirection（重定向状态码）      | 需要进行附加操作以完成请求 |
| 4XX  | Client Error（客户端错误状态码） | 服务器无法处理请求         |
| 5XX  | Server Error（服务器错误状态码） | 服务器处理请求出错         |

#### 2XX  成功

 * 200 OK
    * 表示从客户端发来的请求在服务器端被正常处理了。
    * 在响应报文内，随状态码一起返回的信息会因方法的不同而发生改 变。比如，使用 GET 方法时，对应请求资源的实体会作为响应返 回；而使用 HEAD 方法时，对应请求资源的实体首部不随报文主体 作为响应返回（即在响应中只返回首部，不会返回实体的主体部 分）。
 * 204 No Content
   	* 该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中 不含实体的主体部分。另外，也不允许返回任何实体的主体。比如， 当从浏览器发出请求处理后，返回 204 响应，那么浏览器显示的页面 不发生更新。
   	* 一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用。
* 206 Partial Content
  * 该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。

#### 3XX  重定向

* 301 Moved Permanently
  * 永久性重定向。该状态码表示请求的资源已被分配了新的 URI，以后 应使用资源现在所指的 URI。也就是说，如果已经把资源对应的 URI 保存为书签了，这时应该按 Location 首部字段提示的 URI 重新保存。
  * 像下方给出的请求 URI，当指定资源路径的最后忘记添加斜杠“/”，就 会产生 301 状态码。http://example.com/sample
* 302 Found
  * 临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望 用户（本次）能使用新的 URI 访问。
  * 和 301 Moved Permanently 状态码相似，但 302 状态码代表的资源不 是被永久移动，只是临时性质的。换句话说，已移动的资源对应的 URI 将来还有可能发生改变。比如，用户把 URI 保存成书签，但不会 像 301 状态码出现时那样去更新书签，而是仍旧保留返回 302 状态码 的页面对应的 URI。
* 303 See Other
  * 该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。
  * 303 状态码和 302 Found 状态码有着相同的功能，但 303 状态码明确 表示客户端应当采用 GET 方法获取资源，这点与 302 状态码有区 别。
  * 比如，当使用 POST 方法访问 CGI 程序，其执行后的处理结果是希望 客户端能以 GET 方法重定向到另一个 URI 上去时，返回 303 状态 码。虽然 302 Found 状态码也可以实现相同的功能，但这里使用 303状态码是最理想的。
* 304 Not Modified
  * 该状态码表示客户端发送**附带条件的请求**时，服务器端允许请求访 问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应 的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关 系。
  * **附带条件的请求**是指采用 GET 方法的请求报文中包含 If-Match，If-ModifiedSince，If-None-Match，If-Range，If-Unmodified-Since 中任一首部。
* 307 Temporary Redirect
  * 临时重定向。该状态码与 302 Found 有着相同的含义。尽管 302 标准禁止 POST 变换成 GET，但实际使用时大家并不遵守。307 会遵照浏览器标准，不会从 POST 变成 GET。但是，对于处理响 应时的行为，每种浏览器有可能出现不同的情况。


#### 4XX  客户端错误

* 400 Bad Request
  * 该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态 码。
* 401 Unauthorized
  * 该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、 DIGEST 认证）的认证信息。另外若之前已进行过 1 次请求，则表示 用 户认证失败。
* 403 Forbidden
  * 该状态码表明对请求资源的访问被服务器拒绝了。服务器端没有必要 给出拒绝的详细理由，但如果想作说明的话，可以在实体的主体部分对原因进行描述，这样就能让用户看到了。
  * 未获得文件系统的访问授权，访问权限出现某些问题（从未授权的发 送源 IP 地址试图访问）等列举的情况都可能是发生 403 的原因。
* 404 Not Found
  * 该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服 务器端拒绝请求且不想说明理由时使用。
* 405 Method Not Allowed
  * 请求方法不被允许

#### 5XX  服务器错误

* 500 Internal Server Error
  * 该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。
* 503 Service Unavailable
  * 该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法 处理请求。如果事先得知解除以上状况需要的时间，最好写入 RetryAfter 首部字段再返回给客户端。
  * 状态码和状况的不一致, 不少返回的状态码响应都是错误的，但是用户可能察觉不到这点。 比如 Web 应用程序内部发生错误，状态码依然返回 200 OK，这种 情况也经常遇到。


___

### 第 5 章　与 HTTP 协作的 Web 服 务器

#### 用单台虚拟主机实现多个域名

	* 由于虚拟主机可以寄存多个不同主机名和域名 的 Web 网站，因此在发送 HTTP 请求时，必须在 Host 首部内完整指 定主机名或域名的 URI。

#### 代理、网关、隧 道

* 代理

  * 缓存代理

    * 代理转发响应时，缓存代理（Caching Proxy）会预先将资源的副本 （缓存）保存在代理服务器上。

      当代理再次接收到对相同资源的请求时，就可以不从源服务器那里获 取资源，而是将之前缓存的资源作为响应返回。

  * 透明代理

    * 转发请求或响应时，不对报文做任何加工的代理类型被称为透明代理 （Transparent Proxy）。反之，对报文内容进行加工的代理被称为非 透明代理。

* 网关

  * 利用网关可以由 HTTP 请求转化为其他协议通信

* 隧道

  * 隧道本身不会去解析 HTTP 请求。也就是说，请求保持原样中转给之 后的服务器。**隧道会在通信双方断开连接时结束**。

#### 保存资源的缓存

> 缓存服务器的优势在于利用缓存可避免多次从源服务器转发资源。因 此客户端可就近从缓存服务器上获取资源，而源服务器也不必多次处 理相同的请求了。

* 缓存的有效期限
  * 服务器的缓存  (缓存服务器)
  * 客户端的缓存 (浏览器的缓存机制)

___

### 第 6 章　HTTP 首部

#### HTTP 报文首部

* HTTP 报文由方法、URI、HTTP 版本、HTTP 首部字段等 部分构成。
  * HTTP 请求报文

```
GET / HTTP/1.1
Host: hackr.jp
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/2010010
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*; q=0
Accept-Language: ja,en-us;q=0.7,en;q=0.3 
Accept-Encoding: gzip, deflate 
DNT: 1 
Connection: keep-alive 
If-Modified-Since: Fri, 31 Aug 2007 02:02:20 GMT 
If-None-Match: "45bae1-16a-46d776ac" 
Cache-Control: max-age=0
```

	* HTTP 响应报文

```
HTTP/1.1 304 Not Modified
Date: Thu, 07 Jun 2012 07:21:36 GMT
Server: Apache
Connection: close
Etag: "45bae1-16a-46d776ac"
```

#### HTTP 首部字段

* 通用首部字段

| 首部字段名        | 说明                       |
| ----------------- | -------------------------- |
| Cache-Control     | 控制缓存的行为             |
| Connection        | 逐跳首部、连接的管理       |
| Date              | 创建报文的日期时间         |
| Pragma            | 报文指令                   |
| Trailer           | 报文末端的首部一览         |
| Transfer-Encoding | 指定报文主体的传输编码方式 |
| Upgrade           | 升级为其他协议             |
| Via               | 代理服务器的相关信息       |
| Warning           | 错误通知                   |

* 请求首部字段

| 首部字段名          | 说明                                          |
| ------------------- | --------------------------------------------- |
| Accept              | 用户代理可处理的媒体类型                      |
| Accept-Charset      | 优先的字符集                                  |
| Accept-Encoding     | 优先的内容编码                                |
| Accept-Language     | 优先的语言（自然语言）                        |
| Authorization       | Web认证信息                                   |
| Expect              | 期待服务器的特定行为                          |
| From                | 用户的电子邮箱地址                            |
| Host                | 请求资源所在服务器                            |
| If-Match            | 比较实体标记（ETag）                          |
| If-Modified-Since   | 比较资源的更新时间                            |
| If-None-Match       | 比较实体标记（与 If-Match 相反）              |
| If-Range            | 资源未更新时发送实体 Byte 的范围请求          |
| If-Unmodified-Since | 比较资源的更新时间（与If-Modified-Since相反） |
| Max-Forwards        | 最大传输逐跳数                                |
| Proxy-Authorization | 代理服务器要求客户端的认证信息                |
| Range               | 实体的字节范围请求                            |
| Referer             | 对请求中 URI 的原始获取方                     |
| TE                  | 传输编码的优先级                              |
| User-Agent          | HTTP 客户端程序的信息                         |

* 响应首部字段

| 首部字段名         | 说明                         |
| ------------------ | ---------------------------- |
| Accept-Ranges      | 是否接受字节范围请求         |
| Age                | 推算资源创建经过时间         |
| ETag               | 资源的匹配信息               |
| Location           | 令客户端重定向至指定URI      |
| Proxy-Authenticate | 代理服务器对客户端的认证信息 |
| Retry-After        | 对再次发起请求的时机要求     |
| Server             | HTTP服务器的安装信息         |
| Vary               | 代理服务器缓存的管理信息     |
| WWW-Authenticate   | 服务器对客户端的认证信息     |

* 实体首部字段

| 首部字段名       | 说明                         |
| ---------------- | ---------------------------- |
| Allow            | 资源可支持的HTTP方法         |
| Content-Encoding | 实体主体适用的编码方式       |
| Content-Language | 实体主体的自然语言           |
| Content-Length   | 实体主体的大小（单位：字节） |
| Content-Location | 替代对应资源的URI            |
| Content-MD5      | 实体主体的报文摘要           |
| Content-Range    | 实体主体的位置范围           |
| Content-Type     | 实体主体的媒体类型           |
| Expires          | 实体主体过期的日期时间       |
| Last-Modified    | 资源的最后修改日期时间       |

#### Cache-Control

* 缓存请求

| 指令                | 参数   | 说明                         |
| ------------------- | ------ | ---------------------------- |
| no-cache            | 无     | 强制向源服务器再次验证       |
| no-store            | 无     | 不缓存请求或响应的任何内容   |
| max-age = [ 秒]     | 必需   | 响应的最大Age值              |
| max-stale( = [ 秒]) | 可省略 | 接收已过期的响应             |
| min-fresh = [ 秒]   | 必需   | 期望在指定时间内的响应仍有效 |
| no-transform        | 无     | 代理不可更改媒体类型         |
| only-if-cached      | 无     | 从缓存获取资源               |
| cache-extension     | -      | 新指令标记（token）          |

* 缓存响应

| 指令             | 参数   | 说明                                            |
| ---------------- | ------ | ----------------------------------------------- |
| public           | 无     | 可向任意方提供响应的缓存                        |
| private          | 可省略 | 仅向特定用户返回响应                            |
| no-cache         | 可省略 | 缓存前必须先确认其有效性                        |
| no-store         | 无     | 不缓存请求或响应的任何内容                      |
| no-transform     | 无     | 代理不可更改媒体类型                            |
| must-revalidate  | 无     | 可缓存但必须再向源服务器进行确认                |
| proxy-revalidate | 无     | 要求中间缓存服务器对缓存的响应有效性再 进行确认 |
| max-age = [ 秒]  | 必需   | 响应的最大Age值                                 |
| s-maxage = [ 秒] | 必需   | 公共缓存服务器响应的最大Age值                   |
| cache-extension  | -      | 新指令标记（token）                             |

#### Connection

* 控制不再转发给代理的首部字段
  * 在客户端发送请求和服务器返回响应内，使用 Connection 首部字 段，可控制不再转发给代理的首部字段（即 Hop-by-hop 首 部）。
* 管理持久连接
  * 默认连接都是持久连接。为此，客户端会在持 久连接上连续发送请求。当服务器端想明确断开连接时，则指定 Connection 首部字段的值为 Close。



#### Accept-Encoding

> Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及 内容编码的优先级顺序。可一次性指定多种内容编码。

* gzip
  * 由文件压缩程序 gzip（GNU zip）生成的编码格式 （RFC1952），采用 Lempel-Ziv 算法（LZ77）及 32 位循环冗余 校验（Cyclic Redundancy Check，通称 CRC）。

* compress
  * 由 UNIX 文件压缩程序 compress 生成的编码格式，采用 LempelZiv-Welch 算法（LZW）。

* deflate
  * 组合使用 zlib 格式（RFC1950）及由 deflate 压缩算法 （RFC1951）生成的编码格式。

* identity
  * 不执行压缩或不会变化的默认编码格式

#### If-Match

> 形如 If-xxx 这种样式的请求首部字段，都可称为条件请求。服务器接 收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。

* 首部字段 If-Match，属附带条件之一，它会告知服务器匹配资源所用 的实体标记（ETag）值。这时的服务器无法使用弱 ETag 值。（请参 照本章有关首部字段 ETag 的说明）

* 服务器会比对 If-Match 的字段值和资源的 ETag 值，仅当两者一致 时，才会执行请求。反之，则返回状态码 412 Precondition Failed 的响 应。

* 还可以使用星号（*）指定 If-Match 的字段值。针对这种情况，服务 器将会忽略 ETag 的值，只要资源存在就处理请求。

#### If-Modified-Since

* 首部字段 If-Modified-Since，属附带条件之一，它会告知服务器若 IfModified-Since 字段值早于资源的更新时间，则希望能处理该请求。 而在指定 If-Modified-Since 字段值的日期时间之后，如果请求的资源 都没有过更新，则返回状态码 304 Not Modified 的响应。

* If-Modified-Since 用于确认代理或客户端拥有的本地资源的有效性。 获取资源的更新日期时间，可通过确认首部字段 Last-Modified 来确 定。



...

### 第 7 章　确保 Web 安全的 HTTPS

> 通常，HTTP 直接和 TCP 通信。当使用 SSL 时，则演变成先和 SSL 通 信，再由 SSL 和 TCP 通信了。简言之，所谓 HTTPS，其实就是身披 SSL 协议这层外壳的 HTTP。

HTTP: HTTP -> TCP -> IP

HTTPS: HTTP -> SSL -> TCP -> IP

> SSL 是独立于 HTTP 的协议，所以不光是 HTTP 协议，其他运行在应 用层的 SMTP 和 Telnet 等协议均可配合 SSL 协议使用。可以说 SSL 是 当今世界上应用最为广泛的网络安全技术。

### 第 8 章　确认访问用户身份的认 证

### 第 9 章　基于 HTTP 的功能追加 协议

* WebSocket

  * 为了实现 WebSocket 通信，在 HTTP 连接建立之后，需要完成一 次“握手”（Handshaking）的步骤。
  * 为了实现 WebSocket 通信，需要用到 HTTP 的 Upgrade 首部字 段，告知服务器通信协议发生改变，以达到握手的目的。

  ```
  GET /chat HTTP/1.1 
  Host: server.example.com 
  Upgrade: websocket            <---------------------
  Connection: Upgrade 
  Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ== 
  Origin: http://example.com 
  Sec-WebSocket-Protocol: chat, superchat 
  Sec-WebSocket-Version: 13
  ```

  

### 第 10 章　构建 Web 内容的技术

### 第 11 章　Web 的攻击技术



