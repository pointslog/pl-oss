import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';

interface MetamaskPluginOptions {
  onFailure(error: Error): Promise<void>;
  onSuccess(address: string): Promise<void>;
}

interface MetamaskService extends Vue {
  isAuthenticated: boolean;
  loading: boolean;
}

let instance: MetamaskService;

function useMetamask(options: MetamaskPluginOptions): MetamaskService {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        address: null,
        loading: false,
      };
    },

    computed: {
      isAuthenticated() {
        return Boolean(this.address);
      },
    },

    async created() {
      try {
        this.loading = true;
        const ethereum = this.getEthereum();
        await this.setAddress(ethereum);
        await options.onSuccess(this.address);
      } catch (e) {
        await options.onFailure(e);
      } finally {
        this.loading = false;
      }
    },

    methods: {
      getEthereum(): unknown {
        const { ethereum } = window as never;
        if (!ethereum) throw new Error('metamask.does.not.exist');
        return ethereum;
      },

      async setAddress(ethereum): Promise<void> {
        const addresses = await ethereum.request({ method: 'eth_requestAccounts' });
        if (addresses.length > 1) throw new Error('metamask.multiple.addresses.not.supported');
        [this.address] = addresses;
      },
    },
  });

  return instance;
}

export function getMetamaskService(): MetamaskService {
  return instance;
}

export const MetamaskPlugin = {
  install(vue: VueConstructor, options: MetamaskPluginOptions): void {
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$metamask = useMetamask(options);
  },
};
