<template>
  <div v-if="documentId" class="center mw8 content-container">
    <!-- Button to edit document in dashboard -->
    <prismic-edit-button :documentId="documentId" />
    <div class="post-container relative">
      <prismic-image :field="fields.main_image" />
      <div>
        <h1
          class="post-title dib bb bw2 b--black-05 mb2"
        >{{ $prismic.richTextAsPlain(fields.title) }}</h1>
        <div class="flex mb2">
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

        <prismic-rich-text class="text lh-copy tj pb5" :field="fields.text" />
        <div class="created-at absolute bottom-0 f5">
          <address class="mb1">Address: {{ $prismic.richTextAsPlain(fields.address) }}</address>
          <span
            class="date f6 moon-gray"
          >(Written on {{ Intl.DateTimeFormat('en-UK', dateOptions).format(new Date(fields.date)) }})</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Instagram from 'vue-material-design-icons/Instagram.vue';
import GoogleMaps from 'vue-material-design-icons/GoogleMaps.vue';
import Web from 'vue-material-design-icons/Web.vue';
import ArrowLeftBox from 'vue-material-design-icons/ArrowLeftBox.vue';
import Loading from '../components/Loading';

export default {
  name: 'Post',
  components: {
    Instagram,
    GoogleMaps,
    Web,
    ArrowLeftBox,
    Loading
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
      this.$prismic.client.getByUID('post', uid).then(document => {
        if (document) {
          this.documentId = document.id;
          this.fields = {
            ...document.data
          };
        } else {
          this.$router.push({ name: 'NotFound' });
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
.post-container {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(300px, 600px) minmax(auto, 500px);
  grid-gap: 30px;
}

@media (max-width: 768px) {
  .content-container {
    max-width: 460px;
    margin: auto;
  }
  .post-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }

  .created-at {
    position: initial;
    padding-top: 16px;
  }

  .text {
    padding-bottom: 10px;
  }
}
</style>