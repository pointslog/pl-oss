<template lang="pug">
  .mx-auto(:style="style")
    slot
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    threshold: {
      default: 'sm',
      type: String,

      validator(value) {
        return ['xs', 'sm', 'md', 'lg'].includes(value);
      },
    },
  },

  computed: {
    style() {
      const threshold = this.$vuetify.breakpoint.thresholds[this.threshold];
      const maxWidth = `${threshold}px`;
      return { maxWidth };
    },
  },
});
</script>
