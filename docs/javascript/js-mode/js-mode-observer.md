# JavasSript 设计模式——观察者模式

## 观察者模式

观察者模式(Observer Pattern)：定义了一种 **一对多的依赖关系**，让**多个观察者对象 同时 监听某一个主题的对象**，当这个主题对象的状态发生改变时就会通知多个观察者对象，使它们能够自动更新自己。
![观察者模式](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/12/16ef7fe567bdf007~tplv-t2oaga2asx-watermark.awebp)

### 适用场景：

当一个对象的改变需要同时改变其他对象，并且它不知道具体有多少对象需要改变的时候，就可以考虑使用观察者模式。

#### 举例

- 当你使用 QQ 发送群消息时，如果有人将你设为特别关注，那么当你发送消息后，QQ 会通知所有关注你的人。他们会选择进行回复和查看。
- DOM 监听事件

  ```js
  document.body.addEventListener("click", function () {
    console.log("hello world!");
  });
  document.body.click();
  ```

### 代码示例

```js
//状态变化之后触发所有观察者对象
class Subject {
  constructor() {
    //构造方法
    (this.state = "正常"), (this.observers = []);
  }
  getState() {
    //获取状态值
    return this.state;
  }
  setState(state) {
    //设置状态值
    this.state = state;
    // 目标发布消息调用观察者的更新方法
    this.notifyAllObservers();
  }
  notifyAllObservers() {
    //通知所有观察者
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
  attach(observer) {
    //添加观察者
    this.observers.push(observer);
  }
}
//观察者
class Observer {
  constructor({ name, workYear }, subject) {
    //构造方法
    this.name = name;
    this.workYear = workYear;
    this.subject = subject;
    this.subject.attach(this);
  }
  update() {
    //更新提示
    console.log(
      `name:${this.name},workYear:${
        this.workYear
      },job State:${this.subject.getState()}`
    );
  }
}
const webjob = new Subject();
console.log(webjob.getState());
//添加观察者
let person1 = new Observer({ name: "张三", workYear: 3 }, webjob);
//添加观察者
let person2 = new Observer({ name: "李四", workYear: 1 }, webjob);
webjob.setState("急缺");
//正常
// observer Observer
// name:张三,workYear:3,job State:急缺
// observer Observer
// name:李四,workYear:1,job State:急缺
```

### 优点

- 支持简单的广播通信，自动通知所有已经订阅过的对象
- 目标对象与观察者之间的抽象耦合关系能单独扩展以及重用
- 增加了灵活性
- 观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。

### 缺点

- 过度使用会导致对象与对象之间的联系弱化，会导致程序难以跟踪维护和理解
- 如果一个观察目标对象有很多直接和间接观察者，将所有的观察者都通知到会花费很多时间
- 如果在观察者和观察目标之间存在循环依赖，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。
- 观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

## 发布-订阅模式

发布订阅模式：定义了对象间一种**多对多的依赖关系，在发布者与订阅者之间需要有一个中介者，发布者发布事件名和参数到中间者，中间者向事件集中的订阅者发送参数**。通常包含三个模块：发布者、订阅者、处理中心

> 在发布订阅模式中,消息不会直接发送给特定的接收者，而是通过事件处理中心进行转发

![发布订阅模式](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/12/16ef7fe5614d6ea0~tplv-t2oaga2asx-watermark.awebp)

### 适用场景：

当存在多个发布者 和订阅者，而且 订阅者、发布者各自有较为复杂的逻辑处理，可以考虑使用发布订阅模式。

#### 举例

- vue 自定义事件
  $on() 进行自定义事件的监听(订阅者角色)；$emit()进行自定义事件的发布(发布者角色);new Vue()相当于事件的处理中心
- 通过中介买房子，买家、卖家直接的沟通 通过中介进行支撑。

### 代码示例

