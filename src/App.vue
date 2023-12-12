<template>
  <div id="app">
    <mainPage />
  </div>
</template>

<script>
import mainPage from './pages/mainPage.vue';
import "./css/global.css";
import './assets/fontawesome/css/all.css';
import './assets/fontawesome/css/fontawesome.css';

export default {
  name: 'App',
  components: {
    mainPage
  }
}
</script>

<style>
</style>
