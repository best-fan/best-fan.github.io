# 包管理工具

## npm、cnpm
>NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题
>CNPM 是中国 npm 镜像的客户端。
## 常用命令
```js
# 查看 npm 的版本 
$ npm -v  //6.4.0 << 安装成功会返回版本号

# 查看各个命令的简单用法
$ npm -l 
 
# 查看 npm 命令列表
$ npm help

# 查看 npm 的配置
$ npm config list -l

# 创建模块
$ npm init

# 搜索模块 用于搜索npm仓库
$ npm search <搜索词> [-g]

# 安装模块 读取package.json里面的配置单安装 
$ npm install 
//可简写成 npm i
# 安装 全局模块
$ npm install -g
//可简写成 npm i draws -g

# 默认安装指定模块的最新(@latest)版本
$ npm install [<@scope>/]<name> 
//eg:npm install gulp

# 安装指定模块的指定版本
$ npm install [<@scope>/]<name>@<version>
//eg: npm install gulp@3.9.1

# 卸载当前项目或全局模块 
$ npm uninstall <name> [-g] 

eg: npm uninstall gulp --save-dev  
    npm i gulp -g

//卸载后，你可以到 /node\_modules/ 目录下查看包是否还存在，或者使用以下命令查看：
# 查看安装的模块
$ npm ls 

# 升级当前项目或全局的指定模块
$ npm update <name> [-g] 


# npm run 执行脚本
// package.json的scripts字段，可以用于指定脚本命令，供npm直接调用。npm run会创建一个Shell，执行指定的命令。
$ npm run serve

```

## yarn
>Yarn 是一个由 Facebook 贡献的 Javascript 包管理器。


## 参考文档
[npm docs](https://docs.npmjs.com/cli/v7/commands)
[yarn docs](https://yarn.bootcss.com/docs/)