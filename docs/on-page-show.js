    var isSetting = false;
    // 获取 接口返回数据   "get-one-data" 一个接口
    function getPyData(defultUrl = "get-one-data") {
        if (isSetting) {
            return;
        }
        isSetting = true;
        axios.get("https://api.bravetimes.cn/tool-api/" + defultUrl)
            .then((res) => {
                const resData = res.data.resData;
                if (resData.list) {
                    const oneList = resData.list;
                    setDomText(oneList, defultUrl);
                }
            });
    }

    function setDomText(dataList, askUrl) {
        const index = Math.floor(Math.random() * dataList.length);
        const doms = document.getElementsByClassName("markdown-section")[0];
        let pDoms = document.createElement("p");
        let nomerTime = 2000;
        switch (askUrl) {
            // 一个 数据 设置dom
            case "get-one-data":
                pDoms.textContent = `${dataList[index].id}: ${dataList[index].text}----${dataList[index].time}`;
                pDoms.className = "one-tips";
                pDoms.title = "💥这是用Python实时获取的一条文字🥚！💥";
                break;
            // 知乎 数据  设置dom 
            case "get-zh-data":
                pDoms = document.getElementsByClassName("zh-data")[0];
                let text = dataList[index].text.replaceAll(/;|；|,|，|。|\./g, "<br>").replaceAll(/-|——/g, "<br> source:");
                pDoms.innerHTML = text;
                pDoms.title = "💥换一个💥";
                nomerTime = 1000;
                break;
        }
        pDoms.setAttribute("style", "color:#d68080;cursor: pointer;");
        doms.append(pDoms);
        //添加 点击 箭头事件
        pDoms.addEventListener("click", function(e) {
            if (askUrl == "get-zh-data") {
                pDoms.innerHTML = "";
            } else {
                pDoms.remove();
            }

            setTimeout(() => {
                getPyData(askUrl);
            }, nomerTime);
        });
        setTimeout(() => {
            isSetting = false;
            console.log("设置成功");
        }, 3000);
    }
    //获取页面路由
    function getWebRouter(noPrams=true) {
        weburl= window.location.href
        if(noPrams){
            if (weburl.indexOf("?")) {
                weburl = weburl.split("?")[0];
            }
        }
        return weburl;
    }
    // 添加 onload  监听事件
    if ("onload" in window) {
        window.onload = onWebUrlChange;
    }
    // 添加 路由跳转 监听事件
    if (
        "onhashchange" in window &&
        (typeof document.documentMode === "undefined" ||
            document.documentMode == 8)
    ) {
        // 浏览器支持onhashchange事件
        window.onhashchange = onWebUrlChange; // TODO，对应新的hash执行的操作函数
    } else {
        console.log("不支持");
    }

    function onWebUrlChange() {
        let currentUrl = getWebRouter();
       
        //判断 当前页面是否为首页
        if (currentUrl.endsWith("/")) {
            //首页设置一言
            getPyData();
            // console.log('设置首页')
        }
        //判断 当前页面是否为每日一句
        if (currentUrl.endsWith("/daily")) {
            getPyData("get-zh-data");
            addNewYearDom();
            // console.log('设置知乎')
        }
    }
    // 设置 元旦倒计时
    var timmer = "";
    function addNewYearDom() {
        const nextYear = new Date().getFullYear() + 1;
        clearInterval(timmer);
        timmer = setInterval(() => {
            let doms = document.getElementsByClassName("end-new-year")[0];
            if (doms) {
                doms.innerHTML = restTime(`${nextYear}/01/01 00:00:00`, "元旦");
            }
        }, 1000);
    }
    //格式化时间
    function restTime(str, name) {
        const EndTime = new Date(str);
        const NowTime = new Date();
        const t = EndTime.getTime() - NowTime.getTime();
        const d = PrefixZero(Math.floor(t / 1000 / 60 / 60 / 24), 2);
        const h = PrefixZero(Math.floor((t / 1000 / 60 / 60) % 24), 2);
        const m = PrefixZero(Math.floor((t / 1000 / 60) % 60), 2);
        const s = PrefixZero(Math.floor((t / 1000) % 60), 2);
        return `距离 ${
        str.split("/")[0]
      }年 ${name}: ${d} 天 ${h} 小时 ${m} 分钟 ${s} 秒`;
    }
    //补零
    function PrefixZero(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }