<template lang="pug">
  v-form(@submit.prevent="formSubmitHandler")
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
        pl-cancel-btn(@click="cancelBtnClickHandler")
        pl-done-btn(:loading="loading")
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const TextFormProps = Vue.extend({
  props: {
    loading: { type: Boolean },
    title: { type: String, required: true },
  },
});

@Component
export default class PLTextForm extends TextFormProps {
  formSubmitHandler() {
    this.$emit('submit');
  }

  cancelBtnClickHandler() {
    this.$emit('cancel');
  }
}
</script>
