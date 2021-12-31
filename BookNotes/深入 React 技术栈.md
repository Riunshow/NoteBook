### 第一章
#### Web Components
- Web Components 的 4 个组成部分：HTML Templates 定义了之前模板的概念， Custom Elements 定义了组件的展现形式，Shadow DOM 定义了组件的作用域范围、可以囊括样 式，HTML Imports 提出了新的引入方式
 ![[WebComponents.png]]

#### React Component
- React 的所有组件都继承自顶层类 React.Component。它的定义非常简洁，只是初始化了 React.Component 方法，声明了 props、context、refs 等，并在原型上定义了 setState 和 forceUpdate 方法。内部初始化的生命周期方法与 createClass 方式使用的是同一个方法 创建的。具体解读可参见 3.2.2 节

#### React 生命周期

![[ReactLifeCycle.png]]

### 第二章

#### 合成事件的绑定方式
- 在 JSX 中，我们必须使用驼峰的形式来书写事件的属性名（比如 onClick），而 HTML 事件则需要使用全部小写的属性名（比如 onclick）

#### 合成事件的实现机制
##### 1. 事件委派
- 它并不会把事件处理函数直接绑定到 真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监 听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是 在这个统一的事件监听器上插入或删除一些对象；当事件发生时，首先被这个统一的事件监听器 处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率 也有很大提升
	
##### 2. 自动绑定
	1. bind 方法
```js
import React, { Component } from 'react';

class App extends Component {
	handleClick(e, arg) { console.log(e, arg); }

	render() { // 通过bind方法实现，可以传递参数
		return <button onClick={this.handleClick.bind(this, 'test')}>Test</button>;
	}
}

// 如果方法只绑定，不传参，那 stage 0 草案中提供了一个便捷的方案① ——双冒号语法，其作 用与 this.handleClick.bind(this) 一致，并且 Babel 已经实现了该提案
// ECMAScrip This-Binding Syntanx，详见 https://github.com/zenparsing/es-function-bind。

import React, { Component } from 'react';

class App extends Component {
	handleClick(e) { console.log(e); }

	render() {
	
		return <button onClick={::this.handleClick}>Test</button>;
	
	}

}

```
	
	2. 构造器内声明
```js
import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) { console.log(e); }

	render() {
		return <button onClick={this.handleClick}>Test</button>;
	}

}
```
	
	3. 箭头函数
```js
import React, { Component } from 'react';

class App extends Component {

	const handleClick = (e) => { console.log(e); };

	render() {
	
		return <button onClick={this.handleClick}>Test</button>;
	
	}

}

// 或

import React, { Component } from 'react';

class App extends Component {
	handleClick(e) { console.log(e); }

	render() {
		return <button onClick={() => this.handleClick()}>Test</button>
	}
}
``` 

##### 3. 在 React 中使用原生事件
```js
import React, { Component } from 'react';  
class NativeEventDemo extends Component {  
	componentDidMount() {  
		this.refs.button.addEventListener('click', e => {  
			this.handleClick(e);  
		});  
	}  
	handleClick(e) {  
		console.log(e);  
	}  
	componentWillUnmount() {  
		this.refs.button.removeEventListener('click');  
	}  
	render() {  
		return <button ref="button">Test</button>;  
	}  
}
```

在 React 中使用 DOM 原生事件时，一定要在组件卸载时手动移除，否则很 可能出现内存泄漏的问题。而使用合成事件系统时则不需要，因为 React 内部已经帮你妥善地处 理了。

##### 4. 合成事件与原生事件混用
请尽量避免在 React 中混用合成事件和原生 DOM 事件。另外，用reactEvent.nativeEvent.stopPropagation() 来阻止冒泡是不行的。阻止 React 事件冒泡的行为只能用于 React 合成事件系统  中，且没办法阻止原生事件的冒泡。反之，在原生事件中的阻止冒泡行为，却可以阻止 React 合成  事件的传播。

##### 5. 对比 React 合成事件与JavaScript 原生事件
React  的合成事件则并没有实现事件捕获，仅仅支持了事件冒泡机制

#### 受控组件与非受控组件
##### 1. 受控组件
React 受控组件更新 state 的流程：  
(1) 可以通过在初始 state 中设置表单的默认值。  
(2) 每当表单的值发生变化时，调用 onChange 事件处理器。  
(3) 事件处理器通过合成事件对象 e 拿到改变后的状态，并更新应用的 state。  
(4) setState 触发视图的重新渲染，完成表单组件值的更新。

##### 2. 非受控组件
在 React 中，非受控组件是一种反模式，它的值不受组件自身的 state 或 props 控制。通常，需要通过为其添加 ref prop 来访问渲染后的底层 DOM 元素

#### **CSS Modules (需深入研究下各方案)**
CSS Modules 的命名规范是从 BEM 扩展而来的。BEM 把样式名分为 3 个级别，具体如下所示。  
1. Block：对应模块名，如 Dialog。  
2. Element：对应模块中的节点名 Confirm Button。  
3. Modifier：对应节点相关的状态，如 disabled 和 highlight。

#### 组件间抽象
##### mixin
- 在不同的 mixin 里实现两个名字一样的普通方法,它并不会覆盖，而是在控制台里报了一个在  ReactClassInterface 里的错误，指出你尝试在组件中多次定义一个方法，这会造成冲突。因此，在 React 中是不允许出现重名普通方法的 mixin。
- 使用 createClass 实现的 mixin 为组件做了两件事
	- **工具方法**。这是 mixin 的基本功能，如果你想共享一些工具类方法，就可以定义它们，直接在各个组件中使用
	- **生命周期继承**，props 与 state 合并。这是 mixin 特别重要的功能，它能够合并生命周期方法。如果有很多 mixin 来定义 componentDidMount 这个周期，那么 React 会非常智能地将它们都合并起来执行。同样，mixin 也可以作用在 getInitialState 的结果上，作 state 的  合并，而 props 也是这样合并的。

##### ES6 Classes 与 decorator
ES6 classes 形式构建组件时，它并不支持 mixin, 使用 decorator 来实现  
mixin, **core-decorators** 库为开发者提供了一些实用的 decorator

##### mixin 的问题
1. 破坏了原有组件的封装
2. 命名冲突
3. 增加复杂性

##### 高阶组件(higher-order component) (取代 mixin)
1. 生命周期
	- didmount→HOC didmount→(HOCs didmount)→(HOCs will unmount)→HOC will unmount→unmount

2. 控制 props, 当调用高阶组件时，可以用 text 这个新的 props 了。对于原组件来说，只要套用这个高阶组件，我们的新组件中就会多一个 text 的 prop。
```js
import React, { Component } from 'React';

const MyContainer = (WrappedComponent) =>  
	class extends Component {  
		render() {  
			const newProps = {  
				text: newText,  
			};  
			return <WrappedComponent {...this.props} {...newProps} />;  
		}  
	}
```
3. 通过 refs 使用引用
	- 当 WrappedComponent 被渲染时，refs 回调函数就会被执行，这样就会拿到一份Wrapped-Component 实例的引用。这就可以方便地用于读取或增加实例的 props，并调用实例的方法

```js
import React, { Component } from 'React';

const MyContainer = (WrappedComponent) =>  
	class extends Component {  
		proc(wrappedComponentInstance) {  
			wrappedComponentInstance.method();  
		}
	
		render() {  
			const props = Object.assign({}, this.props, {  
				ref: this.proc.bind(this),
			});  
			return <WrappedComponent {...props} />;  
		}  
	}
```