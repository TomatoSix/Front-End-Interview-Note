# node-sass 报错

npm uninstall node-sass
npm uninstall sass-loader
npm install node-sass
npm install sass-loader

# env.d.ts 的作用

配置文件

# setup 的两种写法

setup()比 data()初始化要早

1. 普通模式

```vue
<script lang="ts">
export default {
  name: "AboutView",
  setup() {
    let name = "小六";
    function changeName() {
      console.log(name, "name");
    }
    return {
      name,
      changeName,
    };
  },
};
</script>
```

2. 简写形式

```vue
<script lang="ts">
export default {
  name: "AboutView",
};
</script>
<!-- setup的简写形式 -->
<script setup lang="ts">
// 数据
let name = "小六";
// 方法
function changeName() {
  console.log(name, "name");
  name = "小王";
}
</script>
```

3. 加入 vite-plugin-vue-setup-extend 插件后

```vue
<!-- setup的简写形式 -->
<script setup lang="ts" name="AboutView">
// 数据
let name = "小六";
// 方法
function changeName() {
  console.log(name, "name");
  name = "小王";
}
</script>
```

# vite-plugin-vue-setup-extend 插件

1. 安装 npm i vite-plugin-vue-setup-extend -D
2. vue.config.js 中加入
   import VueSetupExtend from 'vite-plugin-vue-setup-extend'

# ref 和 reactive 的使用

1. ref 主要用来定义基本类型,也可以定义对象类型。
   创建的变量必须使用.value
   可以借助`TypeScript Vue Plugin (Volar)`插件自动补充 value 属性
2. reactive 只用能来定义对象类型

3. 区别

   1. ref 创建的变量必须使用.value
   2. reactive 如果重新分配一个新对象，会失去响应式，需要使用`Object.assign`去整体替换

4. 使用原则
   1. 若需要一个基本类型的响应式数据，必须使用 ref
   2. 若需要一个响应式对象,层级不深,ref、reactive 都可以
   3. 若需要一个响应式对象,且层级较深，推荐使用 reactive

```ts
// setup的简写形式
<script setup lang="ts" name="AboutView">
// 引入ref和reactive
import { ref, reactive } from 'vue'
// ref的使用
let name = ref('小六')
// reactive的使用
let car = reactive({
  brand: '奔驰',
  price: 100
})
let game = ref({
  name: '王者',
  price: 100
})
function changeName() {
  console.log(name, 'name')
  name.value = '小王'
}
function changePrice() {
  car.price += 1
}
function changeCar() {
  // 替换整个reactive变量，页面能更新
  Object.assign(car, {brand: 'Q7', price: 1})
}
/**
 * @desc 修改游戏
 * @returns {any}
 */
function changeGame() {
  game.value = {
    name: '蛋仔',
    price: '未知'
  }
}
</script>
```

# toRefs 与 toRef

1. toRefs 将 reactive 定义对象的每一个属性都转化为 ref 对象
   由于通过解构赋值获取的 reactive 对象的某个属性不是响应式的，修改属性不生效
   `const {name, age} = toRefs(person);name.value="小六"`
2. toRef 将 reactive 定义对象的某个属性转化为 ref 对象
   `let age = toRef(person, 'age')`

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="about">
    <h1>姓名: {{ person.name }}</h1>
    <h1>年龄: {{ person.age }}</h1>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="AboutView">
import { ref, reactive, toRefs, toRef } from "vue";
let person = reactive({
  name: "小王",
  age: 18,
});
// 把reactive定义的person对象中的所有属性定义为响应式数据
// person也会改变
let { name, age } = toRefs(person);
// 将reactive定义的对象中某个属性转为ref对象
let nl = toRef(person, "age");

function changeName() {
  // person.name = '小六'
  name.value = "小六";
}
/**
 * @desc 修改年龄
 * @returns {any}
 */
function changeAge() {
  age.value += 1;
  // person.age += 1
}
</script>

