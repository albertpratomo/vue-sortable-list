<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate'

const store = usePostsStore()

const { posts } = storeToRefs(store)

const { fetchPosts, swap } = store

await useAsyncData('posts', () => fetchPosts())
</script>

<template>
    <Suspense>
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
    </Suspense>
</template>
