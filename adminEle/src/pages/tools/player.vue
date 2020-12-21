<template>
    <div>
        <h3>{{data.videoListName}}</h3>
        <div style="width: 100%;display: flex;justify-content: space-between">
            <div class="introduce" style="flex-direction: column;display: flex">
                <span>演员：{{data.actor}}</span>
                <span>别名：{{data.alias}}</span>
                <span>地区：{{data.area}}</span>
                <span>创建时间：{{data.createTime}}</span>
                <span>导演：{{data.director}}</span>
                <span>发布：{{data.release}}</span>
                <span>语言：{{data.language}}</span>
                <span>类型：{{data.type}}</span>
                <span>视频链接：{{data.videoListLink}}</span>
            </div>
            <img style="width: 200px;height: 300px" :src="data.videoListImage"/>
        </div>

        <video-player  class="video-player-box" style="width:800px"
                       ref="videoPlayer"
                       :options="playerOptions"
                       :playsinline="true"
                       customEventName="customstatechangedeventname"

                       @play="onPlayerPlay($event)"
                       @pause="onPlayerPause($event)"


                       @statechanged="playerStateChanged($event)"
                       @ready="playerReadied">
        </video-player>
    </div>

</template>
<style scoped>
    .introduce span{
        padding: 5px;
    }
</style>

<script>
    // Similarly, you can also introduce the plugin resource pack you want to use within the component
    // import 'some-videojs-plugin'
    // @ended="onPlayerEnded($event)"
    // @waiting="onPlayerWaiting($event)"
    // @playing="onPlayerPlaying($event)"
    // @loadeddata="onPlayerLoadeddata($event)"
    // @timeupdate="onPlayerTimeupdate($event)"
    // @canplay="onPlayerCanplay($event)"
    // @canplaythrough="onPlayerCanplaythrough($event)"
    export default {
        props: {
            params : Object
        },
        data() {
            return {
                data:{},
                playerOptions: {
                    // videojs options
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "application/x-mpegURL",
                        src: this.$route.params.videoListLink
                    }],
                    poster: "/static/images/author.jpg",
                }
            }
        },
        created() {
            console.log("===============")
            console.log(this.$route.params,'=================xxxxyyy')
            this.data=this.$route.params;
            // console.log(this.query,'xxxxyyy')

        },
        activated() {
            console.log("===============",this.$route.params)
            if(this.$route.params.videoListLink){
                console.log("=============yyyyy==",this.$route.params)
                this.data=this.$route.params
                this.$refs.videoPlayer.player.src({
                    src:this.$route.params.videoListLink
                })
            }

            // player.src({
            //     src:that.videosrc
            // })
        },
        mounted() {
            console.log('this is current player instance object', this.player)
        },
        computed: {
            // player() {
            //     return this.$refs.videoPlayer.player
            // }
        },
        methods: {
            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            // ...player event

            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },

            // player is ready
            playerReadied(player) {
                console.log('the player is readied', player)
                // you can use it to do something...
                // player.[methods]
            }
        }
    }
</script>