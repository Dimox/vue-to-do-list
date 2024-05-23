<template>
  <div class="input">
    <label class="input__label" :class="{ 'visually-hidden': !hasLabel }" :for="id">{{ label }}</label>
    <input :id="id" v-model="model" :type="type" class="input__field" :placeholder="placeholder" v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { uniqueId } from '@/utils'

const model = defineModel<string>()

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  type: {
    type: String as PropType<'text' | 'number'>,
    default: 'text',
  },
})

const id = uniqueId('input-')
const hasLabel = computed(() => !!props.label)
const label = computed(() => (props.label ? props.label : props.placeholder))
</script>

<style lang="scss">
.input {
  &__label {
    display: block;
    width: fit-content;
    margin-bottom: 0.25rem;
    font-weight: 500;
    cursor: pointer;
  }

  &__field {
    --scrollbar-thumb-color: var(--color-accent-400);
    display: block;
    width: 100%;
    padding: 0.6875rem 1.25rem;
    overscroll-behavior: contain;
    font: inherit;
    color: inherit;
    resize: none;
    background: none;
    border: 0.0625rem solid var(--color-gray-300);
    border-radius: 0.375rem;
    transition: 0.25s;
    transition-property: border-color, box-shadow, border-radius, scrollbar-color;
    scrollbar-color: var(--scrollbar-thumb-color) transparent;

    &:hover {
      border-color: var(--color-gray-400);
    }

    &:focus {
      --scrollbar-thumb-color: var(--color-accent-500);
      border-color: var(--color-accent-500);
      outline: none;
      box-shadow: inset 0 0 0 0.0625rem var(--color-accent-500);
    }
  }
}
</style>
