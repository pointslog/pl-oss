import { VueConstructor } from 'vue/types/umd';
import PLCancelBtn from '../components/pl-cancel-btn.vue';
import PLDoneBtn from '../components/pl-done-btn.vue';

function install(Vue: VueConstructor): void {
  Vue.component('pl-cancel-btn', PLCancelBtn);
  Vue.component('pl-done-btn', PLDoneBtn);
}

export const PLComponentsPlugin = { install };
