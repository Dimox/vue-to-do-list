<template>
  <div class="app">
    <main class="app__main">
      <h1 class="app__title">To-Do List</h1>
      <div class="app__body">
        <ul class="app__items">
          <ToDoItem
            v-for="item in storage.items"
            :id="item.id"
            :key="item.id"
            class="app__item"
            :date="new Date(item.date)"
            :text="item.text"
            :checked="item.checked"
          />
        </ul>
        <AddToDo />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useToDoStorage } from './composables/storage'
import ToDoItem from './components/ToDoItem.vue'
import AddToDo from './components/AddToDo.vue'

const storage = useToDoStorage()
</script>

<style lang="scss">
.app {
  padding: 2rem 1rem;

  &__main {
    --spread-shadow: 5%;
    max-width: 40rem;
    margin-inline: auto;
    background: var(--color-white);
    border-radius: 0.75rem;
    box-shadow:
      rgba(var(--color-gray-800-rgb), 10%) 0 0 0 0.0625rem,
      rgba(var(--color-black-rgb), var(--spread-shadow)) 0 1.25rem 1.5625rem -0.3125rem,
      rgba(var(--color-black-rgb), var(--spread-shadow)) 0 0.5rem 0.625rem -0.375rem;
    transition: box-shadow 0.25s ease-in-out;

    &:has(.add-to-do__textarea :focus) {
      --spread-shadow: 15%;
    }
  }

  &__title {
    padding: 1rem 2rem;
    font-size: 1.625rem;
    font-weight: bold;
    border-bottom: 0.0625rem solid var(--color-gray-300);
  }

  &__body {
    padding: 1rem 2rem 2rem;
  }

  &__items {
    margin-bottom: 1rem;
  }

  &__item {
    padding-block: 1rem 1.0625rem;

    &:not(:last-child) {
      background: linear-gradient(
          90deg,
          #0000,
          #0000 2.25rem,
          rgba(var(--color-gray-800-rgb), 0.12) 2.25rem,
          rgba(var(--color-gray-800-rgb), 0.12)
        )
        no-repeat 0 100% / 100% 0.0625rem;
    }
  }
}
</style>
