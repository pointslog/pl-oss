import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLPlusFab from './pl-plus-fab.vue';

Vue.use(Vuetify);

describe('PLPlusFab', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PLPlusFab);
    expect(wrapper.element).toMatchSnapshot();
  });
});
