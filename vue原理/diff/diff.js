// diff算法源码分析
/*
patch(oldVnode, vnode)函数
1. 先判断oldVnode 是不是真实节点， 是将oldVnode包装为虚拟节点
2. 判断 oldVnode和newVnode是不是同一个节点，sameVnode(oldVnode, vnode) 
   不是则暴力删除旧虚拟节点，插入新虚拟节点
3. 精细化比较
*/


function patch(oldVnode, newVnode) {

  // 1. 判断传入的第一个参数oldVnode, 是DOM真实节点还是虚拟节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 是真实节点则把它包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 2. 判断oldVnode和newVnode是不是同一个节点
  // 同一个节点要求: key相同，标签相同
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {

  } else {
    // 不是同一个节点则暴力插入新虚拟节点，删除旧虚拟节点
    console.log("暴力插入新的虚拟节点，删除就得虚拟节点");
    // 插入新节点
    let newVnodeElm = createElement(newVnode, oldVnode.elm)
    // 将新节点插入到旧节点之前
    oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    // 删除旧节点
  }
}

/**
 * @desc 包装成虚拟节点，把传入的5个参数组合成对象返回
 * @date 2022-04-10
 * @param {any} sel 选择器
 * @param {any} data 属性
 * @param {any} children
 * @param {any} text
 * @param {any} elm 当前虚拟节点的真实节点
 * @returns {any} 当前元素节点
 */
function vnode(sel, data, children, text, elm) {
  return {
    sel, data, children, text, elm
  }
}


/**
 * @desc 创建真实节点,将vnode创建为DOM, 不进行插入
 * @date 2022-04-10
 * @param {any} vnode 要创建的节点
 * @param {any} pivot 标杆节点
 * @returns {any}
 */
function createElement(vnode, pivot) {
  let domNode = document.createElement(vnode.sel)
  // 判断是否有子节点或者有文本
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length === 0)) {
    // 1. 如果内部只有文本，用insertBefore将元素插入到pivot之前
    domNode.innerText = vnode.text
    // 补充ele属性
    vnode.elm = domNode
  } else if (Array.isArray(vnode.children) && vnode.children.length) {
    // 2. 如果内部有子节点, 递归创建子节点

  }
  return domNode
}

