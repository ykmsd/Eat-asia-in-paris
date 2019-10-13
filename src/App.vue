<template>
  <div id="app" class="sans-serif relative min-vh-100">
    <Header />
    <Navigation />
    <router-view class="pb5" />
    <Footer class="absolute bottom-0" />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Navigation
  }
};
</script>

<style>
@import './assets/css/resetr.css';
@import './assets/css/prismic-edit-button.css';
@import './assets/css/index.css';
</style>
