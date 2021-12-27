## **如何在生产环境使用本地 sourceMap 调试？**

>    https://developer.chrome.com/docs/devtools/

第一步：打开混淆代码

第二步：右键 -> 选择【Add source map】

第三步：输入本地 sourceMap 的地址（此处需要启用一个静态资源服务，可以使用 http-server (https://www.npmjs.com/package/http-server)），完成。本地代码执行构建命令，注意需要打开 sourceMap 配置，编译产生出构建后的代码，此时构建后的结果会包含 sourceMap 文件。

![图片](https://mmbiz.qpic.cn/mmbiz_png/vzEib9IRhZD5IAEicyLicVKzW5AFX4TgPXK99VPWlUH4f1ia5aW5FibpyHJLROOMlzY1m56myNqcicibJgs2uUhicAGVqQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](https://mmbiz.qpic.cn/mmbiz_png/vzEib9IRhZD5IAEicyLicVKzW5AFX4TgPXK9BOybfCu8Tc9Asuq6dGceUUzfsibERnerY0gibwesV8aKqiaRGqCmVHtA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

关联上 sourceMap 后，我们就可以看到 sources -> page 面板上的变化了

![图片](https://mmbiz.qpic.cn/mmbiz_png/vzEib9IRhZD5IAEicyLicVKzW5AFX4TgPXKZZKgHDzQJP9zjO4Sk0O0xzYnibVG7cTKfx80IiblkBgPibKMKWQqo1mHQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 如何在 chrome 中修改代码并调试？

开发环境中，我们可以直接在 IDE 中修改代码，代码的变更就直接更新到了浏览器中了。那么生产环境，我们可以直接在 chrome  中修改代码，然后立马看代码修改后的效果吗？

当然，你想要的 chrome devTools 都有。chrome devTools 提供了 local overrides 能力。

### **local overrides 如何工作的？**

指定修改后的文件的本地保存目录，当修改完代码保存的时候，就会将修改后的文件保存到你指定的目录目录下，当再次加载页面的时候，对应的文件不再读取网络上的文件，而是读取存储在本地修改过的文件。

### **local overrides 如何使用？**

首先，打开 sources 下的 overrides 面板；

然后，点击【select folder overrides】选择修改后的文件存储地址；

再然后，点击顶部的授权，确认同意；

最后，我们就可以打开文件修改，修改完成后保存，重新刷新页面后，修改后的代码就被执行到了。

⚠️注意，原js文件直接 format 是无法修改的；在代码 format 之前先添加无效代码进行代码变更进行保存，然后再 format 就可以修改；

![图片](https://mmbiz.qpic.cn/mmbiz_png/vzEib9IRhZD5IAEicyLicVKzW5AFX4TgPXKkMwxO6rtAYy2UfyVicufYibIH3H0hAhh9fQgM4R21bw6gxfMsXu8B6lw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)