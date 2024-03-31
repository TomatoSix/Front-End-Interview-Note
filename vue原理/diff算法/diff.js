// diff算法源码分析
/*
patch(oldVnode, vnode)函数
1. 先判断oldVnode 是不是真实节点， 是将oldVnode包装为虚拟节点
2. sameVnode(oldVnode, vnode) 判断 oldVnode和newVnode是不是同一个节点，
   不是则暴力删除旧虚拟节点，插入新虚拟节点
3. 精细化比较
*/

/*
  精细化比较-当新节点和旧节点是同一个节点时(标签和key相同)调用patchVnode
  1. 如果oldVnode和newVnode是不是内存中的同一个对象 
      1. 是, 什么都不用干
      2. newVnode是文本节点
          1. oldVNode 也是文本节点，判断两个文本是否相同
          2. oldVNode 不是文本节点，调用 setTextNode 方法改成文本节点
      3. newVnode是元素节点
          1. 新节点包含子节点
              1. 旧节点中有子节点(非常复杂，有一个优化策略)
                递归对比更新子节点，调用 updateChildren 方法
                  1. 创建子节点
                  2. 删除子节点
                  3. 更新子节点
                  4. 移动子节点


              2. 旧节点中没有子节点
                  1. 旧节点是空节点
                      新节点的子节点创建一份插入到旧节点里
                  2. 旧节点是文本节点
                      文本清空，新节点的子节点创建一份插入到旧节点里
          2. 新节点不包含子节点
            说明该节点是空节点，直接清空 oldVNode 节点内容
*/

/*
  更新子节点的四种命中查找()
  1. 新前与旧前
  2. 新后与旧后
  3. 新后与旧前 - 命中时, 此时要移动节点, 移动旧前到旧后的后面
  4. 新前与旧后 - 命中时，此时要移动节点，移动旧前到旧前的前面
  对某一节点命中一种就不再继续命中判断
  如果都没有命中，就需要用循环来寻找

  准备四个指针分别指向新前 新后 旧前 旧后
  1. 对比新前与旧前是不是用一个节点，直接更新该节点(不需要移动、删除等等操作)
      1. 是同一个节点
          旧前指针下移，新前指针下移，继续遍历下一个节点
          while(新前<=新后&&旧前<=旧后) {
            如果旧节点先循环完毕, 说明新节点中有要插入的节点
            如果新节点先循环完毕, 如果老节点中还有剩余节点，说明他们是要被删除的节点
          }
*/

/**
 * @desc diff算法核心
 * @date 2022-04-10
 * @param {any} oldVnode
 * @param {any} newVnode
 * @returns {any}
 */
function patch(oldVnode, newVnode) {
  // 1. 判断传入的第一个参数oldVnode, 是DOM真实节点还是虚拟节点
  if (oldVnode.sel === "" || oldVnode.sel === undefined) {
    // 是真实节点则把它包装为虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }

  // 2. 判断oldVnode和newVnode是不是同一个节点
  // 同一个节点要求: key相同，标签相同
  if (isSameVnode(oldVnode, newVnode)) {
    // 如果是同一个节点
    patchVnode(newVnode, oldVnode);
  } else {
    // 不是同一个节点则暴力插入新虚拟节点，删除旧虚拟节点
    console.log("暴力插入新的虚拟节点，删除就得虚拟节点");
    // 插入新节点
    let newVnodeElm = createElement(newVnode, oldVnode.elm);
    // 将新节点插入到旧节点之前
    if (oldVnode.elm && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // 删除旧节点
  }
}

/**
 * @desc 包装成虚拟节点，把传入的5个参数组合成对象返回
 * @date 2022-04-10
 * @param {any} sel 标签
 * @param {any} data 属性
 * @param {any} children
 * @param {any} text 文本
 * @param {any} elm 当前虚拟节点的真实节点
 * @returns {any} 当前元素节点
 */
function vnode(sel, data, children, text, elm) {
  const key = data.key;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
  };
}

/**
 * @desc 判断新节点和旧节点是不是同一个节点, 要求节点的key相同, 标签相同
 * @date 2022-04-10
 * @param {any} oldVnode
 * @param {any} newVnode
 * @returns {any}
 */
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel;
}

/**
 * @desc 创建真实节点,将vnode创建为DOM, 不进行插入
 * @date 2022-04-10
 * @param {any} vnode
 * @returns {any} 返回真实节点
 */
function createElement(vnode) {
  // 创建一个真实dom
  let domNode = document.createElement(vnode.sel);
  // 判断是否有子节点或者有文本
  if (
    vnode.text != "" &&
    (vnode.children == undefined || vnode.children.length === 0)
  ) {
    // 1. 如果内部只有文本，用insertBefore将元素插入到pivot之前
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length) {
    // 2. 如果内部有子节点, 递归创建子节点
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i];
      // 创建子节点
      let chDom = createElement(ch);
      // 子节点添加
      domNode.appendChild(chDom);
    }
  }
  // 补充ele属性
  vnode.elm = domNode;
  return domNode;
}

/**
 * @desc 新旧节点是同一个节点的后续操作
 * @date 2022-04-10
 * @param {any} newVnode
 * @param {any} oldVnode
 * @returns {any}
 */
