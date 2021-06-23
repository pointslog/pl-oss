import Vue from 'vue';
import { NavigationGuardNext, Route } from 'vue-router';
import { getInstance } from '../plugin/auth0.plugin';

export function AuthGuard(to: Route, _: Route, next: NavigationGuardNext<Vue>): void {
  const authService = getInstance();

  const fn = () => {
    if (authService.isAuthenticated) return next();
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
    return undefined;
  };

  authService.$watch('loading', (loading) => {
    if (!loading) fn();
    return undefined;
  });

  if (!authService.loading) return fn();
  return undefined;
}
