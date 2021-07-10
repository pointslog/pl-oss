import { VueConstructor } from 'vue/types/umd';
import PLArchiveIconBtn from '../component/pl-archive-icon-btn.vue';
import PLCancelBtn from '../component/pl-cancel-btn.vue';
import PLDialog from '../component/pl-dialog.vue';
import PLDoneBtn from '../component/pl-done-btn.vue';
import PLEditIconBtn from '../component/pl-edit-icon-btn.vue';
import PLFileForm from '../component/pl-file-form.vue';
import PLListCard from '../component/pl-list-card.vue';
import PLMaxWidth from '../component/pl-max-width.vue';
import PLPlusFab from '../component/pl-plus-fab.vue';
import PLPlusIconBtn from '../component/pl-plus-icon-btn.vue';
import PLTextField from '../component/pl-text-field.vue';
import PLTextForm from '../component/pl-text-form.vue';
import PLTextarea from '../component/pl-textarea.vue';
import PLTextareaForm from '../component/pl-textarea-form.vue';

function install(Vue: VueConstructor): void {
  Vue.component('pl-archive-icon-btn', PLArchiveIconBtn);
  Vue.component('pl-cancel-btn', PLCancelBtn);
  Vue.component('pl-dialog', PLDialog);
  Vue.component('pl-done-btn', PLDoneBtn);
  Vue.component('pl-edit-icon-btn', PLEditIconBtn);
  Vue.component('pl-file-form', PLFileForm);
  Vue.component('pl-list-card', PLListCard);
  Vue.component('pl-plus-fab', PLPlusFab);
  Vue.component('pl-max-width', PLMaxWidth);
  Vue.component('pl-plus-icon-btn', PLPlusIconBtn);
  Vue.component('pl-text-field', PLTextField);
  Vue.component('pl-text-form', PLTextForm);
  Vue.component('pl-textarea', PLTextarea);
  Vue.component('pl-textarea-form', PLTextareaForm);
}

export const PLComponentsPlugin = { install };
