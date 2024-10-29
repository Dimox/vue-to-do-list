<template>
  <svg :width="width" :height="height">
    <use :xlink:href="iconUrl" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IconName } from '@/types/icons'
import spriteUrl from '@/assets/img/sprite.svg?url'

const {
  name = '',
  width = 24,
  height = 24,
} = defineProps<{
  name?: `${IconName}`
  width?: string | number
  height?: string | number
}>()

const iconUrl = computed(() => `${spriteUrl}#${name}`)
</script>
