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
import 'animate.css';
import '@lottiefiles/lottie-player';

export default {
  name: 'App',
  components: {
    mainPage
  }
}
</script>

<style>
</style>
