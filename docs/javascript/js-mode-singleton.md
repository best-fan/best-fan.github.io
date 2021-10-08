# JavasSript 设计模式——单例模式

## 单例模式

定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。 实现的方法为先判断实例是否存在，如果存在直接返回，如果不存在就闯将了再返回。这就确保了一个类只有一个实例对象。

### 适用场景：

一个单一对象。

#### 举例

- 弹窗(无论单机多少次，弹窗只应该被创建一次)
- Vuex 

### 代码示例

```js
/**
 * 单例模式
 * */

class LoginPopup {
  constructor() {
    this.state = "hide";
    this.isAlreadyShow = false;
  }
  show() {
    if (this.state == "show") {
      alert("已经显示了");
      this.isAlreadyShow = true;
      return;
    }
    this.state = "show";
    this.isAlreadyShow = false;

    console.log("显示成功");
  }
  hide() {
    if (this.state == "hide") {
      alert("已经隐藏了");
      return;
    }
    this.state = "hide";
    console.log("隐藏成功");
  }
}
LoginPopup.createPopup = (function () {
  let instance;
  return function () {
    if (!instance) {
      console.log("创建了");
      instance = new LoginPopup();
    }
    return instance;
  };
})();

let obj1 = LoginPopup.createPopup(); //创建实例
obj1.show();
console.log("obj1", obj1);
let obj2 = LoginPopup.createPopup(); //创建实例
obj2.show();
console.log("obj2", obj2);
//创建了
//显示成功
//obj1 LoginPopup {state: 'show', isAlreadyShow: false}
//obj2 LoginPopup {state: 'show', isAlreadyShow: true}
```

### 优点
- 且只会实例化一次，简化了代码的调试维护
- 划分命名空间 减少全局变量污染
- 增加模块性，放在单一位置，便于维护
### 缺点
- 单一模式 具有强耦合性，不利于单元测试