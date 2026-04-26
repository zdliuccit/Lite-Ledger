import { ledgerPageConfig } from './page-config';
import type { LedgerPageDefinition, LedgerRoute, MainTabKey } from './types';

const ledgerPages = Object.values(ledgerPageConfig);

export function getPageByRoute(route: string): LedgerPageDefinition | undefined {
  return ledgerPages.find((page) => page.route === route);
}

export function getMainTabByRoute(route: string): MainTabKey {
  return getPageByRoute(route)?.mainTab ?? 'home';
}

export function isLedgerRoute(route: string): route is LedgerRoute {
  return ledgerPages.some((page) => page.route === route);
}
