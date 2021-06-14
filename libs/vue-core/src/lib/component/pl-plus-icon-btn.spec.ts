import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLPlusIconBtn from './pl-plus-icon-btn.vue';

Vue.use(Vuetify);

describe('PLPlusIconBtn', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PLPlusIconBtn);
    expect(wrapper.element).toMatchSnapshot();
  });
});
