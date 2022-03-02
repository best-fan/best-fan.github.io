# Vue 3 响应式

## 组合式 API:

### `reactive()` 函数

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
###  `shallowReactive()` 函数

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

###  `ref()`定义响应式变量
  
  为了解决`reactive()`带来的限制，`ref()`方法用来创建响应式的 **ref**，可以装载**任何值类型**。
返回一个带`value`属性的对象
  ```js
  import { ref } from 'vue'
  const count = ref(0) //RefImpl(Object)
  console.log(count.value)//0
  count.value++;
  console.log(count.value)//1
  //当值为对象类型时 用 reactive() 自动转换它的 .value
  const objectRef = ref({ count: 0 })
  // 响应式的替换
  objectRef.value = { count: 1 }

  ```
 -  `ref`被传递给函数 或者 从一般对象上被解构，**不丢失响应性**，经常被用在`组合函数`中
  ```js
  const obj = {
    foo: ref(1),
    bar: ref(2)
  }

  // 该函数接收一个 ref
  // 需要通过 .value 取值
  // 但它会保持响应性
  callSomeFunction(obj.foo)

  // 仍然是响应式的 
  const { foo, bar } = obj
  ```
  - `ref` 在模板中的解包
  
    1、 ref 在模板中作为顶层 property 被访问时，会自动解包，不需要使用 `.value`
    ```js
    <script setup>
      import { ref } from 'vue'

      const count = ref(0)

      function increment() {
        count.value++
      }
    </script>

    <template>
      <button @click="increment">
        {{ count }} <!-- no .value needed -->
      </button>
    </template>
    ```
    2、深层级的 ref 
    ```js
    //访问深层级的 ref 则不会解包
    const object = { foo: ref(1) }
    //无法自动解包
    {{ object.foo }}
    //让 foo 成为顶层 property 来解决这个问题
    const { foo } = object
    {{ foo }} 
    ```
  - `ref` 在响应式对象中的解包( 省去了 `value`)
    ```js
    //ref 作为一个响应式对象的 property 被访问或更改时，它会自动解包
    const count = ref(0)
    const state = reactive({
      count
    })

    console.log(state.count) // 0

    state.count = 1
    console.log(count.value) // 1

    //新的 ref 赋值 给响应式对象某个已经为 ref 的属性 会直接替换
    const otherCount = ref(2)
    state.count = otherCount
    console.log(state.count) // 2
    // 原来的 ref 现在已经和 state.count 脱去联系
    console.log(count.value) // 1

    ```
  - `ref`在浅层响应对象(`shallowReactive`)中使用
    
    ```js
    //浅层响应式对象  不会进行解包  需要访问.value 获取值
    const mm=ref(0)
    const dd1=shallowReactive({mm})
    console.log(dd1.mm.value)//1
    dd1.mm.value++;
    console.log(dd1.mm.value)//2
    console.log(mm.value)//2
    ```
  - `ref` 在数组或 Map 这样的原生集合类型中使用
    ```js
    //不会进行解包 需要访问.value
    const books = reactive([ref('Vue 3 Guide')])
    console.log(books[0].value)

    const map = reactive(new Map([['count', ref(0)]]))
    console.log(map.get('count').value)
    ```
###  `$ref()`响应性语法糖

  $ref()目前处于实验性阶段，开启方式：[说明文档](https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in)

    **开启条件**：

      - 1、vue@^3.2.25
      - 2、@vitejs/plugin-vue@^2.0.0

  使用方式：
  ```js
  <script setup>
    let count = $ref(0)

    function increment() {
      // no need for .value
      count++
    }
  </script>

  <template>
     <button @click="increment">{{ count }}</button>
  </template>
  ```




  