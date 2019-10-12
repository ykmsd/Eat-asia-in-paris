import Vue from 'vue';
import Router from 'vue-router';
import NotFound from './views/NotFound.vue';
import Preview from './views/Preview.vue';
import Home from './views/Home.vue';
import Post from './views/Post.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/post/:uid',
      name: 'Post',
      component: Post
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/not-found',
      name: 'Not-found',
      component: NotFound
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview
    },
    {
      path: '*',
      redirect: { name: 'Not-found' }
    }
  ]
});
