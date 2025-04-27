  <script setup>

</script>
<template>
  <footer class="footer">
    <div class="footer-content">
      <h2 class="company-name">Tickrr</h2>
      <p class="motto">Tick Tasks Like a Pro</p>
      <p class="rights">&copy; 2025 Tickrr. All rights reserved. Made By <b class="myName">Rounak
      </b>
      </p>
    </div>
  </footer>
</template>


<style scoped>
.footer {

  background-color: #DCD9D4;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.50) 100%), radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.10) 0%, rgba(0, 0, 0, 0.50) 50%);
  background-blend-mode: soft-light, screen;
  padding: 20px 10px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: #444;
  border-top: 1px solid #ddd;

}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.company-name {
  color: #6200ee;
  font-size: 20px;
  margin-bottom: 6px;
}

.motto {
  font-size: 14px;
  margin-bottom: 4px;
  color: #555;
}

.rights {
  font-size: 12px;
  
}

.myName {
  color: black;
  font-weight: bolder;
}

@media (max-width: 600px) {
  .company-name {
    font-size: 18px;
  }

  .motto {
    font-size: 13px;
  }

  .rights {
    font-size: 11px;
  }
}
</style>
