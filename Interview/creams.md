### 箭头函数的prototype?

### 是否有arguments

#### 1. **箭头函数没有 prototype (原型)，所以箭头函数本身没有this**

#### 2. **箭头函数不会创建自己的this**

#### 3. **call | apply | bind 无法改变箭头函数中this的指向**

#### 4. **箭头函数不能作为构造函数使用**

#### 5. **箭头函数不绑定arguments，取而代之用rest参数...代替arguments对象，来访问箭头函数的参数列表**

#### 6. **箭头函数不能用作Generator函数，不能使用yeild关键字**

  

### Promise.allSettled 与 promise.all区别

allSettled 返回的是每个promise 的状态

### generator yield原理

next 方法 value, done?

babel 转换后是什么样子?

### generator 中捕获error

#### 1. 构造体内部捕获
```js
function *F(){
   try{
     yield 1
   }catch(e){
     console.log(e)
   }
}
var f=F();
f.next()//增加了一句next执行，可以执行generator里面的内容
f.throw(new Error('test1'))
//捕获错误 Error test1
```

#### 2. 在**Generator**构造体外部捕获错误
```js
function *F(){
  yield 1;
  yield 2;
  return 3;
}
var f=F();
try{
  f.throw(new Error('test1'))
}catch(e){
  console.log(e)
}
// Error test1
```
#### 3. 如果**Generator**的错误没有被捕获，就不会继续执行
```js
function *F(){
  yield 1;
  throw new Error('test1');
  yield 2;
  return 3
}
var f=F();
f.next() // {value:1,done:false}
f.next() // {value:undefined,done:true}
```
  
useContext 中的 consumer?

ts4 新特性?

ts哪些内置泛型?

### symbol 和 symbol.for

和 Symbol() 不同的是，用 Symbol.for() 方法创建的的 symbol 会被放入一个全局 symbol 注册表中。

Symbol.for() 并不是每次都会创建一个新的 symbol，它会首先检查给定的 key 是否已经在注册表中了。

假如是，则会直接返回上次存储的那个。否则，它会再新建一个。
```js
Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo"
Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol

Symbol.for("bar") === Symbol.for("bar"); // true，证明了上面说的
Symbol("bar") === Symbol("bar"); // false，Symbol() 函数每次都会返回新的一个 symbol

var sym = Symbol.for("mario");
sym.toString();
// "Symbol(mario)"，mario 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串
```
## react hooks

### 1. useEffect 与 useLayoutEffect

#### useEffect(create, deps):

-   在组件渲染到屏幕之后执行

#### useLayoutEffect(create, deps):

-   会在所有的 DOM 变更之后同步调用

1.  useEffect 和 useLayoutEffect 的区别？
-   useEffect 在渲染时是异步执行，并且要等到浏览器将所有变化渲染到屏幕后才会被执行。
-   useLayoutEffect 在渲染时是同步执行，其执行时机与 componentDidMount，componentDidUpdate 一致


2.  useEffect 和 useLayoutEffect 哪一个与 componentDidMount，componentDidUpdate 的是等价的？
-   useLayoutEffect，因为从源码中调用的位置来看，useLayoutEffect的 create 函数的调用位置、时机都和 componentDidMount，componentDidUpdate 一致，且都是被 React 同步调用，都会阻塞浏览器渲染。

3.  useEffect 和 useLayoutEffect 哪一个与 componentWillUnmount 的是等价的？
-   同上，useLayoutEffect 的 detroy 函数的调用位置、时机与 componentWillUnmount 一致，且都是同步调用。useEffect 的 detroy 函数从调用时机上来看，更像是 componentDidUnmount (注意React 中并没有这个生命周期函数)。

4.  为什么建议将修改 DOM 的操作里放到 useLayoutEffect 里，而不是 useEffect？
-   DOM 已经被修改，但但浏览器渲染线程依旧处于被阻塞阶段，所以还没有发生回流、重绘过程。由于内存中的 DOM 已经被修改，通过 useLayoutEffect 可以拿到最新的 DOM 节点，并且在此时对 DOM 进行样式上的修改, 假设修改了元素的 height, 依旧只有一次回流、重绘的代价

  

### 2. useMemo 和 React.memo

#### React.memo

