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
                <PostItem
                    v-for="(post, i) in posts"
                    :id="post"
                    :key="post"
                    :can-swap-up="i > 0"
                    :can-swap-down="i < posts.length - 1"
                    @swap="swap(i, i + $event)"
                />
            </ul>
        </div>
    </Suspense>
</template>
