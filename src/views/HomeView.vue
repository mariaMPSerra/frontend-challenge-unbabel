<template>
  <div class="home">
    <AppHeader />
    <Transcriptions />
  </div>
</template>

<script setup lang="ts">
import Transcriptions from '../components/home/AppTranscriptions.vue'
import AppHeader from '../components/home/AppHeader.vue'
</script>

<style lang="scss">
.home {
  box-shadow: 0px 3px 5px $gray;
  margin: 10px;
  border: 1px solid $border-color;
}
</style>
