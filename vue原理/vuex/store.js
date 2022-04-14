import Vue from "vue";
import Vuex from "./vuex";

// use函数会调用install函数
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "six",
    age,
  },
  // 类似于计算属性
  getters: {
    addName(state) {
      return `我的名字是${state}`;
    },
  },
  // 提交数据, 修改state
  mutations: {
    // payload表示传入的数据
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncReduce(state, payload) {
      state.age -= payload;
    },
  },
  // 做异步操作
  actions: {
    asyncAdd({ commit }, payload) {
      setTimeout(() => {
        commit("syncReduce", payload);
      });
    },
  },
});

// vuex的持久化
