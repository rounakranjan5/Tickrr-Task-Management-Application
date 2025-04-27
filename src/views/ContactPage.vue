<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const IG_LINK=`https://www.instagram.com/${import.meta.env.VITE_IG_USERNAME}`
const LINKEDIN_LINK=`${import.meta.env.VITE_LINKEDIN_USERNAME}`

</script>

<template>
  <Header />
    
  <div class="contact-wrapper">
    <div class="contact-card">
      <h2 class="contactThemeChange">Contact Me</h2>
      <p class="contactThemeChange">If you'd like to get in touch, feel free to reach out on any of the platforms below:</p>

      <div class="icon-links">
        <a :href="IG_LINK"  target="_blank" class="contact-icon" aria-label="Instagram">
          
          <i class="fa-brands fa-instagram"></i>
          Instagram
        </a>
        <a :href="LINKEDIN_LINK" target="_blank" class="contact-icon" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin"></i>
          LinkedIn
        </a>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.contact-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: calc(100vh - 160px); 
}

.contact-card {
  background: transparent;
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.icon-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  cursor: pointer;
}

.contact-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  color: #1a73e8;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.contact-icon:hover {
  color: #0c47a1;
}




</style>
