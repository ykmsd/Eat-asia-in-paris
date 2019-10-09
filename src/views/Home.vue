<template>
  <!-- Vue conditional to check if there is any content in document -->
  <div v-if="hasContent" class="page">
    <div class="home">
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId" />
      <!-- Template for page title -->
      <h1 class="blog-title">{{ $prismic.richTextAsPlain(fields.title) }}</h1>
      <!-- Template for page description -->
      <p class="blog-subtitle">{{ $prismic.richTextAsPlain(fields.subtitle) }}</p>
    </div>
    <!-- Vue reference for blog posts component -->
    <blog-posts />
  </div>
  <!-- If no content return message -->
  <div v-else class="home">
    <p>Please add some content to your blog home document.</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      documentId: '',
      fields: {
        title: null,
        description: null
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
.home {
  max-width: 700px;
  margin: auto;
  text-align: center;
}

/* Media Queries */
@media (max-width: 767px) {
  .home {
    padding: 0 20px;
  }
}
</style>
