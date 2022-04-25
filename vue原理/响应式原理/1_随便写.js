let activeReactiveFn = null;
class Depend {
  constructor() {
    this.reactiveFns = new Set();
  }
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }
  notify() {
    this.reactiveFns.forEach((fn) => fn());
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
function reactive(target) {
  Object.keys(target).forEach((key) => {
    let value = target[key];
    Object.defineProperty(target, key, {
      get() {
        let depend = getDepend(target, key);
        depend.depend();
        return value;
      },
      set(newValue) {
        value = newValue;

        let depend = getDepend(target, key);
        depend.notify();
      },
    });
  });

  return target;
}

const obj = {
  name: "six",
  age: 18,
};
let proxyObj = reactive(obj);

watchFn(() => {
  console.log(proxyObj.name, "obj被修改了");
});

proxyObj.name = "番茄炒小六";

// proxyObj.name = "番茄炒小六";
