# vue 响应式原理剖析

## vue 2.x
>  当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，
并使用 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
把这些 property 全部转为 getter/setter。
Object.defineProperty 是 ES5 中一个无法 shim 的特性，这就是
[Vue 不支持 IE8 以及更低版本浏览器的原因](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)。

### Object.defineProperty的使用
>  Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
#### 参数

#### 返回值

### 示例
## vue 3.x

>  Vue 会使用带有 getter 和 setter 的处理程序遍历其所有 property 并将其转换为 [Proxy](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/proxy)。这是 ES6 仅有的特性，但是我们在 Vue 3 版本也使用了 Object.defineProperty 来支持 IE 浏览器。两者具有相同的 Surface API，但是 Proxy 版本更精简，同时提升了性能。
### Proxy的使用

>  Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）
#### 参数

#### 方法

### 示例