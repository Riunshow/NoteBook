## setState

### 1. setstate是同步还是异步的, 如何能实现同步.

setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。

#### Q: 为什么在原生事件和 setTimeout 中都是同步的

1.  setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。

  

2.  setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

  

3.  setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

### 2. setstate以后 的过程

[React setState 之后发生了什么？](https://zhuanlan.zhihu.com/p/65627731)

setState函数有两个参数:第一个参数是需要修改的setState对象，或者是函数。第二个参数是修改之后的回调函数。

回调函数调用 enqueueSetState: enqueueSetState 主要任务： 1、将新的state放进数组里 2、用enqueueUpdate来处理将要更新的实例对象.

接下来调用 enqueueUpdate: 如果没有处于批量创建/更新组件的阶段，则处理update state事务, 如果正处于批量创建/更新组件的过程，将当前的组件放在dirtyComponents数组中

![](https://cdn.nlark.com/yuque/0/2021/png/510753/1614845029082-c8f92cd1-9b96-46cf-88d7-06d3301bf2fd.png)

### 3. 调和过程

React的调和过程分为两个阶段：RenderRoot 和 CompleteRoot. 第一个阶段又称为render阶段，主线是构建workInprogress Fibe节点树，准备好线性任务链effect list。在这个阶段的最后，workInprogress Fibe tree 会变为finishedWork fibe tree， 以finishedWork属性挂载到FibeRoot 对象里，供第二个阶段使用。第二个阶段又称为commit阶段，主要目标是根据线性任务链完成finishedWork Fibe节点树中记录的任务，实现UI的更新。

  

react调和的三种策略。

1、tree differ，不会跨级进行比较，同级之间进行对比，如果发现有不同，那么将会删掉整行dom元素，

2、component diff 不同组件会直接删掉，对于相同组件继续按层级对比

3.element diff 对于元素提供三种操作删除、插入、移动，基于key可以提高效率，否则需要循环新结点一次循环旧结点一次才能找到变化

  

举个例子 ：react当我们设置setstate状态进行改变的时候就会触发所谓的调和过程，其实调和过程有好几种触发方式，比如重新render，或者组件传参，基本上重新渲染dom树的都会触发调和，从而根据不同的diff策略进行对应的更新渲染

### 4. 为什么setstate以后就会更新页面

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。