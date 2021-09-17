import Vue from 'vue';
import createAuth0Client from '@auth0/auth0-spa-js';
import { VueConstructor } from 'vue/types/umd';

interface Auth0PluginOptions {
  clientId: string;
  domain: string;
  onFailure(error: Error): Promise<void>;
  onSuccess(appState: unknown): void;
}

interface Auth0Service extends Vue {
  auth0Client: null,
  isAuthenticated: boolean;
  loading: boolean;
  user: unknown;
  getAccessToken(): Promise<string>;
  isLoggedIn(): boolean;
  login(payload: unknown): void;
  logout(payload: unknown): void;
}
let instance;

function useAuth0({
  clientId, domain, onFailure, onSuccess, ...options
}: Auth0PluginOptions): Auth0Service {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        auth0Client: null,
        isAuthenticated: false,
        loading: true,
        user: {},
      };
    },

    async created() {
      this.auth0Client = await createAuth0Client({
        ...options,
        client_id: clientId,
        domain,
        redirect_uri: window.location.origin,
      });

      try {
        const isAuth0CallbackURL = window.location.search.includes('code=') && window.location.search.includes('state=');
        if (isAuth0CallbackURL) {
          const { appState } = await this.auth0Client.handleRedirectCallback();
          onSuccess(appState);
        }
      } catch (e) {
        await onFailure(e);
      } finally {
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
      }
    },

    methods: {
      getAccessToken(o) {
        return this.auth0Client.getTokenSilently(o);
      },

      isLoggedIn(): boolean {
        return this.isAuthenticated;
      },

      async handleRedirectCallback() {
        try {
          this.loading = true;
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
        } catch (e) {
          await onFailure(e);
        } finally {
          this.loading = false;
        }
      },

      login(o) {
        return this.auth0Client.loginWithRedirect(o);
      },

      logout(o) {
        return this.auth0Client.logout(o);
      },
    },
  });

  return instance;
}

export function getAuth0Service(): Auth0Service {
  return instance;
}

export const Auth0Plugin = {
  install(vue: VueConstructor, options: Auth0PluginOptions): void {
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$auth0 = useAuth0(options);
  },
};
