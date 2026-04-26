import { ledgerLayout } from '../../theme/ledger-theme';

export function getMainTabBarHeight(bottomInset: number) {
  return ledgerLayout.tabBarVisualHeight + Math.max(bottomInset, ledgerLayout.tabBarMinSafePadding);
}
