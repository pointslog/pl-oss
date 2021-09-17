import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';
import Web3 from 'web3';
import Web3Modal, { IProviderControllerOptions } from 'web3modal';
import { EthGraphQLAuthService } from '../service/eth-graphql-auth-service';

interface Web3PluginOptions {
  ethAuthService: EthGraphQLAuthService;
  web3ModalOptions: IProviderControllerOptions;
  onFailure(payload: unknown): Promise<void>;
  onSuccess(payload: unknown): Promise<void>;
}

interface Web3Service extends Vue {
  web3: Web3,
  web3Modal: Web3Modal,
  getAccessToken(): Promise<string>;
  getAddress(): Promise<string>;
  isLoggedIn(): boolean;
  login(targetUrl: string): Promise<void>;
  logout(): void;
}

let instance: Web3Service;

function useWeb3(options: Web3PluginOptions): Web3Service {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        web3: null,
        web3Modal: null,
      };
    },

    methods: {
      getAccessToken(): string {
        return localStorage.accessToken;
      },

      getAddress(): string {
        return localStorage.address;
      },

      isLoggedIn(): boolean {
        return Boolean(localStorage.accessToken);
      },

      async login(targetUrl: string): Promise<void> {
        try {
          this.web3Modal = new Web3Modal(options.web3ModalOptions);
          this.web3 = new Web3(await this.web3Modal.connect());
          this.web3.eth.extend({ methods: [{ name: 'chainId', call: 'eth_chainId' }] });
          const [address] = await this.web3.eth.getAccounts();

          const hexMessage = await options.ethAuthService.getHexMessage(address);
          const signedMessage = await this.web3.eth.personal.sign(hexMessage, address, '');

          localStorage.accessToken = await options.ethAuthService.getAccessToken(signedMessage, address);
          localStorage.address = address;
          await options.onSuccess({ targetUrl });
        } catch (e) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('address');
          await options.onFailure({ targetUrl: '/', error: e });
        }
      },

      async logout(): Promise<void> {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('address');
        const isClosable = this.web3 && this.web3.currentProvider && this.web3.currentProvider.close;
        if (isClosable) await this.web3.currentProvider.close();
        await this.web3Modal.clearCachedProvider();
        window.location.reload();
      },
    },
  });

  return instance;
}

export function getWeb3Service(): Web3Service {
  return instance;
}

export const Web3Plugin = {
  install(vue: VueConstructor, options: Web3PluginOptions): void {
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$web3 = useWeb3(options);
  },
};
