
# Vue3.2

**起初 Vue3.0 暴露变量必须 `return` 出来，`template` 中才能使用；**

**Vue3.2 中 只需要在 `script` 标签上加上 `setup` 属性，组件在编译的过程中代码运行的上下文是在 `setup()` 函数中，无需 `return`，`template` 可直接使用。**

## 一、文件结构

Vue2中，` 标签中只能有一个根元素，在Vue3中没有此限制

```javascript
<template>
  // ...
</template>

<script setup>
  // ...
</script>

<style lang="scss" scoped>
  // 支持CSS变量注入v-bind(color)
</style>

```

## 二、data

```javascript
<script setup>
  import { reactive, ref, toRefs } from 'vue'

  // ref声明响应式数据，用于声明基本数据类型
  const name = ref('Jerry')
  // 修改
  name.value = 'Tom'

  // reactive声明响应式数据，用于声明引用数据类型
  const state = reactive({
    name: 'Jerry',
    sex: '男'
  })
  // 修改
  state.name = 'Tom'
  
  // 使用toRefs解构
  const {name, sex} = toRefs(state)
  // template可直接使用{{name}}、{{sex}}
</script>

```

## 三、method

```javascript
<template>
  // 调用方法
  <button @click='changeName'>按钮</button>  
</template>

<script setup>
  import { reactive } from 'vue'

  const state = reactive({
    name: 'Jery'
  })

  // 声明method方法
  const changeName = () => {
    state.name = 'Tom'
  }  
</script>

```

## 四、computed

```javascript
<script setup>
  import { computed, ref } from 'vue'

  const count = ref(1)

  // 通过computed获得doubleCount
  const doubleCount = computed(() => {
    return count.value * 2
  })
  // 获取
  console.log(doubleCount.value)
</script>

```

## 五、watch

```javascript
<script setup>
  import { watch, reactive } from 'vue'

  const state = reactive({
    count: 1
  })

  // 声明方法
  const changeCount = () => {
    state.count = state.count * 2
  }

  // 监听count
  watch(
    () => state.count,
    (newVal, oldVal) => {
      console.log(state.count)
      console.log(`watch监听变化前的数据：${oldVal}`)
      console.log(`watch监听变化后的数据：${newVal}`)
    },
    {
      immediate: true, // 立即执行
      deep: true // 深度监听
    }
  )
</script>

```

## 六、props父传子

### 子组件

```javascript
<template>
  <span>{{props.name}}</span>
  // 可省略【props.】
  <span>{{name}}</span>
</template>

<script setup>
  // import { defineProps } from 'vue'
  // defineProps在<script setup>中自动可用，无需导入
  // 需在.eslintrc.js文件中【globals】下配置【defineProps: true】

  // 声明props
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  })  
</script>

```

### 父组件

引入子组件，组件会自动注册

```javascript
<template>
  <child name='Jerry'/>  
</template>

<script setup>
  // 引入子组件
  import child from './child.vue'
</script>

```

## 七、emit子传父

### 子组件

```javascript
<template>
  <span>{{props.name}}</span>
  // 可省略【props.】
  <span>{{name}}</span>
  <button @click='changeName'>更名</button>
</template>

<script setup>
  // import { defineEmits, defineProps } from 'vue'
  // defineEmits和defineProps在<script setup>中自动可用，无需导入
  // 需在.eslintrc.js文件中【globals】下配置【defineEmits: true】、【defineProps: true】
	
  // 声明props
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  }) 
  // 声明事件
  const emit = defineEmits(['updateName'])
  
  const changeName = () => {
    // 执行
    emit('updateName', 'Tom')
  }
</script>

```

### 父组件

```javascript
<template>
  <child :name='state.name' @updateName='updateName'/>  
</template>

<script setup>
  import { reactive } from 'vue'
  // 引入子组件
  import child from './child.vue'

  const state = reactive({
    name: 'Jerry'
  })
  
  // 接收子组件触发的方法
  const updateName = (name) => {
    state.name = name
  }
</script>

```

## 八、v-model

支持绑定多个`v-model`，`v-model` 是 `v-model:modelValue` 的简写 
 绑定其他字段，如：`v-model:name`

### 子组件

```javascript
<template>
  <span @click="changeInfo">我叫{{ modelValue }}，今年{{ age }}岁</span>
