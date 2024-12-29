<template>
  <section class="settings">
    <header class="settings__header">
      <h2 class="settings__title">{{ t('settings') }}</h2>
      <Btn class="settings__close" type="icon" @click="$emit('close')">
        <Icon name="close" />
      </Btn>
    </header>
    <ul class="settings__items">
      <li class="settings__item">
        <p class="settings__caption">{{ t('interfaceLanguage') }}</p>
        <p class="settings__description">{{ t('choosePreferredLanguage') }}</p>
        <div class="settings__value settings__value--langs">
          <label v-for="language in languages" :key="language.code" class="settings__lang">
            <input
              class="settings__lang-input visually-hidden"
              type="radio"
              name="lang"
              :checked="language.code == toDoOptions.lang"
              @change="setLanguage(language.code)"
            />
            <span class="settings__lang-inner">
              <svg width="24" height="24">
                <use :xlink:href="`${langSprite}#${language.code}`" />
              </svg>
              {{ language.name }}
            </span>
          </label>
        </div>
      </li>
      <li class="settings__item settings__item--column">
        <p class="settings__caption">{{ t('colorScheme') }}</p>
        <p class="settings__description">{{ t('choosePreferredColorScheme') }}</p>
        <ColorSchemeRadio v-model="toDoOptions.colorScheme" class="settings__color-scheme" />
      </li>
      <li class="settings__item">
        <p class="settings__caption">{{ t('applicationWidth') }}</p>
        <p class="settings__description">{{ t('expandToFullWidth') }}</p>
        <Input
          v-model="toDoOptions.appWidth"
          class="settings__value settings__value--width"
          type="number"
          inputmode="numeric"
        />
      </li>
      <li class="settings__item">
        <p class="settings__caption">{{ t('accentColor') }}</p>
        <p class="settings__description">{{ t('choosePreferredColor') }}</p>
        <input v-model="toDoOptions.accentColor" class="settings__value settings__value--color" type="color" />
      </li>
    </ul>
    <footer class="settings__footer">
      <Btn class="settings__reset" type="secondary" @click="resetSettings">{{ t('restoreDefaults') }}</Btn>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import Input from './form/Input.vue'
import ColorSchemeRadio from './ColorSchemeRadio.vue'
import { defaultOptions } from '@/composables/useToDoStorage'
import { useToDo } from '@/composables/useToDo'
import { t } from '@/i18n'
import type { Language, LanguageCode } from '@/types'
import langSprite from '@/assets/img/lang.svg?url'
import { debounce } from '@/utils'

defineEmits<{
  close: []
}>()

const APP_MIN_WIDTH = 460
const { toDoOptions, updateToDoOptions } = useToDo()

const updateAppWidth = () => {
  if (Number(toDoOptions.value.appWidth) >= APP_MIN_WIDTH) return

  const options = { ...toDoOptions.value, appWidth: defaultOptions.appWidth }
  updateToDoOptions(options)
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
]

const setLanguage = (lang: LanguageCode) => (toDoOptions.value.lang = lang)

const resetSettings = () => {
  updateToDoOptions(structuredClone(defaultOptions))
}

watch(toDoOptions, debounce(updateAppWidth), { deep: true })
</script>

<style lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  width: min(40rem, 100%);
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  margin-left: auto;
  overflow: auto;
  border-radius: 0;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-bottom: 0.0625rem solid var(--color-border-tertiary);
  }

  &__title {
    font-size: 1.5rem;
  }

  &__close {
    color: var(--color-text-primary);

    &:hover {
      &::before {
        opacity: 1;
      }
    }
  }

  &__items {
    display: grid;
    padding: 0.25rem 2rem;
  }

  &__item {
    display: grid;
    grid-template: repeat(2, auto) / 1fr auto;
    gap: 0 1rem;
    padding-block: 1.25rem;

    &:not(:last-child) {
      border-bottom: 0.0625rem solid var(--color-border-quaternary);
    }

    &--column {
      grid-template: auto / auto;
    }
  }

  &__caption {
    margin-bottom: 0.25rem;
    font-weight: 650;
  }

  &__description {
    font-size: 0.9375rem;
    line-height: 1.33;
    color: var(--color-text-tertiary);
  }

  &__value {
    grid-row: 1 / -1;
    grid-column: 2;

    &--langs {
      display: flex;
      gap: 1rem;
    }

    &--width {
      width: 6rem;

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }
    }

    &--color {
      width: 3rem;
      height: 3rem;
      padding: 0.125rem;
      background: none;
      border: 0.0625rem solid var(--color-border-tertiary);
      border-radius: 0.375rem;

      &::-webkit-color-swatch-wrapper {
        padding: 0;
      }

      &::-webkit-color-swatch {
        border: none;
        border-radius: 0.25rem;
      }
    }
  }

  &__lang {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;

    &-inner {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      padding: 0.375rem 0.75rem;
      border: 0.125rem solid var(--color-border-quaternary);
      border-radius: 0.375rem;
      transition: 0.25s;
      transition-property: border-color, box-shadow;
    }

    &-input:checked ~ &-inner {
      border-color: var(--color-accent-500);
    }

    &-input:checked:focus-visible ~ &-inner {
      outline: none;
      box-shadow: 0 0 0 0.25rem var(--color-accent-300);
    }

    &:not(:has(:checked)):hover &-inner {
      border-color: var(--color-border-tertiary);
    }
  }

  &__color-scheme {
    margin-block: 1.25rem 0.25rem;
  }

  &__footer {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    padding: 0.25rem 2rem 1.5rem;
  }

  &__save {
    min-width: 6.5rem;
  }

  &__reset {
    margin-left: auto;
  }
}
</style>
