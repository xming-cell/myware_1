import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import App from '../App.vue'

type HealthJson = { status: string }

describe('App', () => {
  const json = vi.fn<() => Promise<HealthJson>>().mockResolvedValue({ status: 'ok' })
  const fetchMock = vi.fn<(input: string) => Promise<{ json: typeof json }>>().mockResolvedValue({
    json,
  })

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    fetchMock.mockClear()
    json.mockClear()
    vi.unstubAllGlobals()
  })

  it('fetches the backend health status and renders it', async () => {
    const wrapper = mount(App)
    await flushPromises()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0]?.[0]).toEqual(expect.stringContaining('/api/health'))
    expect(wrapper.text()).toContain('backend: ok')
  })
})
