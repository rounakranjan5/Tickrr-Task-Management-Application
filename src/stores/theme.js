import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

  function applyTheme() {
    const root = document.documentElement
    if (isDarkMode.value) {
      root.setAttribute('data-mdc-theme', 'dark')
      root.classList.add('dark')
    } else {
      root.setAttribute('data-mdc-theme', 'light')
      root.classList.remove('dark')
    }
  }

  watch(isDarkMode, (val) => {
    localStorage.setItem('darkMode', val)
    applyTheme()
  }, { immediate: true })

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    isDarkMode,
    toggleTheme
  }
})
