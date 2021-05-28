<template lang="pug">
  v-dialog(
    :maxWidth='$vuetify.breakpoint.thresholds.xs'
    persistent
    v-bind="$attrs"
    v-on="$listeners"
  )
    slot
</template>
