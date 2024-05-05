<script setup lang="ts">
const { data } = await useFetch<{ id: number }[]>('https://jsonplaceholder.typicode.com/posts')

const posts = ref(data.value!.slice(0, 5).map(p => p.id))

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
    <Suspense>
        <div class="p-8">
            <div class="grid gap-x-16 gap-y-10 sm:grid-cols-2">
                <div>
                    <h1 class="text-lg text-white font-medium">
                        Sortable Post List
                    </h1>

                    <ul
                        v-auto-animate
                        class="mt-4 flex flex-col gap-4"
                        aria-label="Sortable Post List"
                    >
                        <li
                            v-for="(post, i) in posts"
                            :key="post"
                            class="h-20 flex items-center justify-between rounded bg-zinc-100 px-3 py-2 text-zinc-600 shadow-lg"
                        >
                            Post {{ post }}

                            <div class="flex flex-col gap-3 text-indigo-600">
                                <button
                                    v-if="i > 0"
                                    class="i-heroicons-chevron-up-16-solid hover:text-indigo-950"
                                    :aria-label="`Post ${post} swap up button`"
                                    @click="swap(i, i - 1)"
                                />

                                <button
                                    v-if="i < posts.length - 1"
                                    class="i-heroicons-chevron-down-16-solid hover:text-indigo-950"
                                    :aria-label="`Post ${post} swap down button`"
                                    @click="swap(i, i + 1)"
                                />
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="overflow-hidden rounded shadow-lg">
                    <div class="bg-zinc-100 p-4 text-zinc-600 font-semibold">
                        List of actions committed
                    </div>

                    <div class="p-4">
                        <ul
                            v-auto-animate
                            class="flex flex-col-reverse overflow-hidden rounded-lg shadow-lg"
                        >
                            <li
                                v-for="(item, i) in history"
                                :key="i"
                                :class="{ 'border-b border-zinc-300': i > 0 }"
                                class="flex items-center justify-between bg-zinc-100 p-2 text-sm text-zinc-600 shadow-lg"
                            >
                                {{ item.action }}

                                <button
                                    class="rounded bg-[#28ff90] px-4 py-2 font-semibold hover:bg-[#00ec72]"
                                    @click="timeTravel(i)"
                                >
                                    Time travel
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </Suspense>
</template>
