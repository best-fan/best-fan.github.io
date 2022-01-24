# Python—下载加密视频分析


## 说明
   通过编写 Python 脚本 对页面进行分析抓取到视频真实地址，然后对视频进行分析下载合并(ffmpeg).
## 快速开始
### **1、分析dom文档**
   通过对dom文档的分析 找到视频播放的真实地址(.m3u8 文件地址)
   分析html页面 节点 找到m3u8地址所在位置
   ![图片地址](https://blog.bravetimes.cn/api/public/uploads/2022/01/24/1643007782528881.png)
   编写python脚本 获取地址
   ```js
    import requests
    import ssl
    import urllib.request
    from bs4 import BeautifulSoup
    from requests.packages.urllib3.exceptions import InsecureRequestWarning
    # 移除htts请求警告
    requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
    # 获取dom元素
    def getDom(urls):
        print("get_page_url", urls)
        # 主要是由于该网站禁止爬虫导致的，可以在请求加上头信息，伪装成浏览器访问User-Agent,具体的信息可以通过火狐的FireBug插件查询
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0"
        }
        req = urllib.request.Request(url=urls, headers=headers)
        context = ssl._create_unverified_context()
        page = urllib.request.urlopen(req, context=context)
        html = page.read()
        doms = BeautifulSoup(html, "html.parser")
        return doms
        # 分析Dom 获取m3u8地址

    def start(url):
        doms = getDom(url)
        targetHtml = doms.findAll(name="script", attrs={"type": "text/javascript"})
        for itm in targetHtml:
            if str(itm).find("link_pre") > 0:
                playUrl = str(itm).split('"url":"')[1].split('","')[0]
                playUrl = playUrl.replace("\/", "/", 30)
                print(playUrl)
   ```
   输出结果

   ```js
    PS D:\blog\demo\download_video> python .\downloadMp4.py   
    get_page_url https://***.***.**/player/96861-1-1.html
    https://***.***.com/20210119/PrpWXRMn/index.m3u8
    get_page_url https://***.***.**/player/96861-1-2.html
    https://***.***.com/20210126/QWg4W8PL/index.m3u8
   ```
### **2、下载加密视频并进行解密播放**
   分析Network请求发现获取到的 并非真实地址：
   ![图片地址](http://blog.bravetimes.cn/api/public/uploads/2022/01/24/1643007892417999.png)

   **再次请求新的index.m3u8地址** 获取返回值：
   ![图片地址](http://blog.bravetimes.cn/api/public/uploads/2022/01/24/1643008692313810.png)
   发现新的index.m3u8地址为 **真实的视频播放地址** 同时发现视频已经使用了**AES-128方式进行加密** key文件地址直接也进行了返回

   **如何播放加密视频？**
   
   需要用到ffmpeg进行视频解密 合并

   **步骤1：**下载加密视频(.ts) 解密key文件(.key)

   ![图片地址](http://blog.bravetimes.cn/api/public/uploads/2022/01/24/1643010743022671.png)

   **步骤2：**修改并保存index.m3u8

   ![图片地址](https:/blog.bravetimes.cn/api/public/uploads/2022/01/24/1643010459194122.png)

   ![图片地址](http://blog.bravetimes.cn/api/public/uploads/2022/01/24/1643010673887424.png)
   
   **步骤3：**使用ffmpeg进行解密合并视频转出MP4文件
   ```js
   ffmpeg -allowed_extensions ALL -protocol_whitelist "file,http,tcp,https,tls,crypto,httpproxy" -i index.m3u8 -c copy -f mp4 index.mp4
   ```
   **完整代码**
   ```js
   import urllib.request, os, datetime, requests, time
    import ssl
    from bs4 import BeautifulSoup
    from requests.packages.urllib3.exceptions import InsecureRequestWarning

    requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

    # 网络可访问文件地址
    all_file_path = "http://***.****.cn/project/download/test/"
    # 获取页面内容
    def getDom(urls):
        print("get_page_url", urls)
        # 主要是由于该网站禁止爬虫导致的，可以在请求加上头信息，伪装成浏览器访问User-Agent,具体的信息可以通过火狐的FireBug插件查询
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0"
        }
        req = urllib.request.Request(url=urls, headers=headers)
        context = ssl._create_unverified_context()
        page = urllib.request.urlopen(req, context=context)
        html = page.read()
        doms = BeautifulSoup(html, "html.parser")
        return doms


    # 分析Dom 获取m3u8地址
    def start(url):
        doms = getDom(url)
        targetHtml = doms.findAll(name="script", attrs={"type": "text/javascript"})
        for itm in targetHtml:
            if str(itm).find("link_pre") > 0:
                playUrl = str(itm).split('"url":"')[1].split('","')[0]
                playUrl = playUrl.replace("\/", "/", 30)
                print(playUrl)
                get_m3u8_ts(playUrl, folderName(url))


    # 获取ts 文件列表 url 网址  folderName 保存的文件夹名称
    def get_m3u8_ts(url, folderName):
        tsList = []
        webURl = url.split(".com")[0] + ".com"
        page = urllib.request.urlopen(url)
        html = page.read().decode("utf-8").splitlines()
        # 获取真实的m3u8地址
        if len(html) < 5:
            for urls in html:
                if urls.endswith(".m3u8"):
                    get_m3u8_ts(webURl + urls, folderName)
            return
        print(url)
        for line in html:
            if line.endswith(".ts"):
                tsList.append(line.strip())
            if line.endswith('.key"'):
                line = line.split('="')[1].replace('"', "")
                tsList.append(line.strip())
        download(tsList, folderName, url)


    # 下载文件 ts_urls 文件列表  download_path文件夹名称
    def download(ts_urls, folder_name, realm3u8_url):
        tempUrlPath = ts_urls[0].replace("key.key", "")
        # 保存的文件路径
        folder_name = "./" + folder_name
        # 判断文件夹是否存在
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)

        # 遍历下载文件
        for i in range(len(ts_urls)):
            ts_url = ts_urls[i]
            print(str(i) + "- ts Number:" + str(len(ts_urls)) + "; dowload %s" % ts_url)
            # 开始时间
            start = datetime.datetime.now().replace(microsecond=0)
            temp_name = ts_url.split("/")
            file_name = temp_name[len(temp_name) - 1]
            # 文件完整路径
            file_path_and_name = folder_name + "/" + file_name
            print(file_path_and_name)
            # 判断文件是否存在
            if not os.path.exists(file_path_and_name):
                try:
                    response = requests.get(ts_url, stream=True, verify=False)
                except Exception as e:
                    print("异常请求:%s" % e.args)
                    return
                with open(file_path_and_name, "wb+") as file:
                    for chunk in response.iter_content(chunk_size=1024):
                        if chunk:
                            file.write(chunk)
            else:
                print("have-file:" + ts_url)
            end = datetime.datetime.now().replace(microsecond=0)
            print("spendTime:%s" % (end - start))
            print(time.asctime(time.localtime(time.time())))
        print("download-ok")
        saveM3u8(realm3u8_url, tempUrlPath, folder_name)
       


    # 获取文件夹名称
    def folderName(url):
        # https://www.123k.cc/player/23388-1-9.html     23388-1-9
        return url.split(".html")[0].split("player/")[1]


    # 替换 m3u8 文件 initUrl：文件地址  initWeb 需要替换的原始视频路径不含文件名  tempFolderName 保存的文件夹名称
    def saveM3u8(m3u8Url, oldFilePath, tempFolderName):
        page = urllib.request.urlopen(m3u8Url)
        html = page.read().decode("utf-8").splitlines()
        newFilePath = all_file_path + tempFolderName + "/"
        for line in html:
            if line.find(oldFilePath) != -1:
                line = line.replace(oldFilePath, newFilePath)
            if len(line) > 0:
                saveFile(line, "./" + tempFolderName + "/index.m3u8")
        new_m3u8_path = newFilePath + "index.m3u8"
        print("new index.m3u8 success!")
        print(new_m3u8_path)
        saveMp4(tempFolderName, new_m3u8_path)


    # 保存文件 追加  text 内容 FolderName文件名称
    def saveFile(text, fileName):
        with open(fileName, "a+", encoding="utf-8") as fw:
            fw.write(text + "\n")


    #  合并ts文件并生成MP4
    def saveMp4(dirName, m3u8Url):
        mp4Name = dirName
        shellStr = (
            " cd "
            + dirName
            + '/ && ffmpeg -allowed_extensions ALL -protocol_whitelist "file,http,tcp,https,tls,crypto,httpproxy" -i '
            + m3u8Url
            + " -c copy -f mp4 "
            + mp4Name
            + ".mp4"
        )
        os.system(shellStr)
        deltsStr=' cd '+dirName+'/ && find . -name "*.ts" |xargs rm -rfv'

        os.system(deltsStr)

        print("mp4:success!")
    # cd 96861-1-15 && find . -name "*.ts" |xargs rm -rfv

    def go_start(temp_list):
        for itmmms in temp_list:
            start(itmmms)


    list = [
        "https://www.123k.cc/player/96861-1-1.html",
    ]
    go_start(list)


   ```




## 工具版本说明
 - python 3.8.4
 - BeautifulSoup 4.3.2
 - ffmpeg 4.1

 ## 说明
 文章仅作为技术分享
