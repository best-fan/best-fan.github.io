# JavasSript 设计模式——原型模式

## 原型模式

定义：原型模式是指 用原型实例指向创建对象的种类，并且通过拷贝这些原型创建新的对象。

### 适用场景：

- 1.两者具有继承关系。如(人类、学生类)

#### 举例

- 对象中含有的——prototype

### 代码示例

```js
// 原型模式
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class Student extends Person {
  constructor(name) {
    super(name);
  }
  sayHello() {
    console.log(`Hello, name is ${this.name}`);
  }
}
let std1 = new Student("ZhangSan");
std1.sayHello();
```

### 优点

- 可以利用原型模式简化对象的创建过程，节约系统足以，提高对象的生成效率
- 可以方便的通过改变值生成新的对象。每个对象都可以具有共同的属性方法。

### 缺点

- 对象包含的所有对象都需要配备一个克隆方法，在对象层级比较多时，代码量更大，更加复杂。
