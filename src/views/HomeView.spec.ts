import { describe, expect, it } from 'vitest'
import HomeView from './HomeView.vue'
import { shallowMount } from '@vue/test-utils'

describe('AppHome Component', () => {
  it('renders AppHome component', async () => {
    const wrapper = shallowMount(HomeView)
    const AppHeader = wrapper.findComponent({ name: 'AppHeader' })
    const Transcriptions = wrapper.findComponent({ name: 'Transcriptions' })

    expect(wrapper.html()).toMatchSnapshot()
    expect(AppHeader.exists()).toBe(true)
    expect(Transcriptions.exists()).toBe(true)
  })
})
