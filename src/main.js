import Vue from 'vue';
import VueApollo from 'vue-apollo';
import PrismicVue from 'prismic-vue';
import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import linkResolver from './prismic/link-resolver';
import htmlSerializer from './prismic/html-serializer';
import App from './App.vue';
import router from './router';
import 'vue-material-design-icons/styles.css';

Vue.config.productionTip = false;

Vue.use(VueApollo);

const client = new ApolloClient({
  link: PrismicLink({
    uri: 'https://eat-asia-in-paris.prismic.io/graphql'
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver,
  htmlSerializer
});

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
