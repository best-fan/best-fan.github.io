# JavasSript 设计模式——装饰器 模式

## 装饰器 模式

定义：不改变原有对象的前提下,动态的给一个对象增加一些额外的功能

### 适用场景：

- 1、扩展一个类的功能
- 2、动态增加功能、动态撤销

#### 举例
- 1、[ES7 Decorator](https://es6.ruanyifeng.com/#docs/decorator)

### 代码示例
```js
class Coffee {
    make(water) {
        return `${water}+咖啡`
    }
    cost() {
        return 10;
    }
}
class MilkCoffee {
    constructor(parent) {
        this.parent = parent
    }
    make(water) {
        return `${this.parent.make(water)}+ 奶`
    }
    cost() {
        return this.parent.cost() + 5;
    }
}
class SugarCoffer {
    constructor(parent) {
        this.parent = parent
    }
    make(water) {
        return `${this.parent.make(water)}+糖`
    }
    cost() {
        return this.parent.cost() + 2;
    }
}
let coffee = new Coffee();
let res = coffee.make('水')
console.log('res', res);
let spend = coffee.cost();
console.log('spend', spend);

let milkeCo = new MilkCoffee(coffee)
let res1 = milkeCo.make('水')
console.log('res1', res1);
let spend1 = milkeCo.cost();
console.log('spend1', spend1);

let sugarCo = new SugarCoffer(coffee);
let res2 = sugarCo.make('水');
console.log('res2', res2);
let spend2 = sugarCo.cost();
console.log('spend2', spend2);


let sugarCos = new SugarCoffer(milkeCo);
let res3 = sugarCos.make('水');
console.log('res3', res3);
let spend3 = sugarCos.cost();
console.log('spend3', spend3);
// res 水+咖啡
// spend 10
// res1 水+咖啡+ 奶
// spend1 15
// res2 水+咖啡+糖
// spend2 12
// res3 水+咖啡+ 奶+糖
// spend3 17
```

### 优点
- 装饰类和被装饰类都只关心自身的核心业务，实现了解耦。
- 方便动态的扩展功能，且提供了比继承更多的灵活性。
### 缺点
- 多层装饰比较复杂。
- 常常会引入许多小对象，看起来比较相似，实际功能大相径庭，从而使得我们的应用程序架构变得复杂起来


<p align="right">Page Update Time：{docsify-updated}</p>
