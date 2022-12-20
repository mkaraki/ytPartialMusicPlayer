<script setup lang="ts">

defineProps<{
  i: any
}>();

</script>

<template>
  <div class="info-span-holder mt-1">
    <span v-if="i['isLive']" class="State State--small State--closed mr-2">Live</span>
    <div>
      <span v-if="i['originalArtist'] === null" class="State State--small State--open mr-2">Original</span>
      <div v-else>
        <span>{{ i['originalArtist'] }}</span>
      </div>
    </div>
    <span>
      <small v-if="i['originalArtist']">
        by
      </small>
      {{ i['singer'] }}
    </span>
    <span v-if="i['videoTitle']">
      <small>
        from
      </small>
      <a :href="i['url']" target="_blank">
        {{ i['videoTitle'] }}
      </a>
    </span>
    <span v-if="i['date']">
      <small>
        at
      </small>
      {{ i['date'] }}
    </span>
  </div>
</template>

<style scoped>
.info-span-holder div {
  display: inline-block;
}

.info-span-holder span {
  margin-right: 8px;
}
</style>