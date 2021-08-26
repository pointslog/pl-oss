import { EthGraphQLAuthService } from '@pl-oss/adapter';
import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';

interface MetamaskPluginOptions {
  ethAuthService: EthGraphQLAuthService;
  onFailure(payload: unknown): Promise<void>;
  onSuccess(payload: unknown): Promise<void>;
}

interface MetamaskService extends Vue {
  isAuthenticated: boolean;
  authorize(): void;
  login(targetUrl: string): void;
}

let instance: MetamaskService;

function useMetamask(options: MetamaskPluginOptions): MetamaskService {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        accessToken: null,
        address: null,
        ethereum: null,
      };
    },

    computed: {
      isAuthenticated() {
        return Boolean(this.address);
      },
    },

    async created() {
      this.accessToken = localStorage.accessToken;
      try {
        const { ethereum } = window as never;
        if (!ethereum) throw new Error('metamask.does.not.exist');
        this.ethereum = ethereum;
      } catch (e) {
        await options.onFailure({ targetUrl: '/', error: e });
      }
    },

    methods: {
      async authorize(): Promise<void> {
        try {
          const hexMessage = await options.ethAuthService.getHexMessage(this.address);
          const signedMessage = await this.getSignedMessage(hexMessage);
          const accessToken = await options.ethAuthService.getAccessToken(signedMessage, this.address);
          this.accessToken = accessToken;
          localStorage.accessToken = accessToken;
        } catch (e) {
          this.accessToken = null;
          localStorage.removeItem('accessToken');
        }
      },

      async getSignedMessage(message: string): Promise<string> {
        return this.ethereum.request({
          method: 'personal_sign',
          params: [message, this.address],
        });
      },

      async login(targetUrl): Promise<void> {
        try {
          await this.setAddress();
          await options.onSuccess({ targetUrl });
        } catch (e) {
          await options.onFailure({ targetUrl: '/', error: e });
        }
      },

      async setAddress(): Promise<void> {
        const addresses = await this.ethereum.request({ method: 'eth_requestAccounts' });
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
