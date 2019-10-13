<template>
  <div class="mb3">
    <div class="flex items-end">
      <div class="w-20 mr2">
        <label for="keywords" class="f6 b db mb2">Keywords</label>
        <input
          id="keywords"
          type="text"
          v-model="keywords"
          placeholder="name, postal code..."
          class="input-reset ba b--black-20 pa2 w-100 br2"
          @change="onFilterChange"
        />
      </div>
      <div class="w-20 mr2">
        <label for="select" class="f6 b db mb2">Category</label>
        <select
          id="select"
          class="ba b--black-20 pa2 w-100 br2"
          v-model="selectedCategoryId"
          @change="onFilterChange"
        >
          <template v-for="tagOption in tagOptions">
            <option :key="tagOption.id" :value="tagOption.id">{{ tagOption.label }}</option>
          </template>
        </select>
      </div>
      <button
        v-if="keywords || selectedCategoryId"
        @click="onClearAllClick"
        class="button f6 link dim br2 dib white bg-dark-gray"
      >
        <Close class="mr1" />Clear All
      </button>
    </div>
  </div>
</template>

<script>
import Close from 'vue-material-design-icons/Close.vue';

export default {
  props: {
    tags: Array
  },
  components: {
    Close
  },
  data() {
    return {
      keywords: '',
      selectedCategoryId: '',
      tagOptions: []
    };
  },
  methods: {
    createTagOptions() {
      this.tagOptions = [
        {
          label: 'ALL',
          id: null
        },
        ...this.$props.tags.map(tag => ({
          label: this.$prismic.richTextAsPlain(tag.data.tag),
          id: tag.id
        }))
      ];
    },
    onFilterChange() {
      this.$emit('filterChange', {
        keywords: this.keywords,
        selectedCategoryOption: this.tagOptions.find(
          option => option.id === this.selectedCategoryId
        )
      });
    },
    onClearAllClick() {
      this.keywords = '';
      this.selectedCategoryId = '';
      this.onFilterChange();
    }
  },
  created() {
    this.createTagOptions();
  }
};
</script>

<style scoped>
.button {
  height: 30px;
  width: 90px;
}
</style>