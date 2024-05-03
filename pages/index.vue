<script setup lang="ts">
const { data } = await useFetch<{ id: number }>('https://jsonplaceholder.typicode.com/posts')

const posts = ref(data.value.slice(0, 5).map(p => p.id))

function swap(from: number, to: number) {
    const temp = posts.value[from]
    posts.value[from] = posts.value[to]
    posts.value[to] = temp
}
</script>

<template>
    <div class="max-w-2xl p-8">
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
            </div>
        </div>
    </div>
</template>