</template>

<script setup>
  // import { defineEmits, defineProps } from 'vue'
  // defineEmits和defineProps在<script setup>中自动可用，无需导入
  // 需在.eslintrc.js文件中【globals】下配置【defineEmits: true】、【defineProps: true】

  defineProps({
    modelValue: String,
    age: Number
  })

  const emit = defineEmits(['update:modelValue', 'update:age'])
  const changeInfo = () => {
    // 触发父组件值更新
    emit('update:modelValue', 'Tom')
    emit('update:age', 30)
  }
</script>

```

### 父组件

```javascript
<template>
  // v-model:modelValue简写为v-model
  // 可绑定多个v-model
  <child
    v-model="state.name"
    v-model:age="state.age"
  />
</template>

<script setup>
  import { reactive } from 'vue'
  // 引入子组件
  import child from './child.vue'

  const state = reactive({
    name: 'Jerry',
    age: 20
  })
</script>

```

## 九、nextTick

```javascript
<script setup>
  import { nextTick } from 'vue'
	
  nextTick(() => {
    // ...
  })
</script>

```

## 十、ref子组件实例和defineExpose

- 在标准组件写法里，子组件的数据都是默认隐式暴露给父组件的，但在 script-setup 模式下，所有数据只是默认 return 给 template 使用，不会暴露到组件外，所以父组件是无法直接通过挂载 ref 变量获取子组件的数据。
- 如果要调用子组件的数据，需要先在子组件显示的暴露出来，才能够正确的拿到，这个操作，就是由 defineExpose 来完成。

### 子组件

```javascript
<template>
  <span>{{state.name}}</span>
</template>

<script setup>
  import { reactive, toRefs } from 'vue'
  // defineExpose无需引入
  // import { defineExpose, reactive, toRefs } from 'vue'

  // 声明state
  const state = reactive({
    name: 'Jerry'
  }) 
	
  // 将方法、变量暴露给父组件使用，父组件才可通过ref API拿到子组件暴露的数据
  defineExpose({
    // 解构state
    ...toRefs(state),
    // 声明方法
    changeName () {
      state.name = 'Tom'
    }
  })
</script>

```

### 父组件

#### 1. 获取一个子组件实例

```typescript
<template>
  <child ref='childRef'/>
</template>

<script setup>
  import { ref, nextTick } from 'vue'
  // 引入子组件
  import child from './child.vue'

  // 子组件ref（TypeScript语法）
  const childRef = ref<InstanceType<typeof child>>()
  
  // nextTick
  nextTick(() => {
    // 获取子组件name
    console.log(childRef.value.name)
    // 执行子组件方法
    childRef.value.changeName()
  })
</script>

```

#### 2. 获取多个子组件实例：在 v-for 中获取子组件实例

这种情况仅适用于 v-for `循环数是固定的情况` ，因为如果 v-for `循环数` 在初始化之后发生改变，那么就会导致 childRefs 再一次重复添加，childRefs 中会出现重复的子组件实例

```typescript
<template>
  <div v-for="item in 3" :key="item">
    <child :ref='addChildRef'/>
  </div>
</template>

<script setup>
  // 省略...
  
  // 子组件实例数组
  const childRefs = ref([])
  // 通过 addChildRef 方法向 childRefs 添加子组件实例
  const addChildRef = (el) => {
    childRefs.value.push(el)
  }
</script>

```

#### 3. 获取多个子组件实例：动态 v-for 获取子组件实例

通过下标来向 childRefs 添加/修改，初始化之后，动态修改 v-for 循环数，会自动根据下标重新修改该下标对应的数据

```typescript
<template>
  <button @click='childNums++'></button>
  <div v-for="(item, i) in childNums" :key="item">
    // 通过下标向 childRefs 动态添加子组件实例
    <child :ref='(el) => childRefs[i] = el'/>
  </div>
  <button @click='childNums--'></button>
</template>

<script setup>
  // 省略...
  
  // 子组件数量
  const childNums = ref(1)
  // 子组件实例数组
  const childRefs = ref([])
