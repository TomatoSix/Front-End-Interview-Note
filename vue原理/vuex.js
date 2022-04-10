// vue使用
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// })

// 实现vuex
// Vue.use()会调用里面的install方法

let Vue
class Store {
  constructor(options) {
    this._vm = new Vue({
      _data: {
        $$state: options.state
      }
    })

    this._mutations = options.mutations
    this._actions = options.actions
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    this.getters = {}

    options.getters && this.handleGetters(options.getters)
  }

  handleGetters(getters) {
    Object.keys(getters).map(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](this.state)
      })
    })
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error("please use replaceState to reset state")
  }

  commit(type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error("unknown mutation type")
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const  entry = this._actions[type]
    if (!entry) {
      console.error("unknown action type")
    }
    entry(this, payload)
  }
}

const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store =  this.$options.store
      }
    }
  })
}


export default {Store, install}