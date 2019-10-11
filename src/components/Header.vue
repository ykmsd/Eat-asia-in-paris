<template>
  <header class="black-70">
    <h1 class="f1 lh-title">{{ $props.title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
};
</script>

<style scoped>
header {
  font-family: var(--title-font);
  text-align: center;
  border-top: 10px solid var(--main-color-dark);
}
</style>