```js
/**
 * 发布订阅模式
 * 以 中介、购房者为示例
 */
//事件中心
class Event {
  constructor() {
    this.lister = [];
    this.cache = []; //处理先订阅后发布问题;
  }
  /**
   * 添加订阅者
   * @param {*} listenner  订阅者实例
   * @param {*} obj{ key ,value} 订阅类型 money:总价 size:面积大小 type:房间类型
   */
  add(listenner, obj) {
    if (!obj) return;
    if (!this.lister[Object.keys(obj)[0]]) {
      this.lister[Object.keys(obj)[0]] = [];
    }
    this.lister[Object.keys(obj)[0]].push(
      Object.assign(listenner, {
        values: Object.values(obj)[0],
      })
    );
    // console.log('添加了订阅者',this.lister);
    listenner.myNeed([Object.keys(obj)[0], Object.values(obj)[0]]); //调用订阅者方法消息展示
    if (this.cache.length != 0) {
      this.cache.forEach((publiser) => {
        if (publiser[Object.keys(obj)[0]] == Object.values(obj)[0]) {
          listenner.showHoserData(publiser, [
            Object.keys(obj)[0],
            Object.values(obj)[0],
          ]);
        }
      });
    }
  }
  /**
   * 监听回调
   * @param {*} publiserData  发布者实例
   */
  tiggle(publiserData) {
    // console.log('发布者',publiserData);
    // console.log('订阅者',this.listerList);
    console.log("发布消息了！！", publiserData);

    Object.keys(this.lister).forEach((key) => {
      this.lister[key].forEach((listener) => {
        if (listener.values == publiserData[key]) {
          listener.showHoserData(publiserData, [key, publiserData[key]]);
        }
      });
    });
    this.cache.push(publiserData);
  }
  /**
   * 移除订阅者
   * @param {*} fn 订阅者
   * @param {*} obj 订阅类型
   */
  remove(fn, obj) {
    //取消监听
    if (this.lister[Object.keys(obj)[0]]) {
      let index = this.lister[Object.keys(obj)[0]].findIndex(
        (listenner) => listenner === fn
      );
      this.lister[Object.keys(obj)[0]].splice(index, 1);
      console.log("订阅者已移除", fn);
    }
  }
}
//发布者
class Publisher {
  constructor() {
    this.company = "";
    this.houserName = "";
    this.houseType = "";
    this.money = "";
    this.size = "";
  }
  /**
   * 初始化 发布者数据
   * @param {*} company 公司
   * @param {*} name 楼盘名称
   * @param {*} type 房子类型
   * @param {*} money 房子总价
   * @param {*} size 房子大小
   */
  init(company, name, type, money, size) {
    this.company = company || "未发布";
    this.houserName = name || "未发布";
    this.houseType = type || "未发布";
    this.money = money || "未发布";
    this.size = size || "未发布";
  }
  /**
   * 发布者基本信息
   */
  showMsg() {
    console.log(
      `目前已有(发布者)：公司:${this.company},小区名称:${this.houserName},房子类型：${this.houseType},价格：${this.money},大小:${this.size}㎡`
    );
  }
}
//订阅者
class Subscriber {
  constructor() {
    this.name = "";
    this.size = "";
    this.needHosuserType = "";
    this.readyMoney = "";
    this.other = "";
  }
  /**
   * 初始化数据
   * @param {*} name 姓名
   * @param {*} type 需要房子类型
   * @param {*} money 预算
   * @param {*} other 其他
   */
  init(name, type, money, size, other) {
    this.name = name || "未知";
    this.needHosuserType = type || "不限";
    this.readyMoney = money || "不限";
    this.size = size || "不限";
    this.other = other || "无";
  }
  /**
   * 订阅者基本信息
   */
  myNeed(need) {
    console.log(
      `客户(订阅者):要求:${need[0]}:${need[1]}, 姓名：${this.name},类型：${this.needHosuserType},总价：${this.readyMoney},其他：${this.other}`
    );
  }
  /**
   * 订阅者消息回调
   * @param {*} publisherData 发布者实例
   * @param {*} need 订阅者需求
   */
  showHoserData(publisherData, need) {
    console.log(
      `接收姓名：${this.name},要求:${need[0]}:${need[1]}, 房产信息：公司:${publisherData.company},户型：${publisherData.houseType},小区名称:${publisherData.houserName},价格：${publisherData.money},大小:${publisherData.size}㎡`
    );
  }
}

//初始化事件中心
const events = new Event();
//初始化订阅者
const customer1 = new Subscriber();
customer1.init("张三");
const customer2 = new Subscriber();
customer2.init("李四");
const customer3 = new Subscriber();
customer3.init("王五");
// 订阅类型 和发布者字段名称一致
events.add(customer1, {
  houseType: "三室一厅",
});
events.add(customer2, {
  size: 100,
});
events.add(customer3, {
  money: "50w",
});
//客户(订阅者):要求:houseType:三室一厅, 姓名：张三,类型：不限,总价：不限,其他：无
//客户(订阅者):要求:size:100, 姓名：李四,类型：不限,总价：不限,其他：无
//客户(订阅者):要求:money:50w, 姓名：王五,类型：不限,总价：不限,其他：无
//初始化发布者
const pus1 = new Publisher();
pus1.init("中介1", "万科誉", "三室一厅", "180w", 100);
events.tiggle(pus1);

//发布消息了！！ Publisher {company: '中介1', houserName: '万科誉', houseType: '三室一厅', money: '180w', size: 100}
//接收姓名：张三,要求:houseType:三室一厅, 房产信息：公司:中介1,户型：三室一厅,小区名称:万科誉,价格：180w,大小:100㎡
//接收姓名：李四,要求:size:100, 房产信息：公司:中介1,户型：三室一厅,小区名称:万科誉,价格：180w,大小:100㎡
const pus2 = new Publisher();
pus2.init("中介2", "美丽桃园", "二室一厅", "50w", 100);
events.tiggle(pus2);
//发布消息了！！ Publisher {company: '中介2', houserName: '美丽桃园', houseType: '二室一厅', money: '50w', size: 100}
//接收姓名：李四,要求:size:100, 房产信息：公司:中介2,户型：二室一厅,小区名称:美丽桃园,价格：50w,大小:100㎡
//接收姓名：王五,要求:money:50w, 房产信息：公司:中介2,户型：二室一厅,小区名称:美丽桃园,价格：50w,大小:100㎡
//移除监听事件
events.remove(customer2, {
  size: 100,
});
// 订阅者已移除 Subscriber {name: '李四', size: '不限', needHosuserType: '不限', readyMoney: '不限', other: '无', …}

const pus3 = new Publisher();
pus3.init("中介3", "龙湖湾", "三室一厅", "50w", 100);
events.tiggle(pus3);
// 发布消息了！！ Publisher {company: '中介3', houserName: '龙湖湾', houseType: '三室一厅', money: '50w', size: 100}
// 接收姓名：张三,要求:houseType:三室一厅, 房产信息：公司:中介3,户型：三室一厅,小区名称:龙湖湾,价格：50w,大小:100㎡
// 接收姓名：王五,要求:money:50w, 房产信息：公司:中介3,户型：三室一厅,小区名称:龙湖湾,价格：50w,大小:100㎡
//后续添加观察者
const customer4 = new Subscriber();
customer4.init("李萍姐");
events.add(customer4, {
  houseType: "三室一厅",
});
//客户(订阅者):要求:houseType:三室一厅, 姓名：李萍姐,类型：不限,总价：不限,其他：无
//接收姓名：李萍姐,要求:houseType:三室一厅, 房产信息：公司:中介1,户型：三室一厅,小区名称:万科誉,价格：180w,大小:100㎡
//接收姓名：李萍姐,要求:houseType:三室一厅, 房产信息：公司:中介3,户型：三室一厅,小区名称:龙湖湾,价格：50w,大小:100㎡
```

