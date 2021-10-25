# JavasSript 设计模式——适配器 模式

## 适配器 模式

定义：将一个类型的接口转化成另一个接口，以满足用户需求，使类之间接口不兼容问题通过适配器得已解决。适配器模式一般包含三个角色：1、目标角色(Target) 2、源角色(Adaptee) 3、适配器角色

### 适用场景：

- 1.整合第三方 SDK
- 2.封装接口请求

#### 举例

- 1.封装网络请求(get、post)
- 2.vue 中的 computed

### 代码示例

```js
// 适配器模式
// 1、目标角色(Target)
class Target {
  small() {
    throw new Error("The methond must be overwitten");
  }
}
// 2、源角色(Adaptee)
class Adaptee {
  big() {
    console.log("港式电器插头可用咯~~");
  }
}
// 3、适配器角色
class Adapter extends Target {
  constructor(adaptee) {
    super();
    this.adapte = adaptee;
  }
  small() {
    this.adapte.big();
  }
}

let adaptee = new Adaptee();
let adapter = new Adapter(adaptee);

adapter.small();
//港式电器插头可用咯~~
```

### 优点
- 可用让任何两个没有关联的类一起运行
- 提高了类的复用
- 适配对象，适配库

### 缺点
- 额外对象的创建，非直接调用，存在一定开销
- 如果没有必有使用适配器模式的话，可以考虑重构。



<p align="right">Page Update Time：{docsify-updated}</p>
