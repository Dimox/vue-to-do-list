<template>
  <div class="color-scheme">
    <label class="color-scheme__auto">
      <span v-for="scheme in colorSchemes" :key="scheme.value" class="color-scheme__type" :class="scheme.value">
        <span v-if="scheme.value === 'light'" class="color-scheme__name">{{ t('auto') }}</span>
        <span class="color-scheme__wrapper">
          <span v-for="k in 10" :key="k" class="color-scheme__item" />
        </span>
      </span>
      <input
        class="color-scheme__input"
        type="radio"
        name="color-scheme"
        :checked="currentScheme === 'auto'"
        @change="setColorScheme('auto')"
      />
    </label>

    <label v-for="scheme in colorSchemes" :key="scheme.value" class="color-scheme__type" :class="scheme.value">
      <span class="color-scheme__name">{{ t(scheme.value) }}</span>
      <span class="color-scheme__wrapper">
        <span v-for="k in 10" :key="k" class="color-scheme__item" />
      </span>
      <input
        class="color-scheme__input"
        type="radio"
        name="color-scheme"
        :checked="currentScheme === scheme.value"
        @change="setColorScheme(scheme.value)"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'
import type { ColorScheme } from '@/types'

const currentScheme = defineModel<string>({ required: true })
const colorSchemes: { value: ColorScheme }[] = [{ value: 'light' }, { value: 'dark' }]
const setColorScheme = (scheme: ColorScheme) => (currentScheme.value = scheme)
</script>

<style lang="scss">
.color-scheme {
  display: flex;
  gap: 1rem;

  &__type {
    position: relative;
    flex-grow: 1;
    height: 10.75rem;
    padding: 2rem 0 0 1.375rem;
    overflow: clip;
    cursor: pointer;
    background: var(--color-bg-secondary);
    border: 0.125rem solid var(--color-border-quaternary);
    border-radius: 1rem;
    transition: 0.25s;
    transition-property: border-color, box-shadow;

    &:has(:checked) {
      border-color: var(--color-accent-500);
    }

    &:has(:focus-visible) {
      box-shadow: 0 0 0 0.25rem var(--color-accent-300);
    }
  }

  &__auto {
    position: relative;
    display: grid;
    flex-grow: 1;

    .color-scheme__type {
      grid-area: 1 / -1;

      &.dark {
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
      }
    }

    &:has(:checked) .color-scheme__type {
      border-color: var(--color-accent-500);
    }
  }

  &__name {
    position: absolute;
    inset: 0.1875rem 0 auto;
    z-index: 1;
    font-size: 1rem;
    text-align: center;

    .light > & {
      color: var(--color-gray-800);
    }

    .dark > & {
      color: var(--color-dark-400);
    }
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1rem 1fr 1rem 1rem;
    gap: 0.5rem;
    align-content: flex-start;
    height: 100%;
    padding: 0.75rem;
    background: var(--color-bg-primary);
    border: solid var(--color-border-quaternary);
    border-width: 0.0625rem 0 0 0.0625rem;
    border-top-left-radius: 0.5rem;
  }

  &__item {
    height: 1rem;
    background: var(--color-bg-tertiary);
    border-radius: 0.25rem;

    &:nth-child(1) {
      grid-column: 1 / 4;
      max-width: 50%;
    }

    &:nth-child(4),
    &:nth-child(6),
    &:nth-child(8) {
      grid-column: 2 / -1;
    }

    &:nth-child(9) {
      grid-column: 1 / 3;
    }

    &:nth-child(10) {
      grid-column: 3 / -1;
    }
  }

  &__input {
    position: absolute;
    bottom: 0.75rem;
    left: 0.75rem;
    width: 1.5rem;
    height: 1.5rem;
    appearance: none;
    background: var(--color-white);
    border: 0.125rem solid var(--color-border-tertiary);
    border-radius: 50%;
    transition: 0.1s;

    &:checked {
      border-color: var(--color-accent-600);
      border-width: 0.4375rem;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
