<template>
  <div class="SearchBar">
    <div style=" background: #FAFAFA !important; padding:20px;">
      <b-navbar type="dark" variant="light" class="" style="padding:0px 
                                                          !important;">
        <b-nav-form v-on:submit.prevent="handleFormSubmit" class=" col-12 justify-content-md-center" >
          <div class="col-md-8 col-sm-9 col-lg-5 " style="padding:0px !important;">
          <b-form-input v-model="searchString" type="text"
            placeholder="Enter the query" autofocus style="
                                                                   width:100%;" />
                                                                 
          <b-button  style="position:absolute; z-index:10; right:0px; top:0px;" variant="Info" class=" uborder white " type="submit">
            <span style="color:rgba(0, 0, 0, 0.69);">
              Search
            </span>
          </b-button>

          <div v-if="suggestionsList" style="border:1px solid rgba(0, 0, 0, 0.205); background:white; border-top:none; width:100%; z-index:1000; position:absolute;left:0px; top:38px; padding:0px;margin:auto; " class="  ">
          <div style="background:white; text-align: left; padding:7px;  margin-top:3px; " v-for="item in suggestionsList">
            {{item}} </div>

        </div>

        </div>

        </b-nav-form>

      </b-navbar>
      <!-- <div class=" col-12 justify-content-md-center">
        <div style="border:1px solid rgba(0, 0, 0, 0.205); border-top:none; position:relative;left:0px; top:-2px; padding:0px;margin:auto; " class=" col-md-8 col-sm-9 col-lg-5">
          <div style="background:white; text-align: left; padding:7px;  margin-top:3px; " v-for="item in suggestionsList">
            {{item}} </div>

        </div>
      </div> -->
    </div>


    <div v-if="videos" class="VideoListWrapper">
      <VideoList :videos="videos">

      </VideoList>
    </div>
  </div>
</template>

<script>
  import Search from '@/services/Search'
  // import Suggestions from '@/services/Suggestions'
  import {
    suggestions,
    test
  } from '@/services/Suggestions'
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
        suggestionsList: null
      }
    },
    methods: {
      handleFormSubmit() {
        Search({
          apiKey: 'AIzaSyBYNs68w7K7IoPSJ5KM1bDqg9Y9hS0PzQM',
          term: this.searchString,
        }, response => this.videos = response);
        this.suggestionsList = null;

      },
      handleSearchSuggestions() {


      }

    },
    mounted() {
      this.$nextTick(() => {
        if (searchString == '') {
          this.suggestionsList = null

        }
      })
    },
    watch: {
      searchString: function (query) {
        if (query == '') {
          this.suggestionsList = null

        }

        const makeCallback = script => response => {
          document.head.removeChild(script)


          let json = {
            ...response
          };

          let jsonItem = {
            ...json[1]
          };


          this.suggestionsList = jsonItem
          if (query == '') {
            this.suggestionsList = null

          }

        }

        setTimeout(function () {


          let s = document.createElement('script')
          s.charset = 'utf-8'
          s.src =
            'https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=' + query +
            '&callback=suggestCallback'
          window.suggestCallback = makeCallback(s)
          document.head.appendChild(s)

        }, 500)




      },
    },


  }

</script>

<style scoped>
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
    pading:0px !important;
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

  .btn:hover {
   
  }

  .btn:active {
    box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116) inset;
  }

</style>
