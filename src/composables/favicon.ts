import { computed, watch } from 'vue'
import { useToDoStorage } from './storage'
import faviconUrl from '../assets/img/favicon.png'

const storage = useToDoStorage()
const counter = computed(() => storage.value.items?.filter(item => item.checked === false).length)

export const useFavicon = () => {
  const canvas = document.createElement('canvas')
  canvas.height = 64
  canvas.width = 64

  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const img = new Image()

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
      context.fillText(`${counter.value}`, fontX, 57)
    }

    let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (link) link.remove()
    link = document.createElement('link')
    link.rel = 'icon'
    link.href = canvas.toDataURL()
    document.querySelector('head')?.appendChild(link)
  }
}

watch(counter, () => {
  useFavicon()
})
