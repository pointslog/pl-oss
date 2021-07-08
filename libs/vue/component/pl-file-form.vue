<template lang="pug">
  v-form(@submit.prevent="submitHandler")
    v-card
      v-card-title {{ title }}

      v-card-text
        v-file-input(
          v-model="file"
          hide-details="auto"
          outlined
          v-bind="$attrs"
          v-on="$listeners"
        )

      slot

      v-card-actions
        v-spacer
        pl-cancel-btn(@click="cancelBtnClickHandler")
        pl-done-btn(:loading="loading")
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    loading: { type: Boolean },
    title: { type: String, default: '' },
  },

  data() { return { file: null }; },

  methods: {
    cancelBtnClickHandler() {
      this.$emit('cancel');
      this.file = null;
    },

    submitHandler() {
      this.$emit('submit', this.file);
      this.file = null;
    },
  },
});
</script>
