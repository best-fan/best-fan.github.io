# web 端 输入框脱敏方案实现

## 需求

需要在 input 输入框中 对指定类型的内容进行加密操作,显示规则如下：

- 姓名(显示最后 1-2 个汉字)
- 身份证号、社保卡号(显示最后 4 位)
- 手机号(显示前 3 后 4)
- 证件有效期、失效日期(显示最后 4 位)
- 邮箱(显示@之后)


其他输入内容用*号标识
## 分析
用户在输入内容时，需要实时的监听用户的输入(监听<kbd >input</kbd>事件)，同时，对指定类型的内容进行加密，由于可以对加密的字段进行显示、隐藏的切换，所以，需要保存用户输入的未加密内容。 为了加密过程更加流程 对用户输入完的监听增加 节流函数。
- bug修复：对用中文输入会直接触发input方法，导致用户输入的中文无法存储。所以中文输入时需要监听 <kbd>compositionstart</kbd >、<kbd >compositionend</kbd >事件，在<kbd >compositionend</kbd > 时触发 <kbd >input</kbd >方法对数据进行处理。

## 实现过程
- 1、监听用户输入框input事件
- 2、完成输入内容存储
- 3、加密脱敏方法实现
- 4、完成显示、隐藏的数据切换
- 5、bux修复：输入中文监听实现

## 核心代码
```js
  /**
   * 对输入的内容 按照规则进行加密
   * @param {*} val 原始值
   * @param {*} startNum 头部需要显示的字符串位数
   * @param {*} endNum 尾部需要显示的字符串位数
   * @returns
   */
  function handleShowVal(val, startNum, endNum) {
    let valLenth = val.length;
    const hideLength = startNum + endNum;
    if (valLenth - hideLength >= 0) {
      return (
        val.substr(0, startNum) +
        new Array(valLenth - hideLength + 1).join("*") +
        val.substr(valLenth - endNum, valLenth)
      );
    } else {
      return val;
    }
  }

  /**
   * 保存用户输入的值 获取缓存值
   * 对于加密的内容先获取本地缓存 处理后再保存 ，未加密则直接保存
   * @param {*} key 存储的唯一标识
   * @param {*} value 存储的值
   * @param {*} isSave 是否保存
   * @returns
   */
  function sessionValue(key, value, isSave) {
    if (isSave) {
      let saveVal = value;
      if (value.includes("*")) {//输入框中是否含有加密字段
        let tList = value.split(""); //将当前输入内容分割为数组
        let sList = sessionStorage.getItem("tp_" + key).split(""); //session中对应的数据
        tList.map((val, index) => {
          if (val == "*") {
            tList[index] = sList[index];//将输入框中的加密字符串替换为 未加密数据
          }
        });
        saveVal = tList.toString().replace(/,/g, "");
      }
      sessionStorage.setItem("tp_" + key, saveVal);

      return saveVal;
    }

    return sessionStorage.getItem("tp_" + key) || "";
  }
```

## 完整源码

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>脱敏处理-demo</title>
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/font_2840161_3uv0wfsdx8d.css"
    />
    <script
      crossorigin="anonymous"
      integrity="sha512-n/4gHW3atM3QqRcbCn6ewmpxcLAHGaDjpEBu4xZd47N0W2oQ+6q7oc3PXstrJYXcbNU1OHdQ1T7pAP+gi5Yu8g=="
      src="https://lib.baomitu.com/jquery/3.6.0/jquery.js"
    ></script>
  </head>

  <body>
    <h3>脱敏处理-demo</h3>
    <form>
      <div class="show-line">
        <span>姓名：</span>
        <input
          class="from-input"
          value=""
          maxlength="10"
          tp_type="0"
          ,tp_key="userName"
        /><i class="iconfont icon-biyanjing"></i>
      </div>
      <div class="show-line">
        <span> 身份证号:</span>
        <input
          class="from-input"
          maxlength="20"
          tp_type="1"
          tp_key="idCard"
        /><i class="iconfont icon-biyanjing"></i>
      </div>
      <div class="show-line">
        <span>手机号：</span>
        <input
          class="from-input"
          value=""
          maxlength="11"
          tp_type="2"
          tp_key="mobile"
        /><i class="iconfont icon-biyanjing"></i>
      </div>
      <div class="show-line">
        <span>有效期：</span>
        <input
          class="from-input"
          maxlength="8"
          value=""
          tp_type="3"
          tp_key="time"
        /><i class="iconfont icon-biyanjing"></i>
      </div>
      <div class="show-line">
        <span> 邮箱：</span>
        <input class="from-input" maxlength="50" tp_type="4" tp_key="email" /><i
          class="iconfont icon-biyanjing"
        ></i>
      </div>
    </form>
  </body>
  <style>
    .from-input {
      width: 210px;
      height: 40px;
      padding: 5px;
      font-size: 20px;
      box-sizing: border-box;
    }

    .show-line {
      display: flex;
      align-items: center;
      margin: 10px;
    }

    .show-line span {
      display: block;
      width: 80px;
    }

    .iconfont {
      font-size: 24px;
      margin-left: 4px;
      cursor: pointer;
    }
  </style>
