<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="left-section">
        <RouterLink :to="{ name: 'home' }"><div class="brand">Tickrr</div></RouterLink>
        <button @click="themeStore.toggleTheme" class="mdc-button theme-toggle">
          <span class="mdc-button__label" tabindex="0">
            {{ themeStore.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
          </span>
        </button>
      </div>

      <nav class="nav-links" :class="{ open: isMenuOpen }">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'taskzone' }">TaskZone</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink :to="{ name: 'contact' }">Contact</RouterLink>
      </nav>

      <button class="menu-toggle" @click="toggleMenu">
        <span class="material-icons">menu</span>
      </button>
    </div>
  </header>
</template>
<style>
* {

  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}
</style>
<style scoped>
.navbar {
  
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color:  #8587a3;
  color: white;
  padding: 10px 20px;
  position: relative;
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.theme-toggle {
  background: none;
  color: white;
  border: none;
  cursor: pointer;
}

a{
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.nav-links a:hover {
  color: #ffeb3b;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .navbar-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .left-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }

  .menu-toggle {
    display: block;
    align-self: center;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    padding: 10px 0;
    text-align: center;
  }

  .nav-links.open {
    display: flex;
  }

 
}

@media screen and (max-width:450px) {
  .mdc-button__label{
   margin-top: 40px;
  }

}
</style>