`React.memo()`是一个高阶函数，它与 [React.PureComponent](https://links.jianshu.com/go?to=https%3A%2F%2Freactjs.org%2Fdocs%2Freact-api.html%23reactpurecomponent)类似，但是一个函数组件而非一个类

```js
import React  from 'react';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date : new Date()
        }
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                date:new Date()
            })
        },1000)
    }

    render(){
        return (
            <div>
                <Child seconds={1}/>
                <div>{this.state.date.toString()}</div>
            </div>
        )
    }
}


// child
// 现在有一个显示时间的组件,每一秒都会重新渲染一次，对于Child组件我们肯定不希望也跟着渲染，
// PureComponent实现
class Child extends React.PureComponent {
    render(){
        console.log('I am rendering');
        return (
            <div>I am update every {this.props.seconds} seconds</div>
        )
    }
}
// React.memo 实现
// React.memo()可接受2个参数，第一个参数为纯函数的组件，第二个参数用于对比props控制是否刷新，
// 与shouldComponentUpdate()功能类似。
function Child({seconds}){
    console.log('I am rendering');
    return (
        <div>I am update every {seconds} seconds</div>
    )
};

const areEqual = (prevProps, nextProps) => prevProps.seconds === nextProps.seconds

export default React.memo(Child, areEqual)
```
#### useMemo

### 3. useCallBack 和 useMemo 的区别

-   useCallback 如果在函数式组件中的话，确实应该当作最佳实践来用，但是使用它的目的除了要缓存依赖未改变的回调函数之外（与 useMemo 类似），还有一点是为了能够在依赖发生变更时，能够确保回调函数始终是最新的实例，从而不会引发一些意料之外的问题，我感觉后者才是使用 useCallback 的出发点，而非缓存。因为你想啊，即使不用 useCallback，假设这个回调函数也没有任何依赖状态，我直接把这个函数声明在组件外部不也可以吗？我直接使用 ref 不是更自由吗？
-   useMemo 本身名字就是和缓存有关联的，本质上就为了解决一个事情，在 render 里面不要直接创建对象或者方法什么的，因为组件每渲染一次，就会创建一次（比如 style 或者一些常量状态），造成不必要的资源浪费。理想情况应当是，如果存在依赖，只在依赖变化时重新创建，不存在依赖，那就只创建一次。表面上看，如果所有状态都用 useMemo，肯定没什么问题，但你还需从缓存的代价上来分析这个问题，如果使用 useMemo 缓存一个状态的代价大于它带来的优势，那是不是反而适得其反了？

-   React.memo() 在项目中，因为它和 PureComponent 其实是一回事儿，所以完全参造 PureComponent 的使用经验来用就好了。总体感觉是，如果用了状态管理库，比如 redux，可能默认使用 PureComponent 或者 React.memo 更好一些，如果没有，等到遇到性能瓶颈再进行调整也不迟。

总结下来就是：

-   useCallback 建议当做最佳实践来用，也就是你指的大量使用，这个比较符合直觉
-   useMemo 使用时，要仔细评估其代价

-   React.memo 参考 PureComponent

### 4. useContext 实现原理

### 5. useReducer

### 6. useReducer + useContext 实现redux
```js
import React, { useReducer, createContext } from 'react'

const defaultState = {
    value: 0
}
 
function reducer(state, action) {
    switch(action.type) {
        case 'ADD_NUM':
            return { ...state, value: state.value + 1 };
        case 'REDUCE_NUM':
            return { ...state, value: state.value - 1 };
        default: 
            throw new Error();
    }
}

export const Context = createContext(null)

export function Content() {
    const [state, dispatch] = useReducer(reducer, defaultState)
 
    return (
        <Context.Provider value={{state, dispatch: dispatch}}>
            <ChildFirst/>
            <ChildSecond/>
        </Context.Provider>
    )

// ChildFirst.js
import React, {useContext} from 'react'
import {Context} from './content'
 
export function ChildFirst() {
    const AppContext = useContext(Context)
 
    return (
        <div>
            <button onClick={ 
                 () => {
                AppContext.dispatch({
                    type: "ADD_NUM",
                    payload: {}
                  })
                }
            }>addNum</button>
            <button onClick={
                () => {
                AppContext.dispatch({
                    type: "REDUCE_NUM",
                    payload: {}
                    })  
                }
            }>reduceNum</button>
        </div>
    )
}

// ChildSecond.js
import React, {useContext} from 'react'
import {Context} from './content'
 
export function ChildSecond() {
    const AppContext = useContext(Context)
 
    return (
        <div>
            {AppContext.state.value + 's'}
        </div>
    )
}
```
