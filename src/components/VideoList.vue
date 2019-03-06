<template>
  <div class="VideoList">
  
    <div v-if="this.$store.state.videos" class="VideoListWrapper">
      <div class="row largeScreenVideoList">
        <Video-Item class="videoItem" v-for="video in this.$store.state.videos" :key="video.id.videoId" :video="video">
        </Video-Item>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoItem from './VideoListItem'
  import SearchBar from './SearchBar'
  
  export default {
    components: {
      VideoItem
    },
    name: 'VideoList',
  }
</script>

<style scoped>


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
  }
  
  .largeScreenVideoList {
    width: 1070px;
    transform: translate(-50%);
    position: relative;
    left: 50%;
  }
  
  @media only screen and (min-width: 562px) and (max-width: 946px) {
    .largeScreenVideoList {
      width: 532px !important;
      margin-left: auto;
      margin-right: auto;
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
