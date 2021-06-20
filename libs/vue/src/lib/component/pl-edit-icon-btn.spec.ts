import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLEditIconBtn from './pl-edit-icon-btn.vue';

Vue.use(Vuetify);

describe('PLEditIconBtn', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PLEditIconBtn);
    expect(wrapper.element).toMatchSnapshot();
  });
});
