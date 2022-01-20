#  JavaScript设计模式
在《设计模式：可复用面向对象软件的基础》一书中所介绍的 23 种经典设计模式。

## 什么是设计模式
> 设计模式：**在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案**。

通俗理解：设计模式是解决某个特定场景下对某种问题的解决方案，因此，我们在不同适合的场景种，使用特定的符合场景的设计模式。
设计模式一般包含模式名称、问题、目的、解决方案、效果等。

**设计模式原则：**
- S – Single Responsibility Principle 单一职责原则
   - 一个程序只做好一件事
   - 如果功能过于复杂就拆分开，每个部分保持独立
- O – OpenClosed Principle 开放/封闭原则
   - 对扩展开放，对修改封闭
   - 增加需求时，扩展新代码，而非修改已有代码
- L – Liskov Substitution Principle 里氏替换原则
   - 子类能覆盖父类
   - 父类能出现的地方子类就能出现
- I – Interface Segregation Principle 接口隔离原则
   - 保持接口的单一独立
   - 类似单一职责原则，这里更关注接口
- D – Dependency Inversion Principle 依赖倒转原则
   - 面向接口编程，依赖于抽象而不依赖于具体
   - 使用方只关注接口而不关注具体类的实现

SO 体现较多的：Promise
 - 单一职责：每个then中的逻辑只做好一件事
 - 开放封闭（对扩展开放，对修改封闭）：如果新增需求，扩展then

## 设计模式分类
- 创建型
    - [单例模式](javascript/js-mode/js-mode-singleton.md)
    - [原型模式](javascript/js-mode/js-mode-prototype.md)
    - [简单工厂模式](javascript/js-mode/js-mode-factory.md)
    - [抽象工厂模式](javascript/js-mode/js-mode-abstractFactory.md)
    - [建造者模式](javascript/js-mode/js-mode-builder.md)
- 结构型
    - [适配器模式](javascript/js-mode/js-mode-adapter.md)
    - [装饰器模式](javascript/js-mode/js-mode-decorator.md)
    - [代理模式](javascript/js-mode/js-mode-agent.md)
    - [外观模式](javascript/js-mode/js-mode-facade.md)
    - [桥接模式](javascript/js-mode/js-mode-bridging.md)
    - [组合模式](javascript/js-mode/js-mode-combination.md)
    - 享元模式
- 行为型
    - [观察者模式(发布-订阅模式)](javascript/js-mode/js-mode-observer.md)
    - 迭代器模式
    - 策略模式
    - 模板方法模式
    - 职责链模式
    - 命令模式
    - 备忘录模式
    - 状态模式
    - 访问者模式
    - 中介者模式
    - 解释器模式
<p align="right">Page Update Time：{docsify-updated}</p>