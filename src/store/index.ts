import { getTranscriptions } from '@/api/getTranscriptions'
import { updateTranscriptions } from '@/api/updateTranscriptions'
import { defineStore } from 'pinia'

const transcriptionsInitialState = {
  data: []
}

export const useTranscriptionsStore = defineStore('transcriptions', {
  state: () => transcriptionsInitialState,
  actions: {
    async getTranscriptionsData() {
      try {
        const response = await getTranscriptions()

        this.data = response
      } catch (error) {
        return console.error('Error fetching home data:', error)
      }
    },
    async updateTranscriptionsData() {
      try {
        const response = await updateTranscriptions(this.data)

        return response
      } catch (error) {
        console.error('Error update data:', error)
      }
    },
    updateTranscriptionsItems(itemData, type) {
      if (type === 'add') {
        this.data?.push(itemData)
      } else {
        this.data = this.data?.filter((item) => item.id !== itemData)
      }
    },
    addNewTranscriptionsItem(newItem) {
      this.data.push(newItem)
    }
  }
})
