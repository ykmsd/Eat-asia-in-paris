
  <template>
  <div v-if="hasContent">
    <prismic-edit-button :documentId="documentId" />
    <div class="content-container lh-copy center">
      <div class="tc mb4">
        <prismic-image :field="fields.avatar" />
      </div>
      <prismic-rich-text :field="fields.text" class="tj" />
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Loading from '../components/Loading.vue';
export default {
  name: 'About',
  components: {
    Loading
  },
  data() {
    return {
      hasContent: false,
      fields: {
        text: null,
        avatar: null
      }
    };
  },
  methods: {
    getPosts() {
      this.$prismic.client.getSingle('about').then(document => {
        if (document) {
          this.documentId = document.id;
          this.fields.text = document.data.text;
          this.fields.avatar = document.data.avatar;
          this.checkForContent();
        } else {
          this.$router.push({ name: 'NotFound' });
        }
      });
    },
    checkForContent() {
      if (this.$prismic.richTextAsPlain(this.fields.text) !== '') {
        this.hasContent = true;
      }
    }
  },
  created() {
    this.getPosts();
    window.prismic.setupEditButton();
  }
};
</script>

<style scoped>
.content-container {
  width: 600px;
}

@media (max-width: 768px) {
  .content-container {
    width: 400px;
  }
}
</style>