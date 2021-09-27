# JavasSript 设计模式——观察者模式
## 观察者模式
观察者模式(Observer Pattern)：定义了一种 一对多的依赖关系，让多个观察者对象 同时 监听某一个主题的对象，当这个主题对象的状态发生改变时就会通知多个观察者对象，使它们能够自动更新自己。
## 使用场景：
当一个对象的改变需要同时改变其他对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。
 ### 举例
  - 当你使用QQ发送群消息时，如果有人将你设为特别关注，那么当你发送消息后，QQ会通知所有关注你的人。他们会选择进行回复和查看。
  -  DOM监听事件
    ```js
        document.body.addEventListener('click', function() {
            console.log('hello world!');
        });
        document.body.click()
    ```

## 代码示例

```js
    //状态变化之后触发所有观察者对象
    class Subject{
        constructor(){//构造方法
            this.state='正常',
            this.observers=[]
        }
        getState(){//获取状态值
            return this.state;
        }
        setState(state){//设置状态值
            this.state=state;
            this.notifyAllObservers();
        }
        notifyAllObservers(){//通知观察者
            this.observers.forEach(observer=>{
                console.log('observer',observer);
                
                observer.update();
            })
        }
        attach(observer){//添加观察者
            this.observers.push(observer)
        }
    }
    //观察者
    class Observer{
        constructor({name,workYear},subject){//构造方法
            this.name=name;
            this.workYear=workYear;
            this.subject=subject;
            this.subject.attach(this)
        }
        update(){//更新提示
            console.log(`name:${this.name},workYear:${this.workYear},job State:${this.subject.getState()}`);
        }

    }
    const QQjob=new Subject();
    console.log( QQjob.getState());
    let person1=new Observer({name:'张三',workYear:3},QQjob);
    let person2=new Observer({name:'李四',workYear:1},QQjob);
    QQjob.setState('急缺');
    // name:张三,workYear:3,job State:急缺
    // name:李四,workYear:1,job State:急缺
```

## 优点

 - 支持简单的广播通信，自动通知所有已经订阅过的对象
 - 目标对象与观察者之间的抽象耦合关系能单独扩展以及重用
 - 增加了灵活性
 - 观察者模式所做的工作就是在解耦，让耦合的双方都依赖于抽象，而不是依赖于具体。从而使得各自的变化都不会影响到另一边的变化。

## 缺点

 - 过度使用会导致对象与对象之间的联系弱化，会导致程序难以跟踪维护和理解
 - 如果一个观察目标对象有很多直接和间接观察者，将所有的观察者都通知到会花费很多时间
 - 如果在观察者和观察目标之间存在循环依赖，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。
 - 观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

## 发布-订阅模式

> 真正的区别在于：发布订阅模式实现的是一种多对多的关系，在发布者与订阅者之间需要有一个中介者，发布者发布事件名和参数到中间者，中间者向事件集中的订阅者发送参数。 而观察者是一种一对多的关系，所有的在同一被观察者身上绑定的观察者只能接受同一个被观察者的消息。 例如： 订阅/发布 let fun = function(){} mediator.on('a',fun) mediator.on('b',fun) mediator.emit('a',data) mediator.emit('b',data) 任何身份都可订阅与发布
