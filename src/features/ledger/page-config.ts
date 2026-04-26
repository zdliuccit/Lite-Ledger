import type { LedgerPageDefinition } from './types';

export const ledgerPageConfig: Record<string, LedgerPageDefinition> = {
  home: {
    route: '/home',
    title: '首页',
    mainTab: 'home',
  },
  addRecord: {
    route: '/add-record',
    title: '记一笔',
    mainTab: 'add-record',
  },
  bills: {
    route: '/bills',
    title: '账单',
    mainTab: 'bills',
  },
  statistics: {
    route: '/statistics',
    title: '统计',
    mainTab: 'report',
  },
  budget: {
    route: '/budget',
    title: '预算',
    mainTab: 'mine',
  },
  accounts: {
    route: '/accounts',
    title: '账户',
    mainTab: 'mine',
  },
  assets: {
    route: '/assets',
    title: '资产',
    mainTab: 'mine',
  },
  report: {
    route: '/report',
    title: '报表',
    mainTab: 'report',
  },
  mine: {
    route: '/mine',
    title: '我的',
    mainTab: 'mine',
  },
} as const;
