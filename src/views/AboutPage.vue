<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
    <Header/>
    <div class="about-wrapper">
      <div class="content-card">
        <h2 class="mb-3">About This App</h2>
        <p>
          Welcome to the <strong>Tickrr</strong> - your all-in-one solution to manage onboarding and training tasks with ease.
        </p>
        <p>
          Whether you're guiding new team members, planning structured learning, or tracking your own progress – this app is built to help you stay clear, organized, and in control.
        </p>
  
        <h4 class="mt-4">✨ What You Can Do</h4>
        <ul class="feature-list">
          <li>Create task modules with priorities and durations</li>
          <li>Mark tasks as pending or completed</li>
          <li>Edit, delete, and update task progress in one place</li>
          <li>Sort tasks by duration or importance</li>
          <li>Filter by module name for focused views</li>
          <li>Track your journey with auto-logged task history</li>
        </ul>
  
        <h4 class="mt-4">📌 Who It's For</h4>
        <ul class="feature-list">
          <li>HR teams creating onboarding plans for new hires</li>
          <li>Managers assigning step-by-step training modules</li>
          <li>Students organizing study goals</li>
          <li>Freelancers or startups tracking setup checklists</li>
        </ul>
  
        <p class="footer-note">
          Built with care to help you onboard smarter and faster 🚀
        </p>
  
       
      </div>
    </div>
    <Footer/>
  </template>
  
  
  
  <style scoped>
  .about-wrapper {
  background: url('https://cdn.pixabay.com/photo/2024/05/15/20/44/app-8764508_1280.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
  box-sizing: border-box;
}

.content-card {
  background-color: rgba(255, 255, 255, 0.92);
  padding: 2rem;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-height: 80vh; 
  overflow-y: auto; 
}

.feature-list {
  text-align: left;
  margin: 1rem auto;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.footer-note {
  margin-top: 2rem;
  font-style: italic;
  font-weight: 500;
}

:root[data-mdc-theme='dark'] .about-wrapper {
  color: black;
}


@media (max-width: 768px) {
  .content-card {
    max-height: 90vh; 
    padding: 1rem; 
  }

  .about-wrapper {
    padding: 1rem; 
  }
}

  </style>
  