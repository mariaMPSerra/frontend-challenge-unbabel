import { describe, expect, it } from 'vitest'
import TranscriptionsItem from './TranscriptionsItem.vue'
import { mount } from '@vue/test-utils'

describe('TranscriptionsItem Component', () => {
  it('renders TranscriptionsItem component', async () => {
    const wrapper = mount(TranscriptionsItem)

    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('methods', () => {
    it('showDelete', () => {
      const wrapper = mount(TranscriptionsItem)

      const id = 212

      wrapper.vm.showDelete(id)

      expect(wrapper.vm.hoveredItem).toEqual(id)
    })
    describe('showInput', () => {
      it('true', () => {
        const wrapper = mount(TranscriptionsItem)

        const type = 'content'

        wrapper.vm.activeInput = 'content'

        const response = wrapper.vm.showInput(type)

        expect(response).toBeTruthy()
      })

      it('false', () => {
        const wrapper = mount(TranscriptionsItem)

        const type = 'voice'

        wrapper.vm.activeInput = 'content'

        const response = wrapper.vm.showInput(type)

        expect(response).toBeFalsy()
      })
    })

    describe('handleInput', () => {
      it('activeInput to be null', () => {
        const wrapper = mount(TranscriptionsItem)

        const type = 'voice'

        wrapper.vm.activeInput = 'voice'

        wrapper.vm.handleInput(type)

        expect(wrapper.vm.activeInput).toEqual(null)
      })

      it('activeInput to be param type', () => {
        const wrapper = mount(TranscriptionsItem)

        const type = 'content'

        wrapper.vm.activeInput = 'voice'

        wrapper.vm.handleInput(type)

        expect(wrapper.vm.activeInput).toEqual(type)
      })
    })
    it('setActiveInput', () => {
      const wrapper = mount(TranscriptionsItem)

      const type = 'content'

      wrapper.vm.setActiveInput(type)

      expect(wrapper.vm.activeInput).toEqual(type)
    })
  })
})
