<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate'

const store = usePostsStore()

const { history } = storeToRefs(store)

const { timeTravel } = store
</script>

<template>
    <div class="overflow-hidden rounded bg-zinc-200 shadow-lg">
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
                    {{ item.description }}

                    <button
                        class="rounded bg-[#28ff90] px-4 py-2 font-semibold hover:bg-[#00ec72]"
                        :aria-label="`Time travel ${i} button`"
                        @click="timeTravel(i)"
                    >
                        Time travel
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