<style scoped lang="scss">
.about {
  width: 100%;
  height: 100vh;
  background-color: rgb(248, 240, 241);
}
</style>
```

# computed 的使用

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="about">
    <h1>姓：<input type="text" v-model="firstName" /></h1>
    <h1>名：<input type="text" v-model="lastName" /></h1>
    <h1>全名：{{ fullName }}</h1>
    <button @click="changeFullName">修改名字</button>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="AboutView">
import { ref, computed } from "vue";

let firstName = ref("zhang");
let lastName = ref("san");

// computed的使用
// 只读的
let fullName = computed(() => {
  return (
    firstName.value.slice(0, 1).toUpperCase() +
    firstName.value.slice(1) +
    " " +
    lastName.value
  );
});
// 可读可写
let fullName1 = computed({
  get() {
    return (
      firstName.value.slice(0, 1).toUpperCase() +
      firstName.value.slice(1) +
      " " +
      lastName.value
    );
  },
  set(val) {
    const [s1, s2] = val.split(" ");
    firstName.value = s1;
    lastName.value = s2;
  },
});
function changeFullName() {
  fullName1.value = "cheng kou";
}
</script>

<style scoped lang="scss">
.about {
  width: 100%;
  height: 100vh;
  background-color: rgb(248, 240, 241);
}
</style>
```

# watch

watch 可以监视以下四种数据

1. ref 定义的数据
2. reactive 定义的数据
3. 函数返回一个值
4. 一个包含上述内容的数组

# 生命周期

# 常见的组件通信方式

1. props

```vue
<!-- 父组件 -->
<template>
  <!-- 可以有多个根标签 -->
  <div class="father">
    <h3>父组件</h3>
    <h4>汽车： {{ car }}</h4>
    <h4 v-show="toy">子给的玩具： {{ toy }}</h4>
    <Child :car="car" :sendToy="getToy"></Child>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="AboutView">
import Child from "./components/child.vue";
import { ref, computed, reactive } from "vue";

let car = ref("奔驰Q7");
let toy = ref("");
// 获取子组件的数据
function getToy(value: string) {
  toy.value = value;
  console.log("父", value);
}
</script>

<style scoped lang="scss">
.father {
  overflow: hidden;
  width: 600px;
  height: 300px;
  padding: 20px;
  background-color: rgb(249, 205, 205, 0.6);
}
</style>
```

```vue
<!-- 子组件 -->
<template>
  <!-- 可以有多个根标签 -->
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具： {{ toy }}</h4>
    <h4>父给的车： {{ car }}</h4>
    <button @click="sendToy(toy)">点击传递子组件的玩具给父组件</button>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="child">
import { ref, computed } from "vue";

let toy = ref("奥特曼");

// 声明接收props
defineProps(["car", "sendToy"]);
</script>

<style scoped lang="scss">
.child {
  width: 600px;
  height: 200px;
  background-color: rgb(248, 240, 241);
  padding: 20px;
}
</style>
```

2. emit

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="father">
    <h3>父组件</h3>
    <h4 v-show="toy">子给的玩具： {{ toy }}</h4>
    <Child @sendToy="saveToy"></Child>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="AboutView">
import Child from "./components/child.vue";
import { ref, computed, reactive } from "vue";

let car = ref("奔驰Q7");
let toy = ref("");

function saveToy(value: string) {
  toy.value = value;
}
</script>

<style scoped lang="scss">
.father {
  overflow: hidden;
  width: 600px;
  height: 300px;
  padding: 20px;
  background-color: rgb(249, 205, 205, 0.6);
}
</style>
```

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具： {{ toy }}</h4>
    <button @click="emit('sendToy', toy)">点击传递子组件的玩具给父组件</button>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="child">
import { ref, computed } from "vue";

let toy = ref("奥特曼");

// 声明接收props
defineProps(["car"]);
const emit = defineEmits(["sendToy"]);
</script>

<style scoped lang="scss">
.child {
  width: 600px;
  height: 200px;
  background-color: rgb(248, 240, 241);
  padding: 20px;
}
</style>
```

3. mitt

