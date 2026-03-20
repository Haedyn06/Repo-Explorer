import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { searchRepos } from '@/services/githubService'

describe('githubService', () => {
    it('Throws a 403 API response error', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({ ok: false, status: 403 })
        ))

        await expect(searchRepos('repo')).rejects.toThrow('API Rate Limit Reached')
    })


    it('Throws a 404 API response error', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({ ok: false, status: 404 })
        ))

        await expect(searchRepos('repo')).rejects.toThrow('Not Found')
    })


    it('Throws an undefined API response error', async () => {
        const statusCode = 123

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({ ok: false, status: statusCode })
        ))

        await expect(searchRepos('repo')).rejects.toThrow(`Fetch Request Error (${statusCode})`)
    })
})