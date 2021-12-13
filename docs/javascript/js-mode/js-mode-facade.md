# JavasSript 设计模式——外观 模式

## 外观 模式

定义：为子系统中的一组接口提供了一个一致的界面，此模块定义了一个高层接口，这个接口值得这一子系统更加容易使用.
![外观模式](https://blog.bravetimes.cn/api/public/uploads/2021/12/13/1639409572561854.png)
### 适用场景：

- 1.解决浏览器兼容性
- 2.一组函数的集合(使用中直接使用高级接口)

#### 举例
- jQuery中$(el).css()或$(el).animate()方法
- 浏览器事件兼容性

### 代码示例
```js
    // 场景二：代码为例
    // 三个处理函数
    function start() {
        console.log('start');
    }

    function doing() {
        console.log('doing');
    }
    function end() {
        console.log('end');
    }
    // 外观函数，将一些处理统一起来，方便调用
    function execute() {
        start();
        doing();
        end();
    }
    // 调用init开始执行
    function init() {
        // 此处直接调用了高层函数，也可以选择越过它直接调用相关的函数
        execute();
    }
    init(); // start doing end
```

### 优点
- 通过为多个复杂的子系统提供一个一致的接口
- 易于使用，本身也比较轻量级
### 缺点
- 可能会产生一定的性能问题(浏览器兼容性处理)

[参考文章](https://segmentfault.com/a/1190000012431621)

<p align="right">Page Update Time：{docsify-updated}</p>
