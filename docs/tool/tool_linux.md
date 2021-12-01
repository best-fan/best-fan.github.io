# Linux 中常用命令

## nohup 命令(后台挂起)

> 用途：不挂断地运行命令
```shell
nohup Command [ Arg … ] [　& ] 
nohup python3 my.py >> my.log 2>&1 &
nohup tomcat.sh > /dev/null 2>&1 &
```

- \>>意为追加 >会让其中的内容清空
- my.py >> my.log 和my.py 1>>my.log相同，只是1(标准输入)被省略了
- my.log  输出内容会到my.log中
- 2>&1 将2(错误内容)1(标准输入)输入到标准输出
- & 为后台运行

| number | 说明 | 
| :-----| :---- | 
| 0 | 表示stdin标准输入，用户键盘输入的内容 | 
| 1 | 表示stdout标准输出，输出到显示屏的内容 | 
| 2 | 表示stderr标准错误，报错内容 |

## ps 命令(进程查看)

> 命令用于显示当前进程的状态，类似于 windows 的任务管理器
```shell
ps [options] [--help]
ps -aux|grep my.py
ps -aux|grep chat.js| grep -v grep
```
- 用grep -v参数可以将grep命令排除掉

| options | 说明 | 
| :-----| :---- | 
| -A | 列出所有的进程 | 
| -w | 显示加宽可以显示较多的资讯 | 
| -au  | 显示较详细的资讯 | 
| -aux | 显示所有包含其他使用者的行程 | 

## kill 命令(结束进程)

>命令用于删除执行中的程序或工作
```shell
#杀死进程
 kill 12345
#强制杀死进程
kill -KILL 123456
# 彻底杀死进程(使用较多)
kill -9 123456
```
## rm 命令(删除文件)

> rm（英文全拼：remove）命令用于删除一个文件或者目录

```shell
rm [options] name...
# 删除文件  需要确认
rm  test.txt 
# 删除文件夹
rm  -r  homework 
# 删除当前目录下的所有文件及目录，并且是直接删除，无需逐一确认
rm  -rf  要删除的文件名或目录
```
- 删除文件可以直接使用rm命令，若删除目录则必须配合选项"-r"

| options | 说明 | 
| :-----| :---- | 
| -i | 删除前逐一询问确认。 | 
| -f | 即使原档案属性设为唯读，亦直接删除，无需逐一确认。 | 
| -r  | 将目录及以下之档案亦逐一删除。 | 

## df 命令(查看磁盘使用量)

> 列出文件系统的整体磁盘使用量

```shell
df [-ahikHTm] [目录或文件名]
#将容量结果以易读的容量格式显示出来
df -h
#将 /etc 底下的可用的磁盘容量以易读的容量格式显示
 df -h /etc
#将系统内的所有特殊文件格式及名称都列出来
 df -aT
```
| ahikHTm | 说明 | 
| :-----| :---- | 
| -a  | 列出所有的文件系统，包括系统特有的 /proc 等文件系统 | 
| -k  | 以 KBytes 的容量显示各文件系统； | 
| -m  | 以 MBytes 的容量显示各文件系统 | 
| -h  | 以人们较易阅读的 GBytes, MBytes, KBytes 等格式自行显示 | 
| -H  | 以 M=1000K 取代 M=1024K 的进位方式 | 
| -T  | 显示文件系统类型, 连同该 partition 的 filesystem 名称 (例如 ext3) 也列出 | 
| -i  | 不用硬盘容量，而以 inode 的数量来显示 | 



参考文档：
[Linux命令大全](https://www.runoob.com/linux/linux-command-manual.html)
<p align="right">Page Update Time：{docsify-updated}</p>
