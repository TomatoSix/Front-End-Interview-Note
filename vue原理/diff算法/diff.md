# 问题探究

1. 虚拟 DOM 如何被渲染函数产生
2. diff 算法原理
3. 虚拟 DOM 如何通过 diff 变为真正的 DOM

# h 函数 - 用来产生虚拟节点 VNode

1. h 函数有哪些属性

```js
{
  children: '',
  data: '',
  elm: '',
  key: '',
  sel: 'div',
  text: ''
}
```
