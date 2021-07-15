# vue  响应式原理剖析

## 响应式数据/双向绑定原理

Vue 中数据双向绑定 主要指：数据变化更新视图，视图变化更新数据，View 变化更新 Data, 通过事件监听的方式进行实现，So,Vue 数据双向绑定的工作 主要根据 Data 变化更新 View(数据驱动)。Vue 实现双向绑定需要做三件事：

1.  检测 Data 变化(Observer)
2.  追踪收集依赖，通过变更(Dep)
3.  更新 View 视图(Watcher)

## vue 2.x

> 当你把一个普通的  JavaScript  对象传入  Vue  实例作为  data  选项，Vue  将遍历此对象所有的  property，
> 并使用  [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
> 把这些  property  全部转为  getter/setter。
> Object.defineProperty  是  ES5  中一个无法  shim  的特性，这就是
> [Vue  不支持  IE8  以及更低版本浏览器的原因](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)。


> ### Object.defineProperty 的使用
>   Object.defineProperty()  方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
> Object.defineProperty(obj, prop, descriptor)

####  参数

1. obj 要定义属性的对象
2. prop 要定义或修改的属性名称或[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
3. descriptor 要定义或修改的属性描述符

属性描述符主要有两种主要形式：数据描述符 和 存取描述符；

- 数据描述符：一个具有 值的属性，该值可写 也可以 不可写。
- 存取描述符：由 getter 函数 和 setter 函数 描述的属性。

<p style="font-weight:bold">数据描述符：</p>

1. **configurable**:表示该属性**是否可以使用 delete 删除** 默认为 false
2. **enumerable**:表示该属性**是否可以枚举**，即是否可以通过 for..in 访问属性 默认为 false
```
//Demo
    var eObj = {};
    Object.defineProperty(eObj, "a", { value: 1, enumerable: true });
    Object.defineProperty(eObj, "b", { value: 2, enumerable: false });
    Object.defineProperty(eObj, "c", { value: 3 }); // enumerable 默认为 false
    eObj.d = 4;   //直接赋值的方式创建对象的属性，则 enumerable 为 true
    Object.defineProperty(o, Symbol.for('e'), {
        value: 5,
        enumerable: true
    });
    Object.defineProperty(o, Symbol.for('f'), {
        value: 6,
        enumerable: false
    });
    for (var i in eObj) {
        console.log(i);
    }
    //logs a d
    
    Object.keys(eObj);
    //['a', 'd'] 
    eObj.propertyIsEnumerable('a'); // true
    eObj.propertyIsEnumerable('b'); // false
    eObj.propertyIsEnumerable('c'); // false
    eObj.propertyIsEnumerable('d'); // true
    eObj.propertyIsEnumerable(Symbol.for('e')); // true
    eObj.propertyIsEnumerable(Symbol.for('f')); // false

    var p = { ...o }
    p.a // 1
    p.b // undefined
    p.c // undefined
    p.d // 4
    p[Symbol.for('e')] // 5
    p[Symbol.for('f')] // undefined
```
3. **value**:表示**该属性的值**：可以是有效的 Javascript 值 默认为 undefined
4. **writable**:表示该属性的值**是否可以修改** 默认为 false
```
  //Demo：
    var o = {}; // 创建一个新对象
    Object.defineProperty(o, 'a', {
        value: 37,
        writable: false
    });
    console.log('old', o.a); // logs 37
    o.a = 25;
    console.log('new', o.a); // logs 37
    var oo = {}; // 创建一个新对象
    Object.defineProperty(oo, 'a', {
        value: 37,
        writable: true
    });
    // console.log('old', oo.a); // logs 37
    oo.a = 25;
    // console.log('new', oo.a); // logs 25
```
汇总:
```
    //隐式  使用_proto_
    var objs = {};
    var objsss = {};
    var descriptor = Object.create(null); //没有继承的属性 (不继承原型链 可以减少内存占用 提高运行效率)
    descriptor.value = 'static';
    Object.defineProperty(objs, 'key', descriptor);
    console.log(Object.getOwnPropertyDescriptor(objs, 'key'))
    //显式
    Object.defineProperty(objsss, 'key', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: "static"
    });
    console.log(Object.getOwnPropertyDescriptor(objsss, 'key'))
```

<p style="font-weight:bold">存取描述符：</p>

1. **get**:属性的 getter 函数，如果没有 getter，则为 **undefined**。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
   默认为 undefined。 2.**set**:属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
   默认为 undefined。

```
Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符
var obj={a:10}
console.log(Object.getOwnPropertyDescriptor(obj, 'a')); //获取属性描述符
//{value: 10, writable: true, enumerable: true, configurable: true}
var o= { get foo() { return 17; } };
console.log(Object.getOwnPropertyDescriptor(o, 'foo'));//获取属性描述符
//configurable: true , enumerable: true , get: ƒ foo() , set: undefined
```
2. **set**:属性的 set 函数，如果没有 setter，则为 **undefined**。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined。

```
Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符
var obj={a:10}
console.log(Object.getOwnPropertyDescriptor(obj, 'a')); //获取属性描述符
//{value: 10, writable: true, enumerable: true, configurable: true}
var o= { set foo(m) { return m; } };
console.log(Object.getOwnPropertyDescriptor(o, 'foo'));//获取属性描述符
//configurable: true,enumerable: true,get: undefined,set: ƒ foo(m)
```
#### 返回值

被传递给函数的对象

###  示例
案例将分为单个数据、多个数据处理示例展示。
#### 单个数据

``` 
    let data = { msg: '123',}
    var  vm=Object.create(null);
    Object.defineProperty(vm, 'msg', {
        enumerable: true,
        configurable: true,
        get() {
            console.log('getter', data.msg);

            return data.msg;
        },
        set(newVal) {
            if (newVal === data.msg) {
                return;
            }
            data.msg = newVal;
            //document.getElementById('app').textContent = data.msg;
        }
     })
     console.log(vm.msg)
     //getter 123
     //123
    vm.msg='啦啦啦';
    console.log(vm.msg)
    //啦啦啦
```
#### 多个数据

```
    let data = {
        msg: '123',
        show:'hello'
    }
    var  vm=Object.create(null);

        Object.keys(data).map(key => {
        console.log('key',key);
        Object.defineProperty(vm, key, {
            enumerable: true,
            configurable: true,
            get() {
                return data[key]
            },
            set(newVal) {
                if (newVal == data[key]) {
                    return
                }
                data[key] = newVal;
                // document.getElementById('app').textContent = data[key];

            }
            })
    })
    console.log(vm);
    //msg: (...)show: (...)get msg: ƒ get()set msg: ƒ set(newVal)get show: ƒ get()set show: ƒ set(newVal)

    vm.show='213123'

```

## vue 3.x

> Vue  会使用带有  getter  和  setter  的处理程序遍历其所有  property  并将其转换为  [Proxy](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/proxy)。这是  ES6  仅有的特性，但是我们在  Vue 3  版本也使用了  Object.defineProperty  来支持  IE  浏览器。两者具有相同的  Surface API，但是  Proxy  版本更精简，同时提升了性能。

> ### Proxy 的使用
>   Proxy  对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）
> ####  参数
> ####  方法
> ###  示例
