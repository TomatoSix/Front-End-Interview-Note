// 手写 VueRouter
let Vue; // 全局变量
class VueRouter {
  constructor(options) {
    this.current = "/"; //当前路由

    // Vue提供了 Vue.util.defineReactive(xxx), 实现xxx的响应式
    let initPath = "/"; // 表示默认值
    // 实现了this.current的响应式
    // 将来数据一旦发生变化，router-view的render函数能够重新执行

    Vue.util.defineReactive(this, "current", initPath);
    this.routes = options.routes; // 用户路由规则
    this.modes = options.mode || "hash"; // 路由模式, 默认hash模式

    this.init(); // 监听路由改变
  }

  /**
   * @desc 监听路由改变
   * @date 2022-04-16
   * @returns {any}
   */
  init() {
    // hash模式
    if (this.mode === "hash") {
      // 注意第一次加载，current一改变就会重新调用render函数
      window.addEventListener("load", () => {
        this.current = location.hash.slice(1);
      });
      // 监听路由改变
      window.addEventListener("hashchange", () => {
        this.current = location.hash.slice(1);
      });
    }
    // history模式
    if (this.mode === "history") {
    }
  }
}

VueRouter.install = function (_Vue) {
  Vue = _Vue;
  // 挂在$router属性，使用时就可以通过this,$router.push()等方式
  Vue.mixin({
    // 注意此钩子在每个组件创建实例的时候都会调用
    // 给全局添加数据和方法
    beforeCreate() {
      // 根实例
      if (this.$options.router) {
        // 添加$router
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  // 全局组件 router-link router-view
  // 设置 router-link组件
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    // 要求变量必须是响应式, render才会调用
    // render方法的实质就是生成template模板,参数为h-createElement
    render(h) {
      // h全程 createElement
      // h函数用来创建虚拟节点,render函数要求返回虚拟节点
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default // 定义子节点中的内容为默认插槽
      );
    },
  });

  // 设置 router-view
  Vue.component("router-view", {
    render(h) {
      let current = this.$router.current;
      let routes = this.$router.routes;
      let com = routes.find((route) => {
        return current === route.path;
      });

      // 返回路由所指向的组件
      return h(com.component);
    },
  });
};
export default VueRouter;
