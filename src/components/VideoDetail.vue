<template>
    <div class="VideoDetail">
        <div class="VideoDetail-nav">
            <span @click="navigateTo({name:'index'})">  back to main page </span> | <span onclick="history.back();">  back to list </span>
        </div>
        <div class="videoPanel">
            <br>
            <p> <span class="paleText"> Title: </span>{{video.snippet.title}}</p>
   
            <p><span class="paleText"> Description: </span> {{video.snippet.description}}</p>
            <p><span class="paleText"> Channel: </span> {{video.snippet.channelTitle}}</p>
             <p><span class="paleText">  PublishedAt: </span> {{video.snippet.publishedAt}}</p>
    
            <div style="width:99vw;  height:99vh;" class="embed-responsive horizontal-alignment  embed-responsive-16by9">
                <iframe v-bind:src="url" allowfullscreen frameborder="0" class="embed-responsive-item"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VideoDetail',
        data() {
            return {
                videoId: null,
                video: null,
                url: null,
            }
        },
        created() {
            this.videoId = this.$route.params.id;
            this.url = `https://www.youtube.com/embed/${this.videoId}`;
            this.video = this.$route.params.video;
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
    .paleText {
        color: rgba(255, 0, 0, 0.69);
       
    }
    
    .VideoDetail-nav {
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 18px;
        color: rgba(0, 0, 0, 0.42);
    }
    
    .VideoDetail-nav>span:hover {
        color: rgba(0, 0, 0, 0.69);
        transition: 0.15s ease-in-out;
        cursor: pointer;
    }
    
    .videoPanel {
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