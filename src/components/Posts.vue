<template>
  <!-- Check blog posts exist -->
  <div class="posts-container">
    <div v-if="posts.length !== 0" class="posts">
      <!-- Template for blog posts -->
      <div v-for="post in posts" :key="post.id">
        <!-- <router-link :to="linkResolver(post)"> -->
        <!-- <h2>{{ $prismic.richTextAsPlain(post.data.title) }}</h2> -->
        <div class="image-container">
          <div class="image-overlay"></div>
          <prismic-image :field="post.data.main_image" class="image" />
          <div class="image-details fadeIn-bottom">
            <h3 class="title text-color-white">{{ $prismic.richTextAsPlain(post.data.title) }}</h3>
          </div>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
    <!-- If no blog posts return message -->
    <div v-else class="blog-main">
      <p>No Posts published at this time.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'posts',
  data() {
    return {
      posts: [],
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
      linkResolver: this.$prismic.linkResolver
    };
  },
  methods: {
    getPosts() {
      this.$prismic.client
        .query(this.$prismic.Predicates.at('document.type', 'post'), {
          orderings: '[my.post.date desc]'
        })
        .then(response => {
          this.posts = response.results;
        });
    }
  },
  created() {
    this.getPosts();
  }
};
</script>

<style scoped>
.posts-container {
  max-width: 1200px;
  margin: auto;
}

.posts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-flow: row;
}

.image-container {
  position: relative;
}

.image-overlay {
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  opacity: 0;
  height: 99%;
  width: 100%;
  transition: all 0.2s ease-in-out 0s;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-details {
  position: absolute;
  text-align: center;
  width: 100%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease-in-out 0s;
}

.image-container:hover .image-details {
  top: 50%;
  left: 50%;
  opacity: 1;
}

.fadeIn-bottom {
  top: 52%;
}

.image {
  object-fit: cover;
  width: 300px;
  height: 300px;
}
</style>
