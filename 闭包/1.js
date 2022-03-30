function foo() {
  var name = "foo"
  function bar() {
    console.log('bar', name)
  }
  return bar
}

var fn = foo()
fn()

/*
1. 栈内存
  1. 全局执行上下文GEC
  2. 函数执行上下文


2. 堆内存
  一开始会有一个GO对象，有String setTimeout window


3. 
  VO 活动对象
  GO 全局对象
  AO 变量对象
  GEC 全局执行上下文
*/

1. 堆内存一开始有个GO对象
包括:setTimeout window foo: 0xa00 fn:undefined

调用栈中有一个全局执行上下文
VO: GO
开始执行代码 var fn = Oxa00

2. 执行 foo()
创建函数执行上下文
此时堆内存中创建一个AO对象(foo)
name: undefined
bar: obb00
