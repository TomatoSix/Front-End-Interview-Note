// vue2响应式手写

let activeReactiveFn = null;
class Depend {
  constructor() {
    this.reactiveFn = new Set();
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFn.add(activeReactiveFn);
    }
  }

  notify() {
    this.reactiveFn.forEach((fn) => fn());
  }
}
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}
let wk = new WeakMap();
function getDepend(obj, key) {
  let map = wk.get(obj);
  if (!map) {
    map = new Map();
    wk.set(obj, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

function reactive(obj) {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        let depend = getDepend(obj, key);
        depend.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
        let depend = getDepend(obj, key);
        depend.notify();
      },
    });
  });
  return obj;
}

let obj = {
  name: "six",
  age: 18,
};

let objProxy = reactive(obj);

watchFn(() => {
  console.log(obj.name, "已更新");
});
objProxy.name = "666";
