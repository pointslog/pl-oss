<template lang="pug">
  v-form(@submit.prevent="$emit('submit')")
    v-card
      v-card-title {{ title }}

      v-card-text
        pl-text-field(
          autofocus
          v-bind="$attrs"
          v-on="$listeners"
        )

      v-card-actions
        v-spacer
        pl-cancel-btn(@click="$emit('cancel')")
        pl-done-btn(:loading="loading")
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    loading: { type: Boolean },
    title: { type: String, default: '' },
  },
});
</script>
