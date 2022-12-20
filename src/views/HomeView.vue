<script setup lang="ts">
import { onMounted, ref } from "vue";
import { emitter } from '../emitter';

import VideoInfoSpan from "@/components/VideoInfoSpan.vue";

let songs = ref([]);

function sendNewVideoInfo(i: any) {
  emitter.emit<any>('newVideo', i)
};

onMounted(() => {
  fetch('/data/data.json')
    .then(d => d.json())
    .then(i => songs.value = i);
});
</script>

<template>
  <main>
    <div v-for="i in songs" :key="i['id']">
      <div class="border-bottom p-3">
        <h4><a :href="'#' + i['id']" v-on:click="sendNewVideoInfo(i)">{{ i['title'] }}</a></h4>
        <VideoInfoSpan :i="i"></VideoInfoSpan>
      </div>
    </div>
  </main>
</template>
