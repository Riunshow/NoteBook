#### 写出在html头部中，设置设备宽度等于页面宽度的属性标签
```html

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
```
  

#### 判断是手机端还是pc端
```js
if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
  //手机端
} else {
}
```