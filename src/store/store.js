import Vue from "vue";
import Vuex from "vuex";

const axios = require("axios");

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    searchMaxResult: 2,
    defaultApiYoutubeKey: "AIzaSyCs7T7ieJrSqM1-hifUx-TGwGA8LGwT3o4",
    apiYoutubeKey: "AIzaSyCs7T7ieJrSqM1-hifUx-TGwGA8LGwT3o4",
    videos: null,
    makeSearchClear: false,
    BASE_URL: "https://www.googleapis.com/youtube/v3/search"
  },
  mutations: {
    setCustomSearchMaxResult(state, maxResult) {
      state.searchMaxResult = maxResult;
    },
    makeSearchClear(state) {
      state.makeSearchClear = !state.makeSearchClear;
    },
    setCustomApiKey(state, apikey) {
      state.apiYoutubeKey = apikey;
    },
    setDefaultApiKey(state) {
      state.apiYoutubeKey = state.defaultApiYoutubeKey;
    },
    SetVideos(state, response) {
      state.videos = response.data.items;
    }
  },
  actions: {
    Search({ commit }, params) {
      axios.get(params.url, { params }).then(response => {
        commit("SetVideos", response);
      });
    }
  }
});
