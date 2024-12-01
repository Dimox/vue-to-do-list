import { watch, computed } from 'vue'
import { useToDoStorage } from '@/composables/storage'

const hexToRgb = (hex: string) => {
  let cleanedHex = hex.replace(/^#/, '')
  if (cleanedHex.length === 3) {
    cleanedHex = cleanedHex
      .split('')
      .map(char => char + char)
      .join('')
  }
  const bigint = parseInt(cleanedHex, 16)
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

const getContrastYIQ = (hex: string) => {
  const [r, g, b] = hexToRgb(hex)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#1F2937' : '#ffffff'
}

export const useContrastingTextColor = () => {
  const storage = useToDoStorage()
  const accentColor = computed(() => storage.value.options.accentColor)

  const colors = computed(() => [
    { color: accentColor.value, variable: '--color-accent-contrast' },
    { color: '#f3f4f6', variable: '--color-bg-tertiary-contrast-light' },
    { color: '#45464a', variable: '--color-bg-tertiary-contrast-dark' },
    { color: '#ef4444', variable: '--color-red-500-contrast' },
  ])

  const setCssVar = () => {
    colors.value.forEach(({ color, variable }) => {
      if (!color) return
      const contrastingTextColor = getContrastYIQ(color)
      document.documentElement.style.setProperty(variable, contrastingTextColor)
    })
  }

  setCssVar()
  watch(accentColor, () => {
    setCssVar()
  })
}
