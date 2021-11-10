# 包管理工具

## npm、cnpm

> NPM 是随同 NodeJS 一起安装的包管理工具，能解决 NodeJS 代码部署上的很多问题
> CNPM 是中国 npm 镜像的客户端。

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

> Yarn 是一个由 Facebook 贡献的 Javascript 包管理器。

## 常用命令

```js
# 查看 yarn 的版本
$ yarn -v  //1.22.4 << 安装成功会返回版本号

# 查看 yarn 命令列表
$ yarn help

# 查看 yarn 的配置
$ yarn config list -l

# 创建模块
$ yarn init //通过交互式会话创建一个 package.json

# 搜索模块 用于搜索yarn当前项目
$ yarn search <搜索词> [-g]

# 安装模块 读取package.json里面的配置单安装
$ yarn install
//可简写成 npm i

# 安装 全局模块
$ yarn global add <packageName>

# 默认安装指定模块的最新(@latest)版本
$ yarn add [<@scope>/]<name>
//eg:yarn add gulp

# 安装指定模块的指定版本
$ yarn add [<@scope>/]<name>@<version>
//eg: yarn add gulp@3.9.1

# 卸载当前项目
$ yarn remove  <name>

eg: yarn remove gulp

//卸载后，你可以到 /node\_modules/ 目录下查看包是否还存在，或者使用以下命令查看：
# 查看安装的模块
$ yarn list
$ yarn list --depth=0 # 限制依赖的深度
$ yarn global list #全局模块

# 升级当前项目或全局的指定模块
$ yarn upgrade  <name>


# yarn run 执行脚本
// package.json的scripts字段，可以用于指定脚本命令，供yarn直接调用。yarn run会创建一个Shell，执行指定的命令。
$ yarn run serve
```

## 常用命令对比

| yarn                       | npm                          | 说明                          |
| -------------------------- | ---------------------------- | ----------------------------- |
| yarn install               | npm i                        | 根据 pack.json 安装依赖       |
| yarn add [package]         | npm i [package]              | 安装相应依赖包                |
| yarn add [package] --D     | npm i [package] -D           | devDependencies               |
| yarn global add [package]  | npm i [package] -g           | 全局安装依赖包                |
| yarn global upgrade        | npm update -g                | 全局更新依赖包                |
| yarn install --no-lockfile | npm i --no-package-loc       | 不读取或生成 yarn.lock 锁文件 |
| yarn add [package] --O     | npm i [package] -O           | optionalDependencies          |
| yarn add [package] --E     | npm i [package] -E           | 安装依赖包的确切版本          |
| yarn add --force           | npm rebuild                  | 更改包内容后进行重建          |
| yarn remove [package       | npm uninstall [package]      | 卸载已经安装的依赖包          |
| yarn cache clean [package] | npm cache clean              | 清除全局缓存依赖包            |
| yarn upgrade               | rm -rf node_modules && npm i | 更新依赖包                    |
| yarn version --major       | npm version major            | 更新依赖包的版本              |
| yarn version --minor       | npm version minor            | 更新依赖包的版本              |
| yarn version --patch       | npm version patch            | 更新依赖包的版本              |
| yarn init                  | npm init                     | 初始化一个新项目              |

## 参考文档

[npm docs](https://docs.npmjs.com/cli/v7/commands)
[yarn docs](https://yarn.bootcss.com/docs/)
