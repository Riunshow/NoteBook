#### initState
```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  // --------------- computed初始化 ------------------
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```
调用了`initComputed`函数（其前后也分别初始化了`initData`和`initWatch`）并传入两个参数`vm`实例和`opt.computed`开发者定义的`computed`选项，转到`initComputed`函数：

#### initComputed
```js
const computedWatcherOptions = { computed: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    /* 
	    ------------------------------------
    	获取计算属性的定义userDef和getter求值函数
      定义一个计算属性有两种写法，一种是直接跟一个函数，另一种是添加set和get方法的对象形式，
      所以这里首先获取计算属性的定义userDef，再根据userDef的类型获取相应的getter求值函数。
    */
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm)
    }

    if (!isSSR) {
      /*
	      ------------------------------------
	      计算属性的观察者watcher和消息订阅器dep
        watchers也就是vm._computedWatchers对象的引用，存放了每个计算属性的观察者watcher实例
        具体看 class Watcher
      */
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      /*
      	------------------------------------
      	因为computed属性是直接挂载到实例对象中的，所以在定义之前需要判断对象中是否已经存在重名的属性，
        defineComputed传入了三个参数：vm实例、计算属性的key以及userDef计算属性的定义（对象或函数）。
      */
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}
```

#### Watcher
```js
class Watcher {
  /*
	  ------------------------------------
  	[精简代码]
  	Watcher构造函数在实例化时传入了4个参数：
    vm实例、getter求值函数、noop空函数、computedWatcherOptions常量对象 
   （在这里提供给Watcher一个标识{computed:true}项，表明这是一个计算属性而不是非计算属性的观察者
  */
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    if (options) {
      this.computed = !!options.computed
    } 

    if (this.computed) {
      /*
      	------------------------------------
      	计算属性直接走到这里
        dep也就是创建了该属性的消息订阅器
      */
      this.value = undefined
      this.dep = new Dep()
    } else {
      this.value = this.get()
    }
  }
  
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      
    } finally {
      popTarget()
    }
    return value
  }
  
  update () {
    if (this.computed) {
      if (this.dep.subs.length === 0) {
        this.dirty = true
      } else {
        this.getAndInvoke(() => {
          this.dep.notify()
        })
      }
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  evaluate () {
    if (this.dirty) {
      this.value = this.get()
      this.dirty = false
    }
    return this.value
  }

  depend () {
    if (this.dep && Dep.target) {
      this.dep.depend()
    }
  }
}
```

#### Dep
```js
/*
	------------------------------------
	[精简部分代码]
  Watcher和dep的关系:
	watcher中实例化了dep并向dep.subs中添加了订阅者，dep通过notify遍历了dep.subs通知每个watcher更新。
*/
export default class Dep {
  static target: ?Watcher;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

#### defineComputed

```js
/*
	随后根据Object.defineProperty前面的代码可以看到
	sharedPropertyDefinition的get/set方法在经过userDef和 shouldCache等多重判断后被重写，
  当非服务端渲染时，sharedPropertyDefinition的get函数也就是createComputedGetter(key)的结果，
  我们找到createComputedGetter函数调用结果并最终改写sharedPropertyDefinition大致呈现如下：
  
  当计算属性被调用时便会执行get访问函数，从而关联上观察者对象watcher。
  sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: function computedGetter () {
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
            watcher.depend()
            return watcher.evaluate()
        }
    },
    set: userDef.set || noop
	}

*/
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  /*
  	------------------
  	sharedPropertyDefinition
  */
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

1.  当组件初始化的时候，`computed`和`data`会分别建立各自的响应系统，`Observer`遍历`data`中每个属性设置`get/set`数据拦截
2.  初始化`computed`会调用`initComputed`函数

1.  注册一个`watcher`实例，并在内实例化一个`Dep`消息订阅器用作后续收集依赖（比如渲染函数的`watcher`或者其他观察该计算属性变化的`watcher`）
2.  调用计算属性时会触发其`Object.defineProperty`的`get`访问器函数

3.  调用`watcher.depend()`方法向自身的消息订阅器`dep`的`subs`中添加其他属性的`watcher`
4.  调用`watcher`的`evaluate`方法（进而调用`watcher`的`get`方法）让自身成为其他`watcher`的消息订阅器的订阅者，首先将`watcher`赋给`Dep.target`，然后执行`getter`求值函数，当访问求值函数里面的属性（比如来自`data`、`props`或其他`computed`）时，会同样触发它们的`get`访问器函数从而将该计算属性的`watcher`添加到求值函数中属性的`watcher`的消息订阅器`dep`中，当这些操作完成，最后关闭`Dep.target`赋为`null`并返回求值函数结果。

3.  当某个属性发生变化，触发`set`拦截函数，然后调用自身消息订阅器`dep`的`notify`方法，遍历当前`dep`中保存着所有订阅者`wathcer`的`subs`数组，并逐个调用`watcher`的 `update`方法，完成响应更新。