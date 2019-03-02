<template>
  <div class="VideoListItem  " style="padding:3px !important;">
    <!-- {{video.snippet.title}} -->
    <b-card 
    
      class="">
       <img class="card-img-top"   v-bind:src="videoImage"  >  
       <br>
        <br>
         
      <h6 class="card-title" style="  "> {{video.snippet.title}}</h6>
      <b-card-text>
        {{video.snippet.description}}
      </b-card-text>

      
    </b-card>

  </div>
</template>

<script>
  import Search from '@/services/Search'

  export default {
    name: 'VideoListItem',
    data() {
      return {
          text:'eee'
      }
    },
    created() {

    },
    computed:  {
        videoImage() {
                return this.video.snippet.thumbnails.medium.url;
        }
    },
    props: ['video']

  }

</script>

<style scoped>
@media only screen and (max-width: 560px) {
    .VideoListItem {
    transform: translate(-50%);
    position: relative;
    left: 50%;
    }
  }
.card {
    width:260px;
    border:none;
    margin-bottom: 10px !important;
    height:380px ;
}
.card-body {
    font-size: 15px !important;
    padding:0px !important;
     
    text-overflow: ellipsis !important; 
}
.card-text {
     padding:10px;
       color:rgba(0, 0, 0, 0.69);
}
.card-title {
     font-weight: bold;
     font-size: 16px;
    width:260px;
   padding:10px;
     white-space: nowrap; 
    overflow: hidden;
     text-overflow: ellipsis !important;
}

</style>
