<template>
  <header class="black-70">
    <router-link :to="{ name: 'Home' }">
      <h1 class="f1 lh-title">Eat Asia in Paris</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
header {
  font-family: var(--title-font);
  text-align: center;
  border-top: 10px solid var(--main-color-dark);
}
</style>