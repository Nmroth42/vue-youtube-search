<template>
  <div class="video_detail">
    <div class="video_detail_nav">
      <router-link to="/">
        <span
          class="green_font"
          @click="clearSearchBar"
        > Main
        </span>
      </router-link>
      <span
        class="green_font"
        v-if="this.$store.state.videos"
        onclick="history.back();"
      >
        | back to list
      </span>
      <span
        class="green_font"
        @click="toggleView()"
      >
        | toggle view
      </span>
    </div>
    <div
      class="video_panel_full"
      v-show="isToggle"
    >
      <br>
      <span v-if="this.video">
        <p><span> Title: </span>{{ video.snippet.title }}</p>
        <p>
          <span> Description: </span>
          <span v-if="!video.snippet.description">
            This video has no description
          </span>
          {{ video.snippet.description }}
        </p>
        <p><span> Channel: </span> {{ video.snippet.channelTitle }}</p>
        <p><span> PublishedAt: </span> {{ video.snippet.publishedAt }}</p>
      </span>
      <div
        class="video_size embed-responsive horizontal-alignment  embed-responsive-16by9"
      >
        <iframe
          :src="url"
          allowfullscreen
          frameborder="0"
          class="embed-responsive-item"
        />
      </div>
    </div>

    <div
      v-show="!isToggle"
      class="video_panel_tight"
    >
      <div class="video_panel_desc">
        <br>
        <span v-if="this.video">
          <p>
            <span class="text_wrapper"> Title: </span>{{ video.snippet.title }}
          </p>
          <p>
            <span class="text_wrapper"> Description: </span>
            <span v-if="!video.snippet.description">
              This video has no description
            </span>
            {{ video.snippet.description }}
          </p>
          <p>
            <span class="text_wrapper"> Channel: </span>
            {{ video.snippet.channelTitle }}
          </p>
          <p>
            <span class="text_wrapper"> PublishedAt: </span>
            {{ video.snippet.publishedAt }}
          </p>
        </span>
      </div>

      <div class="video_panel_player">
        <div>
          <div
            class="video_size embed-responsive horizontal-alignment  embed-responsive-16by9"
          >
            <iframe
              :src="url"
              allowfullscreen
              frameborder="0"
              class="embed-responsive-item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoDetail",
  data() {
    return {
      isToggle: false,
      videoId: null,
      video: null,
      url: null
    };
  },
  mounted() {
    this.videoId = this.$route.query.v;
    this.url = `https://www.youtube.com/embed/${this.videoId}`;
    const makeCallback = script => response => {
      document.head.removeChild(script);
      this.video = response.items[0];
    };
    const apikey = this.$store.state.apiYoutubeKey;
    const s = document.createElement("script");
    s.charset = "utf-8";
    document.head.appendChild(s);
    s.src = `https://www.googleapis.com/youtube/v3/videos?key=${apikey}&part=snippet&id=${
      this.videoId
    }&callback=suggestCallback`;
    window.suggestCallback = makeCallback(s);
  },
  methods: {
    toggleView() {
      this.isToggle = !this.isToggle;
    },
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
.video_panel_tight {
  display: inline-flex;
  text-align: left;
  flex-wrap: wrap;
  width: 100%;
  background: #fafafa;
  border-top: 1px solid #dadce0;
}
.video_panel_desc {
  margin-left: auto;
  margin-right: auto;
  color: rgba(0, 0, 0, 0.81);
  padding: 10px;
  max-width: 500px;
    width: 100%;
  background: white;
}
.text_wrapper {
  background: rgba(245, 245, 245, 0.55);
  padding: 5px;
  font-weight: 600;
}
.video_panel_player > div {
  float: left;
  text-align: left;
}
.video_panel_player > div > div {
  max-width: 640px;
  max-height: 360px;
}
.video_panel_player {
  margin: 40px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(255, 0, 0, 0);
  position: relative;
}
.pale_text {
  color: rgba(255, 0, 0, 0.69);
}

.video_size {
  width: 99vw;
  height: 99vh;
}

.video_detail_nav {
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 18px;
  color: rgba(0, 0, 0, 0.42);
}

.video_detail_nav > span:hover {
  cursor: pointer;
}

.video_panel_full > span > p > span {
  color: rgba(255, 0, 0, 0.69);
}

.video_panel_full {
  background: black;
  color: rgba(255, 255, 255, 0.81);
  text-align: left;
  padding: 18px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.horizontal-alignment {
  transform: translate(-50%);
  position: relative;
  left: 50%;
}
</style>
