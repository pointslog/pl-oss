import { VueConstructor } from 'vue/types/umd';

function install(Vue: VueConstructor): void {
  Vue.component('pl-cancel-btn', import('../components/pl-cancel-btn.vue'));
  Vue.component('pl-dialog', import('../components/pl-dialog.vue'));
  Vue.component('pl-done-btn', import('../components/pl-done-btn.vue'));
  Vue.component('pl-max-width', import('../components/pl-max-width.vue'));
  Vue.component('pl-text-field', import('../components/pl-text-field.vue'));
}

export const PLComponentsPlugin = { install };
