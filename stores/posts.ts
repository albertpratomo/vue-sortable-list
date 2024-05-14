import type { Action } from '@/server/models/action.schema.ts'

export const usePostsStore = defineStore('posts', () => {
    const posts = ref<number[]>([])

    const history = ref<Action[]>([])

    const errorText = ref<string>('')

    async function fetchPosts() {
        const { data, error } = await useFetch<Action[]>('/api/actions')

        if (error.value) {
            errorText.value = 'There is an error when fetching the posts.'
            return
        }

        if (data.value && data.value.length) {
            posts.value = data.value.at(-1)!.afterState

            history.value = data.value
        }
        else {
            posts.value = [1, 2, 3, 4, 5]
        }

        return posts.value
    }

    function swap(from: number, to: number) {
        const id = posts.value[from]

        const action: Action = {
            description: `Moved post ${id} from index ${from} to index ${to}`,
            beforeState: [...posts.value],
            afterState: [],
        }

        posts.value[from] = posts.value[to]
        posts.value[to] = id

        action.afterState = [...posts.value]

        history.value.push(action)

        useFetch('/api/actions', {
            method: 'post',
            body: action,
        })
    }

    function timeTravel(index: number) {
        posts.value = history.value[index].beforeState

        history.value = history.value.slice(0, index)
    }

    function $reset() {
        posts.value = []
        history.value = []
    }

    return {
        posts,
        history,
        errorText,
        fetchPosts,
        swap,
        timeTravel,
        $reset,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
