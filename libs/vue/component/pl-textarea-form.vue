<template lang="pug">
  v-form(@submit.prevent="$emit('submit')")
    v-card
      v-card-title {{ title }}

      v-card-text
        pl-textarea(
          autofocus
          :class="componentClass"
          :style="componentStyle"
          v-bind="$attrs"
          v-on="$listeners"
        )

      slot

      v-card-actions
        v-spacer
        pl-cancel-btn(@click="$emit('cancel')")
        pl-done-btn(:loading="loading")
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    componentClass: { type: [Array, Object, String] },
    loading: { type: Boolean },
    componentStyle: { type: [Object, String] },

    title: {
      type: String,
      default: '',
    },
  },
});
</script>
