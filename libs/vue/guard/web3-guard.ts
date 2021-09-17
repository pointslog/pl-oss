import { NavigationGuardNext, Route } from 'vue-router';
import { getWeb3Service } from '../plugin/web3-plugin';

export function Web3Guard(
  to: Route,
  _: Route,
  next: NavigationGuardNext,
): void {
  const web3Service = getWeb3Service();

  const fn = (): void => {
    if (web3Service.isLoggedIn()) return next();
    web3Service.login(to.fullPath).then();
    return undefined;
  };

  return fn();
}
