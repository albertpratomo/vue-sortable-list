import { describe, expect, it } from 'vitest'
import { registerEndpoint, renderSuspended } from '@nuxt/test-utils/runtime'
import index from './index.vue'

async function render() {
    const posts = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
    }))

    registerEndpoint('https://jsonplaceholder.typicode.com/posts', () => posts)

    return await renderSuspended(index)
}

describe('index', () => {
    it('fetches and renders first 5 posts', async () => {
        const { getByRole } = await render()

        const list = getByRole('list', { name: 'Sortable Post List' })

        expect(list.childElementCount).toBe(5)

        for (let i = 0; i < 5; i++)
            expect(list.children[i].textContent).toContain(`Post ${i + 1}`)
    })
})
