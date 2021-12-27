#### 浏览器中的EventLoop

[可视化](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

  

[https://blog.csdn.net/qiwoo_weekly/article/details/106308879](https://blog.csdn.net/qiwoo_weekly/article/details/106308879)

1.  每一轮 Event Loop 都会伴随着渲染吗？
2.  `requestAnimationFrame` 在哪个阶段执行，在渲染前还是后？在 `microTask` 的前还是后？

3.  `requestIdleCallback` 在哪个阶段执行？如何去执行？在渲染前还是后？在 `microTask` 的前还是后？
4.  `resize`、`scroll` 这些事件是何时去派发的。

  

[https://zhuanlan.zhihu.com/p/101374817](https://zhuanlan.zhihu.com/p/101374817)

  

经典题目

[https://blog.csdn.net/weixin_39860636/article/details/111259622](https://blog.csdn.net/weixin_39860636/article/details/111259622)

  

#### Node中的EventLoop(todo)