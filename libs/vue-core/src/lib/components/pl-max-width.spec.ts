import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLMaxWidth from './pl-max-width.vue';

Vue.use(Vuetify);

describe('PLMaxWidth', () => {
  it('should match the snapshot', () => {
    const options = { vuetify: new Vuetify() };
    const wrapper = shallowMount(PLMaxWidth, options);
    expect(wrapper.element).toMatchSnapshot();
  });
});
