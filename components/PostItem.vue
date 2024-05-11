<script setup lang="ts">
interface Props {
    id: number
    canSwapUp: boolean
    canSwapDown: boolean
}

defineProps<Props>()

const emit = defineEmits<{
    swap: [direction: number]
}>()
</script>

<template>
    <li class="h-20 flex items-center justify-between rounded bg-zinc-100 px-3 py-2 text-zinc-600 shadow-lg">
        Post {{ id }}

        <div class="flex flex-col gap-3 text-indigo-600">
            <button
                v-if="canSwapUp"
                class="i-heroicons-chevron-up-16-solid hover:text-indigo-950"
                :aria-label="`Post ${id} swap up button`"
                @click="emit('swap', -1)"
            />

            <button
                v-if="canSwapDown"
                class="i-heroicons-chevron-down-16-solid hover:text-indigo-950"
                :aria-label="`Post ${id} swap down button`"
                @click="emit('swap', 1)"
            />
        </div>
    </li>
</template>
