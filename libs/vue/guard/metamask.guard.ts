import Vue from 'vue';
import { NavigationGuardNext, Route } from 'vue-router';
import { getMetamaskService } from '../plugin/metamask.plugin';

export function MetamaskGuard(
  _to: Route,
  _from: Route,
  next: NavigationGuardNext<Vue>,
): void {
  const metamaskService = getMetamaskService();

  const fn = (): void => {
    if (metamaskService.isAuthenticated) return next();
    return next({ name: 'index' });
  };

  metamaskService.$watch('loading', (loading) => {
    if (!loading) fn();
    return undefined;
  });

  if (!metamaskService.loading) return fn();
  return undefined;
}
