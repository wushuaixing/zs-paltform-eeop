import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCertification:true,
    isSubmitElements:true,
    info:{},
    isLogin:false,
  },
  getters:{
    getInfo:(state)=> state.info,
  },
  mutations: {
    updateLoginStates:(state)=>{
      state.isLogin = true;
    },
    updateInfo:(state,infoSource = {})=>{
      state.info = Object.assign({},state.info,infoSource)
    },
	  updateToken:(state,token)=>{
		  window.localStorage.token = token;
	  },
    resetInfo:(state)=>{
      state.info = {};
      state.isLogin = false;
      window.localStorage.token = '';
    }
  },
  actions: {
    updateInfo:(context,source)=>{
      context.commit('updateInfo',source);
    },
    login:(context,source)=>{
      context.commit('updateInfo',source);
	    context.commit('updateToken',source.token);
	    context.commit('updateLoginStates');
    },
  },
  modules: {
  }
})
