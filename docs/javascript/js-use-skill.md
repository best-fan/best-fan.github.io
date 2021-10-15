# javaSrcipt 实用技巧

## ES6 取值 赋值

```js
const { a: a1, d, m } = obj;
//解决 对象为 null、undefined情况
const { a: a1, d, m } = obj || {};
```

- 通过 ES6 解构的方式进行处理
- 对于属性名不一致情况 可使用别名进行处理
- 解构方式赋值 对象不能为 <kbd>null</kbd>、<kbd>undefined</kbd>

## 数据合并拼接

```js
const a = [1, 2, 3];
const b = [1, 5, 6];
const c = a.concat(b); //[1,2,3,1,5,6]

const obj1 = { a: 1 };
const obj2 = { b: 2 };
const objs = Object.assign({}, obj1, obj2);
//ES6改进
const c = [...new Set([...a, ...b])]; //[1,2,3,5,6]

const objs = { ...obj1, ...obj2 };
```

- 使用 <kbd>net Set()</kbd> 可以有效解决数组去重问题
- 扩展运算符(...) 可将数据展开用，分割

## 字符串拼接

```js
const name = "zhang San";
const show = `${name} is Student`;

const show = `${name ? name : "li Hua"} is Student`;
```

- 字符串模板(${})不但可以进行参数的传递 还可以处理任意的 JavaScript 表达

## if 条件的优化

```js
if (type == 1 || type == 2 || type == 4) {
}
//ES6 处理
if ([1, 2, 4].includes(type)) {
}
```

- includes()方法返回一个 booble，用来判断数组中是否包含 给定的值

## 数组搜索优化

```js
const list = [1, 2, 3, 4, 5, 6];
const result = a.filter((itm) => {
  return itm === 3;
});
//使用find
const result = a.find((itm) => {
  return itm == 3;
});
```

- 使用 <kbd>filter()</kbd> 函数 筛选数据 会返回所有满足条件的所有元素的值

- 使用 <kbd>find()</kbd> 函数 筛选数据 会返回第一个元素的值

## 提取对象中所有的 Value 值(展开多维数组)

```js
const deps = {
  采购部: [1, 2, 3],
  人事部: [5, 8, 12],
  行政部: [5, 14, 79],
  运输部: [3, 64, 105],
};

let list = [];
for (const key in deps) {
  if (Array.isArray(deps[key])) {
    list = [...list, ...deps[key]];
  }
}

list = [...new Set(list)];

//使用 Object.values

list = [...new Set(Object.values(deps).flat())];
//数组分割

let  arr1=["it's Sunny in", "", "California"]；
arr1.flatMap(x=>x.split('' ));
```

- 使用 <kbd>Object.values()</kbd> 可以返回所有对象的 <kbd>value</kbd> 值
- <kbd>flat(depth)</kbd>方法,会对数组进行递归遍历 并将所有数据合并到一个新数组中，<kbd>depth</kbd> 可以指定递归遍历深度 <kbd>Infinity</kbd>参数则不管多少维数组都会展平
- <kbd>flatMap</kbd>方法 是 map、flat 的合体

## 数组元素 去重

```js
let list = [1, 1, 3, 4, 5, 1];
let newList = [...new Set(list)];
```

