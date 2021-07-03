/* eslint-disable */
import Vue from 'vue';
import createAuth0Client from '@auth0/auth0-spa-js';

let instance;

function useAuth0({ onRedirect, domain, ...options }) {
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
        client_id: options.clientId,
        domain,
        redirect_uri: window.location.origin,
      });

      try {
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
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

export function getInstance() {
  return instance;
}

export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  },
};
