<template>
  <!-- Vue conditional to check if there is any content in document -->
  <div v-if="hasContent">
    <!-- Button to edit document in dashboard -->
    <prismic-edit-button :documentId="documentId" />
    <Header :title="$prismic.richTextAsPlain(fields.title)" />
    <Posts />
  </div>
  <!-- If no content return message -->
  <div v-else class="home">
    <p>Please add some content to your blog home document.</p>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Posts from '../components/Posts.vue';
export default {
  name: 'Home',
  components: {
    Header,
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
          this.$router.push({ name: 'not-found' });
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
.header {
  font-family: var(--title-font);
  text-align: center;
  border-top: 10px solid var(--main-color-dark);
}

.home {
  /* max-width: 700px; */
  margin: auto;
  text-align: center;
}

.blog-title {
  color: var(--white);
}

/* Media Queries */
@media (max-width: 767px) {
  .home {
    padding: 0 20px;
  }
}
</style>
