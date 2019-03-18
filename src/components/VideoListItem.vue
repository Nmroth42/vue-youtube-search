<template>
  <div class="video_list_item">
    <b-card
      class="card"
      @click="
        handleChooseVideo({ name: 'video', query: { v: video.id.videoId } })
      "
    >
      <img
        class="card-img-top"
        :src="videoImage"
      >
      <br>
      <br>
      <h6 class="card-title">
        {{ video.snippet.title }}
      </h6>
      <hr>
      <b-card-text>
        <span class="test_wrapper">{{ video.snippet.description }}</span>
        <span v-if="!video.snippet.description">
          This video has no description
        </span>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "VideoListItem",
  computed: {
    videoImage() {
      return this.video.snippet.thumbnails.medium.url;
    }
  },
  props: ["video"],
  methods: {
    handleChooseVideo(route) {
      this.$router.push(route);
    },
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.test_wrapper {
  background: rgba(245, 245, 245, 0.55);
  padding: 5px;
}

.video_list_item {
  padding: 3px !important;
}

@media only screen and (max-width: 560px) {
  .video_list_item {
    transform: translate(-50%);
    position: relative;
    left: 50%;
  }
}

.video_list_item .card:hover {
  cursor: pointer;
  background: rgba(250, 250, 250, 0.42);
  box-shadow: 0px 0px 1px 1px rgba(70, 70, 70, 0.116);
  transition: 0.15s ease-in-out;
  transition-property: all;
}

.video_list_item .card:hover .card-img-top {
  -webkit-filter: saturate(1.3);
  filter: saturate(1.3);
}

.card {
  width: 260px;
  border: none;
  margin-bottom: 10px !important;
  height: 415px;
  border-bottom: 4px solid #f5f5f5 !important;
}

.card-body {
  font-size: 15px !important;
  padding: 0px !important;
  text-overflow: ellipsis !important;
}

.card-text {
  padding: 10px;
  color: rgba(0, 0, 0, 0.69);
  text-align: left;
}

.card-title {
  font-weight: bold;
  font-size: 16px;
  width: 260px;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis !important;
}
</style>
