<script setup>
import { ref } from 'vue'
import Footer from '../components/Footer.vue'
import { RouterLink } from 'vue-router'
import Header from '@/components/Header.vue'

</script>

<template>
  <div class="landing-page">
    <video autoplay muted loop class="bg-video">
      <source src="https://cdn.pixabay.com/video/2025/01/21/253859_large.mp4" type="video/mp4" />
    </video>

    <div class="overlay"></div>

    <header class="navbar">
      <Header/>
    </header>

    <main class="main-content">
      <RouterLink :to="{ name: 'taskzone' }" class="enter-btn">Enter TaskZone</RouterLink>
    </main>

    
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.landing-page {
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  filter: brightness(0.6);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  z-index: -1;
}

.navbar {
  width: 100%;
  z-index: 10;
  padding: 10px 20px;
  background-color: transparent;
  position: relative;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}






.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.enter-btn {
  font-size: 24px;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px 30px;
  border-radius: 10px;
  
  text-decoration: none;
}

.enter-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  color: black;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    background: rgba(33, 56, 75, 0.9);
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    padding: 10px 0;
    display: none;
    text-align: center;
  }

  .nav-links.open {
    display: flex;
  }

  .menu-toggle {
    display: block;
  }
}
</style>
