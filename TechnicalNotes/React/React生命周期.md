## 生命周期对比

### 旧生命周期

1、constructor()

完成了React数据的初始化。

  

2、componentWillMount()

组件已经完成初始化数据，但是还未渲染DOM时执行的逻辑，主要用于服务端渲染。

  

3、componentDidMount()

组件第一次渲染完成时执行的逻辑，此时DOM节点已经生成了。

  

4、componentWillReceiveProps(nextProps)

接收父组件新的props时，重新渲染组件执行的逻辑。

  

5、shouldComponentUpdate(nextProps, nextState)

在setState以后，state发生变化，组件会进入重新渲染的流程时执行的逻辑。在这个生命周期中return false可以阻止组件的更新，主要用于性能优化。

  

6、componentWillUpdate(nextProps, nextState)

shouldComponentUpdate返回true以后，组件进入重新渲染的流程时执行的逻辑。

  

7、render()

页面渲染执行的逻辑，render函数把jsx编译为函数并生成虚拟dom，然后通过其diff算法比较更新前后的新旧DOM树，并渲染更改后的节点。

  

8、componentDidUpdate(prevProps, prevState)

重新渲染后执行的逻辑。

  

9、componentWillUnmount()

组件的卸载前执行的逻辑，比如进行“清除组件中所有的setTimeout、setInterval等计时器”或“移除所有组件中的监听器removeEventListener”等操作

  

### 新生命周期

![](https://cdn.nlark.com/yuque/0/2021/png/510753/1614844249504-f3eb75a6-0bb7-4c10-be95-235c4c3ba8bf.png)

1.  **getDerivedStateFromProps(nextProps, prevState)**

旧的React中componentWillReceiveProps方法是用来判断前后两个 props 是否相同，如果不同，则将新的 props 更新到相应的 state 上去。在这个过程中我们实际上是可以访问到当前props的，这样我们可能会对this.props做一些奇奇怪怪的操作，很可能会破坏 state 数据的单一数据源，导致组件状态变得不可预测。

  

而在 getDerivedStateFromProps 中禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去访问this.props并做其他一些让组件自身状态变得更加不可预测的事情。

  

2.  **getSnapshotBeforeUpdate(prevProps, prevState)**

在 React 开启异步渲染模式后，在执行函数时读到的 DOM 元素状态并不总是渲染时相同，这就导致在 componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。

  

而getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与componentDidUpdate 中一致的。