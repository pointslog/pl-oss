<template lang="pug">
  v-card(:loading="loading")
    v-list(v-if="items.length")
      v-list-item(
        v-for="item in items"
        :key="item.id"
        :to="{ name: routeName, params: { id: item.id } }"
      )
        v-list-item-title {{ item.name }}

    v-card-text.text-center(v-else) No data available
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

interface Item {
  id: string
  name: string
}

export default Vue.extend({
  props: {
    items: { type: Array as PropType<Item[]>, default: () => [] },
    loading: { type: Boolean },
    routeName: { type: String, required: true },
  },
});
</script>
