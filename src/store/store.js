import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    videos: null,
    makeSearchClear:false,
  },
  mutations: {
    SetVideos (state, videos) {
      state.videos = videos;
    },
    makeSearchClear (state) {
      state.makeSearchClear = !state.makeSearchClear;
    },
    
  },
  actions: {
    SetVideos ({ commit }, videos) {
      commit('SetVideos', videos);
    },
  },
 
});
