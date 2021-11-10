# JavasSript 设计模式——代理 模式

## 代理 模式

定义：为一个对象提供一个待用品或占位符，以便控制对它的访问
![img](https://raw.githubusercontent.com/xietao3/Study-Plan/master/DesignPatterns/src/%E4%BB%A3%E7%90%86.png)

### 适用场景：

- 图片懒加载(通过 loading 图进行占位 图片加载成功后再进行替换)

#### 举例

- Es6 Proxy

- 通过 VPN 进行网络访问

### 代码示例

```js
// 代理模式

// 有个包裹，卖家要把这个包裹寄给gary，则需要通过快递公司寄过来

//包裹
class Package {
  constructor(name) {
    this.receiver = name;
  }
  setName(name) {
    //寄件人
    this.receiver = name;
  }
}
//代理
class seller {
  constructor(pkage) {
    this.package = pkage;
  }
  send(gift) {
    return this.package.receiver + "寄给你的包裹：" + gift;
  }
}

//邮局
class express {
  constructor(pkage) {
    this.package = pkage;
  }
  send(packageName) {
    //寄出的物品
    return new seller(this.package).send(packageName);
  }
}

var esm = new express(new Package("张思德"));
console.log(esm.send("Iphone 13 plus"));

//张思德寄给你的包裹：Iphone 13 plus
```

### 优点

- 降低系统的耦合度：代理模式能够协调调用者和被调用者，在一定程度上降低了系 统的耦合度。
- 不同类型的代理可以对客户端对目标对象的访问进行不同的控制

### 缺点

- 由于在客户端和被代理对象之间增加了代理对象，因此可能会让客户端请求的速度变慢。

<p align="right">Page Update Time：{docsify-updated}</p>
