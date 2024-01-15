import { beforeEach, describe, expect, it, vi } from 'vitest'
import AppHeader from './AppHeader.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useTranscriptionsStore } from '@/store'

describe('AppHeader Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders AppHeader component', async () => {
    const wrapper = mount(AppHeader)

    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('methods', () => {
    it('updateTranscriptions', async () => {
      const transcriptionsStore = useTranscriptionsStore()

      vi.spyOn(transcriptionsStore, 'updateTranscriptionsData')
      vi.spyOn(window, 'alert').mockImplementation(() => {})

      const wrapper = mount(AppHeader)

      await wrapper.vm.updateTranscriptions()

      await flushPromises()

      expect(transcriptionsStore.updateTranscriptionsData).toHaveBeenCalled()
      expect(window.alert).toHaveBeenCalled()
    })
  })
})
