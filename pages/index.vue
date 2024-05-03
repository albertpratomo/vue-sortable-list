<script setup lang="ts">
const { data } = await useFetch<{ id: number }>('https://jsonplaceholder.typicode.com/posts')

const posts = ref(data.value.slice(0, 5).map(p => p.id))

const history = ref<{ action: string, state: number[] }[]>([])

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
</script>

<template>
    <div class="max-w-4xl p-8">
        <div class="grid grid-cols-2 gap-16">
            <div>
                <h1>Sortable Post List</h1>

                <ul class="mt-4 flex flex-col gap-4">
                    <li
                        v-for="(post, i) in posts"
                        :key="post"
                        class="h-20 flex items-center justify-between rounded bg-white p-2 text-black shadow"
                    >
                        Post {{ post }}

                        <div class="flex flex-col gap-3">
                            <button
                                v-if="i > 0"
                                class="i-carbon-chevron-up"
                                @click="swap(i, i - 1)"
                            />

                            <button
                                v-if="i < posts.length - 1"
                                class="i-carbon-chevron-down"
                                @click="swap(i, i + 1)"
                            />
                        </div>
                    </li>
                </ul>
            </div>

            <div>
                List of actions committed

                <ul class="mt-4 flex flex-col-reverse gap-4">
                    <li
                        v-for="(item, i) in history"
                        :key="i"
                        class="flex items-center justify-between bg-white p-2 text-black"
                    >
                        {{ item.action }}

                        <button class="btn" @click="timeTravel(i)">
                            Time travel
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
