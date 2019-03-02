<template>
  <div class="SearchBar">
    <div style=" background: #FAFAFA !important;" >
    <b-navbar type="dark" variant="light" class="" style="padding:25px 
                                                          !important;">
      <b-nav-form v-on:submit.prevent="handleFormSubmit" class=" col-12 justify-content-md-center" style="margin-left:auto !important;
                                                                   margin-right:auto !important;">
        <b-form-input v-model="searchString" class="mr-sm-2 col-md-8 col-sm-9 col-lg-5 uborder" type="text" placeholder="Enter the query" autofocus />
        <b-button variant="Info" class="my-3 col-md-2  col-sm-2  col-lg-1 uborder white " type="submit">
          <span style="color:rgba(0, 0, 0, 0.69);">
            Search
          </span>
        </b-button>
      </b-nav-form>
    </b-navbar>
    </div>
    
    <div  v-if="videos" class="VideoListWrapper">
    <VideoList :videos="videos">

    </VideoList>
    </div>
  </div>
</template>

<script>

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
        searchString:''
      }
    },
    methods: {
      handleFormSubmit() {
        Search({
        apiKey: 'AIzaSyBYNs68w7K7IoPSJ5KM1bDqg9Y9hS0PzQM' ,
        term: this.searchString,
      }, response => this.videos = response );
      }
    },
    created() {
     
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
    radial-gradient(
      circle,
     rgb(236, 236, 236),
     white
     
    );
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
    box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116);
  }

  .btn:active {
    box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116) inset;
  }

 
   
  

</style>
