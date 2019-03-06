
import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    strict: true,
    state: {
        videos: null
        
    },
    mutations: 
    {
        SetVideos (state, videos) {
            state.videos = videos
        },
       
    },
    actions: {
        SetVideos ({commit}, videos) {
            commit('SetVideos', videos)
        },
    }
  })


