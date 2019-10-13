<template>
  <div v-if="hasContent">
    <prismic-edit-button :documentId="documentId" />
    <Posts />
  </div>
  <div v-else class="home">
    <p></p>
  </div>
</template>

<script>
import Posts from '../components/Posts.vue';
export default {
  name: 'Home',
  components: {
    Posts
  },
  data() {
    return {
      documentId: '',
      fields: {
        title: null
      },
      posts: [],
      linkResolver: this.$prismic.linkResolver,
      hasContent: false
    };
  },
  methods: {
    getContent() {
      //Query to get home content
      this.$prismic.client.getSingle('home').then(document => {
        if (document) {
          this.documentId = document.id;
          this.fields.title = document.data.title;
          this.fields.subtitle = document.data.subtitle;
          //Check that the blog home contains content
          this.checkForContent();
        } else {
          //returns error page
          this.$router.push({ name: 'NotFound' });
        }
      });
    },
    //Function to check for any content on the blog home page
    checkForContent() {
      if (
        this.$prismic.richTextAsPlain(this.fields.title) !== '' ||
        this.$prismic.richTextAsPlain(this.fields.description) !== ''
      ) {
        this.hasContent = true;
      }
    }
  },
  created() {
    this.getContent();
    window.prismic.setupEditButton();
  }
};
</script>

<style scoped>
</style>
