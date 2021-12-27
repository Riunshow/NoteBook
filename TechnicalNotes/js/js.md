> [字节面试](https://bitable.feishu.cn/app8Ok6k9qafpMkgyRbfgxeEnet?from=logout&table=tblEnSV2PNAajtWE&view=vewJHSwJVd)
> [[EventLoop]]
> [[常用 js 库]]


### new
```js
function create() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
```
-   创建一个空对象
-   获取构造函数
-   设置空对象的原型
-   绑定 `this` 并执行构造函数
-   确保返回值为对象

  

### 闭包
1.  js允许再行数内部定义新的函数
2.  可以在内部函数中访问父函数中定义的变量
3.  因为函数式一等公民,所以函数可以作为返回值

  
### 暂时性死区：
只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

### promise
1.  [Promise.prototype.then()](https://es6.ruanyifeng.com/#docs/promise#Promise.prototype.then())
2.  [Promise.prototype.catch()](https://es6.ruanyifeng.com/#docs/promise#Promise.prototype.catch())
3.  [Promise.prototype.finally()](https://es6.ruanyifeng.com/#docs/promise#Promise.prototype.finally())
4.  [Promise.all()](https://es6.ruanyifeng.com/#docs/promise#Promise.all())

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

5.  [Promise.race()](https://es6.ruanyifeng.com/#docs/promise#Promise.race())

const p = Promise.race([p1, p2, p3]);

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

6.  [Promise.allSettled()](https://es6.ruanyifeng.com/#docs/promise#Promise.allSettled())

不关心异步操作的结果，只关心这些操作有没有结束。
```js
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]

```

7.  [Promise.any()](https://es6.ruanyifeng.com/#docs/promise#Promise.any())

只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

8.  [Promise.resolve()](https://es6.ruanyifeng.com/#docs/promise#Promise.resolve())
9.  [Promise.reject()](https://es6.ruanyifeng.com/#docs/promise#Promise.reject())
10.  [Promise.try()](https://es6.ruanyifeng.com/#docs/promise#Promise.try())
  
### CommonJS 中的 require/exports 和 ES6 中的 import/export 区别？

-   CommonJS 模块是运行时加载，ES6 Modules 是编译时加载并输出接口。
-   CommonJS 输出是值的拷贝；ES6 Modules输出的是值的引用，被输出模块的内部的改变会影响引用的改变。

-   CommonJs 导入的模块路径可以是一个表达式，因为它使用的是 require() 方法，甚至这个表达式计算出来的内容是错误的路径，也可以通过编译到执行阶段再出错；而ES6 Modules 只能是字符串，并且路径不正确，编译阶段就会抛错。
-   CommonJS this 指向当前模块，ES6 Modules this 指向 undefined

-   ES6 Modules 中没有这些顶层变量：arguments、require、module、exports、__filename、__dirname

  

### generator
```js
function* foo() {
  yield 'result1'
  yield 'result2'
  yield 'result3'
}
  
const gen = foo()
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
```
babel转换为 ES5

regeneratorRuntime -> 来自facebook里的regenerator模块
```js
"use strict";

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(foo);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'result1';

        case 2:
          _context.next = 4;
          return 'result2';

        case 4:
          _context.next = 6;
          return 'result3';

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var gen = foo();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

// -------------------------------------------------------------

// wrap
function wrap(innerFn, outerFn, self) {
  var generator = Object.create(outerFn.prototype);
  var context = new Context([]);
  generator._invoke = makeInvokeMethod(innerFn, self, context);

  return generator;
}
```
### 函数柯里化
```js
function add() {
    let _args = [].slice.call(arguments)
    const adder = function () {
        [].push.apply(_args, [].slice.call(arguments))
        return adder
    }
        
    adder.toString = function () {
      return _args.reduce((a, b) => a + b)
    }
    return adder
}
```
### onLoad 和 DOMContentLoad 的区别

-   DOMContentLoad是HTML文档被加载和解析完成后触发
-   onLoad是页面所有资源（包括图片，音频等）加载完后触发

  
### 严格模式
-   变量必须声明后再使用
-   函数的参数不能有同名属性，否则报错
-   不能使用with语句
-   不能对只读属性赋值，否则报错
-   不能使用前缀 0 表示八进制数，否则报错
-   不能删除不可删除的属性，否则报错
-   eval不会在它的外层作用域引入变量
-   eval和arguments不能被重新赋值
-   arguments不会自动反映函数参数的变化
-   不能使用arguments.callee
-   不能使用arguments.caller
-   禁止this指向全局对象
-   不能使用fn.caller和fn.arguments获取函数调用的堆栈
-   增加了保留字（比如protected、static和interface）

  
### trim的实现
str.replace(/(^\s*)|(\s*$)/g, "")

  

### 暂时性死区

在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）

“暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作。
```js
typeof x; // ReferenceError
let x;
```
作为比较，如果一个变量根本没有被声明，使用`typeof`反而不会报错。
```js
typeof undeclared_variable // "undefined"
```
  

### [] == ![] // true

[] == ! []   ->   [] == false  ->  [] == 0  ->   '' == 0   ->  0 == 0   ->  true

### {} == !{} // false

{} == ! {}   ->   {} == false  ->  {} == 0  ->   NaN == 0    ->  false

  

### delete

#### 1. delete x 中，如果 x 根本不存在，会发生什么？

#### 2. delete object.x 中，如果 x 是只读的，会发生什么？

#### 3. delete object.x 中, 如果 Object.freeze(object), 会发生什么?

  

  

### 解构赋值判断的默认条件

undefined

  

### 垃圾回收机制(todo)

  

### symbol的理解(todo)

  

  

### 防抖
```js
function debounce(fn,delay){
    let timer = null //借助闭包
    return function() {
        if(timer){
            clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
            timer = setTimeout(fn,delay) 
        }else{
            timer = setTimeout(fn,delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
        }
    }
}
```
  

### 节流
```js
function throttle(fn,delay){
    let valid = true
    return function() {
       if(!valid){
           //休息时间 暂不接客
           return false 
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}
```
