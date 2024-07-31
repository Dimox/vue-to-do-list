import { computed, watch } from 'vue'
import faviconUrl from '../assets/img/favicon.png'
import { useToDoStorage } from './storage'

const storage = useToDoStorage()
const counter = computed(() => storage.value.items.filter(item => !item.checked).length)

export const useFavicon = () => {
  const canvas = document.createElement('canvas')
  canvas.height = 64
  canvas.width = 64

  const context = canvas.getContext('2d')
  const img = new Image()
  if (!context) return

  img.src = faviconUrl
  img.onload = () => {
    context.drawImage(img, 0, 0)

    if (counter.value > 0) {
      const circle = new Path2D()
      let circleRadius = 22
      let fontX = 1

      if (counter.value < 10) {
        circleRadius = 18
        fontX = 10
      }

      circle.arc(20, 45, circleRadius, 0, 2 * Math.PI)
      context.fillStyle = '#3b82f6'
      context.fill(circle)

      context.fillStyle = '#ffffff'
      context.font = 'bold 34px sans-serif'
      context.fillText(String(counter.value), fontX, 57)
    }

    const link = document.createElement('link')
    link.rel = 'icon'
    link.href = canvas.toDataURL()
    document.querySelector('head')?.appendChild(link)
  }
}

watch(counter, () => {
  useFavicon()
})
