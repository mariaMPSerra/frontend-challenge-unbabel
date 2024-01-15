<template>
  <div class="transcriptions">
    <div class="transcriptions__content" v-if="data?.length">
      <template v-for="(rowItem, i) in data" :key="i">
        <TranscriptionsItem
          :row-item="rowItem"
          @removeItem="removeItem"
          @update-item="updateItem"
        />
      </template>

      <TranscriptionsItem
        v-if="addNewRow"
        :row-item="{}"
        @add-item="addItem"
        @update-item="updateItem"
      />
    </div>
    <button
      @click.stop="manageNewRow(!addNewRow)"
      class="transcriptions__addBtn"
      v-if="data?.length"
    >
      <img src="@/assets/icons/add-row.svg" class="upload-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TranscriptionsItem from '../home/TranscriptionsItem.vue'
import { storeToRefs } from 'pinia'
import { useTranscriptionsStore } from '@/store/index'
import type { IItemType } from '@/typescript'

const transcriptionsStore = useTranscriptionsStore()
const { data } = storeToRefs(transcriptionsStore)
const { updateTranscriptionsItems } = transcriptionsStore

const addNewRow = ref(false)

const removeItem = (id: number) => {
  updateTranscriptionsItems(id, 'remove')
}

const manageNewRow = (value: boolean) => {
  if (addNewRow.value !== value) {
    addNewRow.value = value
  }
}

const updateItem = (item: IItemType) => {
  updateTranscriptionsItems(item, 'update')
}

const addItem = (newItem: IItemType) => {
  if (!!newItem.voice && !!newItem.text) {
    updateTranscriptionsItems(
      {
        id: newItem.id ?? data.value.length,
        voice: newItem.voice,
        text: newItem.text
      },
      'add'
    )

    manageNewRow(false)
  }
}
</script>

<style scoped lang="scss">
.transcriptions {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__content {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    width: 75%;
    background-color: $white;
    border: 1px solid $border-color;
  }

  .upload-icon {
    text-align: center;
  }

  &__addBtn {
    width: fit-content;
    text-align: center;
    margin-bottom: 40px;
  }
}
</style>
