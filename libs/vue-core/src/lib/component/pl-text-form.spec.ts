import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLTextForm from './pl-text-form.vue';

Vue.use(Vuetify);

describe('PLTextForm', () => {
  it('should match the snapshot', () => {
    const stubs = {
      'pl-cancel-btn': true,
      'pl-done-btn': true,
      'pl-text-field': true,
    };
    const propsData = { title: 'Title' };
    const wrapper = shallowMount(PLTextForm, { propsData, stubs });
    expect(wrapper.element).toMatchSnapshot();
  });
});
