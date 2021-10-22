# JavasSript 设计模式——抽象工厂 模式

## 抽象工厂 模式

定义：提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。抽象工厂模式和简单工厂模式类似，抽象工厂模式中的工厂方法针对的是多个产品等级结构。抽象工厂模式包含 4 种角色：抽象工厂、具体工厂、抽象产品、具体产品。**抽象工厂其实是实现子类继承父类的方法**

![示例图](https://raw.githubusercontent.com/xietao3/Study-Plan/master/DesignPatterns/src/%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82.png)
### 适用场景：

- 1.比较复杂的项目，各模块功能比较独立

#### 举例
- 汽车厂商的创建

### 代码示例

```js
// 抽象工厂模式包含如下 4 种角色：
// 抽象工厂
// 具体工厂
// 抽象产品
// 具体产品

//抽象工厂
class AutomakerFactory {
  createCar() {
    //汽车
    console.error("抽象方法无法调用，需自己实现 AutomakerFactory createCar");
  }
  createEngine() {
    //发动机
    console.error("抽象方法无法调用，需自己实现 AutomakerFactory createEngine");
  }
}
//具体工厂
class BenzFactory extends AutomakerFactory {
  createCar() {
    return new BenzCar();
  }
  createEngine() {
    return new BenzEngine();
  }
}
class AudiFactory extends AutomakerFactory {
  createCar() {
    return new AutiCar();
  }
  createEngine() {
    return new AudiEngine();
  }
}
//抽象产品类 和具体产品类
//抽象产品类Car
class Car {
  init() {
    console.error("抽象方法无法调用，需自己实现 Car");
  }
}
class BenzCar extends Car {
  init(config) {
    const { mode, year, prize } = config;
    console.log(`create BenzCar 型号：${mode};生产日期:${year};售价：${prize}`);
  }
}
class AutiCar extends Car {
  init(config) {
    const { mode, year, prize } = config;
    console.log(`create AudiCar 型号：${mode};生产日期:${year};售价：${prize}`);
  }
}
//抽象产品类Engine
class Engine {
  creat() {
    console.error("抽象方法无法调用，需自己实现 Engine");
  }
}
class BenzEngine extends Engine {
  creat(config) {
    const { mode, year } = config;
    console.log(`create BenzEngine 型号：${mode};生产日期：${year} `);
  }
}
class AudiEngine extends Engine {
  creat(config) {
    const { mode, year } = config;
    console.log(`create AudiEngine 型号：${mode};生产日期：${year} `);
  }
}
let benz = new BenzFactory();
let benzCar = benz.createCar();
let benEngine = benz.createEngine();
benEngine.creat({
  mode: "MP2N",
  year: "2021.12.09",
});
benzCar.init({
  mode: "C200",
  year: "2022.01",
  prize: "84w",
});

let audi = new AudiFactory();
let audiCar = audi.createCar();
let audiEngine = audi.createEngine();

audiEngine.creat({
  mode: "XM10",
  year: "2021.10.06",
});
audiCar.init({
  mode: "A10",
  year: "2022.06",
  prize: "50w",
});

//新增一个厂商BMW(具体工厂)
class BWMFactory extends AutomakerFactory {
  createCar() {
    return new BWMCar();
  }
  createEngine() {
    return new BWMEngine();
  }
}
//具体产品
class BWMCar extends Car {
  init(config) {
    const { mode, year, prize } = config;
    console.log(`create BWMCar 型号：${mode};生产日期:${year};售价：${prize}`);
  }
} //具体产品
class BWMEngine extends Engine {
  creat(config) {
    const { mode, year } = config;
    console.log(`create BWMEngine  型号：${mode};生产日期：${year} `);
  }
}
let bwm = new BWMFactory();
let bwmCar = bwm.createCar();
let bwmEngine = bwm.createEngine();

bwmEngine.creat({
  mode: "BA2Z",
  year: "2021.08.09",
});
bwmCar.init({
  mode: "MZ8",
  year: "2022.05",
  prize: "40w",
});
```

### 优点
- 具体产品在应用层代码隔离，不需要关心产品细节(隔离了具体类的生成)

### 缺点
- 规定了所有可能被创建的产品集合，产品族中扩展新的产品困难，需要修改抽象工厂的接口
- 增加新的产品等级结构很复杂，需要修改抽象工厂和所有的具体工厂类，导致系统复杂度增加

<p align="right">Page Update Time：{docsify-updated}</p>
