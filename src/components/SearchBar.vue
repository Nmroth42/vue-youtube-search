<template>
  <div class="search_bar">
    <div class="search_bar_inward_space">
      <b-navbar
        type="dark"
        variant="light"
        class="no_padding"
      >
        <b-nav-form
          class=" col-12 justify-content-md-center main_background"
          @submit.prevent="handleFormSubmit()"
        >
          <div class="col-md-8 col-sm-9 col-lg-6 search_Panel">
            <b-form-input
              v-model="searchString"
              class="search_input"
              type="text"
              autocomplete="off"
              :placeholder="searchMessage"
              autofocus
              @focus="handleSearchWatcher()"
              @blur="handleSearchOnBlurSuggestions()"
            />
            <b-button
              variant="Info"
              class="search_button uborder white "
              type="submit"
            >
              <span class="pale_text">Search</span>
            </b-button>
            <div
              v-if="suggestionsList"
              class="search_suggestions_list_wrapper"
            >
              <div
                v-for="(item, index) in suggestionsList"
                :key="index"
                class="search_item"
                @click="handleSearchSuggestions(item, index)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </b-nav-form>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import VideoList from "./VideoList";

export default {
  name: "SearchBar",
  components: {
    VideoList
  },
  data() {
    return {
      searchString: "",
      suggestionsList: null,
      searchMessage: "Enter the query",
      isSearchWatcherWork: true
    };
  },
  computed: {
    isSearchClear() {
      return this.$store.state.makeSearchClear;
    }
  },
  watch: {
    isSearchClear(value) {
      if (value === true) {
        this.searchString = "";
        this.$store.commit("makeSearchClear");
      }
    },
    "$route.query.search": {
      immediate: true,
      handler(value) {
        if (value !== undefined) {
          this.searchString = value;
          const vm = this;
          this.isSearchWatcherWork = false;
          setTimeout(() => {
            vm.handleFormSubmit();
          }, 0);
        }
      }
    },
    searchString(query) {
      if (this.isSearchWatcherWork) {
        if (query === "") {
          this.suggestionsList = null;
        }
        const makeCallback = script => response => {
          document.head.removeChild(script);
          const jsonArray = {
            ...response
          };
          const jsonItem = {
            ...jsonArray[1]
          };
          this.suggestionsList = jsonItem;
          if (this.searchString === "") {
            this.suggestionsList = null;
          }
        };
        setTimeout(() => {
          const s = document.createElement("script");
          s.charset = "utf-8";
          document.head.appendChild(s);
          s.src = `https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=${query}&callback=suggestCallback`;
          window.suggestCallback = makeCallback(s);
        }, 100);
      }
    }
  },
  methods: {
    handleSearchWatcher() {
      this.isSearchWatcherWork = true;
    },
    handleFormSubmit() {
      if (this.searchString === "") {
        this.searchMessage = "Empty query!";
      } else {
         this.$store.dispatch("SetVideosFromSubmit", this.searchString);
        const vm = this;
        this.suggestionsList = null;
        this.searchMessage = "Enter the query";
        const route = {
          name: "list"
        };
        route.query = {
          search: vm.searchString
        };
        // console.log(vm.$route.query.search);
        this.isSearchWatcherWork = true;
        vm.$router.push(route);
      }
    },
    handleSearchSuggestions(item) {
      // поиск по подсказке
      var vm = this;
      this.isSearchWatcherWork = false;
      this.searchString = item;
      this.$store.dispatch("SetVideosFromSuggestion", item);
      var vm = this;
      vm.searchMessage = "Enter the query";
      vm.suggestionsList = null;
      setTimeout(() => {
        const route = {
          name: "list"
        };
        route.query = {
          search: vm.searchString
        };
        vm.$router.push(route);
      }, 0);
    },
    handleSearchOnBlurSuggestions() {
      const vm = this;
      setTimeout(() => {
        vm.suggestionsList = null;
      }, 200);
    }
  }
};
</script>

<style scoped>
.b-form-input {
  width: 100% !important;
}
.search_suggestions_list_wrapper {
  border: 1px solid rgba(0, 0, 0, 0.205);
  background: white;
  border-top: none;
  width: 100%;
  z-index: 1000;
  position: absolute;
  left: 0px;
  top: 38px;
  padding: 0px;
  margin: auto;
}

.search_input {
  width: 100% !important;
}

.search_Panel {
  padding: 0px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.main_background {
  background: #fafafa;
}

.no_padding {
  padding: 0px !important;
}

.search_bar_inward_space {
  background: #fafafa !important;
  padding: 20px;
}

.search_button {
  position: absolute;
  z-index: 10;
  right: 0px;
  top: 0px;
  background: #f8f8f8;
}

.search_button:hover span {
  color: rgba(0, 0, 0, 0.87) !important;
}

.search_button:hover {
  background: #f0f0f0 !important;
}

.search_item:hover {
  background: #eeeeee !important;
}

.search_item {
  font-weight: 500;
  cursor: default;
  font-size: 16px;
  padding: 5px;
  color: rgba(0, 0, 0, 0.87);
  padding-left: 10px;
  padding-right: 10px;
  background: white;
  text-align: left;
  margin-top: 3px;
}

@media only screen and (max-width: 900px) {
  .search_item {
    font-weight: 500;
    font-size: 15px;
    padding: 2px;
    padding-left: 10px;
    padding-right: 10px;
    color: rgba(0, 0, 0, 0.87);
  }
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.ucolor {
  background: #ff0000 !important;
}

.white {
  background: rgb(255, 255, 255) !important;
}

.uborder {
  border: 1px solid rgba(0, 0, 0, 0.205);
  border-radius: 3px;
  pading: 0px !important;
}

.search_input:focus {
  box-shadow: none !important;
  box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116) !important;
}

.search_input {
  border: 1px solid rgba(0, 0, 0, 0.205);
}

.search_input:hover {
  box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116);
}

.btn:focus {
  box-shadow: none;
}

.btn:hover {
}

.btn:active {
  box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116) inset;
}

.pale_text {
  color: rgba(0, 0, 0, 0.69);
}
</style>
