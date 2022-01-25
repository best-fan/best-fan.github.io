var isAskDoingList = []; //接口正在请求的数组
// 获取 接口返回数据   "get-one-data" 一个接口
function getPyData(defultUrl = "get-one-data", defultStr='') {
    if (isAskDoingList.indexOf(defultUrl) != -1) {
        return;
    }
    isAskDoingList.push(defultUrl);
    console.log('正在请求的列表', isAskDoingList)
    axios.get("https://api.bravetimes.cn/tool-api/" + defultUrl)
        .then((res) => {
            const resData = res.data.resData;
            if (resData.list) {
                const oneList = resData.list;
                switch(defultStr){
                    case 'setHotWordPage':
                        sethotWordPage(defultUrl, oneList, res.data.successTime)
                        break;
                    case 'setM3U8Page':
                        console.log(resData)
                        setM3U8Page(resData)
                        break;
                    default:
                        break;
                    // 'setHotWordPage'
                }
                if (defultStr) {

                    return;
                }
                setDomText(oneList, defultUrl);
            }
        });
}
// 设置每日头条文字
function sethotWordPage(url, data, time) {
    switch (url) {
        case 'get-weibo-hot':
            const weiboData = JSON.parse(data)
            document.getElementsByClassName('hot-word-weibo-list')[0].innerHTML = '';
            const { hotgov, realtime } = weiboData.data
                // console.log(hotgov, realtime)
            realtime.forEach(element => {
                if (!element.is_ad) {
                    appendDom('hot-word-weibo-list', element)

                }
            });
            if (hotgov.is_gov) {
                appendDom('hot-word-weibo-list', hotgov)
            }
            appendUpdateTimeDom('hot-word-weibo-list', time, url)
            break;
        case 'get-baidu-hot':
            // console.log('data', data)
            const list = data;
            document.getElementsByClassName('hot-word-baidu-list')[0].innerHTML = '';
            list.forEach(itm => {
                appendDom('hot-word-baidu-list', { rank: Number(itm.id) - 1, url: itm.href, customPop: itm.content, word: itm.title, num: itm.search_num, icon_desc: itm.type })
            })
            appendUpdateTimeDom('hot-word-baidu-list', time, url)
            break;
        case 'get-toutiao-hot':
            const toutiaoData = JSON.parse(data)
            document.getElementsByClassName('hot-word-toutiao-list')[0].innerHTML = '';
            console.log('data', toutiaoData)
            toutiaoData.data.forEach((itm, idx) => {
                itm.Label=='amos'?itm.Label='':'';
                appendDom('hot-word-toutiao-list', { rank: idx, url: itm.Url, customPop: itm.QueryWord.replace(/"/g, "'"), word: itm.Title, num: itm.HotValue, icon_desc: itm.Label })
            })
            appendUpdateTimeDom('hot-word-toutiao-list', time, url)
            break;
    }



}
// 每日头条 追加更新时间
function appendUpdateTimeDom(clasName, times, askUrl) {
    doms = `<div  class='hot-word-updatetime'>更新时间：${times}<div>`
    document.getElementsByClassName(clasName)[0].append(parseDom(doms)[0])
    setAskSuccess(askUrl)
}
// 每日头条 追加文本
function appendDom(clasName, dataObj) {
    // 序号
    const idx = dataObj.is_gov ? 'Top' : dataObj.rank != -1 ? Number(dataObj.rank) + 1 : 'null';
    // 跳转地址
    const url = dataObj.url ? dataObj.url : `https://s.weibo.com/weibo?q=%23${dataObj.word}%23&Refer=top`;
    // 悬停文字
    const popContent = dataObj.category ? `类型:${dataObj.category}` : dataObj.is_gov ? '官方置顶' : dataObj.customPop ? dataObj.customPop : '未知';
    // 标题
    const word = dataObj.word;
    // 热搜指数
    const wordNum = dataObj.num ? dataObj.num : '';
    // 类型
    let typeText = dataObj.icon_desc ? dataObj.icon_desc : '';
    // 类型颜色
    let typeTextColor = dataObj.icon_desc_color ? dataObj.icon_desc_color : '';
    if (clasName == 'hot-word-toutiao-list' || clasName == 'hot-word-baidu-list') {
        typeText = typeText == 'hot' ? '热' : typeText == 'new' ? "新" : typeText == 'boom' ? "爆" : typeText;
        typeTextColor = typeText == '热' ? '#ff9406' : typeText == '新' ? '#ff3852' :  typeText == '爆' ? '#bd0000' : '';
    }
    doms = `<div  class='hot-word-item'>
                <div class='hot-word-item-content'>
                    <span class='hot-word-item-content-id'>${idx}</span>
                    <a target="_blank" href='${url}' title="${popContent}" class='hot-word-item-content-title'>${word}</a>
                    <span class='hot-word-item-content-number'>${wordNum}</span>
                </div>
                <div class='hot-word-item-status'>
                    <span style="color:${typeTextColor}">${typeText}<span>
                </div>
            </div> 
           `


    document.getElementsByClassName(clasName)[0].append(parseDom(doms)[0])
}
// str转dom
function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.childNodes;

}
// 设置首页 每日一句 dom文字
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
    setTimeout(() => {
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
    }, 2000);

    setAskSuccess(askUrl)
}
//设置接口请求状态
function setAskSuccess(isAskUrl) {
    setTimeout(() => {
        isAskDoingList.splice(isAskDoingList.indexOf(isAskUrl), 1)

        console.log("请求成功", isAskDoingList);
    }, 3000);
}
//获取页面路由
function getWebRouter(noPrams = true) {
    weburl = window.location.href
    if (noPrams) {
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
    // 判断 当前页面是否为每日头条
    if (currentUrl.endsWith('/hotWord')) {
        getPyData("get-weibo-hot", 'setHotWordPage');
        getPyData("get-baidu-hot", 'setHotWordPage');
        getPyData("get-toutiao-hot", 'setHotWordPage');
        setTimeout(() => {
            hotWordAddLister()
        }, 3000);
    }
     //判断 当前页面是否为m3u8 get ts
     if (currentUrl.endsWith("/m3u8-get-ts")) {
        // getPyData("get-zh-data");
        setM3U8PageLinster()
        console.log('m3u8 get ts')
    }
}
//每日头条 监听事件
function hotWordAddLister() {

    document.getElementsByClassName('hot-word-weibo-dom')[0].children[0].addEventListener('click', function() {
        if (isAskDoingList.indexOf('get-weibo-hot') == -1) {
            document.getElementsByClassName('hot-word-weibo-list')[0].innerHTML = 'Loading'
            setTimeout(() => {
                getPyData("get-weibo-hot", 'setHotWordPage');

            }, 800);
        }
    })
    document.getElementsByClassName('hot-word-baidu-dom')[0].children[0].addEventListener('click', function() {
        if (isAskDoingList.indexOf('get-baidu-hot') == -1) {
            document.getElementsByClassName('hot-word-baidu-list')[0].innerHTML = 'Loading'
            setTimeout(() => {
                getPyData("get-baidu-hot", 'setHotWordPage');

            }, 800);
        }
    })
    document.getElementsByClassName('hot-word-toutiao-dom')[0].children[0].addEventListener('click', function() {
        if (isAskDoingList.indexOf('get-toutiao-hot') == -1) {
            document.getElementsByClassName('hot-word-toutiao-list')[0].innerHTML = 'Loading'
            setTimeout(() => {
                getPyData("get-toutiao-hot", 'setHotWordPage');

            }, 800);
        }
    })
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
    return `距离 ${str.split("/")[0]
        }年 ${name}: ${d} 天 ${h} 小时 ${m} 分钟 ${s} 秒`;
}
//补零
function PrefixZero(num, n) {
    if(num.toString().length>=n){
        return num;
    }
    return (Array(n).join(0) + num).slice(-n);
}
// 监听  m3u8 获取 TS 文件 页面
function setM3U8PageLinster(){
    console.log( document.getElementsByClassName('get-m3u8-ts-btn')[0]);
    
    document.getElementsByClassName('get-m3u8-ts-btn')[0].addEventListener('click', function() {
        
        let values=document.getElementsByClassName('get-m3u8-ts-input')[0].value;
        if(values.endsWith('.m3u8')){
            getPyData('get-ts-url?urls='+values,'setM3U8Page')
        }else{
            document.getElementsByClassName('get-m3u8-islock')[0].innerHTML='';
            document.getElementsByClassName('get-m3u8-ts-list')[0].innerHTML='';
            alert('m3u8地址有误')
        }
        console.log('aaaaaaaa',values);
        
    })
}
// 设置  m3u8 获取 TS 文件 页面
function setM3U8Page(data){
    let {list,isEncryption }=data;
    if(list.length>0){
        document.getElementsByClassName('get-m3u8-islock')[0].innerHTML=`视频是否加密：${isEncryption?'是':'否'} 共计：${list.length}`
        let itmStr=''
        list.forEach(item=>{
            itmStr+='<div class="item">'+item+'</div>'
        })
        document.getElementsByClassName('get-m3u8-ts-list')[0].innerHTML=itmStr
    
    }
}