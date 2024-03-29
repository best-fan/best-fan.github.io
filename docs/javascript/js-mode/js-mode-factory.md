# JavasSript 设计模式——简单工厂模式

## 简单工厂模式

定义：简单工厂模式又叫静态工厂模式，由一个工厂对象决定创建某一种产品对象的实例。主要用来创建同一类对象。

### 适用场景：

- 1.遇到 new 操作符，应该考虑使用工厂模式
- 2.需要依赖具体环境创建不同实例，这些实例都有相同的行为,这时候我们可以使用工厂模式

#### 举例

- 多种类型弹窗实例、登录权限的设置
- JQuery的$()就是一个工厂函数
- vue 的异步组件

### 代码示例

```js
class loginPopup {
  init() {
    console.log("initLoginPopup");
  }
}
class toastPopup {
  init() {
    console.log("initToastPopup");
  }
}
class confimPopup {
  init() {
    console.log("initConfimPopup");
  }
}
class Popup {
  create(name, parms) {
    switch (name) {
      case "loginPopup":
        new loginPopup(parms);
        break;
      case "toastPopup":
        new toastPopup(parms);
        break;
      case "confimPopup":
        new confimPopup(parms);
        break;
      default:
        console.error(`${name}：当前类型不存在！`);
    }
  }
}
const pops = new Popup();
const login = pops.create("loginPopup", 1);
login.init();
const login = pops.create("toastPopup", 2);
login.init();
const login = pops.create("confimPopup", 3);
login.init();
```

### 优点

- 构造函数和创建者分离，使用方便。(创建对象的过程可能很复杂，但我们只需要关心创建结果。)
- 对象由统一方法进行管理，方便我们创建对象
- 一个调用者想创建一个对象，只要知道其名称就可以了。
- 扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。

### 缺点

- 每个对象都需要在 一个方法中进行创建。
- 增加了系统的复杂度

### 总结

工厂模式就是要把我们要暴露的对象，真正要实例化的对象先封装到函数的内部，然后我们只暴露一个工厂方法，使用者通过这个工厂方法 来获取我们实例话的对象，它的优势方便我们大量的创建对象。

<p align="right">Page Update Time：{docsify-updated}</p>
