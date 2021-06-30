import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import PLListCard from './pl-list-card.vue';

Vue.use(Vuetify);

describe('PLListCard', () => {
  it('should match the snapshot', () => {
    const propsData = { items: [], loading: false, routeName: 'routeName' };
    const wrapper = shallowMount(PLListCard, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });
});
