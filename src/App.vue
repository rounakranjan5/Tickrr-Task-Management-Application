<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>

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

:root[data-mdc-theme='dark'] md-dialog {
  --md-sys-color-background: #121212;
  --md-sys-color-on-background: #ffffff;
  --md-sys-color-on-surface: black;
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

.poetsen-one-regular {
  font-family: "Poetsen One", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: center;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

:root[data-mdc-theme='dark'] footer {
  background-color: var(--footer-bg-color); 
  color: var(--footer-text-color); 
  padding: 10px;
  text-align: center;
  font-size: 14px;
}

.theme-toggle-container {
  position: absolute;
  top: 20px;
  right: 20px;
}



md-outlined-text-field::part(focus-ring) {
  border: 2px solid #2196f3;
}


@media screen and (max-width: 450px) {
  .mdc-button {
    position: relative;
    right: 10px;
    bottom: 20px;
  }
}
</style>
