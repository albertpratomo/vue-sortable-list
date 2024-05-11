# Vue Sortable List

<img width="1031" alt="image" src="https://github.com/albertpratomo/vue-sortable-list/assets/25815584/370230e5-0b5f-44a1-9bf9-a30388444a7d">

This is a simple app to demonstrate my Vue 3 + TS skills. In the app you can swap the item order, see committed actions, and time travel to previous state. You can play with it [here](https://vue-sortable-list.vercel.app/).

The tech stack used: Vue 3, Nuxt 3, TS, Tailwind (UnoCSS), Pinia, Vitest, Testing Library. On each push to `main`, the CI pipeline will run to lint, typecheck, and test the code.

## Getting started

1. `git clone` this repo
1. `pnpm i`
1. `pnpm dev`
1. App should be live in localhost:3000
1. `pnpm test` to run the automated tests

## Refactor list

1. Separate the app into smaller components: `PostList`, `HistoryList`
1. Use vue-i18n instead of hardcoding texts
1. Store color hexcode in Tailwind config instead of using arbitrary values
