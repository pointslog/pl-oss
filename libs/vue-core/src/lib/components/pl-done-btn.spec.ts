import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLDoneBtn from './pl-done-btn.vue';

Vue.use(Vuetify);

describe('PLDoneBtn', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PLDoneBtn);
    expect(wrapper.element).toMatchSnapshot();
  });
});
