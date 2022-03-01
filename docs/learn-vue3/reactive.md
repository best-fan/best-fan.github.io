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
  ```js
    <script setup>
  import {reactive, ref ,shallowReactive} from 'vue';
  //ref()定义响应式变量
  // reactive()创建一个响应式对象或数组
  const count= ref(0)
  console.log(count)
  //ref() 从参数中获取到值，将其包装为一个带 .value 属性的对象
  console.log(count.value)
  count.value++;
  console.log(count.value);
  // 可以响应式地替换整个对象
  const objRef=ref({mm:1});
  objRef.value={mm:3}

  //ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性
  const obj = {
    foo: ref(1),
    bar: ref(2)
  }
  // 该函数接收一个 ref
  // 需要通过 .value 取值
  // 但它会保持响应性
  // callSomeFunction(obj.foo)

  // 仍然是响应式的
  const { foo, bar } = obj
  foo.value=2;
  console.log('foo',foo.value);
  console.log('obj',obj.foo);


  // ref 在模板中的解包
  //1、 顶层 property
  const counts=ref(0)
  function add(){
      counts.value++
  }
  //2、深层级的 ref 
  const objs={fot:ref(0)}
  // 通过解构 成为顶层 property 
  const {fot}=objs
  function setM(){
      fot.value++;
    
  }

  // ref 在响应式对象中的解包( 省去了 value)
  const mm=ref(0)

  const dd=reactive({mm})
  console.log(dd.mm)//0
  dd.mm++;
  console.log(dd.mm)//1
  console.log(mm.value)//1
  // 将一个新的 ref 赋值给响应式对象(reactive)中已存在的 ref 的属性，
  // 会替换掉旧的 ref
  const nn= ref(5)
  dd.mm=nn;
  console.log(dd.mm);//5
  console.log(mm.value)//1
  console.log('浅层响应式对象')

  // 浅层响应式对象  不会进行解包  需要访问.value 获取值
  const dd1=shallowReactive({mm})
  console.log(dd1.mm.value)//1
  dd1.mm.value++;
  console.log(dd1.mm.value)//2
  console.log(mm.value)//2

  // 数组或 Map 这样的原生集合类型访问 ref 时，也不会进行解包
  const books = reactive([ref('Vue 3 Guide')])
  // 这里需要 .value
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // 这里需要 .value
  console.log(map.get('count').value)



  // 响应性语法糖 （实验性阶段）
  // 开启方式：https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html

  let  myCount=$ref(0)
  function myAdd(){
      myCount++;
  }

  </script>
  <template>
      <h1 @click="add">ref</h1>
      <!-- 可以不用写counts.value -->
      <div>{{counts}}</div>
      <h1 @click="setM">objSet</h1>
      <!-- 自动解包 -->
      <div>{{fot}}</div>
      <h1 @click="myAdd()"> $ref</h1>
      <div>{{myCount}}</div>
  </template>
  ```