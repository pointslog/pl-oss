import Vue from 'vue';
import createAuth0Client from '@auth0/auth0-spa-js';
import { VueConstructor } from 'vue/types/umd';

interface Auth0PluginOptions {
  onRedirect(appState: unknown): void;
  domain: string;
  clientId: string;
}

interface Auth0Service extends Vue {
  isAuthenticated: boolean;
  loading: boolean;
}
let instance;

function useAuth0({
  clientId, domain, onRedirect, ...options
}: Auth0PluginOptions): Auth0Service {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        auth0Client: null,
        loading: true,
        isAuthenticated: false,
        user: {},
        error: null,
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
        if (
          window.location.search.includes('code=')
          && window.location.search.includes('state=')
        ) {
          const { appState } = await this.auth0Client.handleRedirectCallback();
          this.error = null;
          onRedirect(appState);
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
      }
    },

    methods: {
      async handleRedirectCallback() {
        try {
          this.loading = true;
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
          this.error = null;
        } catch (e) {
          this.error = e;
        } finally {
          this.loading = false;
        }
      },

      getIdTokenClaims(o) {
        return this.auth0Client.getIdTokenClaims(o);
      },

      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o);
      },

      getTokenWithPopup(o) {
        return this.auth0Client.getTokenWithPopup(o);
      },

      loginWithRedirect(o) {
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
