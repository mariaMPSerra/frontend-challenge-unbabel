<template>
  <div class="transcriptions__header">
    <div class="transcriptions__header__content">
      <h3 class="transcriptions__header__title">Transcriptions</h3>
      <div class="transcriptions__header__actions">
        <button @click="updateTranscriptions" :disabled="!data?.length">
          <img src="@/assets/icons/upload.svg" class="transcriptions__header__btn" />
        </button>
        <button @click="getTranscriptionsData">
          <img src="@/assets/icons/fetch-document.svg" class="transcriptions__header__btn" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTranscriptionsStore } from '@/store'
import { storeToRefs } from 'pinia'

const transcriptionsStore = useTranscriptionsStore()
const { getTranscriptionsData, updateTranscriptionsData } = transcriptionsStore
const { data } = storeToRefs(transcriptionsStore)

const updateTranscriptions = async () => {
  await updateTranscriptionsData()
}
</script>

<style lang="scss">
.transcriptions__header {
  display: flex;
  background: $white;
  box-shadow: 0px 1px 2px $gray;
  margin-bottom: 20px;
  padding: 15px 0;
  width: 100%;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    min-width: 75%;
  }

  &__btn {
    cursor: pointer;

    &:first-child {
      @media (min-width: 600px) {
        margin-right: 25px;
      }
    }
  }

  &__title {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: $dark-purple;
    margin: 0 0 0 15px;
  }

  &__actions {
    margin-right: 15px;
  }
}
</style>
