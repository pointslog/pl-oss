import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLFileForm from './pl-file-form.vue';

Vue.use(Vuetify);

describe('PLFileForm', () => {
  it('should match the snapshot', () => {
    const stubs = { 'pl-cancel-btn': true, 'pl-done-btn': true };
    const propsData = { title: 'Title' };
    const wrapper = shallowMount(PLFileForm, { propsData, stubs });
    expect(wrapper.element).toMatchSnapshot();
  });
});
