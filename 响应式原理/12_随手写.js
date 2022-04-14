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
let wk = new WeakMap();
function getDepend(target, key) {
  let map = wk.get(target);
  if (!map) {
    map = new Map();
    wk.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      let depend = new getDepend(target, key);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      let depend = new getDepend(target, key);
      depend.notify();
    },
  });
}

let obj = {
  name: "six",
  age: 18,
};

let proxyObj = reactive(obj);
watchFn(() => {
  console.log(proxyObj.name, "name修改");
});

proxyObj.name = "番茄炒小六";
