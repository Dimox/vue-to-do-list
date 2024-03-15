<template>
  <svg :width="width" :height="height">
    <use :xlink:href="iconUrl" />
  </svg>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { IconName } from '@/types/icons'
import spriteUrl from '@/assets/img/sprite.svg?url'

const props = defineProps({
  name: {
    type: String as PropType<`${IconName}`>,
    default: '',
  },
  width: {
    type: [String, Number],
    default: 24,
  },
  height: {
    type: [String, Number],
    default: 24,
  },
})

const iconUrl = computed(() => `${spriteUrl}#${props.name}`)
</script>