```ts
// 安装mitt npm install mitt
// 引入mitt
import mitt from "mitt";
// 调用mitt得到emitter,emitter能绑定事件
const emitter = mitt();
// 暴露emitter
export default emitter;
```

```js
import emitter from "@/utils/emitter.ts";
let toy = ref("");
// 接收事件
emitter.on("getToy", (value) => {
  toy.value = value;
});
```

```js
import emitter from "@/utils/emitter.ts";
// 发送事件
emitter.emit("getToy", "玩具是迪迦");
```

4. v-model

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="father">
    <h3>父组件</h3>
    姓名：<input type="text" v-model="username" /> 密码：<input
      type="text"
      v-model="password"
    />
    <!-- 对于原生事件，$event就是事件对象 -->
    <!-- 对于自定义事件，$event就是触发事件时所传递的数据 -->
    <child
      :modelValue="username"
      @update:modelValue="username = $event"
    ></child>
    <!--相当于  -->
    <!-- <child v-model="username"></child> -->
    <!-- 修改modelValue -->
    <child v-model:password="password"></child>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="AboutView">
import Child from "./components/child.vue";
import { ref, computed, reactive } from "vue";
let username = ref("");
let password = ref("");
</script>

<style scoped lang="scss">
.father {
  overflow: hidden;
  width: 600px;
  height: 1000px;
  padding: 20px;
  background-color: rgb(249, 205, 205, 0.6);
}
</style>
```

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="child">
    <h3>子组件</h3>
    <h4>姓名</h4>
    <input
      type="text"
      :value="modelValue"
      @input="
        emit('update:modelValue', (<HTMLInputElement>$event.target).value)
      "
    />
    <h4>密码</h4>
    <input
      type="text"
      :value="password"
      @input="emit('update:password', (<HTMLInputElement>$event.target).value)"
    />
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="child">
import { ref, computed } from "vue";

defineProps(["modelValue", "password"]);
const emit = defineEmits(["update:modelValue", "update:password"]);
</script>

<style scoped lang="scss">
.child {
  width: 600px;
  height: 200px;
  background-color: rgb(248, 240, 241);
  padding: 20px;
}
</style>
```

5. $attrs

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="father">
    <h3>父组件</h3>
    <Child :a="a" :b="b" :c="c" :d="d" :updateA="updateA"></Child>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="AboutView">
import Child from "./components/child.vue";
import { ref, computed, reactive } from "vue";
let a = ref(1);
let b = ref(2);
let c = ref(3);
let d = ref(4);
// 更新a
function updateA(value: number) {
  a.value += value;
}
</script>

<style scoped lang="scss">
.father {
  overflow: hidden;
  width: 600px;
  height: 1000px;
  padding: 20px;
  background-color: rgb(249, 205, 205, 0.6);
}
</style>
```

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="child">
    <h3>子组件</h3>
    <h4>a:{{ a }}</h4>
    <!-- 其实剩余的props都在$attrs中 -->
    <h4>$attrs：{{ $attrs }}</h4>
    <!-- v-bind={x:2, y:3} 就相当于 :x="x" :y="y" -->
    <GrandChild v-bind="$attrs"></GrandChild>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="child">
import GrandChild from "./grandChild.vue";
import { ref, computed } from "vue";

defineProps(["a"]);
</script>

<style scoped lang="scss">
.child {
  width: 600px;
  height: 300px;
  background-color: rgb(248, 240, 241);
  padding: 20px;
}
</style>
```

```vue
<template>
  <!-- 可以有多个根标签 -->
  <div class="about">
    <h3>孙子组件</h3>
    <p>b: {{ b }}</p>
    <p>c: {{ c }}</p>
    <p>d: {{ d }}</p>
    <button @click="updateA(1)">点我更新父组件中的a</button>
  </div>
</template>

<!-- setup的简写形式 -->
<script setup lang="ts" name="GrandChild">
import { ref, computed } from "vue";

defineProps(["b", "c", "d", "updateA"]);
</script>

<style scoped lang="scss">
.about {
  width: 100%;
  height: 200px;
  background-color: rgb(222, 219, 219);
}
</style>
```

