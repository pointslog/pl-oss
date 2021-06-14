import { VueConstructor } from 'vue/types/umd';
import PLArchiveIconBtn from '../component/pl-archive-icon-btn.vue';
import PLCancelBtn from '../component/pl-cancel-btn.vue';
import PLDialog from '../component/pl-dialog.vue';
import PLDoneBtn from '../component/pl-done-btn.vue';
import PLEditIconBtn from '../component/pl-edit-icon-btn.vue';
import PLMaxWidth from '../component/pl-max-width.vue';
import PLPlusIconBtn from '../component/pl-plus-icon-btn.vue';
import PLTextField from '../component/pl-text-field.vue';

function install(Vue: VueConstructor): void {
  Vue.component('pl-archive-icon-btn', PLArchiveIconBtn);
  Vue.component('pl-cancel-btn', PLCancelBtn);
  Vue.component('pl-dialog', PLDialog);
  Vue.component('pl-done-btn', PLDoneBtn);
  Vue.component('pl-edit-icon-btn', PLEditIconBtn);
  Vue.component('pl-max-width', PLMaxWidth);
  Vue.component('pl-plus-icon-btn', PLPlusIconBtn);
  Vue.component('pl-text-field', PLTextField);
}

export const PLComponentsPlugin = { install };
