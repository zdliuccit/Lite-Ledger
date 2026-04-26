import { tabBarIcons } from './design-assets';
import type { LedgerRoute, MainTabKey } from './types';

export const mainTabConfig: {
  key: MainTabKey;
  label: string;
  route: LedgerRoute;
  icon: number;
}[] = [
  { key: 'home', label: '首页', route: '/home', icon: tabBarIcons.home },
  { key: 'bills', label: '账单', route: '/bills', icon: tabBarIcons.bills },
  { key: 'add-record', label: '记一笔', route: '/add-record', icon: tabBarIcons.addRecord },
  { key: 'report', label: '报表', route: '/report', icon: tabBarIcons.report },
  { key: 'mine', label: '我的', route: '/mine', icon: tabBarIcons.mine },
];
