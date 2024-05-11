export const usePostsStore = defineStore('posts', () => {
    const posts = ref<number[]>([])

    const history = ref<{ action: string, state: number[] }[]>([])

    const errorText = ref<string>('')

    async function fetchPosts() {
        const { data, error } = await useFetch<{ id: number }[]>('https://jsonplaceholder.typicode.com/posts')

        if (error.value)
            errorText.value = 'There is an error when fetching the posts.'
        else
            posts.value = data.value!.slice(0, 5).map(p => p.id)

        return posts.value
    }

    function swap(from: number, to: number) {
        const id = posts.value[from]

        history.value.push({
            action: `Moved post ${id} from index ${from} to index ${to}`,
            state: [...posts.value],
        })

        posts.value[from] = posts.value[to]
        posts.value[to] = id
    }

    function timeTravel(index: number) {
        posts.value = history.value[index].state

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
