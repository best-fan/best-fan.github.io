#  docsify
* * *
## 说明
<u>文档网站生成器 ，使用md语法编写文档并直接部署在 [GitHub Pages](https://docsify.js.org/#/zh-cn/deploy)</u>

## 快速开始

###  安装docsify-cli 工具

   ```bash
    npm i docsify-cli -g  

   ```
   or
   ```bash
    yarn global add docsify-cli 
   ```

### 初始化项目  
在`./docs `文件夹中写文档， 通过init  初始化项目
    ```bash
    docsify init ./docs
    ```
    成功后会生成一个 docs 的文件夹，并且里面有三个文件
    -   index.html 入口文件。后面我们的配置很多都是在这里配置
    -   README.md 会做为主页内容渲染
    -   .nojekyll 用于阻止 GitHub Pages 忽略掉下划线开头的文件
### 启动项目

-  使用docsify启动
    
    ```bash
    docsify serve docs

    ```
   	
-  使用 Python 启动
    
  - python 2.x
    ```bash
    cd docs && python -m SimpleHTTPServer 3000
    ```
  - python 3.x
    ```bash
    cd docs && python -m http.server 3000
    ```

通过运行 docsify serve 启动一个本地服务器，可以方便地实时预览效果。默认访问地址 http://localhost:3000 。
   
![预览图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07d8bf3840bf4d9e93eeeadbba3b97f5~tplv-k3u1fbpfcp-zoom-1.image)
    
    

## 配置docsify

###     配置侧边栏
    
在 index.html 中，新增配置 loadSidebar: true
   ```html
    <script>
      window.$docsify = {
        loadSidebar: true
      }
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
   ```
创建 _sidebar.md 文件
    
   ```
    <!-- docs/_sidebar.md -->

    * [首页](zh-cn/)
    * [指南](zh-cn/guide)
   ```
###    自动生成二级标题

开启loadSidebar，并配置subMaxLevel
  ```html
  <!-- index.html -->

  <script>
    window.$docsify = {
      loadSidebar: true,
      subMaxLevel: 2
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
  ```
![预览图](http://blog.bravetimes.cn/api/public/uploads/2021/03/11/1615473232733519.png)
  

##  docsify插件使用
###  全局搜索

```html
 window.$docsify = {
      search: {// 支持本地化
        placeholder: {
          '/zh-cn/': '搜索',
          '/': '有问题 搜一下'
        }
      },
     }
 <!-- 全文搜索 -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
```

![image](http://blog.bravetimes.cn/api/public/uploads/2021/03/12/1615511492051529.png)
### 图片缩放

```html
  <!-- 图片缩放 -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script>
```
### 字数统计

```html
  <!-- 字数统计 -->
  <script src="//unpkg.com/docsify-count/dist/countable.js"></script>
```
![image](http://blog.bravetimes.cn/api/public/uploads/2021/03/12/1615511534873758.png)

###  复制代码

```html
<script src="//cdn.jsdelivr.net/npm/docsify-copy-code"></script>
```

![image](http://blog.bravetimes.cn/api/public/uploads/2021/07/16/1626421501205619.png)
###  在 Github 上编辑
设置repo地址
```js
 window.$docsify = {
 	repo: 'https://github.com//best-fan/best-fan.github.io/',
 }
```

![image](http://blog.bravetimes.cn/api/public/uploads/2021/03/12/1615511717027562.png)
##  总结
docsify使用起来非常方便,而且使用md语法、插件功能比较丰富，适合文件系统的搭建，并且支持git hub page的部署，非常轻便。更多功能，详细介绍，请访问[docsify官方地址](https://docsify.js.org/#/)。

<p align="right">Page Update Time：{docsify-updated}</p>

