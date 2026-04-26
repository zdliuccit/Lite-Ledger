import { ImageSourcePropType } from 'react-native';

import { featureIcons } from './design-assets';

export type QuickActionItem = {
  title: string;
  subtitle?: string;
  icon: ImageSourcePropType;
  backgroundColor: string;
  iconTint?: string;
  route: '/add-record' | '/budget' | '/accounts' | '/report';
};

export type BillRecord = {
  title: string;
  category: string;
  channel: string;
  amount: string;
  isPositive?: boolean;
  icon: ImageSourcePropType;
  iconBackgroundColor: string;
  iconTint?: string;
};

export type BillGroup = {
  dateTitle: string;
  records: BillRecord[];
};

export type StatisticsCategory = {
  title: string;
  amount: string;
  percentage: string;
  color: string;
};

export type BudgetCategory = {
  title: string;
  budgetAmount: string;
  spentAmount: string;
  progress: number;
  color: string;
};

export type AccountItem = {
  title: string;
  amount: string;
  icon: ImageSourcePropType;
  iconBackgroundColor: string;
};

export type MenuItem = {
  title: string;
  icon: ImageSourcePropType;
  iconTint?: string;
};

export const homeQuickActions: QuickActionItem[] = [
  { title: '记一笔', icon: featureIcons.food, backgroundColor: '#22C55E', iconTint: '#FFFFFF', route: '/add-record' },
  { title: '预算', icon: featureIcons.budget, backgroundColor: '#F59E0B', iconTint: '#FFFFFF', route: '/budget' },
  { title: '账户', icon: featureIcons.wallet, backgroundColor: '#06B6D4', iconTint: '#FFFFFF', route: '/accounts' },
  { title: '报表', icon: featureIcons.report, backgroundColor: '#8B5CF6', iconTint: '#FFFFFF', route: '/report' },
];

export const recentBillRecords: BillRecord[] = [
  { title: '早餐', category: '餐饮', channel: '微信', amount: '-18.00', icon: featureIcons.food, iconBackgroundColor: '#F59E0B', iconTint: '#FFFFFF' },
  { title: '地铁', category: '交通', channel: '支付宝', amount: '-6.00', icon: featureIcons.car, iconBackgroundColor: '#06B6D4', iconTint: '#FFFFFF' },
  { title: '超市购物', category: '购物', channel: '微信', amount: '-56.80', icon: featureIcons.shop, iconBackgroundColor: '#EF4444', iconTint: '#FFFFFF' },
  { title: '工资收入', category: '工资', channel: '招商银行', amount: '+8,000.00', icon: featureIcons.wallet, iconBackgroundColor: '#22C55E', iconTint: '#FFFFFF', isPositive: true },
];

export const billGroups: BillGroup[] = [
  {
    dateTitle: '4月25日 今天',
    records: [
      { title: '早餐', category: '餐饮', channel: '微信', amount: '-18.00', icon: featureIcons.food, iconBackgroundColor: '#F59E0B', iconTint: '#FFFFFF' },
      { title: '地铁', category: '交通', channel: '支付宝', amount: '-6.00', icon: featureIcons.car, iconBackgroundColor: '#06B6D4', iconTint: '#FFFFFF' },
      { title: '咖啡', category: '餐饮', channel: '微信', amount: '-32.00', icon: featureIcons.food, iconBackgroundColor: '#F59E0B', iconTint: '#FFFFFF' },
    ],
  },
  {
    dateTitle: '4月24日 昨天',
    records: [
      { title: '超市购物', category: '购物', channel: '微信', amount: '-56.80', icon: featureIcons.shop, iconBackgroundColor: '#EF4444', iconTint: '#FFFFFF' },
      { title: '电影票', category: '娱乐', channel: '支付宝', amount: '-38.00', icon: featureIcons.chart, iconBackgroundColor: '#8B5CF6', iconTint: '#FFFFFF' },
      { title: '打车', category: '交通', channel: '微信', amount: '-24.50', icon: featureIcons.car, iconBackgroundColor: '#3B82F6', iconTint: '#FFFFFF' },
    ],
  },
  {
    dateTitle: '4月23日 星期四',
    records: [
      { title: '工资收入', category: '工资', channel: '招商银行', amount: '+8,000.00', icon: featureIcons.income, iconBackgroundColor: '#22C55E', iconTint: '#FFFFFF', isPositive: true },
    ],
  },
];

