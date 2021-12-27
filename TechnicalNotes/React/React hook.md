### 1. 简单介绍下什么是hooks，hooks产生的背景？hooks的优点？

-   hooks是针对在使用react时存在以下问题而产生的：

1.  组件之间复用状态逻辑很难，在hooks之前，实现组件复用，一般采用高阶组件和 Render Props，它们本质是将复用逻辑提升到父组件中，很容易产生很多包装组件，带来嵌套地域。
2.  组件逻辑变得越来越复杂，尤其是生命周期函数中常常包含一些不相关的逻辑，完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

3.  复杂的class组件，使用class组件，需要理解 JavaScript 中 this 的工作方式，不能忘记绑定事件处理器等操作，代码复杂且冗余。除此之外，class组件也会让一些react优化措施失效。

  

-   针对上面提到的问题，react团队研发了hooks，它主要有两方面作用：

1.  用于在函数组件中引入状态管理和生命周期方法
2.  取代高阶组件和render props来实现抽象和可重用性

  

-   优点也很明显：

1.  避免在被广泛使用的函数组件在后期迭代过程中，需要承担一些副作用，而必须重构成类组件，它帮助函数组件引入状态管理和生命周期方法。
2.  Hooks 出现之后，我们将复用逻辑提取到组件顶层，而不是强行提升到父组件中。这样就能够避免 HOC 和 Render Props 带来的「嵌套地域」避免上面陈述的class组件带来的那些问题

---

-   useContext()，共享钩子。该钩子的作用是，在组件之间共享状态。 可以解决react逐层通过Porps传递数据，它接受React.createContext()的返回结果作为参数，使用useContext将不再需要Provider 和 Consumer。
-   useReducer()，Action 钩子。useReducer() 提供了状态管理，其基本原理是通过用户在页面中发起action, 从而通过reducer方法来改变state, 从而实现页面和状态的通信。使用很像redux

-   useEffect()，副作用钩子。它接收两个参数， 第一个是进行的异步操作， 第二个是数组，用来给出Effect的依赖项
-   useRef()，获取组件的实例；渲染周期之间共享数据的存储(state不能存储跨渲染周期的数据，因为state的保存会触发组件重渲染）useRef传入一个参数initValue，并创建一个对象{ current: initValue }给函数组件使用，在整个生命周期中该对象保持不变。

-   useMemo和useCallback：可缓存函数的引用或值，useMemo用在计算值的缓存，注意不用滥用。经常用在下面两种场景（要保持引用相等；对于组件内部用到的 object、array、函数等，如果用在了其他 Hook 的依赖数组中，或者作为 props 传递给了下游组件，应该使用 useMemo/useCallback）
-   useLayoutEffect：会在所有的 DOM 变更之后同步调用 effect，可以使用它来读取 DOM 布局并同步触发重渲染

### 2. setState / useState
[http://www.ptbird.cn/react-hook-usestate-setState.html](http://www.ptbird.cn/react-hook-usestate-setState.html)
```js
// 我们实现一个简易版的useState
let memoizedStates = [ ]  // 多个useState 时需要使用数组来存
let index = 0
function useState (initialState) {
   memoizedStates[index] = memoizedStates[index] || initialState
   let currentIndex = index;
   function setState (newState) {
      memoizedStates[currentIndex] = newState
      render()
   }
   return [memoizedStates[index++], setState]
}
```
