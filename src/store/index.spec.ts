import { afterEach, describe, beforeEach, expect, it, vi } from 'vitest'
import { useTranscriptionsStore } from './index' // Replace with the correct path
import { getTranscriptions } from '@/api/getTranscriptions'
import { updateTranscriptions } from '@/api/updateTranscriptions'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/api/getTranscriptions')

vi.mock('@/api/updateTranscriptions')

describe('useTranscriptionsStore', () => {
  let store: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTranscriptionsStore()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty data', () => {
    expect(store.data).toEqual([])
  })

  it('should fetch transcriptions data', async () => {
    const data = [{ id: 1, text: 'Mock transcription', voice: 'voice 1' }]

    getTranscriptions.mockImplementationOnce(() => data)

    await store.getTranscriptionsData()

    expect(store.data).toEqual(data)
    expect(getTranscriptions).toHaveBeenCalled()

    vi.resetAllMocks()
  })

  it('should handle error while fetching transcriptions data', async () => {
    getTranscriptions.mockImplementationOnce(() => Promise.reject(new Error('API error')))

    vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await store.getTranscriptionsData()

    expect(result).toBeUndefined()
    expect(console.error).toHaveBeenCalledWith('Error fetching home data:', expect.any(Error))

    vi.resetAllMocks()
  })

  it('should update transcriptions data', async () => {
    await store.updateTranscriptionsData()

    expect(updateTranscriptions).toHaveBeenCalledWith(store.data)
  })

  it('should handle error while updating transcriptions data', async () => {
    updateTranscriptions.mockImplementationOnce(() => Promise.reject(new Error('API error')))

    vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await store.updateTranscriptionsData()

    expect(result).toBeUndefined()
    expect(console.error).toHaveBeenCalledWith('Error update data:', expect.any(Error))

    vi.resetAllMocks()
  })

  it('should add new transcription item', () => {
    const newItem = { id: 2, text: 'New transcription', voice: 'voice 2' }

    store.addNewTranscriptionsItem(newItem)

    expect(store.data).toContainEqual(newItem)

    vi.resetAllMocks()
  })

  it('should update transcriptions items (remove)', () => {
    const existingItem = { id: 1, text: 'Mock transcription', voice: 'voice 2' }

    store.updateTranscriptionsItems(existingItem.id, 'remove')

    expect(store.data).not.toContainEqual(existingItem)

    vi.resetAllMocks()
  })
})
