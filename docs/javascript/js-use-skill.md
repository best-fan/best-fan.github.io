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

## 提取对象中所有的 Value 值

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
```

- 使用 <kbd>Object.values()</kbd> 可以返回所有对象的 <kbd>value</kbd> 值
- <kbd>flat(depth)</kbd>方法,会对数组进行递归遍历 并将所有数据合并到一个新数组中，<kbd>depth</kbd> 可以指定递归遍历深度

## 数组元素 去重

```js
let list = [1, 1, 3, 4, 5, 1];
let newList = [...new Set(list)];
```

- new Set() 中的元素[只会出现一次](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

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

| 表达式 | 返回值 |
| ---- | ---- |
| '' \|\| '123' | 123 |
| '' ?? '123' | '' |
| 0 \|\| 1 | 1 |
| 0 ?? 1 | 0 |
如果需要判断初值是否存在 使用?? 比较合适

-- [空值合并操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)(??) 当左侧数据为 <kbd>null</kbd>、<kbd>undefined</kbd> 时 返回右侧的数据
