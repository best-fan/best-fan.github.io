# uWSGI 运行 flask 项目

> uWSGI 是一个 Web 服务器，它实现了 WSGI 协议、uwsgi、http 等协议， flask 中可以使用 uWSGI 作为 web 服务，运行 flask 开发的项目 。

# 使用步骤

## 安装 uwsgi

```shell
 pip install uwsgi
# 版本查看
 uwsgi --version
```

## 创建 uWSGi 配置文件

```js
[uwsgi]
#uwsgi启动时，所使用的地址和端口（这个是http协议的）
http=127.0.0.1:8000
#指向网站目录( 项目源码的根目录)
chdir=/Users/wangjie/PycharmProjects/repairXcx
#python 启动程序文件
wsgi-file=app.py
#python 程序内用以启动的application 变量名
callable=app
#处理器数
processes=4
#线程数
threads=2
```

文件名称可以任意命名(start.ini)
这个 app 指的是 flask 项目启动程序中定义的 flask name 的名字，我的启动程序是 app.py , 里面定义的 flask 的名字是 app 。

```js
app = Flask(__name__);
```

若你的名字不是 app 而是 web ，那么你的配置应该改为

```js
callable = web;
```

## 启动项目

- 方式一:直接运行

```js
uwsgi --ini start.ini
```

如果执行了 ctrl + c 命令退出了命令行，项目无法访问

- 方式二:后台运行

```js
uwsgi -d --ini start.ini
```

后台运行结束

```js
# 查看端口
ps -ef|grep uwsgi
# 结束进程
kill -9 7636
kill -9 7635
```
