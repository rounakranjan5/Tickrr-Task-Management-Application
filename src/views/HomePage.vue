<script setup>
import { useThemeStore } from '@/stores/theme'
import Footer from '@/components/Footer.vue'
import Tasks from '@/components/Tasks.vue'
import AddTask from '@/components/AddTask.vue'
import Header from '@/components/Header.vue'

const themeStore = useThemeStore()
</script>

<template>
  <div class="app-layout">
    <header class="header">
       <Header/>
    </header>

    <main class="content">
      <AddTask />
      <Tasks />
    </main>

    <Footer />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');

:root[data-mdc-theme='light'] {
  --md-sys-color-background: #ffffff;
  --md-sys-color-on-background: #000000;
}

:root[data-mdc-theme='dark'] {
  --md-sys-color-background: #121212;
  --md-sys-color-on-background: #ffffff;
  --footer-bg-color: #8587a3; 
  --footer-text-color: black; 
  --md-sys-color-on-surface: white;
}

body {
  background-color: var(--md-sys-color-background);
  color: var(--md-sys-color-on-background);
  transition: background-color 0.3s, color 0.3s;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 0;
  position: relative;
}

.poetsen-one-regular {
  font-family: 'Poetsen One', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.theme-toggle-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

:root[data-mdc-theme='dark'] footer {
  background-color: var(--footer-bg-color); 
  color: var(--footer-text-color); 
  padding: 10px;
  text-align: center;
  font-size: 14px;
}

@media screen and (max-width: 450px) {
  .theme-toggle-container {
    top: 10px;
    right: 10px;
  }

  .mdc-button {
    font-size: 0.9rem;
  }
}
</style>
