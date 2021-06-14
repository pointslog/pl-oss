import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLTextField from './pl-text-field.vue';

Vue.use(Vuetify);

describe('PLTextField', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PLTextField);
    expect(wrapper.element).toMatchSnapshot();
  });
});
