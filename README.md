# vue-admin
静态资源后台框架 vue2 + vue-cli + vue-router + vuex

腾讯云存储 preview [vue-admin](https://vue-admin-1252359508.cos-website.ap-shanghai.myqcloud.com)

七牛云存储 preview [vue-admin](http://p7erxig0j.bkt.clouddn.com)

登录用户名：guest
密码: 123456

> A Vue.js project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## 部署到七牛免费云存储平台

* 纯静态资源可以用云平台访问，省钱
* 南北双线主机，还有cdn云
* 一键发布，方便开发，测试

可查看七牛开发者文档，找到命令行工具，作者这里用的是 `qshell`

可在七牛文档中心下载 `qshell`
根据不同的平台自行下载对应版本，`qshell`怎么使用，这是一个命令行，在linux mac上只要全局安装这个命令
使其不显示，`qshell` 不识别

在windows 把他解压到你的node.exe的文件夹吧，当然，你要把qshell-64-window.exe 重名名成 qshell.exe（mac 本来就叫 qshell 没有后缀的）

在执行 `npm run up | yarn run up` 前，你要在你的七牛的账号执行以下

`qshell account ak sk`

`ak\sk` 是你的账号的唯一识别码，在个人中心找到吧

根目录有个上传的配置文件 `qdist_up.conf` 用来同步文件到七牛。

文件的backup 名字你换成你的

执行以下命令吧：

`npm run up | yarn run up`


#### 更多操作待完善

* `vue-router` 采用 `history` 模式（这里要解决刷新显示404的问题）
* `addRoutes` 采用动态加载路由，动态加的会刷新变空白，有点小卡，还是解决了


有什么问题请提`issues`, 加我微信号 `hnsanx_com` 打赏也可以的…………

### And-design 新版UI

v1.0
> 更新新的框架，并集成一些组件



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
