export const usePostsStore = defineStore('posts', () => {
    const posts = ref<number[]>([])

    const history = ref<{ action: string, state: number[] }[]>([])

    async function fetchPosts() {
        const { data } = await useFetch<{ id: number }[]>('https://jsonplaceholder.typicode.com/posts')

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

    return {
        posts,
        history,
        fetchPosts,
        swap,
        timeTravel,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
