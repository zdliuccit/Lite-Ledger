import { Href, useRouter } from 'expo-router';

import { mainTabConfig } from './navigation-config';
import type { LedgerRoute, MainTabKey } from './types';

const mainTabRouteMap = Object.fromEntries(mainTabConfig.map((tab) => [tab.key, tab.route])) as Record<
  MainTabKey,
  LedgerRoute
>;

export function getMainTabRoute(mainTab: MainTabKey): Href {
  return mainTabRouteMap[mainTab] as Href;
}

export function useGoToMainTab() {
  const router = useRouter();

  return (mainTab: MainTabKey, mode: 'replace' | 'push' = 'replace') => {
    const targetRoute = getMainTabRoute(mainTab);

    if (mode === 'push') {
      router.push(targetRoute);
      return;
    }

    router.replace(targetRoute);
  };
}
