import { beforeEach, describe, expect, it, vi } from 'vitest'
import Transcriptions from './AppTranscriptions.vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useTranscriptionsStore } from '@/store'
import { nextTick } from 'vue'

describe('AppTranscriptions Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders AppTranscriptions component', async () => {
    const wrapper = mount(Transcriptions)

    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('methods', () => {
    it('removeItem', () => {
      const transcriptionsStore = useTranscriptionsStore()

      vi.spyOn(transcriptionsStore, 'updateTranscriptionsItems')

      const wrapper = mount(Transcriptions)

      const id = 1

      wrapper.vm.removeItem(id)

      expect(transcriptionsStore.updateTranscriptionsItems).toHaveBeenCalledWith(id, 'remove')
    })

    it('manageNewRow', async () => {
      const wrapper = mount(Transcriptions)

      wrapper.vm.addNewRow = false

      await nextTick()

      await wrapper.vm.manageNewRow(true)

      await nextTick()

      expect(wrapper.vm.addNewRow).toEqual(true)
    })

    it('addItem', async () => {
      const transcriptionsStore = useTranscriptionsStore()

      vi.spyOn(transcriptionsStore, 'updateTranscriptionsItems')

      const wrapper = mount(Transcriptions)

      const params = {
        id: 1,
        voice: 'voice',
        text: 'text'
      }

      wrapper.vm.addItem(params)

      expect(transcriptionsStore.updateTranscriptionsItems).toHaveBeenCalledWith(params, 'add')
      expect(wrapper.vm.addNewRow).toEqual(false)
    })
  })
})
