# Vue 3 响应式

## 组合式 API:

- `reactive()` 函数

  创建一个响应式对象或数组(**深层响应式**)

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
  `reactive()`响应式代理:返回的是一个源对象的 `Proxy`，它和源对象是不相等的
  ```js
  <script setup>
    import { reactive } from "vue";
    let objs={ m: 0 }
    const state = reactive(objs);
    //响应式代理 VS 原始对象
    console.log(state)
    //Proxy {m: 0}
    console.log(objs)
    //{m: 0}

    //响应式对象内的嵌套对象依然是代理
    const proxy = reactive({})
    const raw = {}
    proxy.nested = raw
    console.log(proxy.nested === raw) // false

    //保证访问代理的一致性，对同一个对象调用 reactive() 会总是返回同样的代理
    const raw = {}
    const proxy = reactive(raw)
    console.log(reactive(raw)===proxy);
    // true 在同一个对象上调用 reactive() 会返回相同的代理
    console.log(reactive(proxy)===proxy);
    // true 在一个代理上调用 reactive() 会返回它自己

  </script>

  ```
  改变原始对象，dom不会更新，Vue 的响应式系统的最佳实践是：**仅使用代理作为状态。**
  `reactive()` 局限性:
    - 1、仅对对象类型有效（对象、数组和` Map、Set` 这样的集合类型），而对     `string、number` 和 `boolean` 这样的 **基础类型** 无效
    - 2、Vue 的响应式系统是通过属性访问进行追踪的，不可以随意地 “替换” 一个响应式对象
      ```js
      let state = reactive({ count: 0 })
      // 替换后 失去相应性
      state = reactive({ count: 1 })

      //把响应式对象的某个基础类型属性传入函数 失去响应性
      // 函数接受一个纯数字,并不会追踪 state.count 的变化 
      callSomeFunction(state.count)
      // 通过解构属性 修改数据  失去响应性
      let { count } = state
      count++
      ```
- `shallowReactive()` 函数

  创建一个仅在顶层具有响应式(**浅层响应式**)

  ```js
  <script setup>
  import { reactive ,nextTick,shallowReactive} from "vue";
  //浅层响应式
  const noListenObj= shallowReactive({m: {n:2}})
  function changes(){
      noListenObj.m.n=5
      console.log(noListenObj)

  }
  </script>
  <template>
    <div>{{stateObj.m.n}}</div>
    <!--dom 不会刷新-->
    <h1 @click="changes()">noListerOBj</h1>

    <div>{{noListenObj.m.n}}</div>

  </template>

  ```

  - `ref()`定义响应式变量
  
    为了解决`reactive()`带来的限制，`ref()`方法用来创建响应式的 **ref**，可以装载**任何值类型**。
