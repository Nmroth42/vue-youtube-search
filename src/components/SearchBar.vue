<template>
  <div class="SearchBar">
    <div style=" background: #FAFAFA !important; padding:20px;">
      <b-navbar type="dark" variant="light" class="" style="padding:0px 
                                                          !important;">
        <b-nav-form v-on:submit.prevent="handleFormSubmit" style="background:#FAFAFA;" class=" col-12 justify-content-md-center">
          <div class="col-md-8 col-sm-9 col-lg-6 " style="padding:0px !important; margin-left:auto !important; margin-right:auto !important;">
            <b-form-input v-on:focus="handleSearchWatcher()" v-on:blur="handleSearchFocusSuggestions()" v-model="searchString"
              type="text" autocomplete="off" id="searchInput" v-bind:placeholder="searchMessage" autofocus style="
                                                                   width:100%;" />

            <b-button variant="Info" class="searchButton uborder white " type="submit">
              <span style="color:rgba(0, 0, 0, 0.69);">
                Search
              </span>
            </b-button>
            <!-- v-on:blur="handleSearchFocusSuggestions()" -->
            <div v-if="suggestionsList" style="border:1px solid rgba(0, 0, 0, 0.205); background:white; border-top:none; width:100%; z-index:1000; position:absolute;left:0px; top:38px; padding:0px;margin:auto; "
              class="  ">
              <div v-on:click="handleSearchSuggestions(item)" class="searchItem" style="background:white; text-align: left;   margin-top:3px; "
                v-for="item in suggestionsList">
                {{item}} </div>

            </div>

          </div>

        </b-nav-form>

      </b-navbar>

    </div>


    <div v-if="videos" class="VideoListWrapper">
      <VideoList :videos="videos">

      </VideoList>
    </div>
  </div>
</template>

<script>
  // function _dom_trackActiveElement(evt) {
  //   var activeEl = null;
  //   if (evt && evt.target) { 
  //     this.activeEl = 
  //         evt.target == document ? null : evt.target;
  //   }
  // }

  // function _dom_trackActiveElementLost(evt) { 
  //   this.activeEl = null; }

  // if (document.addEventListener) {
  //   document.addEventListener("focus",_dom_trackActiveElement,true);
  //   document.addEventListener("blur",_dom_trackActiveElementLost,true);

  // }
  // console.log(this.activeEl)
  // var searchEl = document.getElementById('searchInput');
  // if  (document.activeElement === searchEl) {

  //       // var isFocused = (document.activeElement === searchEl);
  //       console.log("working!")
  // }
  import Search from '@/services/Search'
  import VideoList from './VideoList'

  export default {

    components: {
      VideoList
    },
    name: 'SearchBar',
    data() {
      return {
        videos: null,
        searchString: '',
        suggestions: '',
        suggestionsList: null,
        searchMessage: 'Enter the query',
        isWatcherWork: true
      }
    },
    methods: {
      handleSearchWatcher() {
        this.isWatcherWork = true
      },
      handleFormSubmit() {
        if (this.searchString == '') {
          this.searchMessage = "You've entered empty query!"
        } else {
          Search({
            apiKey: 'AIzaSyBYNs68w7K7IoPSJ5KM1bDqg9Y9hS0PzQM',
            term: this.searchString,
          }, response => this.videos = response);
          this.suggestionsList = null;
          this.searchMessage = "Enter the query"
        }
      },
      handleSearchSuggestions(item) {
        this.isWatcherWork = false
        this.searchString = item
        var vm = this;

        Search({
          apiKey: 'AIzaSyBYNs68w7K7IoPSJ5KM1bDqg9Y9hS0PzQM',
          term: item,
        }, response => vm.videos = response);
        vm.searchMessage = "Enter the query"

        vm.suggestionsList = null;




      },
      handleSearchFocusSuggestions() {
        var vm = this;
        setTimeout(function () {
          vm.suggestionsList = null;
        }, 200)
      }

    },

    mounted() {

      // document.getElementById("searchInput").addEventListener("blur", () => {
      //   console.log("jjjjjjj");
      //   var vm = this;
      //   setTimeout(function () {
      //     vm.suggestionsList = null;
      //   }, 100)
      // });

      this.$nextTick(() => {


        //    if (search === document.activeElement) {
        // console.log('working!')

        //    }
        //  var input_focused = document.activeElement === document.getElementById("searchInput") && document.hasFocus();
        //  console.log(input_focused)
        //   if  (!document.getElementById("searchInput").autofocus) {
        //    console.log('working!')
        //  }
      })
    },



    watch: {
      searchString: function (query) {
        if (this.isWatcherWork) {
          if (query == '') {
            this.suggestionsList = null
          }

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

          setTimeout(function () {
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

  #searchInput {}

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
  }

  .VideoListWrapper {
    margin: 60px;
    padding: 30px;

    margin-top: 30px;
    /* background: rgba(252, 164, 164, 0.1); */
    background-image:
      radial-gradient(circle,
      rgb(236, 236, 236),
      white);
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

</style>
