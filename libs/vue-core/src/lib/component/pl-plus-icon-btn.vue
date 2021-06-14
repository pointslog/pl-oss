<template lang="pug">
  v-btn(
    color="primary"
    icon
    v-bind="$attrs"
    v-on="$listeners"
  )
    v-icon {{ 'mdi-plus' }}
</template>
