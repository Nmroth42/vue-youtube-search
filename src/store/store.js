import Vue from "vue";
import Vuex from "vuex";
import Search from "@/services/Search";

const axios = require("axios");

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    defaultApiYoutubeKey: "AIzaSyCLWuugrgnK1Vy0iIIMvLrCMo2MNSAmR1o",
    apiYoutubeKey: "AIzaSyCLWuugrgnK1Vy0iIIMvLrCMo2MNSAmR1o",
    videos: null,
    makeSearchClear: false,
    BASE_URL: "https://www.googleapis.com/youtube/v3/search",
    params: null,
  },
  mutations: {
    makeSearchClear(state) {
      state.makeSearchClear = !state.makeSearchClear;
    },
    setCustomApiKey(state, apikey) {
      state.apiYoutubeKey = apikey;
    },
    setDefaultApiKey(state) {
        state.apiYoutubeKey = state.defaultApiYoutubeKey;
    },
    search(state, query) { 
      if (!state.apiYoutubeKey) {
        throw new Error("key not found");
      }
      const params = {
        part: "snippet",
        key: state.apiYoutubeKey,
        q: query,
        maxResults: 1,
        type: "video"
      };
      axios.get(state.BASE_URL, { params }).then(response => {
        state.videos = response.data.items;
      });
    },
  },
  actions: {
    SetVideosFromSubmit({ commit }, query) {
      commit("search", query);
    },
    SetVideosFromSuggestion({ commit }, query) {
      commit("search", query);
    }
  }
});
