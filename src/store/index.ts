import { getTranscriptions } from '@/api/getTranscriptions'
import { updateTranscriptions } from '@/api/updateTranscriptions'
import type { IItemType, ItranscriptionsState } from '@/typescript'
import { defineStore } from 'pinia'

const transcriptionsInitialState = {
  data: [],
  initialData: []
} as ItranscriptionsState

export const useTranscriptionsStore = defineStore('transcriptions', {
  state: () => ({ ...transcriptionsInitialState }),
  actions: {
    async getTranscriptionsData() {
      try {
        const response = await getTranscriptions()

        this.data = response
        this.initialData = response
      } catch (error) {
        return console.error('Error fetching home data:', error)
      }
    },
    async updateTranscriptionsData() {
      try {
        const response = await updateTranscriptions(this.data)

        this.initialData = this.data

        return response
      } catch (error) {
        console.error('Error update data:', error)
      }
    },
    updateTranscriptionsItems(itemData: IItemType | number, type: string) {
      if (type === 'add') {
        this.data?.push(itemData)
      } else if (type === 'remove') {
        this.data = this.data?.filter((item) => item.id !== itemData)
      } else {
        this.data = this.data.map((item) => {
          return item.id === itemData.id ? { ...item, ...itemData } : item
        })
      }
    },
    addNewTranscriptionsItem(newItem: IItemType) {
      this.data.push(newItem)
    }
  }
})
