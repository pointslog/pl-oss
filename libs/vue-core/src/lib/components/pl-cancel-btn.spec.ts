import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLCancelBtn from './pl-cancel-btn.vue';

Vue.use(Vuetify);

describe('PLCancelBtn', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PLCancelBtn);
    expect(wrapper.element).toMatchSnapshot();
  });
});
