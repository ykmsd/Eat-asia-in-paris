<template>
  <div>
    <!-- Button to edit document in dashboard -->
    <prismic-edit-button :documentId="documentId" />
    <div class="back">
      <router-link :to="{ name: 'home' }">back to list</router-link>
    </div>
    <div class="post-container">
      <prismic-image :field="fields.main_image" />
      <div>
        <h1 class="post-title dib bb bw2 b--black-05">{{ $prismic.richTextAsPlain(fields.title) }}</h1>
        <div class="flex">
          <template v-for="socialMedia in socialMediaList">
            <prismic-link
              v-if="fields[socialMedia] && fields[socialMedia].url"
              :field="fields[socialMedia]"
              target="_blank"
              :key="socialMedia"
            >
              <Instagram class="icon-2x" v-if="socialMedia === 'instagram'" />
              <GoogleMaps class="icon-2x" v-if="socialMedia === 'google_map'" />
              <Web class="icon-2x" v-if="socialMedia === 'website'" />
            </prismic-link>
          </template>
        </div>

        <p class="blog-post-meta">
          <span
            class="created-at date"
          >{{ Intl.DateTimeFormat('en-US', dateOptions).format(new Date(fields.date)) }}</span>
        </p>
        <prismic-rich-text :field="fields.text" />
      </div>
    </div>
  </div>
</template>

<script>
import Instagram from 'vue-material-design-icons/Instagram.vue';
import GoogleMaps from 'vue-material-design-icons/GoogleMaps.vue';
import Web from 'vue-material-design-icons/Web.vue';

export default {
  name: 'Post',
  components: {
    Instagram,
    GoogleMaps,
    Web
  },
  data() {
    return {
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
      documentId: '',
      fields: {
        title: null,
        date: null,
        custom_tag: null,
        custom_tag: null,
        google_map: null,
        instagram: null,
        main_image: null,
        secondary_image: null,
        text: null,
        title: null,
        website: null
      },
      socialMediaList: ['instagram', 'google_map', 'website']
    };
  },
  methods: {
    getContent(uid) {
      //Query to get post content
      this.$prismic.client.getByUID('post', uid).then(document => {
        if (document) {
          this.documentId = document.id;
          this.fields = {
            ...document.data
          };
          console.log(this.fields);
        } else {
          //returns error page
          this.$router.push({ name: 'not-found' });
        }
      });
    }
  },
  created() {
    this.getContent(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  }
};
</script>

<style scoped>
.post-title {
  /* border-bottom: 4px solid var(--main-color-dark); */
}

.post-container {
  display: grid;
  grid-template-columns: minmax(300px, 600px) minmax(auto, 600px);
  grid-gap: 30px;
}
</style>