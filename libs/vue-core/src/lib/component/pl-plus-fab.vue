<template lang="pug">
  v-btn(
    bottom
    color="primary"
    elevation="16"
    fab
    fixed
    large
    right
    v-bind="$attrs"
    v-on="$listeners"
  )
    v-icon mdi-plus
</template>
