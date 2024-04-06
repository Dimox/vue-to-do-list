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
        <div>
          <p class="settings__caption">{{ t('interfaceLanguage') }}</p>
          <p class="settings__description">{{ t('choosePreferredLanguage') }}</p>
        </div>
        <div class="settings__langs">
          <label v-for="language in languages" :key="language.id" class="settings__lang">
            <input
              class="settings__lang-input visually-hidden"
              type="radio"
              name="lang"
              :checked="language.id == activeLang"
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
    </ul>
    <footer class="settings__footer">
      <Btn class="settings__save" @click="saveSettings">{{ t('save') }}</Btn>
      <Transition name="settings__saved">
        <p v-if="saved" class="settings__saved">{{ t('settingsSaved') }}</p>
      </Transition>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Btn from './Btn.vue'
import Icon from './Icon.vue'
import { useToDoStorage } from '@/composables/storage'
import { lang, t } from '@/i18n'
import langSprite from '@/assets/img/lang.svg'

defineEmits(['close'])

const storage = useToDoStorage()
const activeLang = ref(lang.value)
const setLang = (lang: 'en' | 'ru') => (activeLang.value = lang)
const saved = ref(false)

const saveSettings = () => {
  storage.value.options = { lang: activeLang.value }
  saved.value = true
  setTimeout(() => (saved.value = false), 1500)
}

const languages: { id: 'en' | 'ru'; name: string }[] = [
  { id: 'en', name: 'English' },
  { id: 'ru', name: 'Русский' },
]
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
    border-bottom: 0.0625rem solid var(--color-gray-300);
  }

  &__title {
    font-size: 1.5rem;
  }

  &__close {
    color: var(--color-gray-800);

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
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding-block: 1.25rem;

    &:not(:last-child) {
      border-bottom: 0.0625rem solid var(--color-gray-200);
    }
  }

  &__caption {
    font-weight: 650;
  }

  &__description {
    font-size: 0.9375rem;
    color: var(--color-gray-500);
  }

  &__langs {
    display: flex;
    gap: 1rem;
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
      padding: 0.375rem 0.625rem;
      border: 0.125rem solid var(--color-gray-200);
      border-radius: 0.375rem;
      transition: 0.25s;
      transition-property: border-color, box-shadow;
    }

    &-input:checked ~ &-inner {
      border-color: var(--color-indigo-500);
    }

    &-input:checked:focus-visible ~ &-inner {
      outline: none;
      box-shadow: 0 0 0 0.25rem var(--color-indigo-300);
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
}
</style>