function patchVnode(oldVnode, newVnode) {
  // 1. 判断新旧节点是不是同一个对象
  if (oldVnode === newVnode) return;
  // 2. 判断新节点是不是文本节点
  if (
    (newVnode.text != undefined && newVnode.children == undefined) ||
    newVnode.children.length === 0
  ) {
    // 1. 新节点是文本节点，且没有其他子节点
    if (oldVnode.text !== newVnode.text) {
      oldVnode.text = newVnode.text;
    }
  } else {
    // 2. 新节点不是文本节点, 有children
    // 判断旧节点有没有children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 1. 旧节点有子节点children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 2. 旧节点没有children
      // 清空旧节点的内容
      oldVnode.elm.innerHTML = "";
      // 创建新节点的子节点作为真实dom插入到旧节点中
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}

/**
 * @desc 更新子节点操作, 涉及新前与旧前 新后与旧后等
 * @date 2022-04-10
 * @param {any} parentElm
 * @param {any} oldCh
 * @param {any} newCh
 * @returns {any}
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  console.log("updateChildren()");
  console.log(oldCh, newCh);

  // 四个指针
  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新后
  let newEndIdx = newCh.length - 1;

  // 指针指向的四个节点
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx];
  // 新前节点
  let newStartVnode = newCh[0];
  // 新后节点
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log("**循环中**");
    // 首先应该不是判断四种命中，而是略过已经加了undefined标记的项
    if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前与旧前
      console.log(" ①1 新前与旧前 命中");
      // 精细化比较两个节点 oldStartVnode现在和newStartVnode一样了
      patchVnode(oldStartVnode, newStartVnode);
      // 移动指针，改变指针指向的节点，这表示这两个节点都处理（比较）完了
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后与旧后
      console.log(" ②2 新后与旧后 命中");
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后与旧前
      console.log(" ③3 新后与旧前 命中");
      patchVnode(oldStartVnode, newEndVnode);
      // 当③新后与旧前命中的时候，此时要移动节点。移动 新后（旧前） 指向的这个节点到老节点的 旧后的后面
      // 移动节点：只要插入一个已经在DOM树上 的节点，就会被移动
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前与旧后
      console.log(" ④4 新前与旧后 命中");
      patchVnode(oldEndVnode, newStartVnode);
      // 当④新前与旧后命中的时候，此时要移动节点。移动 新前（旧后） 指向的这个节点到老节点的 旧前的前面
      // 移动节点：只要插入一个已经在DOM树上的节点，就会被移动
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 四种都没有匹配到，都没有命中
      console.log("四种都没有命中");
      // 寻找 keyMap 一个映射对象， 就不用每次都遍历old对象了
      if (!keyMap) {
        keyMap = {};
        // 记录oldVnode中的节点出现的key
        // 从oldStartIdx开始到oldEndIdx结束，创建keyMap
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }
      console.log(keyMap);
      // 寻找当前项（newStartIdx）在keyMap中映射的序号
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld === undefined) {
        // 如果 idxInOld 是 undefined 说明是全新的项，要插入
        // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 说明不是全新的项，要移动
        const elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        // 把这项设置为undefined，表示我已经处理完这项了
        oldCh[idxInOld] = undefined;
        // 移动，调用insertBefore也可以实现移动。
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      // newStartIdx++;
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 循环结束
  if (newStartIdx <= newEndIdx) {
    // 说明newVndoe还有剩余节点没有处理，所以要添加这些节点
    // // 插入的标杆
    // const before =
    //   newCh[newEndIdx + 1] === null ? null : newCh[newEndIdx + 1].elm;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 说明oldVnode还有剩余节点没有处理，所以要删除这些节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}

// 判断是否是同一个节点
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}

/**
 * @desc 新旧节点是同一个节点的后续操作
 * @date 2022-04-10
 * @param {any} newVnode
 * @param {any} oldVnode
 * @returns {any}
 */
function patchVnode2(oldVnode, newVnode) {
  // 1. 判断新旧节点是不是同一个对象
  if (oldVnode === newVnode) return;
  // 2. 判断新节点是不是文本节点
  if (
    (newVnode.text != undefined && newVnode.children == undefined) ||
    newVnode.children.length === 0
  ) {
    // 1. 新节点是文本节点，且没有其他子节点
    if (oldVnode.text !== newVnode.text) {
      oldVnode.text = newVnode.text;
    }
  } else {
    // 2. 新节点不是文本节点, 有children
    // 判断旧节点有没有children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 1. 旧节点有children

      // 遍历新节点
      let un = 0; // un表示所有未处理的节点的指针开头
      for (let i = 0; i < newVnode.children.length; i++) {
        let ch = newVnode.children[i];
        // 再次遍历，看看oldVnode中有没有节点和它same
        let isExist = false;
        for (let j = 0; j < oldVnode.children.length; j++) {
          if (
            oldVnode.children[j].sel === ch.sel &&
            oldVnode.children[j].key === ch.key
          ) {
            isExist = true;
          }
        }
        // 没有找到旧子节点中与新子节点相同的节点, 将该新节点插入到所有未处理节点之前
        if (!isExist) {
          let dom = createElement(ch);
          ch.elm = dom;
          if (un < oldVnode.children.length) {
            oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm);
          } else {
            oldVnode.elm.appendChild(dom, oldVnode.children[un].elm);
          }
        } else {
          // 让处理的节点指针下移
          un++;

          // 判断新子节点是不是移动节点,即位置不一样
          if (i != j) {
          }
        }
      }
    } else {
      // 2. 旧节点没有children
      // 清空旧节点的内容
      oldVnode.elm.innerHTML = "";
      // 创建新节点的子节点作为真实dom插入到旧节点中
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
