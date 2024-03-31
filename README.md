# Vue To-Do List

[Demo](https://dimox.github.io/vue-to-do-list/)

## Under the hood

- Vue 3 `<script setup>` SFCs
- TypeScript
- Vite
- ESLint
- Stylelint
- Prettier

## Features

- Create, edit, or delete a task (localStorage is used as a database).
- Mark all tasks as done/undone.
- Delete all completed tasks.
- Sorting tasks by drag and drop (thanks to [VueUse](https://github.com/vueuse/vueuse) and [Sortable](https://github.com/SortableJS/Sortable)).
- Markdown support in the task editor (thanks to [Marked](https://github.com/markedjs/marked)). The rendered HTML is clean and safe (thanks to [DOMPurify](https://github.com/cure53/DOMPurify)).
