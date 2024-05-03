<script setup lang="ts">
const { data } = await useFetch<{ id: number }>('https://jsonplaceholder.typicode.com/posts')

const posts = ref(data.value.slice(0, 5).map(p => `Post ${p.id}`))
</script>

<template>
    <div class="max-w-2xl p-8">
        <div class="grid grid-cols-2 gap-16">
            <div>
                <h1>Sortable Post List</h1>

                <ul class="mt-4 flex flex-col gap-4">
                    <li
                        v-for="post in posts"
                        :key="post"
                        class="rounded bg-white px-2 py-4 text-black shadow"
                    >
                        {{ post }}
                    </li>
                </ul>
            </div>

            <div>
                List of actions committed
            </div>
        </div>
    </div>
</template>
