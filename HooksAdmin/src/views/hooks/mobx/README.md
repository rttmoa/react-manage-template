# 零、启动项目
```shell
git clone https://github.com/Stars-Chan/mobx-induction
cd mobx-induction
yarn
yarn start
```
# 一、mobx基本介绍
mobx是一个简单、可扩展状态工具，相比redux，具有以下特点
- 简洁、无模板代码（redux需要写大量模板代码）
- 响应式数据，可直接修改（redux需要保证不可变）
- 可直接处理异步（redux需要中间件处理异步）
- 适合简单、规模不大的应用（redux约束强，更适合大型多人协作开发）

**注**：mobx6默认不开启修饰器语法
# 二、mobx的使用
## 1、搭建项目
新建一个ts的react项目
```shell
npx create-react-app my-app --template typescript
```
安装mobx库
```shell
yarn add mobx mobx-react --save
```

**注**：轻量级的mobx-react-lite只支持函数组件 
## 2、核心概念
![在这里插入图片描述](https://img-blog.csdnimg.cn/12a7fdc6efe84bbfa24f18c041ecc781.png#pic_center)
- observable定义一个存储state的可追踪字段（Proxy）
- action将一个方法标记为可以修改state的action
- computed标记一个可以由state派生出新值并且缓存其输出的计算属性

## 3、创建store
以一个计数器为例，创建文件store/Counter.ts，新建一个Counter类，使用makeObservable方法将类的属性和方法变成响应式，并导出实例
**注**：mobx中的每一个store都应该只初始化一次
```typescript
// store/Counter.ts
import {action, makeObservable, observable} from 'mobx'
class Counter {
  constructor(){
    // 参数1：target，把谁变成响应式（可观察）
    // 参数2：指定哪些属性或者方法变成可观察
    makeObservable(this, {
       count: observable,
       increment: action,
       decrement: action,
       reset: action,
     })
  }
  count = 0
  increment(){
    this.count++
  }
  decrement(){
    this.count--
  }
  reset(){
    this.count = 0
  }
}
const counter = new Counter()
export default counter 
```
在组件中使用，需要在App.tsx文件中引入store，即可使用其属性方法
```typescript
// App.tsx
import counter from './store/Counter';
// observer是一个高阶组件函数，需要包裹一个组件，这样组件才会更新
import { observer } from 'mobx-react'

function App() {
  const {cart, counter} = useStore()
  return (
    <div className="App">
      <h3>计数器案例</h3>
      <div>点击次数：{counter.count}</div>
      <button onClick={()c=> ounter.increment()}>加1</button>
      <button onClick={()c=> ounter.decrement()}>减1</button>
      <button onClick={() => counter.reset()}>重置</button>
    </div>
  );
}
export default observer(App);

```

## 4、this指向问题
默认class中的方法不会绑定this，this指向取决于如何调用。Counter里面的方法的this没有绑定，因此需要通过箭头函数的形式使用
```typescript
<button onClick={()c=> ounter.increment()}>加1</button>
```
要想直接使用，需要在Counter里面的makeObservable的使用通过action.bound绑定this的指向
```typescript
    makeObservable(this, {
       count: observable,
       increment: action.bound,
       reset: action.bound,
     })
```
此时组件中即可直接使用store的方法
```typescript
<button onClick={counter.increment}>加1</button>
```

## 5、计算属性
mobx的computed可以用来从其他可观察对象中派生信息，具有以下特点：
- 采用惰性求值，会缓存其输出，并且只有当其依赖的可观察对象被改变是才会重新计算
- 其前面必须使用get进行修饰
- 还需要通过makeObservable方法指定
以double为例
```typescript
...
    makeObservable(this, {
       count: observable,
       increment: action.bound,
       reset: action.bound,
       double: computed,
     })
...
get double(){
  return this.count * 2
}
```
## 6、makeAutoObservable的使用
makeAutoObservable是加强版的makeObservable，在默认情况下它将推断所有属性。推断规格如下：
- 所有属性都成为observable
- 所有方法都成为action
- 所有的个体都成为computed
可以通过第二个参数overrides排除不需要被观察的属性和方法，第三个参数autoBind可以绑定this指向
```typescript
    // 参数1：target，把谁变成响应式（可观察）
    // 参数2：排除属性和方法
    // 参数3：指定自动绑定this
    makeAutoObservable(this, {}, {autoBind: true})
```
# 三、mobx监听属性
mobx中有两个监听方法autorun和reaction，其中：
- autorun函数接受一个函数作为参数，在创建以及每当该函数所观察的值发生变化时，它都应该运行；mobx会自动收集并订阅所有可观察属性，一旦有改变发生，autorun将会再次触发
```typescript
autorun(() => {
   console.log('counter', counter.count);
})
```
- reaction类似autorun，但在初始化时不会自动运行，且可以让你更加精细地控制要跟踪的可观察对象，其接受两个函数作为参数，参数1为data函数，其返回值将会作为第二个函数输入，参数2为回调函数
```typescript
reaction(
  () => counter.count,
  (newValue, oldValue) => {
    console.log('counter.count变化了');
  }
)
```
# 四、异步处理
异步进程在mobx中不需要任何特殊处理，因为不论是何时引发的所有reaction都将会自动更新，这是因为可观察对象是可变的，在action执行过程中保持对它们的引用一般是安全的。
如果可观察对象的修改不是在action函数中，控制台会报警告，这是可以通过runInAction保证所有异步更新可观察对象步骤都标识为action
```typescript
  incrementAsync(){
    setTimeout(() => {
      runInAction(() => {
        this.count++
      })
    }, 2000)
  }
```
# 五、模块化
mobx模块化管理即通过一个根store统一管理所有store
![在这里插入图片描述](https://img-blog.csdnimg.cn/d64142dc63724a789d5d4c3316f3778a.png#pic_center)
新建store/index.ts文件，导入所有store，使用useContext机制，自定义useStore hook，统一导出store
```typescript
import { useContext, createContext } from 'react'
import cart from './Cart'
import counter from './Counter'

class RootStore {
  cart = cart
  counter = counter
}
const store = new RootStore()
const Context = createContext(store)
export const useStore = () => {
  return useContext(Context)
}
```
在App.tsx中统一导入，解构得到相应store
```typescript
import {useStore} from './store'
...
	const {cart, counter} = useStore()
...
```

