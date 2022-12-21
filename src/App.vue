<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { emitter } from './emitter';
import VideoInfoSpan from './components/VideoInfoSpan.vue';

emitter.on('newVideo', (i) => loadVideo(i));

function loadVideo(i) {
  switch (i['platform']) {
    default:
    case 'yt': {
      player.loadVideoById({
        'videoId': i['video'],
        'startSeconds': i['start'],
        'endSeconds': i['end'],
      });
      player.playVideo();
    };
  }
  playing.value = i;
}

const playing = ref([]);

let player = null;

onMounted(() => {
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player', {
      width: '100%',
      videoId: '',
      events: {
        'onReady': () => {
          if (window.location.hash && /^#[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(window.location.hash)) {
            fetch('/data/' + window.location.hash.substring(1) + '.json')
              .then(d => d.json())
              .then(i => loadVideo(i));
          }
          else {
            fetch('/data/data.json')
              .then(d => d.json())
              .then(i => loadVideo(i[0]));
          }
        },
        'onStateChange': (data) => {
          if (data.data === YT.PlayerState.ENDED && playing.value['next']) { 
            fetch('/data/' + playing.value['next'] + '.json')
              .then(d => d.json())
              .then(i => loadVideo(i));
          }
        }
      }
    });
  }
});

</script>

<template>
  <header>
    <nav>
    </nav>
    <div class="container-xl clearfix">
      <div class="col-6 float-left">
        <div class="d-flex flex-column flex-md-row flex-items-center flex-md-items-center ml-4 mr-4"
          :style="{ height: '100vh' }">
          <div :style="{width: '100%'}">
            <div id="player"></div>
            <div class="p-1">
              <h4>{{ playing['title'] }}</h4>
              <VideoInfoSpan :i="playing"></VideoInfoSpan>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 float-left p-4" :style="{ height: '100vh', overflow: 'auto' }">
        <RouterView />
      </div>
    </div>
  </header>

</template>

<style scoped>

</style>