</script>

```

## 十、插槽slot

### 子组件

```javascript
<template>
  // 匿名插槽
  <slot/>
  // 具名插槽
  <slot name='title'/>
  // 作用域插槽
  <slot name="footer" :scope="state" />
</template>

<script setup>
  import { useSlots, reactive } from 'vue'
  const state = reactive({
    name: '张三',
    age: '25岁'
  })
  
  const slots = useSlots()
  // 匿名插槽使用情况
  const defaultSlot = reactive(slots.default && slots.default().length)
  console.log(defaultSlot) // 1
  // 具名插槽使用情况
  const titleSlot = reactive(slots.title && slots.title().length)
  console.log(titleSlot) // 3
</script>

```

### 父组件

```javascript
<template>
  <child>
    // 匿名插槽
    <span>我是默认插槽</span>
    // 具名插槽
    <template #title>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
    </template>
    // 作用域插槽
    <template #footer="{ scope }">
      <footer>作用域插槽——姓名：{{ scope.name }}，年龄{{ scope.age }}</footer>
    </template>
  </child> 
</template>

<script setup>
  // 引入子组件
  import child from './child.vue'
</script>

```

## 十二、路由useRoute和useRouter

```javascript
<script setup>
  import { useRoute, useRouter } from 'vue-router'
	
  // 必须先声明调用
  const route = useRoute()
  const router = useRouter()
	
  // 路由信息
  console.log(route.query)

  // 路由跳转
  router.push('/newPage')
</script>

```

## 十三、路由导航守卫

```javascript
<script setup>
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
	
  // 添加一个导航守卫，在当前组件将要离开时触发。
  onBeforeRouteLeave((to, from, next) => {
    next()
  })

  // 添加一个导航守卫，在当前组件更新时触发。
  // 在当前路由改变，但是该组件被复用时调用。
  onBeforeRouteUpdate((to, from, next) => {
    next()
  })
</script>

```

## 十四、store

### Vuex

*Vue3 中的Vuex不再提供辅助函数写法

```javascript
<script setup>
  import { useStore } from 'vuex'
  import { key } from '../store/index'

  // 必须先声明调用
  const store = useStore(key)
	
  // 获取Vuex的state
  store.state.xxx

  // 触发mutations的方法
  store.commit('fnName')

  // 触发actions的方法
  store.dispatch('fnName')

  // 获取Getters
  store.getters.xxx
</script>

```

### Pinia

*全面拥抱 `Pinia` 吧！ 
 2021年11月24日，尤大在 Twitter 上宣布：`Pinia` 正式成为 Vue 官方的状态库，意味着 `Pinia` 就是 `Vuex 5` ，`Pinia` 的优点： 

- 同时支持 Composition Api 和 Options api 的语法；
- 去掉 mutations ，只有 state 、getters 和 actions ；
- 不支持嵌套的模块，通过组合 store 来代替；
- 更完善的 Typescript 支持；
- 清晰、显式的代码拆分；

#### 安装

```javascript
# 使用 npm
npm install pinia

# 使用 yarn
yarn add pinia

```

#### main.js 引入

```javascript
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

```

#### 配置 store.js

```javascript
import { defineStore } from 'pinia'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须，在所有 Store 中唯一
  id: 'globalState',
  // state: 返回对象的函数
  state: () => ({
    count: 1,
    data: {
      name: 'Jerry',
      sex: '男'
    }
  }),
  // getter 第一个参数是 state，是当前的状态，也可以使用 this 获取状态
  // getter 中也可以访问其他的 getter，或者是其他的 Store
  getters: {
    // 通过 state 获取状态
    doubleCount: (state) => state.count * 2,
    // 通过 this 获取状态（注意this指向）
    tripleCount() {
      return this.count * 3
    }
  },
  actions: {
    updateData (newData, count) {
      // 使用 this 直接修改
      this.data = { ...newData }
      this.count = count
      
      // 使用 $patch 修改多个值
      this.$patch({
        data: { ...newData },
        count
      })
    }
  }
})

