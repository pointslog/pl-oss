<template lang="pug">
  v-btn(
    color="primary"
    text
    type="submit"
    v-bind="$attrs"
    v-on="$listeners"
  ) {{ 'Done' }}
</template>