- <kbd>new Set()</kbd> 中的元素[只会出现一次](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

## 数组对象 去重

```js
let arr = [
  {
    a: 1,
    b: 2,
  },
  {
    a: 2,
    b: 1,
  },
  {
    a: 1,
    b: 2,
  },
  { a: "2", b: 1 },
];
let lists = [];
arr.map(function (val, idx) {
  const isHave = lists.some((item) => {
    return JSON.stringify(item) === JSON.stringify(val);
  });
  isHave ? "" : lists.push(val);
});
```

- 通过 <kbd>JSON.stringify()</kbd>方法 将 json 对象转换为字符串 进行判断

## 获取对象属性值

```js
const name = obj && obj.name;

const name = obj?.name;
```

- [使用可选链操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)(?.)可以读取对象链深处的属性值 如果不存在 返回 <kbd>undefined</kbd>.

## 输入框非空判断

```js
if (value != "" && value != null && value != undefined) {
}
//使用 空值合并运算符
if (value ?? "" != "") {
}
```

空值合并运算符(??) 与逻辑或操作符区别(||)

| 表达式        | 返回值 |
| ------------- | ------ |
| '' \|\| '123' | 123    |
| '' ?? '123'   | ''     |
| 0 \|\| 1      | 1      |
| 0 ?? 1        | 0      |

如果需要判断初值是否存在 使用?? 比较合适

- [空值合并操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)(??) 当左侧数据为 <kbd>null</kbd>、<kbd>undefined</kbd> 时 返回右侧的数据

## 异步函数请求

```js
const fn1=()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(1);
    },300)
  })
}
const fn2=()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(2);
    },600)
  })
}
//顺序调用
const fu=async()=>{
  const res1=await fn1();
  const res2=await fu2();
  consoloe(res1)
  consoloe(res2)
}
//并发调用
cosnt  fn=()=>{
  Promise.all([fn1(),fn2()]).then(res=>{//两者都处理完成
    consoke.log(res)
  })
}
//其中一个处理完成就返回应使用 Promise.race()
```

- <kbd>Promise</kbd> 用于异步操作，状态有 pending(初始化状态)、fulfilled(操作成功)、rejected(操作失败)

## 数组对象中是否存在指定值

```js
const list = [{ a: 1 }, { a: 2 }];
const isHave = list.some((res) => {
  return res.a == 1;
});
//true
const isAll = list.every((res) => {
  return res.a == 2;
});
// false
const valueList = list.find((res) => res.a == 1);
//
```

- <kbd>some</kbd>、<kbd>every</kbd> 两者返回的都是布尔值
- <kbd>some</kbd> 判断其中一个元素满足条件 返回 true ,循环中断
- <kbd>every</kbd> 判断所有元素满足条件 返回 true，若有一个不满足 返回 false 循环中断
- <kbd>find</kbd>方法对数组中的每个元素都执行一次 <kbd>callback</kbd>。即判断所有元素。若存在 则返回第一个元素的值，不存在返回 undefined

## 数组分割

```js
function Chunk(arr = [], size = 1) {
  return arr.length
    ? arr.reduce(
        (t, v) => (
          console.log(t,v);
          t[t.length - 1].length === size? t.push([v]): t[t.length - 1].push(v),t
        ),
        [[]]
      )
    : [];
}
const arr = [1, 2, 3, 4, 5];
```

## 求数组中最大、最小值

```js
function Max(arr=[]{
  return arr.reduce((t,v)=>t>v?t:v);
})
function Min(arr=[]{
  return arr.reduce((t,v)=>t<v:t:v) ;
})
```

- [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 有很多实用、快捷的方法。

## 遍历对象或数组对象

```js
for (let [key, value] of Object.entries(obj1)) {
  console(key, value);
}
```

- <kbd>Object.entries()</kbd>可以方便的获取到对象中的 key、value 值 若 key 值为 number 类型 则先排序后返回

- <kbd>Object.entries()</kbd> 若传字符串 则先分割字符串后输出

## 将二维数组 转换为对象

```js
const arr = [
  ["name", "林三心"],
  ["age", 22],
  ["gender", "男"],
];
console.log(Object.fromEntries(arr));
// { name: '林三心', age: 22, gender: '男' }

const object1 = { a: 1, b: 2, c: 3 };
const object2 = Object.fromEntries(Object.entries(object1));
// { a: 1, b: 2, c: 3 }
```

- <kbd>Object.fromEntries()</kbd> 将键值对列表转换为对象 与 <kbd>Object.entries()</kbd>方法互逆

## 求两个数组的交集

```js
var plants1 = [
  "Saturn",
  "Earth",
  "Uranus",
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
];
var plants2 = ["Saturn", "Earth", "Uranus"];
var alonePlants = [...new Set(plants1)].filter((item) =>
  plants2.includes(item)
);
console.log(alonePlants);
// [ 'Saturn', 'Earth', 'Uranus' ]
```

- 先使用 new Set()对元素去重,然后 filter 对数据继续过滤 返回新的数组

## 数组最后一个元素

```js
var arr = [1, 2, 3, 4, 5];
arr.pop(); //5 此方法会改变数组的结构，不推荐
arr[arr.length - 1]; //5 常用方法
arr.slice(-1)[0]; //5 不需要计算数组的长度，直接拿到最后一个元素
```

- <kbd>pop()</kbd>方法会改变原始数组
- <kbd>slice()</kbd>方法不会改变原数组 返回一个新的数组

## 动态为对象的属性指定键名

```js
const dynamic = "email";
let user = {
  name: "John",
  [dynamic]: "john@doe.com",
};
```

## 获取 URL 参数

```js
q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
console.log(q);
```

## VUE 样式穿透

- 使用 ::v-deep 进行穿透
