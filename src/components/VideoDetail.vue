<template>
    <div class="video_detail">
        <div class="video_detail_nav">
            <span @click="navigateTo({name:'index'})"> back to main page </span>
            <span v-if="this.$store.state.videos" onclick="history.back();"> | back to list </span>
        </div>
        <div class="video_panel">
            <br>
            <span v-if="this.video">
                <p> <span> Title: </span>{{video.snippet.title}}</p>
                <p><span> Description: </span> <span v-if="!video.snippet.description"> This video has no description </span> {{video.snippet.description}}</p>
                <p><span> Channel: </span> {{video.snippet.channelTitle}}</p>
                <p><span> PublishedAt: </span> {{video.snippet.publishedAt}}</p>
            </span>
            <div class="video_size embed-responsive horizontal-alignment  embed-responsive-16by9">
                <iframe v-bind:src="url" allowfullscreen frameborder="0" class="embed-responsive-item"></iframe>
            </div>
        </div>
    </div>
</template>



<script>
    export default {
    
        name: 'video_detail',
        data() {
            return {
                videoId: null,
                video: null,
                url: null,
            }
        },
        mounted() {
            this.videoId = this.$route.query.v;
            this.url = `https://www.youtube.com/embed/${this.videoId}`;
    
            const makeCallback = script => response => {
                document.head.removeChild(script)
    
                this.video = response.items[0]
    
    
            }
            const apikey = 'AIzaSyCTJYnFIwjms8ycm2wr83hPgYA-2m4siqQ'
    
            var vm = this;
            const s = document.createElement('script')
            s.charset = 'utf-8'
            document.head.appendChild(s)
            s.src =
                `https://www.googleapis.com/youtube/v3/videos?key=${apikey}&part=snippet&id=${this.videoId}&callback=suggestCallback`
    
            window.suggestCallback = makeCallback(s)
    
        },
        methods: {
            navigateTo(route) {
                this.$store.commit('makeSearchClear')
                this.$router.push(route)
            }
        },
    
    }
</script>

<style scoped>
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
    
    .video_detail_nav>span:hover {
        color: rgba(0, 0, 0, 0.69);
        transition: 0.15s ease-in-out;
        cursor: pointer;
    }
    
    .video_panel>span>p>span {
        color: rgba(255, 0, 0, 0.69);
    }
    
    .video_panel {
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
