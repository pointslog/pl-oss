import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLTextarea from './pl-textarea.vue';

Vue.use(Vuetify);

describe('PLTextarea', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PLTextarea);
    expect(wrapper.element).toMatchSnapshot();
  });
});
