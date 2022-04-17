// 手写vuex
let Vue;

// 优化封装
const forEachFn = (obj, cb) => {
  Object.keys(obj).forEach((key) => {
    cb(key, obj[key]);
  });
};

class Store {
  constructor(options = {}) {
    // this.state = options.state;
    // Vuex的核心 => 实现数据响应式
    this.s = new Vue({
      data() {
        return { state: options.state };
      },
    });

    // getters处理
    // getters要求实现数据的响应式，state一旦修改就会调用getters
    let getters = options.getters;
    this.getters = {};
    Object.keys(getters).forEach((getterName) => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state);
        },
      });
    });

    // mutations处理
    let mutations = options.mutations;
    this.mutations = {};
    Object.keys(mutations).forEach((mutationName) => {
      this.mutations[mutationName] = (payload) => {
        this.mutations[mutationName](this.state, payload);
      };
    });

    // actions处理
    let actions = options.actions;
    this.actions = {};
    forEachFn(actions, (actionName, fn) => {
      this.actions[actionName] = (payload) => {
        fn(this, payload);
      };
    });
  }

  // 提交
  commit = (mutationName, payload) => {
    this.mutations[mutationName](payload);
  };
  // 分发
  dispatch = (actionName, payload) => {
    this.actions[actionName](payload);
  };

  // 设计state的访问器
  get state() {
    return this.s.state;
  }
}

/**
 * @desc 注册函数 install
 * @date 2022-04-11
 * @param {any} _Vue
 * @returns {any}
 */
function install(_Vue) {
  // _Vue => vue的构造函数， 赋值给全局的Vue
  Vue = _Vue;
  // 使用vue的混入mixin, 混入到组件的生命周期, 会先于组件的声明周期
  Vue.mixin({
    beforeCreate() {
      // 如果有根实例
      if (this.$options && this.$options.store) {
        // 把this.$options中的store挂在到实例的$store中
        // 可以通过this.$store.xxx获取
        // 根节点添加
        this.$store = this.$options.store;
      } else {
        // 子节点添加
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  });
}
export default {
  Store,
  install, // Vue.use(xxx)时会默认调用install函数
};

/*
如何使用
new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
*/
