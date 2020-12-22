import Vue from 'vue'
import Vuex from 'vuex'

import store from './store'

Vue.use(Vuex)



export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      store
    },

    strict: process.env.DEV
  })

  return Store
}
