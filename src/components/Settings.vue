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
          <label v-for="language in languages" :key="language.id" class="settings__lang">
            <input
              class="settings__lang-input visually-hidden"
              type="radio"
              name="lang"
              :checked="language.id == options.lang"
              @change="setLang(language.id)"
            />
            <span class="settings__lang-inner">
              <svg width="24" height="24">
                <use :xlink:href="`${langSprite}#${language.id}`" />
              </svg>
              {{ language.name }}
            </span>
          </label>
        </div>
      </li>
      <li class="settings__item">
        <p class="settings__caption">{{ t('colorScheme') }}</p>
        <p class="settings__description">{{ t('choosePreferredColorScheme') }}</p>
        <div class="settings__value settings__value--color-schemes">
          <label v-for="scheme in colorSchemes" :key="scheme.value" class="settings__color-scheme">
            <input
              class="settings__color-scheme-input visually-hidden"
              type="radio"
              name="color-scheme"
              :checked="scheme.value == options.colorScheme"
              @change="setColorScheme(scheme.value)"
            />
            <span class="settings__color-scheme-inner">
              <Icon :name="`mode-${scheme.value}`" />
              {{ t(scheme.value) }}
            </span>
          </label>
        </div>
      </li>
      <li class="settings__item">
        <p class="settings__caption">{{ t('applicationWidth') }}</p>
        <p class="settings__description">{{ t('expandToFullWidth') }}</p>
        <Input
          v-model="options.appWidth"
          class="settings__value settings__value--width"
          type="text"
          inputmode="numeric"
        />
      </li>
      <li class="settings__item">
        <p class="settings__caption">{{ t('accentColor') }}</p>
        <p class="settings__description">{{ t('choosePreferredColor') }}</p>
        <input v-model="options.accentColor" class="settings__value settings__value--color" type="color" />
      </li>
    </ul>
    <footer class="settings__footer">
      <Btn class="settings__save" @click="saveSettings">{{ t('save') }}</Btn>
      <Transition name="settings__saved">
        <p v-if="saved" class="settings__saved">{{ t('settingsSaved') }}</p>
      </Transition>
      <Btn class="settings__reset" type="secondary" @click="resetSettings">{{ t('restoreDefaults') }}</Btn>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import Input from './form/Input.vue'
import { useToDoStorage, defaultOptions } from '@/composables/storage'
import { t } from '@/i18n'
import { Language, ColorScheme } from '@/types'
import langSprite from '@/assets/img/lang.svg'

defineEmits(['close'])

const storage = useToDoStorage()
const getOption = (key: keyof typeof defaultOptions) => storage.value.options?.[key] ?? defaultOptions[key]

let options = reactive({
  lang: getOption('lang') as Language,
  colorScheme: getOption('colorScheme') as ColorScheme,
  appWidth: getOption('appWidth'),
  accentColor: getOption('accentColor'),
})

const MIN_APP_WIDTH = 460
const saved = ref(false)

const languages: { id: Language; name: string }[] = [
  { id: 'en', name: 'English' },
  { id: 'ru', name: 'Русский' },
]
const setLang = (lang: Language) => (options.lang = lang)

const colorSchemes: { value: ColorScheme }[] = [{ value: 'light' }, { value: 'dark' }]
const setColorScheme = (scheme: ColorScheme) => (options.colorScheme = scheme)

const isAppWidthValid = () =>
  (options.appWidth?.match(/^\d+$/) && Number(options.appWidth) >= MIN_APP_WIDTH) || options.appWidth === '100%'

const saveSettings = () => {
  storage.value.options = {
    lang: options.lang,
    colorScheme: options.colorScheme,
    appWidth: isAppWidthValid() ? options.appWidth : defaultOptions.appWidth,
    accentColor: options.accentColor,
  }
  saved.value = true
  setTimeout(() => (saved.value = false), 1500)
}

const resetSettings = () => {
  storage.value.options = defaultOptions
  options = defaultOptions
}
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

    &--langs,
    &--color-schemes {
      display: flex;
      gap: 1rem;
    }

    &--width {
      width: 7.5rem;
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

  &__lang,
  &__color-scheme {
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

  &__footer {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    padding: 0.25rem 2rem 1.5rem;
  }

  &__save {
    min-width: 6.5rem;
  }

  &__saved {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.5s ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }

  &__reset {
    margin-left: auto;
  }
}
</style>
