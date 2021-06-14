import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLArchiveIconBtn from './pl-archive-icon-btn.vue';

Vue.use(Vuetify);

describe('PLArchiveIconBtn', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PLArchiveIconBtn);
    expect(wrapper.element).toMatchSnapshot();
  });
});
