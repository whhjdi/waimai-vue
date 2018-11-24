import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sellerFavorite: null
  },
  mutations: {
    saveToLocal(state, payload) {
      let{id,key,value} = payload
      let seller = window.localStorage.getItem('__seller__')
      if (!seller) {
        seller = {}
        seller[id] = {}
      } else {
        seller = JSON.parse(seller)
        if (!seller[id]) {
          seller[id] = {}
        }
      }
      seller[id][key] = value
      console.log(seller);
      window.localStorage.setItem('__seller__', JSON.stringify(seller))
      state.sellerFavorite = seller[id][key]
    },
    loadFromLocal(state,payload) {
      let{id,key,value} = payload
      let seller = window.localStorage.getItem('__seller__')
      if(!seller){
        return value
      }
      seller = JSON.parse(seller)[id]
      state.sellerFavorite = seller[key] || value
    }
  },
  actions: {

  }
})