6. $parent

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>房产：{{ house }}</h4>
    <button @click="changeToy">修改Child1的玩具</button>
    <button @click="changeComputer">修改Child2的电脑</button>
    <button @click="getAllChild($refs)">让所有孩子的书变多</button>
    <Child1 ref="c1" />
    <Child2 ref="c2" />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child1 from "./Child1.vue";
import Child2 from "./Child2.vue";
import { ref, reactive } from "vue";
let c1 = ref();
let c2 = ref();

// 注意点：当访问obj.c的时候，底层会自动读取value属性，因为c是在obj这个响应式对象中的
/* let obj = reactive({
		a:1,
		b:2,
		c:ref(3)
	})
	let x = ref(4)

	console.log(obj.a)
	console.log(obj.b)
	console.log(obj.c)
	console.log(x) */

// 数据
let house = ref(4);
// 方法
function changeToy() {
  c1.value.toy = "小猪佩奇";
}
function changeComputer() {
  c2.value.computer = "华为";
}
function getAllChild(refs: { [key: string]: any }) {
  console.log(refs);
  for (let key in refs) {
    refs[key].book += 3;
  }
}
// 向外部提供数据
defineExpose({ house });
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}

.father button {
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
```

```vue
<template>
  <div class="child1">
    <h3>子组件1</h3>
    <h4>玩具：{{ toy }}</h4>
    <h4>书籍：{{ book }} 本</h4>
    <button @click="minusHouse($parent)">干掉父亲的一套房产</button>
  </div>
</template>

<script setup lang="ts" name="Child1">
import { ref } from "vue";
// 数据
let toy = ref("奥特曼");
let book = ref(3);

// 方法
function minusHouse(parent: any) {
  parent.house -= 1;
}

// 把数据交给外部
defineExpose({ toy, book });
</script>

<style scoped>
.child1 {
  margin-top: 20px;
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
```

```vue
<template>
  <div class="child2">
    <h3>子组件2</h3>
    <h4>电脑：{{ computer }}</h4>
    <h4>书籍：{{ book }} 本</h4>
  </div>
</template>

<script setup lang="ts" name="Child2">
import { ref } from "vue";
// 数据
let computer = ref("联想");
let book = ref(6);
// 把数据交给外部
defineExpose({ computer, book });
</script>

<style scoped>
.child2 {
  margin-top: 20px;
  background-color: orange;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
```

7. provide/inject

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>银子：{{ money }}万元</h4>
    <h4>车子：一辆{{ car.brand }}车，价值{{ car.price }}万元</h4>
    <Child />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref, reactive, provide } from "vue";

let money = ref(100);
let car = reactive({
  brand: "奔驰",
  price: 100,
});
function updateMoney(value: number) {
  money.value -= value;
}

// 向后代提供数据
provide("moneyContext", { money, updateMoney });
provide("car", car);
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
</style>
```

```vue
<template>
  <div class="child">
    <h3>我是子组件</h3>
    <GrandChild />
  </div>
</template>

<script setup lang="ts" name="Child">
import GrandChild from "./GrandChild.vue";
</script>

<style scoped>
.child {
  margin-top: 20px;
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
```

```vue
<template>
  <div class="grand-child">
    <h3>我是孙组件</h3>
    <h4>银子：{{ money }}</h4>
    <h4>车子：一辆{{ car.brand }}车，价值{{ car.price }}万元</h4>
    <button @click="updateMoney(6)">花爷爷的钱</button>
  </div>
</template>

<script setup lang="ts" name="GrandChild">
import { inject } from "vue";
// 第二个参数表示默认值
let { money, updateMoney } = inject("moneyContext", {
  money: 0,
  updateMoney: (param: number) => {},
});
let car = inject("car", { brand: "未知", price: 0 });
</script>

<style scoped>
.grand-child {
  background-color: orange;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
}
</style>
```

8. pinia
9. slot
