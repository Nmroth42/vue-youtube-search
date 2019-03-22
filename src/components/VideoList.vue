<template>
  <div class="video_list">
    <div class="video_detail_nav">
      <router-link to="/">
        <span
          @click="clearSearchBar"
          class="green_font"
        >
          back to main page
        </span>
      </router-link>
    </div>
    <transition name="fade">
      <div
        v-if="this.$store.state.videos"
        class="video_list_wrapper"
      >
        <div class="row screen_video_list">
          <Video-Item
            v-for="video in this.$store.state.videos"
            :key="video.id.videoId"
            :video="video"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import VideoItem from "./VideoListItem";
// import { setTimeout } from 'timers';

export default {
  name: "VideoList",
  components: {
    VideoItem
  },
  methods: {
    clearSearchBar() {
      this.$store.commit("makeSearchClear");
    }
  }
};
</script>

<style scoped>
.green_font {
  color: #42b983;
}
a:hover {
  text-decoration: none;
}
.video_detail_nav {
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 18px;
  color: rgba(0, 0, 0, 0.42);
}
.video_detail_nav > span:hover {
  color: rgba(0, 0, 0, 0.69);
  transition: 0.15s ease-in-out;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.video_list_wrapper {
  margin-left: 60px;
  margin-right: 60px;
  padding: 30px;
  margin-top: 0px;

  /* background: rgba(252, 164, 164, 0.1); */
  background-image: radial-gradient(circle, rgb(236, 236, 236), white);
}

@media only screen and (max-width: 900px) {
  .video_list_wrapper {
    margin: 0px;
    padding: 30px;
  }
}

.screen_video_list {
  width: 1070px;
  transform: translate(-50%);
  position: relative;
  left: 50%;
}

@media only screen and (min-width: 562px) and (max-width: 946px) {
  .screen_video_list {
    width: 532px !important;
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: 1030px) {
  .screen_video_list {
    width: auto;
    transform: none;
    position: relative;
    left: auto;
  }
}
</style>
