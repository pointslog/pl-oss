import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLDialog from './pl-dialog.vue';

Vue.use(Vuetify);

describe('PLDialog', () => {
  it('should match the snapshot', () => {
    const options = { vuetify: new Vuetify() };
    const wrapper = shallowMount(PLDialog, options);
    expect(wrapper.element).toMatchSnapshot();
  });
});
