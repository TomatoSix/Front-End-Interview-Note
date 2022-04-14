// 旧的虚拟节点
const container = document.getElementById("container");

// h函数用于创建虚拟节点
const vnode1 = h("div", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "A"),
  h("li", { key: "C" }, "A"),
  h("li", { key: "D" }, "A"),
]);

patch(container, vnode1);

// 新的虚拟节点
const vnode2 = h("div", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "A"),
  h("li", { key: "C" }, "A"),
  h("li", { key: "D" }, "A"),
]);

patch(vnode1, vnode2);
