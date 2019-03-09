<template>
  <div class="SearchBar">
    <div class="SearchBarInwardSpace">
      <b-navbar type="dark" variant="light" class="noPadding">
        <b-nav-form v-on:submit.prevent="handleFormSubmit()" class=" col-12 justify-content-md-center mainBackground">
          <div class="col-md-8 col-sm-9 col-lg-6 searchPanel">
            <b-form-input v-on:focus="handleSearchWatcher()" v-on:blur="handleSearchFocusSuggestions()" v-model="searchString" class="searchInput" type="text" autocomplete="off" id="searchInput" v-bind:placeholder="searchMessage" autofocus/>
            <b-button variant="Info" class="searchButton uborder white " type="submit">
              <span class="paleText">Search</span>
            </b-button>
            <div v-if="suggestionsList" class="SearchSuggestionsListWrapper">
              <div v-on:click="handleSearchSuggestions(item, index)" class="searchItem" v-for="(item, index) in suggestionsList"  v-bind:key="index">
                {{item}}
              </div>
            </div>
          </div>
          <!-- end searchPanel -->
        </b-nav-form>
      </b-navbar>
    </div>
  </div>
</template>

<script>
  import Search from '@/services/Search'
  import VideoList from './VideoList'
  
  export default {
    components: {
      VideoList,
    },
    name: 'SearchBar',
    data() {
      return {
        searchString: '',
        suggestions: '',
        suggestionsList: null,
        searchMessage: 'Enter the query',
        isWatcherWork: true
      }
    },
    methods: {
      handleSearchWatcher() {
        this.isWatcherWork = true;
      },
      handleFormSubmit() {
        if (this.searchString == '') {
          this.searchMessage = "Empty query!";
        } else {
          Search({
            apiKey: 'AIzaSyCYuEYR2Hvf1ZHaYnpDTZQwF3kmXzQC7Xk',
            term: this.searchString,
          }, response => this.$store.dispatch('SetVideos', response));
          this.suggestionsList = null;
          this.searchMessage = "Enter the query";
          var vm = this;
  
          //Тут нужно добавить лоадинг вместо таймаута
          setTimeout(function() {
            const route = {
              name: 'list'
            }
            route.query = {
              search: vm.searchString
            }
  
            console.log(vm.$route.query.search)
            vm.$router.push(route)
          }, 1000)
        }
      },
      handleSearchSuggestions(item) {
        this.isWatcherWork = false;
        this.searchString = item;
        var vm = this;
        Search({
          apiKey: 'AIzaSyCYuEYR2Hvf1ZHaYnpDTZQwF3kmXzQC7Xk',
          term: item,
        }, response => this.$store.dispatch('SetVideos', response));
        vm.searchMessage = "Enter the query"
        vm.suggestionsList = null;
        var vm = this
        //Тут нужно добавить лоадинг вместо таймаута
        setTimeout(function() {
          const route = {
            name: 'list',
            //  params: {
            //     pageCreated:true // or anything you want
            //   }
          }
          route.query = {
            search: vm.searchString
          }
  
          console.log(vm.$route.query.search)
          vm.$router.push(route)
        }, 1000)
      },
      handleSearchFocusSuggestions() {
        var vm = this;
        setTimeout(function() {
          vm.suggestionsList = null;
        }, 200)
      }
    },
    computed: {
      isSearchClear() {
        return this.$store.state.makeSearchClear
      }
    },
    watch: {
      isSearchClear: function(value) {
        if (value == true ) {
          this.searchString = ''
          console.log(value)
          this.$store.commit('makeSearchClear')

        }
      },
      '$route.query.search': {
        immediate: true,
        handler(value) {
          if (value !== undefined) {
            this.searchString = value
            this.isWatcherWork = false;
            this.handleFormSubmit()
            console.log(this.suggestionsList)
          }
        }
      },
      searchString: function(query) {
        if (this.isWatcherWork) {
          if (query == '') {
            this.suggestionsList = null
          }
          const makeCallback = script => response => {
            document.head.removeChild(script)
            //Тут можно сделать лучше
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
            let s = document.createElement('script')
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
  .SearchSuggestionsListWrapper {
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
  
  .searchInput {
    width: 100% !important;
  }
  
  .searchPanel {
    padding: 0px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  
  .mainBackground {
    background: #FAFAFA;
  }
  
  .noPadding {
    padding: 0px !important;
  }
  
  .SearchBarInwardSpace {
    background: #FAFAFA !important;
    padding: 20px;
  }
  
  .searchButton {
    position: absolute;
    z-index: 10;
    right: 0px;
    top: 0px;
    background: #F8F8F8;
  }
  
  .searchButton:hover span {
    color: rgba(0, 0, 0, 0.87) !important;
  }
  
  .searchButton:hover {
    background: #F0F0F0 !important;
  }
  
  .searchItem:hover {
    background: #EEEEEE !important;
  }
  
  .searchItem {
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
  
  .VideoListWrapper {
    margin: 60px;
    padding: 30px;
    margin-top: 30px;
    /* background: rgba(252, 164, 164, 0.1); */
    background-image: radial-gradient(circle, rgb(236, 236, 236), white);
  }
  
  @media only screen and (max-width: 900px) {
    .VideoListWrapper {
      margin: 0px;
      padding: 30px;
    }
    .searchItem {
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
  
  .form-control:focus {
    box-shadow: none;
    box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116);
  }
  
  .form-control {
    border: 1px solid rgba(0, 0, 0, 0.205);
  }
  
  .form-control:hover {
    box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116);
  }
  
  .btn:focus {
    box-shadow: none;
  }
  
  .btn:hover {}
  
  .btn:active {
    box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116) inset;
  }
  
  .paleText {
    color: rgba(0, 0, 0, 0.69);
  }
</style>
