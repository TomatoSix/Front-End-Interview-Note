let Vue;

class VueRouter {
  constructor(options) {
    this.current = "/";
    this.initPath = "/";

    Vue.util.defineReactive(this, "current", this.initPath);
    this.routes = options.routes;
    this.mode = options.mode || "hash";
  }

  init() {
    if (this.mode === "hash") {
      window.addEventListener("load", () => {
        this.current = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.current = location.hash.slice(1);
      });
    }
  }
}
VueRouter.install = function (_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.component.$router = this.$options.router;
      }
    },
  });
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", {
    render(h) {
      let current = this.current;
      let routes = this.routes;
      let route = routes.find((route) => {
        return route.path === current;
      });
      return h(route.component);
    },
  });
};
export default VueRouter;
