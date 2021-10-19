# JavasSript 设计模式——XXX 模式

## XXX 模式

定义：

### 适用场景：

- 1.
- 2.

#### 举例

### 代码示例

```js
class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  init() {
    console.log("init");
  }
}
class Student {
  create(name, age) {
    return new People(name, age);
  }
}
const std = new Student();
const mm = std.create("zhangSan", 11);
mm.init();
```

### 优点

### 缺点

<p align="right">Page Update Time：{docsify-updated}</p>
