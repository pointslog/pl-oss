import { VueConstructor } from 'vue/types/umd';
import PLCancelBtn from '../components/pl-cancel-btn.vue';
import PLDialog from '../components/pl-dialog.vue';
import PLDoneBtn from '../components/pl-done-btn.vue';
import PLMaxWidth from '../components/pl-max-width.vue';
import PLTextField from '../components/pl-text-field.vue';

function install(Vue: VueConstructor): void {
  Vue.component('pl-cancel-btn', PLCancelBtn);
  Vue.component('pl-dialog', PLDialog);
  Vue.component('pl-done-btn', PLDoneBtn);
  Vue.component('pl-max-width', PLMaxWidth);
  Vue.component('pl-text-field', PLTextField);
}

export const PLComponentsPlugin = { install };