> 真正的区别在于：发布订阅模式实现的是一种多对多的关系，在发布者与订阅者之间需要有一个中介者，发布者发布事件名和参数到中间者，中间者向事件集中的订阅者发送参数。 而观察者是一种一对多的关系，所有的在同一被观察者身上绑定的观察者只能接受同一个被观察者的消息。 例如： 订阅/发布 let fun = function(){} mediator.on('a',fun) mediator.on('b',fun) mediator.emit('a',data) mediator.emit('b',data) 任何身份都可订阅与发布

### 优点

- 1、对象间解耦，各自处理各自的逻辑
- 2、异步编程中，可以更松耦合的实现代码的编写

### 缺点

- 1、创建订阅者 需要消耗一定的时间和内存
- 2、可以弱化对象间联系，多个发布者订阅者嵌套一起时，程序难以跟踪维护。

## 总结

观察者模式 和 发布订阅模式真的一样吗？

### 两者区别

![对比图](https://image-static.segmentfault.com/253/197/2531975968-5ce2639a3341d_fix732)

**观察者模式**：观察者（Observer）直接订阅（Subscribe）主题（Subject），当主题被激活时，**直接触发（Fire Event）观察者的事件。**

**发布订阅模式**：订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel）。当发布者（Publisher）发布该事件（Publish Event）到调度中心时，由**调度中心统一调度（Fire Event）**订阅者注册到事件中的逻辑代码。

**各自特点**：

- 观察者模式中，观察者是知道 Subject 的，Subject 一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
- 发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
- 观察者模式大多数时候是同步的，比如当事件触发，Subject 就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
- 观察者模式需要在单个应用程序地址空间中实现，而发布-订阅更像交叉应用模式。


## 参考文章：
- [JavaScript 发布-订阅模式](https://segmentfault.com/a/1190000019260857)
- [Observer vs Pub-Sub pattern](https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c)

- [观察者模式与发布订阅模式的异同](https://juejin.cn/post/6844903603107266567#heading-0)


<p align="right">Article Last Update Time：{docsify-updated}</p>