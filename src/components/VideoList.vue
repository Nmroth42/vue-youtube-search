<template>
  <div class="VideoList">
    <div class="row largeScreenVideoList" >
      <Video-Item  class="videoItem" v-for="video in videos" :key="video.id.videoId" :video="video">

      </Video-Item>
    </div>
  </div>
</template>

<script>
  import VideoItem from './VideoListItem'

  export default {
    name: 'VideoList',
    data() {
      return {

      }
    },
    created() {

    },
    props: ['videos'],
    components: {
      VideoItem
    }

  }

</script>

<style scoped>
  
  .largeScreenVideoList {
    width: 1070px;
    transform: translate(-50%);
    position: relative;
    left: 50%;
  }
  @media only screen and (min-width: 562px) and (max-width: 946px)  {
     .largeScreenVideoList {
    width: 532px !important;
   
    margin-left:auto;
    margin-right:auto;
 
    }
  }
  @media only screen and (max-width: 1030px) {
    .largeScreenVideoList {
    width: auto;
   
    
    transform: none;
    position: relative;
    left: auto;
    }
  }

</style>