export const statisticsCategories: StatisticsCategory[] = [
  { title: '餐饮', amount: '1,280.00', percentage: '30.3%', color: '#22C55E' },
  { title: '购物', amount: '980.00', percentage: '23.2%', color: '#06B6D4' },
  { title: '交通', amount: '620.00', percentage: '14.7%', color: '#F59E0B' },
  { title: '住房', amount: '560.00', percentage: '13.2%', color: '#EF4444' },
  { title: '娱乐', amount: '420.00', percentage: '9.9%', color: '#8B5CF6' },
];

export const budgetCategories: BudgetCategory[] = [
  { title: '餐饮', budgetAmount: '1,500.00', spentAmount: '1,245.00', progress: 0.83, color: '#22C55E' },
  { title: '购物', budgetAmount: '1,000.00', spentAmount: '650.00', progress: 0.65, color: '#06B6D4' },
  { title: '交通', budgetAmount: '800.00', spentAmount: '420.00', progress: 0.52, color: '#22C55E' },
  { title: '娱乐', budgetAmount: '500.00', spentAmount: '480.00', progress: 0.96, color: '#EF4444' },
  { title: '其他', budgetAmount: '2,200.00', spentAmount: '1,435.00', progress: 0.65, color: '#22C55E' },
];

export const accountItems: AccountItem[] = [
  { title: '微信钱包', amount: '6,823.50', icon: featureIcons.wallet, iconBackgroundColor: '#22C55E' },
  { title: '支付宝', amount: '12,650.00', icon: featureIcons.wallet, iconBackgroundColor: '#3B82F6' },
  { title: '招商银行储蓄卡', amount: '8,900.00', icon: featureIcons.wallet, iconBackgroundColor: '#EF4444' },
  { title: '现金', amount: '1,200.00', icon: featureIcons.wallet, iconBackgroundColor: '#F59E0B' },
  { title: '花呗', amount: '-1,250.00', icon: featureIcons.wallet, iconBackgroundColor: '#06B6D4' },
  { title: '招商银行信用卡', amount: '-4,500.00', icon: featureIcons.wallet, iconBackgroundColor: '#EF4444' },
  { title: '余额宝', amount: '2,700.00', icon: featureIcons.wallet, iconBackgroundColor: '#F59E0B' },
];

export const assetItems: AccountItem[] = [
  { title: '招商银行储蓄卡', amount: '8,900.00', icon: featureIcons.wallet, iconBackgroundColor: '#EF4444' },
  { title: '微信钱包', amount: '6,823.50', icon: featureIcons.wallet, iconBackgroundColor: '#22C55E' },
  { title: '支付宝', amount: '12,650.00', icon: featureIcons.wallet, iconBackgroundColor: '#3B82F6' },
  { title: '余额宝', amount: '2,700.00', icon: featureIcons.wallet, iconBackgroundColor: '#F59E0B' },
];

export const mineMenuItems: MenuItem[] = [
  { title: '账本管理', icon: featureIcons.report, iconTint: '#64748B' },
  { title: '分类管理', icon: featureIcons.shop, iconTint: '#64748B' },
  { title: '标签管理', icon: featureIcons.tag, iconTint: '#64748B' },
  { title: '定期记账', icon: featureIcons.calendar, iconTint: '#64748B' },
  { title: '数据备份', icon: featureIcons.backup, iconTint: '#64748B' },
  { title: '导出数据', icon: featureIcons.export, iconTint: '#64748B' },
  { title: '设置', icon: featureIcons.settings, iconTint: '#64748B' },
  { title: '帮助与反馈', icon: featureIcons.home, iconTint: '#64748B' },
  { title: '关于轻账本', icon: featureIcons.report, iconTint: '#64748B' },
];

export const addRecordCategories = [
  { key: 'food', title: '餐饮', icon: featureIcons.food, backgroundColor: '#22C55E', iconTint: '#FFFFFF' },
  { key: 'car', title: '交通', icon: featureIcons.car, backgroundColor: '#FFFFFF', iconTint: '#111827' },
  { key: 'shop', title: '购物', icon: featureIcons.shop, backgroundColor: '#FFFFFF', iconTint: '#111827' },
  { key: 'home', title: '住房', icon: featureIcons.home, backgroundColor: '#FFFFFF', iconTint: '#111827' },
  { key: 'chart', title: '娱乐', icon: featureIcons.chart, backgroundColor: '#FFFFFF', iconTint: '#111827' },
  { key: 'medical', title: '医疗', icon: featureIcons.medical, backgroundColor: '#FFFFFF', iconTint: '#111827' },
  { key: 'study', title: '学习', icon: featureIcons.study, backgroundColor: '#FFFFFF', iconTint: '#111827' },
  { key: 'user', title: '更多', icon: featureIcons.user, backgroundColor: '#FFFFFF', iconTint: '#111827' },
] as const;

export const keypadRows = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['.', '0', 'delete'],
] as const;
