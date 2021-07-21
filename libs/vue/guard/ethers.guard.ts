import Vue from 'vue';
import { NavigationGuardNext, Route } from 'vue-router';
import { getEthersService } from '../plugin/ethers.plugin';

export function EthersGuard(
  _to: Route,
  _from: Route,
  next: NavigationGuardNext<Vue>,
): void {
  const ethersService = getEthersService();

  const fn = (): void => {
    if (ethersService.isAuthenticated) return next();
    return next({ name: 'index' });
  };

  ethersService.$watch('loading', (loading) => {
    if (!loading) fn();
    return undefined;
  });

  if (!ethersService.loading) return fn();
  return undefined;
}
