# Vue 3
## API风格
 - **选项式API**
 
    使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 `data、methods` 和 `mounted`。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。（Vue2  保持一致）
    ```js
    <script>
     export default {
        // data() 返回的属性将会成为响应式的状态
        // 并且暴露在 `this` 上
        data() {
            return {
            count: 0
            }
        },

        // methods 是一些用来更改状态与触发更新的函数
        // 它们可以在模板中作为事件监听器绑定
        methods: {
            increment() {
            this.count++
            }
        },

        // 生命周期钩子会在组件生命周期的各个不同阶段被调用
        // 例如这个函数就会在组件挂载完成后被调用
        mounted() {
            console.log(`The initial count is ${this.count}.`)
        }
     }
    </script>

    <template>
    <button @click="increment">count is: {{ count }}</button>
    </template>
    ```
 - **组合式API**

    通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常`<script setup>`搭配使用。这个 `setup `attribute 是一个标识，告诉 Vue 需要在编译时进行转换，来减少使用组合式 API 时的样板代码。例如，`<script setup>` 中的导入和顶层变量/函数都能够在模板中直接使用。
    ```js
    <script setup>
        import { ref, onMounted } from 'vue'

        // 响应式状态
        const count = ref(0)

        // 用来修改状态、触发更新的函数
        function increment() {
        count.value++
        }

        // 生命周期钩子
        onMounted(() => {
        console.log(`The initial count is ${count.value}.`)
        })
    </script>

    <template>
        <button @click="increment">Count is: {{ count }}</button>
    </template>
    ```
    
##  API风格对比

    - 选项式 API ：以“组件实例”的概念为中心 (即上述例子中的 this)，对于有面向对象语言背景的用户来说，这通常与基于类的心智模型更为一致。同时，它将响应性相关的细节抽象出来，并强制按照选项来组织代码，从而对初学者而言更为友好。
    - 组合式 API：核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题。这种形式更加自由，也需要你对 Vue 的响应式系统有更深的理解才能高效使用。相应的，它的灵活性也使得组织和重用逻辑的模式变得更加强大。
    - 点睛之笔：**选项式 API 也是用组合式 API 实现的**

vue3在创建项目时默认选用 组合式API,很显然作者也是比较推崇这种方式。组合式API对vue2过来的用户会比较陌生，但是，随着对vue3不段熟悉，应该会体会到组合式API带来的好处！