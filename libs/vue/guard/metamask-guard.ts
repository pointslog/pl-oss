import Vue from 'vue';
import { NavigationGuardNext, Route } from 'vue-router';
import { getMetamaskService } from '../plugin/metamask-plugin';

export function MetamaskGuard(
  to: Route,
  _: Route,
  next: NavigationGuardNext<Vue>,
): void {
  const metamaskService = getMetamaskService();

  const fn = (): void => {
    if (metamaskService.isAuthenticated) return next();
    metamaskService.login(to.fullPath);
    return undefined;
  };

  return fn();
}
