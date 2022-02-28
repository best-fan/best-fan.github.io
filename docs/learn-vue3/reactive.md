# Vue 3 响应式

## 组合式 API:

- 使用 `reactive()` 函数创建一个响应式对象或数组

```js
<script >
   import { reactive } from "vue";
   export default {
   setup() {
       const state = reactive({ count: 0 });
       // 在这个作用域下定义可更改响应式状态的函数 需要 同 变量  一起暴露出去
       function changeCount() {
       state.count++;
       }
       return {
       state,
       changeCount,
       };
   },
   };
</script>
<template>
   <div>
       <h1 @click="changeCount()">show New</h1>
       <div>{{ state.count }}</div>
   </div>
</template>
//使用setup 优化
<script setup>

import { reactive } from "vue";
const state = reactive({ count: 0 });

function changeCount() {
  state.count++;
}

</script>
<template>
  <div>
    <h1 @click="changeCount()">show New</h1>
    <div>{{ state.count }}</div>
  </div>
</template>
```
