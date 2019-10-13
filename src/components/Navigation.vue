<template>
  <nav class="tc mb4">
    <ul class="navigation ttu black-60 bt bb b--gray">
      <template v-for="item in navItems">
        <router-link :to="{ name: item.name }" :key="item.label">
          <li>{{ item.label }}</li>
        </router-link>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      navItems: [
        {
          label: 'Home',
          name: 'Home'
        },
        {
          label: 'About',
          name: 'About'
        },
        {
          label: 'Contact',
          name: 'Contact'
        }
      ]
    };
  }
};
</script>

<style scoped>
.navigation {
  height: 60px;
}

li {
  display: inline-block;
  width: 140px;
  line-height: 60px;
}

li:hover {
  text-decoration: underline;
  text-decoration-color: var(--main-color);
}

.router-link-active {
  font-weight: 600;
}
</style>