</html>
```

```js
/**
 * 设置显示方式
 * @param {*} type 显示类型
 * 0、姓名(显示最后1-2个汉字)
 * 1、身份证号、社保卡号(显示最后4位)
 * 2、手机号(显示前3 后4)
 * 3、证件有效期、失效日期(显示最后4位)
 * 4、邮箱(显示@之后)
 * @param {*} value 设置的value
 */
function setShowValue(type, value) {
  switch (Number(type)) {
    case 0:
      return handleShowVal(value, 0, value.length <= 3 ? 1 : 2);
    case 1:
    case 3:
      return handleShowVal(value, 0, 4);
    case 2:
      return handleShowVal(value, 3, 4);
    case 4:
      return handleShowVal(value, 0, value.length - value.indexOf("@"));
    default:
      return value;
  }
}
/**
 * 处理显示Value
 * @param {*} val 原始值
 * @param {*} startNum 头部需要显示的字符串位数
 * @param {*} endNum 尾部需要显示的字符串位数
 * @returns
 */
function handleShowVal(val, startNum, endNum) {
  let valLenth = val.length;
  const hideLength = startNum + endNum;
  if (valLenth - hideLength >= 0) {
    return (
      val.substr(0, startNum) +
      new Array(valLenth - hideLength + 1).join("*") +
      val.substr(valLenth - endNum, valLenth)
    );
  } else {
    return val;
  }
}

/**
 * 输入框输入回调
 * @param {*} dom 输入框dom
 * @param {*} type 类型值 同设置显示方式方法
 * @param {*} key 临时存储的key值
 * @returns
 */

/**
 * 设置输入 图标class
 * @param {*} dom  图标class
 * @param {*} isHide 是否隐藏
 */
function changeShowClass(dom, isHide) {
  if (isHide) {
    $(dom).attr("class", "iconfont icon-biyanjing");
  } else {
    $(dom).attr("class", "iconfont icon-xianshi");
  }
}
/**
 * 保存用户输入的值 获取缓存值
 * @param {*} key 唯一标识
 * @param {*} value 存储的值
 * @param {*} isSave 是否保存
 * @returns
 */
function sessionValue(key, value, isSave) {
  if (isSave) {
    let saveVal = value;
    if (value.includes("*")) {
      let tList = value.split(""); //当前输入框的内容
      let sList = sessionStorage.getItem("tp_" + key).split(""); //session中的内容
      tList.map((val, index) => {
        if (val == "*") {
          tList[index] = sList[index];
        }
      });
      saveVal = tList.toString().replace(/,/g, "");
    }
    sessionStorage.setItem("tp_" + key, saveVal);

    return saveVal;
  }

  return sessionStorage.getItem("tp_" + key) || "";
}

//监听 显示隐藏
$(".iconfont").on("click", function () {
  const inputDom = $(this).prev(); //获取输入框dom
  const key = $(this).prev().attr("tp_key");
  const type = $(this).prev().attr("tp_type");
  if ($(this).hasClass("icon-biyanjing")) {
    //是否为隐藏状态
    changeShowClass(this);
    $(inputDom).val(sessionValue(key, "", false));
  } else {
    changeShowClass(this, true);
    $(inputDom).val(
      setShowValue(type, sessionValue(key, inputDom.val(), true))
    );
  }
});
var isComposition = false;
//监听输入框 中文输入开始
$(".from-input").on("compositionstart", function () {
  isComposition = true;
});
//监听输入框 中文输入接口
$(".from-input").on("compositionend", function () {
  isComposition = false;
  $(this).trigger("input");
});
var timer;
//监听输入框 输入事件
$(".from-input").on("input", function () {
  clearInterval(timer);
  if ($(this).val() == 0 || isComposition) {
    return;
  }
  const key = $(this).attr("tp_key");
  const type = $(this).attr("tp_type");
  if ($(this).next().hasClass("icon-biyanjing")) {
    let num = 400;
    if ($(this).val().length < sessionValue(key).length) {
      num = 200;
    }
    timer = setTimeout(() => {
      //0.8s延迟处理文本框
      $(this).val(setShowValue(type, sessionValue(key, $(this).val(), true)));
    }, num);
  } else {
    sessionValue(key, $(this).val(), true);
  }
});
```
## 效果
![图一](https://blog.bravetimes.cn/api/public/uploads/2021/10/08/1633659465274180.png)
![图二](https://blog.bravetimes.cn/api/public/uploads/2021/10/08/163365960538941.png)
