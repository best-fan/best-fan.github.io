# JavasSript 设计模式——建造者 模式

## 建造者 模式

定义：将一个复杂的对象分解成多个简单的对象进行构建，将复杂的构建层与表现层分离，使相同的构建过程可以创建不同的表示模式
建造者模式主要角色

- 产品角色(Product):它是包含多个组成部件的复杂对象，由具体建造者来创建其各个零部件。
- 抽象建造者(Builder):它是一个包含创建产品各个字部件得抽象方法的接口，通常还包含一个返回复杂产品的方法。
- 具体建造者(Concrete Builder):实现 Builder 接口，完成复杂产品的各个部件的具体创建方法。
- 指挥者(Director):它调用建造者对象中的部件构造与装配方法完成复杂对象的创建，在指挥者中不涉及具体产品信息。

### 适用场景：

- 1.需要生产的对象具有复杂的内部结构
- 2.相同的方法 不同的执行顺序 产生不同的结果
- 3.多个部件、零件，都可以装配到一个对象中，但是产生的结果又不相同。

#### 举例

- Ajax 请求：用户发送一个请求、$.ajax 建造者模式(指挥者) 、具体实现(建造者)
- 封装 axios 请求

### 代码示例

```js
//建造者模式
// 包含 产品角色、 抽象建造者、具体建造者、指挥者

//指挥者 Director  KFC商店
class KFCShop {
  constructor() {
    this.builder = null;
  }
  //建造者具有统一的步骤 属性
  creatBulder(builder, parms) {
    const { name, num } = parms;
    this.builder = builder;
    builder.step1();
    builder.step2(num);
    builder.step3(name);

    return builder.get();
  }
}
//建造者 汉堡包制作
class HamburgerBuilder {
  constructor() {
    this.bread = null;
  }
  step1() {
    this.bread = new Hamburger();
  }
  step2(parms) {
    this.bread.addQuantity(parms);
  }
  step3(name) {
    this.bread.setNiceName(name);
  }
  get() {
    return this.bread;
  }
}
//建造者  薯条制作
class FrenchFriesBuilder {
  constructor() {
    this.fries = null;
  }
  step1() {
    this.fries = new FrenchFries();
  }
  step2(parms) {
    this.fries.addQuantity(parms);
  }
  step3(name) {
    this.fries.setNiceName(name);
  }
  get() {
    return this.fries;
  }
}
class Hamburger {
  constructor() {
    this.quantity = 0;
    this.name = "";
  }
  addQuantity(num) {
    this.quantity = num || 1;
  }
  setNiceName(name) {
    this.name = name || "";
  }
  say() {
    console.log(`${this.name}要了${this.quantity}个汉堡包！`);
  }
}
class FrenchFries {
  constructor() {
    this.quantity = 0;
    this.name = "";
  }
  addQuantity(num) {
    this.quantity = num || 1;
  }
  setNiceName(name) {
    this.name = name || "";
  }
  say() {
    console.log(`${this.name}要了${this.quantity}份薯条！`);
  }
}
const shop = new KFCShop();
const hamBuilder = new HamburgerBuilder();
const frizeBuilder = new FrenchFriesBuilder();

//不同顾客通过向商店下订不同的饮食套餐，得到不同的美食

var hamOrder = shop.creatBulder(hamBuilder, {
  name: "张三",
  num: 5,
});
hamOrder.say();
var frizeOrder = shop.creatBulder(frizeBuilder, {
  name: "王五",
  num: 3,
});
frizeOrder.say();

// 张三要了5个汉堡包！
// 王五要了3份薯条！
```

### 优点

- 封装性。客户端不必知道产品内部的组成细节。
- 建造者独立，易扩展
- 便于控制细节风险。可以对构造过程逐步细化，而不对其他模块产生影响

### 缺点

- 产品必须有共同点，范围有限制
- 如果内部变化复杂，会有很多建造类。

<p align="right">Page Update Time：{docsify-updated}</p>