```

#### 使用 store

```javascript
<template>
  // 获取 store 的 state
  <p>姓名：{{store.data.name}}</p>
  <p>性别：{{store.data.sex}}</p>
  
  // 调用 mutations 方法 / 修改 store
  <button @click='update'>修改用户信息</button>
  
  // 获取 getter
  <p>获取getter：{{store.doubleCount}}</p>
</template>

<script setup>
  import { useStore } from '@store/store.js'
  const store = useStore()
  
  function update () {
    // 通过 mutations 定义的方法修改 state
    store.updateData({ name: 'Tom', sex: '女' })
    
    // 通过 store 直接修改
    store.data = { name: 'Tom', sex: '女' }
    
    // 同时改变多个状态
    store.$patch((state) => {
      state.data = { name: 'Tom', sex: '女' }
      state.count = 2
    })
  }
</script>

<style lang="scss" scoped>
</style>

```

#### 其他方法

**替换整个 state** 
 `$state` 可以让你通过将 `store` 的属性设置为新对象来替换 `store` 的整个 `state`

```javascript
const store = useStore()
store.$state = {
  name: 'Bob',
  sex: '男'
}

```

**重置状态** 
 调用 `store` 上的 `$reset()` 方法将状态重置为初始值

```javascript
const store = useStore()
store.$reset()

```

## 十五、生命周期

通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

下表包含如何在 Option API 和 setup() 内部调用生命周期钩子

| **Option API**  | **setup中**       |
| --------------- | ----------------- |
| beforeCreate    | 不需要            |
| created         | 不需要            |
| beforeMount     | onBeforeMount     |
| mounted         | onMounted         |
| beforeUpdate    | onBeforeUpdate    |
| updated         | onUpdated         |
| beforeUnmount   | onBeforeUnmount   |
| unmounted       | onUnmounted       |
| errorCaptured   | onErrorCaptured   |
| renderTracked   | onRenderTracked   |
| renderTriggered | onRenderTriggered |
| activated       | onActivated       |
| deactivated     | onDeactivated     |

## 十六、原型绑定与组件内使用

### main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 获取原型
const prototype = app.config.globalProperties

// 绑定参数
prototype.name = 'Jerry'

```

### 组件内使用

```javascript
<script setup>
  import { getCurrentInstance } from 'vue'

  // 获取原型
  const { proxy } = getCurrentInstance()
  
  // 输出
  console.log(proxy.name)
</script>

```

## 十七、v-bind() CSS变量注入

```javascript
<template>
  <span>Jerry</span>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  // prop接收样式
  const props = defineProps({
    border: {
      type: String,
      default: '1px solid yellow'
    }
  })
  
  // 常量声明样式
  const background = 'red'
  
  // 响应式数据声明样式
  const color = ref('blue')
  const style = reactive({
    opacity: '0.8'
  })
</script>

<style lang="scss" scoped>
  span {
    // 使用常量声明的样式
    background: v-bind(background);
    
    // 使用响应式数据声明的样式
    color: v-bind(color);
    opacity: v-bind('style.opacity');
    
    // 使用prop接收的样式
    border: v-bind('props.border');
  }
</style>

```

## 十八、provide和inject

### 父组件

```javascript
<template>
  <child/>
</template>

<script setup>
  import { provide } from 'vue'
  import { ref, watch } from 'vue'
  // 引入子组件
  import child from './child.vue'

  let name = ref('Jerry')
  // 声明provide
  provide('provideState', {
    name,
    changeName: () => {
      name.value = 'Tom'
    }
  })

  // 监听name改变
  watch(name, () => {
    console.log(`name变成了${name}`)
    setTimeout(() => {
      console.log(name.value) // Tom
    }, 1000)
  })
</script>

```

### 子组件

```javascript
<script setup>
  import { inject } from 'vue'
	// 注入
  const provideState = inject('provideState')
  
  // 子组件触发name改变
  provideState.changeName()
</script>

```

## 十九、对 await 的支持

不必再配合 async 就可以直接使用 await 了，这种情况下，组件的 setup 会自动变成 async setup 。

```javascript
<script setup>
  const post = await fetch('/api').then(() => {})
</script>

```

## 二十、定义组件的name

用单独的``块来定义

```javascript
<script>
  export default {
    name: 'ComponentName',
  }
</script>

```

