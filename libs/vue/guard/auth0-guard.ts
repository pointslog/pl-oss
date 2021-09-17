import Vue from 'vue';
import { NavigationGuardNext, Route } from 'vue-router';
import { getAuth0Service } from '../plugin/auth0-plugin';

export function Auth0Guard(
  to: Route,
  _: Route,
  next: NavigationGuardNext<Vue>,
): void {
  const authService = getAuth0Service();

  const fn = () => {
    if (authService.isLoggedIn()) return next();
    authService.login({ appState: { targetUrl: to.fullPath } });
    return undefined;
  };

  authService.$watch('loading', (loading) => {
    if (!loading) fn();
    return undefined;
  });

  if (!authService.loading) return fn();
  return undefined;
}
