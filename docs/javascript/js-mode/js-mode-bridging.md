# JavasSript 设计模式——桥接 模式

## 桥接 模式

定义：将抽象部分与实现部分分离，使他们都可以进行独立地变化。
![桥接模式](http://blog.bravetimes.cn/api/public/uploads/2021/12/20/1639967503215825.png)

### 适用场景：
- 1.一个类存在两个独立变化的维度，切两个维度都需要扩展
- 2.对应我们不希望使用继承或多层继承导致系统类的个数急剧增加的系统

#### 举例
- 手机、手机卡之间
- 视频播放(保利威、CC播放器)、弹题(默认弹题、随机弹题)


### 代码示例
```js
//桥接模式
//手机类
class Mobile {
    constructor(name, model) {
        switch (name) {
            case 'iphone':
                return new IPhoneMobile(model, name)
            case 'xiaomi':
                return new MiMobile(model, name)
        }
    }
}
//小米手机
class MiMobile {
    constructor(model, name) {
        this.model = model;
        this.mobileName = name + model;
    }
    sayHello() {
        this.hello()
        console.log(`welcome use Mi${this.model} ￥${this.showPrice()}`);

    }
    showPrice() {
        switch (this.model) {
            case '10X':
                return 1999;
            default:
                return '未发布'

        }
    }
    hello() {
        console.log('我是雷布斯！小米手机无敌 ');
    }
}
//IPhone
class IPhoneMobile {
    constructor(model, name) {
        this.model = model;
        this.mobileName = name + model;

    }
    sayHello() {
        this.hello()
        console.log(`welcome use IPhone${this.model} ￥${this.showPrice()}`);

    }
    showPrice() {
        switch (this.model) {
            case '10':
                return 8999;
            default:
                return '未发布'

        }
    }
    hello() {
        console.log('我是乔布斯！IPhone is great! ');

    }
}
// sim卡类
class SIMCard {
    constructor(simName, mobileName) {
        switch (simName) {
            case 'mobile':
                return new ChinaMobile(mobileName)
            case 'unicom':
                return new ChinaUnicom(mobileName)
        }
    }
}
// 中国移动
class ChinaMobile {
    constructor(name) {
        this.name = name
        this.sayHello()
    }
    sayHello() {
        console.log(`${this.name}欢迎使用 中国移动`);
    }
}
//中国联通
class ChinaUnicom {
    constructor(name) {
        this.name = name
        this.sayHello()
    }
    sayHello() {
        console.log(`${this.name}欢迎使用 中国联通`);
    }
}
let xiaoMi10 = new Mobile('xiaomi', '10X');
let phone10 = new Mobile('iphone', '10');
xiaoMi10.sayHello();
new SIMCard('mobile', xiaoMi10.mobileName)
phone10.sayHello();
new SIMCard('unicom', phone10.mobileName)
```
### 优点

- 扩展性好，符合开闭原则：将抽象与实现分离，让二者可以独立变化

### 缺点

- 在设计之前，需要识别出两个独立变化的维度。

[参考文章](https://hejialianghe.github.io/)

<p align="right">Page Update Time：{docsify-updated}</p>
