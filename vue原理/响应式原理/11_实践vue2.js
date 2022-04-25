let activeReactiveFn = null;

// 定义函数收集的类
class Depend {
  constructor() {
    this.reactiveFns = new Set();
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.push(reactiveFn)
  // }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn();
    });
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }
}
const depend = new Depend();

// 封装一个收集需要调用的函数
function watchFn(fn) {
  // 把需要响应的函数放入正确的依赖中
  // 1. 找到depend对象
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

// 封装一个获取depend的函数
const targetMap = new WeakMap();
function getDepend(target, key) {
  // 根据target获取Map
  let map = targetMap.get(target);
  if (!map) {
    // 初次使用不存在map
    map = new Map();
    targetMap.set(target, map);
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
      get: function () {
        const depend = getDepend(obj, key);
        depend.depend();
        return value;
      },
      // 只有一个属性newValue
      set: function (newValue) {
        value = newValue;
        const depend = getDepend(obj, key);
        depend.notify();
      },
    });
  });
  return obj;
}

//对象的响应式
const obj = {
  name: "six",
  age: 18,
};
let proxyObj = reactive(obj);

watchFn(() => {
  console.log(proxyObj.name, "obj被修改了");
});

proxyObj.name = "番茄炒小六";
