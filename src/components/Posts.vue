<template>
  <div class="posts-container center">
    <template v-if="!isLoading">
      <Filters v-if="tags.length" :tags="tags" @filterChange="onFilterChange($event)" />
      <div class="posts" v-if="!isNotFound">
        <div v-for="post in posts" :key="post.id" v-bind:post="post" class="dib">
          <router-link :to="linkResolver(post)">
            <div class="image-container">
              <div class="image-overlay"></div>
              <prismic-image :field="post.data.main_image" class="image" />
              <div class="image-details fadeIn-bottom">
                <h3 class="title text-color-white">{{ $prismic.richTextAsPlain(post.data.title) }}</h3>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="tc">
        <p class="pa4">
          Sorry there is no posts related to
          {{ getNoResultsMessage }}
        </p>
      </div>
    </template>

    <div v-else class="blog-main">
      <Loading />
    </div>
  </div>
</template>

<script>
import Loading from './Loading.vue';
import Filters from './Filters.vue';
export default {
  name: 'Posts',
  components: {
    Loading,
    Filters
  },
  data() {
    return {
      posts: [],
      tags: [],
      isLoading: true,
      isNotFound: false,
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
      searchTerms: '',
      selectedCategoryOptionLabel: '',
      linkResolver: this.$prismic.linkResolver
    };
  },
  computed: {
    getNoResultsMessage: function() {
      if (this.searchTerms && this.selectedCategoryOptionLabel) {
        return `"${this.searchTerms}" and "${this.selectedCategoryOptionLabel}"`;
      } else if (this.searchTerms) {
        return `"${this.searchTerms}"`;
      } else {
        return `"${this.selectedCategoryOptionLabel}"`;
      }
    }
  },
  methods: {
    getCategories() {
      this.$prismic.client
        .query([this.$prismic.Predicates.at('document.type', 'tag')])
        .then(({ results }) => {
          console.log('categories', results);
          this.tags = results;
        });
    },
    getQueries(keywords, categoryId) {
      let queries = [this.$prismic.Predicates.at('document.type', 'post')];
      if (keywords) {
        queries.push(this.$prismic.Predicates.fulltext('document', keywords));
      }
      if (categoryId) {
        queries.push(
          this.$prismic.Predicates.at('my.post.custom_tag', categoryId)
        );
      }
      return queries;
    },
    getPosts(keywords, categoryId) {
      this.$prismic.client
        .query(this.getQueries(keywords, categoryId), {
          orderings: '[my.post.date desc]'
        })
        .then(({ results }) => {
          this.posts = results;
          this.isLoading = false;
          this.isNotFound = this.posts.length === 0;
        });
    },
    onFilterChange({
      keywords,
      selectedCategoryOption: { id, label } = { id: '', label: '' }
    }) {
      this.searchTerms = keywords;
      this.selectedCategoryOptionLabel = label;
      this.getPosts(keywords, id);
    }
  },
  created() {
    this.getPosts();
    this.getCategories();
  }
};
</script>

<style scoped>
.posts-container {
  max-width: 1200px;
}

.posts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-flow: row;
}

.image-container {
  display: inline-block;
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

@media (max-width: 768px) {
  .posts-container {
    max-width: 480px;
  }

  .posts {
    grid-template-columns: repeat(2, 1fr);
  }

  .image-container .image-overlay {
    opacity: 1;
  }

  .image-container .image-details {
    top: 50%;
    left: 50%;
    opacity: 1;
  }
}
</style>
