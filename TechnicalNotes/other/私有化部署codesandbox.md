![](https://cdn.nlark.com/yuque/0/2022/png/510753/1663576127785-918cffc4-43fe-433d-8411-2a9226a6f09a.png)

## 1. dependency-packager [打包服务]

>basic [https://github.com/codesandbox/dependency-packager](https://github.com/codesandbox/dependency-packager)

-   首先需要打通内网私有npm库, 两种方法

1.  在 functions/packager/dependencies/install-dependencies.ts 中, 增加 registry 指定
2.  如果采用Docker构建, 则可以在Dockerfile中指定 registry, 如下

RUN yarn config set registry http://xx.com/

-   该服务依赖了 AWS 的 Lambda 提供的 Serverless，并采用 AWS 提供的 S3 存储服务缓存 npm 包的打包结果。如果没有这些服务，可以将源码中这部分内容注释掉或者换成对应的其他厂商的服务即可.

-   目前方案: 在 functions/packager/index.ts 中, 对接了私有OSS服务, 将打包结果缓存,增加构建速度, 具体查看 functions/packager/utils/minio.ts

## 2. Editor[编辑器]

>basic [https://sandpack.codesandbox.io/docs/](https://sandpack.codesandbox.io/docs/)

-   bundlerUrl 需要替换为自己的构建服务
```js

import './App.css'

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { SandpackClient } from "@codesandbox/sandpack-client";

const dependencies = {
    "efg-design-rth": "0.0.23",
};

/*

import { Button } from 'efg-design-rth'

*/

const files = {
  "/demo.js": {
    code: `
// copy all code to App.js
import 'efg-design-rth/dist/index.css';
import { ConfigProvider, Button } from 'efg-design-rth'

export default () => (
  <ConfigProvider>
    <Button>Click me</Button>
    <Button type="primary">Click me</Button>
    <Button type="danger">Click me</Button>
    <Button type="link">Click me</Button>
  </ConfigProvider>
)
    `,
  }
}

const bundlerURL = 'http://gd-fework.dc.servyou-it.com/codesandbox/client/'


export default function App() {
    // React.useEffect(() => {
    //     const client = new SandpackClient(
    //         "#preview", // iframe selector or element itself
    //         {
    //           entry: "/index.js",
    //           files,
    //           dependencies,
    //         },
    //         {
    //             bundlerURL
    //         }
    //       );
    // }, [])

    return (
        // <div style={{
        //   height: '100vh',
        //   width: '100vw'
        // }}>
        //     <iframe id="preview" />
        // </div>
        <SandpackProvider
          template="react"
          files={files}
          customSetup={{
            entry: "/index.js",
            dependencies
          }}
          options={{
            bundlerURL
          }}>
          <SandpackLayout>
            <SandpackCodeEditor />
            <SandpackPreview />
          </SandpackLayout>
        </SandpackProvider>
    );
}
```

## 3. codesandbox-client构建服务

>basic ---> [https://github.com/codesandbox/codesandbox-client](https://github.com/codesandbox/codesandbox-client)

-   运行需要 node: ^10.22.1
-   由于项目体积庞大, 在本地build之后将静态资源(packages/app)部署到ng上
```sh
#运行和构建需要 Node 10 环境

### 安装依赖
yarn

# 构建依赖库
yarn run build:deps

# 进入到核心库 packages/app 进行构建
cd packages/app

yarn run build:sandpack-sandbox

# 一些需要的静态文件需要从整体项目的构建目录中获取
cp -rf ../../www/static/* ./www/static
```

```Dockerfile
FROM nginx:alpine

COPY /packages/app/www /usr/share/nginx/html/
```
-   项目使用了 unpkg 和 jsdelivr, 需要自行部署unkpg, 替换 jsdelivr 到 unpkg

-   参考 [[4. unpkg](#JgqLc)]

-   将打包 npm 的服务换成上面私有化部署的服务，以解决无法获取私有 npm 包等问题

-   packages/sandpack-core/src/npm/preloaded/fetch-dependencies.ts
``` js
// const fullUrl = `${BUCKET_URL}/v${VERSION}/packages/${depName}/${normalizedVersion}.json`;

// 替换为
const fullUrl = `http://xx.com/codesandbox/packager/${depName}@${normalizedVersion}`;
```
-   packages/sandpack-core/src/npm/dynamic/fetch-protocols/unpkg.ts
-   packages/sandpack-core/src/npm/dynamic/fetch-protocols/jsdelivr/jsdelivr-npm.ts
```js
/*
	unpkg jsdelivr  替换为私有化部署的 unpkg 服务
	jsdelivr 需注意,  /flat 请求需要将 unkpg 的结果转换再返回
	定义参考 JSDelivrMeta
*/
```
## 4. unpkg

> base ---> [https://github.com/mjackson/unpkg.git](https://github.com/mjackson/unpkg.git)

-   配置 env NPM_REGISTRY_URL, 可以读取私库
-   私库若为 http, 则需修改 modules/utils/npm.js 中 https 为 http
```Dockerfile
FROM node:12-alpine

WORKDIR /app

COPY package.json  .
RUN npm i --registry=https://registry.npmmirror.com/

COPY . .

# RUN npm run build

ENV PORT 8080
CMD ["node", "server.js"]

EXPOSE 8080
```
## 参考资料

[搭建一个属于自己的在线 IDE](https://juejin.cn/post/6882541950205952013)

[minio-oss-api-doc](https://docs.min.io/docs/javascript-client-api-reference.html)

[codesandbox/dependency-packager](https://github.com/codesandbox/dependency-packager)

[@codesandbox/sandpack-react](https://sandpack.codesandbox.io/docs/)

[codesandbox-client](https://github.com/codesandbox/codesandbox-client)

[unpkg](https://github.com/mjackson/unpkg.git)