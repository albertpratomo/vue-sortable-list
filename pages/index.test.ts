import { describe, expect, it } from 'vitest'
import { registerEndpoint, renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'
import index from './index.vue'

async function render() {
    const posts = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
    }))

    registerEndpoint('https://jsonplaceholder.typicode.com/posts', () => posts)

    return await renderSuspended(index)
}

function expectOrder(order: string) {
    const list = screen.getByRole('list', { name: 'Sortable Post List' })

    const numbers = list.textContent.match(/\d+/g).join(' ')

    expect(numbers).toBe(order)
}

describe('index', () => {
    it('fetches and renders first 5 posts', async () => {
        const { getByRole } = await render()

        const list = getByRole('list', { name: 'Sortable Post List' })

        expect(list.childElementCount).toBe(5)

        for (let i = 0; i < 5; i++)
            expect(list.children[i].textContent).toContain(`Post ${i + 1}`)
    })

    it('can swap post up', async () => {
        const { getByRole } = await render()

        const button = getByRole('button', { name: 'Post 2 swap up button' })

        await fireEvent.click(button)

        expectOrder('2 1 3 4 5')
    })

    it('can swap post down', async () => {
        const { getByRole } = await render()

        const button = getByRole('button', { name: 'Post 4 swap down button' })

        await fireEvent.click(button)

        expectOrder('1 2 3 5 4')
    })

    it('cant swap first post against last one', async () => {
        const { queryByRole } = await render()

        expect(queryByRole('button', { name: 'Post 1 swap up button' })).toBe(null)

        expect(queryByRole('button', { name: 'Post 5 swap down button' })).toBe(null)
    })
})
