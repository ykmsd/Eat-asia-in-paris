
  <template>
  <!-- Vue conditional to check if there is any content in document -->
  <div v-if="hasContent">
    <!-- Button to edit document in dashboard -->
    <prismic-edit-button :documentId="documentId" />
    <div class="content-container lh-copy center">
      <div class="tc mb4">
        <prismic-image :field="fields.avatar" />
      </div>
      <prismic-rich-text :field="fields.text" />
    </div>
  </div>
  <!-- If no content return message -->
  <div v-else class="home">
    <p>Please add some content to your blog home document.</p>
  </div>
</template>

<script>
export default {
  name: 'About',
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
          this.$router.push({ name: 'Not-found' });
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
</style>