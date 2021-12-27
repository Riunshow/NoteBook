#### table中 td overflow 不生效的问题

在 table 增加 table-layout: fixed;
```html

<table style="table-layout: fixed;">
  <td>
    <div style="overflow-y: scroll; height: 200px;">
    </div>
  </td>
</table>

  ```

#### css选择器的优先级

标签选择器 < 类选择器 < ID选择器 < 内联style < !important

#### **BFC的概念和特性**

-   触发条件

-   float不为none
-   overflow不为visible

-   display为table-cell，table-caption，inline-block
-   position为absolute，fixed

-   fieldset元素

-   功能

-   自我独立，内部元素不会影响外部元素
-   会包含浮动元素

-   同一个BFC的margin重叠

  

#### **使用雪碧图的关键css属性是什么**
background-position

#### scss+mixin实现媒体查询
[https://juejin.cn/post/6943436078455996446](https://juejin.cn/post/6943436078455996446)

#### css in js