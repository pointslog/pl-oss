import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLTextareaForm from './pl-textarea-form.vue';

Vue.use(Vuetify);

describe('PLTextareaForm', () => {
  it('should match the snapshot', () => {
    const stubs = {
      'pl-cancel-btn': true,
      'pl-done-btn': true,
      'pl-textarea': true,
    };
    const propsData = { title: 'Title' };
    const wrapper = shallowMount(PLTextareaForm, { propsData, stubs });
    expect(wrapper.element).toMatchSnapshot();
  });
});
