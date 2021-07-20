import Vue from 'vue';
import { ethers } from 'ethers';
import { VueConstructor } from 'vue/types/umd';

interface EthersPluginOptions {
  onFailure(error: Error): Promise<void>;
  onSuccess(address: string): Promise<void>;
}

interface EthersService extends Vue {
  isAuthenticated: boolean;
  loading: boolean;
}

let instance: EthersService;

function useEthers(options: EthersPluginOptions): EthersService {
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
        await this.requestPermission(ethereum);
        await this.setAddress(ethereum);
        await options.onSuccess(this.address);
      } catch (e) {
        await options.onFailure(e);
      } finally {
        this.loading = false;
      }
    },

    methods: {
      getEthereum(): Promise<unknown> {
        const { ethereum } = window as never;
        if (!ethereum) throw new Error('metamask.does.not.exist');
        return ethereum;
      },

      async requestPermission(ethereum): Promise<void> {
        await ethereum.request({ method: 'eth_requestAccounts' });
      },

      async setAddress(ethereum): Promise<void> {
        const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
        this.address = await signer.getAddress();
      },
    },
  });

  return instance;
}

export function getEthersService(): EthersService {
  return instance;
}

export const EthersPlugin = {
  install(vue: VueConstructor, options: EthersPluginOptions): void {
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$ethers = useEthers(options);
  },
};
