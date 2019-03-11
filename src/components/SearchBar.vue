<template>
  <div class="search_bar">
    <div class="search_bar_inward_space">
      <b-navbar type="dark" variant="light" class="no_padding">
        <b-nav-form v-on:submit.prevent="handleFormSubmit()"
        class=" col-12 justify-content-md-center main_background">
          <div class="col-md-8 col-sm-9 col-lg-6 search_Panel">
            <b-form-input v-on:focus="handleSearchWatcher()" 
            v-on:blur="handleSearchOnBlurSuggestions()" v-model="searchString" class="search_input" 
            type="text" autocomplete="off" v-bind:placeholder="searchMessage" autofocus/>
            <b-button variant="Info" class="search_button uborder white " type="submit">
              <span class="pale_text">Search</span>
            </b-button>
            <div v-if="suggestionsList" class="search_suggestions_list_wrapper">
              <div v-on:click="handleSearchSuggestions(item, index)" class="search_item"
               v-for="(item, index) in suggestionsList"  v-bind:key="index">
                {{item}}
              </div>
            </div>
          </div>
        </b-nav-form>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import Search from '@/services/Search';
import VideoList from './VideoList';
import { setTimeout } from 'timers';

export default {
  components: {
    VideoList,
  },
  name: 'search_bar',
  data() {
    return {
      searchString: '', 
      suggestionsList: null, // массив поисковых подсказок
      searchMessage: 'Enter the query', // вспомогательное сообщение при поиске
      isSearchWatcherWork: true, // в случае выбора из списка подсказок нужно  
    }                            // отключать ватчер на searchString
  },                             // чтобы не было выпадения нового списка подсказок (73 строчка)
  methods: {
    handleSearchWatcher() { // используется при фокусе на инпут
      this.isSearchWatcherWork = true;
    },
    handleFormSubmit() { // поиск по кнопке
      if (this.searchString === '') {
        this.searchMessage = "Empty query!"; 
      } else {
        Search({
          apiKey: 'AIzaSyCTJYnFIwjms8ycm2wr83hPgYA-2m4siqQ',
          term: this.searchString,
        }, response => this.$store.dispatch('SetVideos', response));
        var vm = this;
        this.suggestionsList = null;
        this.searchMessage = "Enter the query";
        const route = {
          name: 'list',
        }
        route.query = {
          search: vm.searchString, 
        }
        console.log(vm.$route.query.search);
        this.isSearchWatcherWork = true; // при переходе фокус остается на инпуте. поэтому трунькаем ещё раз
        vm.$router.push(route)
      }
    },
    handleSearchSuggestions(item) { // поиск по подсказке
      var vm = this;
      this.isSearchWatcherWork = false;
      this.searchString = item;
      console.log('клик');
      Search({
        apiKey: 'AIzaSyCTJYnFIwjms8ycm2wr83hPgYA-2m4siqQ',
        term: item,
      }, response => this.$store.dispatch('SetVideos', response));
      var vm = this
      vm.searchMessage = "Enter the query"
      vm.suggestionsList = null;
      setTimeout(function(){ // даем время, чтобы isSearchWatcherWork = false сработал 
        const route = {
          name: 'list',
        };
        route.query = {
          search: vm.searchString
        };
        console.log(vm.$route.query.search)
        vm.$router.push(route)
      }, 0);
    },
    
    handleSearchOnBlurSuggestions() { // отвечает за скрытие и удаление подсказок
      var vm = this;
      setTimeout(function() { // без таймаута работать не будет handleSearchSuggestions. т.к handleSearchOnBlurSuggestions вызывается первой
        vm.suggestionsList = null;
      }, 200)
    }
  },
  computed: {
    isSearchClear() {
      return this.$store.state.makeSearchClear // это нужно, чтобы при переходе на другие страницы
    }                                          // сбрасывать значение searchString.
  },                                           // это костыль, но я не знаю как по-другому.
  watch: {                                     // Base.vue 17 строка(пример реализации)
    isSearchClear: function(value) {
      if (value === true ) {
        this.searchString = ''
        console.log(value)
        this.$store.commit('makeSearchClear')

      }
    },
    '$route.query.search': { // мап в url
      immediate: true,
      handler(value) {
        if (value !== undefined) {
          this.searchString = value
          const vm = this
          this.isSearchWatcherWork = false;
          setTimeout(function(){
          vm.handleFormSubmit()
          console.log(vm.suggestionsList)
        }, 0)
        }
      }
    },
    searchString: function(query) {
      if (this.isSearchWatcherWork) {
        if (query === '') {
          this.suggestionsList = null
        }
        // тут обходим cors блокировку 
        // response приходит функцией (152 строчка)
        const makeCallback = script => response => {
          document.head.removeChild(script)
          let jsonArray = {
            ...response
          };
          let jsonItem = {
            ...jsonArray[1]
          };
          this.suggestionsList = jsonItem
          if (this.searchString == '') {
            this.suggestionsList = null
          }
        }
        setTimeout(function() {
          const s = document.createElement('script')
          s.charset = 'utf-8'
          document.head.appendChild(s)
          s.src =
            'https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=' +
            query +
            '&callback=suggestCallback'
          window.suggestCallback = makeCallback(s)
        }, 100)
      }
    },
  },
}
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
    background: #FAFAFA;
  }
  
  .no_padding {
    padding: 0px !important;
  }
  
  .search_bar_inward_space {
    background: #FAFAFA !important;
    padding: 20px;
  }
  
  .search_button {
    position: absolute;
    z-index: 10;
    right: 0px;
    top: 0px;
    background: #F8F8F8;
  }
  
  .search_button:hover span {
    color: rgba(0, 0, 0, 0.87) !important;
  }
  
  .search_button:hover {
    background: #F0F0F0 !important;
  }
  
  .search_item:hover {
    background: #EEEEEE !important;
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
    background: #FF0000 !important;
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
  
  .btn:hover {}
  
  .btn:active {
    box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116) inset;
  }
  
  .pale_text {
    color: rgba(0, 0, 0, 0.69);
  }
</style>
