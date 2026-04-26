import { useState } from 'react';
import { Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import {
  LedgerCard,
  LedgerPageHeader,
  LedgerPrimaryButton,
  LedgerSegmentedTabs,
} from '../components/ledger-basic';
import { LedgerBarChart } from '../components/ledger-charts';
import LedgerPage from '../components/ledger-page';

type ReportDimension = 'month' | 'year' | 'custom';

const reportOptions: { key: ReportDimension; label: string }[] = [
  { key: 'month', label: '月报' },
  { key: 'year', label: '年报' },
  { key: 'custom', label: '自定义' },
];

export default function ReportPage() {
  const [dimension, setDimension] = useState<ReportDimension>('month');
  const router = useRouter();

  return (
    <LedgerPage
      header={<LedgerPageHeader title="报表" />}
      bottomSlot={<LedgerPrimaryButton label="分享账单" />}>
      <View style={styles.pageContent}>
        <LedgerSegmentedTabs options={reportOptions} value={dimension} onChange={setDimension} />

        <LedgerCard>
          <Text style={styles.sectionTitle}>2026年4月账单</Text>
          <View style={styles.metricRow}>
            <View>
              <Text style={styles.label}>收入</Text>
              <Text style={styles.amount}>8,000.00</Text>
            </View>
            <View>
              <Text style={styles.label}>支出</Text>
              <Text style={styles.amount}>4,230.00</Text>
            </View>
            <View>
              <Text style={[styles.label, styles.balanceLabel]}>结余</Text>
              <Text style={[styles.amount, styles.balanceAmount]}>3,770.00</Text>
            </View>
          </View>

          <Text style={styles.summaryText}>
            本月支出比上月增加18%，主要增加在餐饮和娱乐方面。
          </Text>

          <View style={styles.insightSection}>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>支出最高</Text>
              <Text style={styles.insightContent}>餐饮</Text>
              <Text style={styles.insightValue}>1,280.00</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>增长最多</Text>
              <Text style={styles.insightContent}>娱乐</Text>
              <Text style={styles.insightValue}>+42%</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightLabel}>节省最多</Text>
              <Text style={styles.insightContent}>购物</Text>
              <Text style={styles.insightValue}>-12%</Text>
            </View>
          </View>
        </LedgerCard>

        <Pressable onPress={() => router.push('/statistics' as Href)}>
          <LedgerCard>
            <Text style={styles.sectionTitle}>月度趋势</Text>
            <LedgerBarChart
              values={[26, 34, 30, 36, 28, 34]}
              labels={['1月', '2月', '3月', '4月', '5月', '6月']}
              activeIndex={3}
            />
          </LedgerCard>
        </Pressable>
      </View>
    </LedgerPage>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    gap: ledgerLayout.pageSectionGap,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  metricRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 15,
    color: ledgerColors.primaryText,
    marginBottom: 6,
  },
  amount: {
    fontSize: 20,
    color: ledgerColors.primaryText,
    fontWeight: '700',
  },
  balanceLabel: {
    color: ledgerColors.brandGreen,
  },
  balanceAmount: {
    color: ledgerColors.brandGreen,
  },
  summaryText: {
    marginTop: 24,
    fontSize: 17,
    lineHeight: 28,
    color: ledgerColors.primaryText,
  },
  insightSection: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
  },
  insightCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ledgerColors.divider,
    alignItems: 'center',
    gap: 8,
  },
  insightLabel: {
    fontSize: 15,
    color: ledgerColors.secondaryText,
  },
  insightContent: {
    fontSize: 18,
    fontWeight: '700',
    color: ledgerColors.primaryText,
  },
  insightValue: {
    fontSize: 16,
    color: ledgerColors.primaryText,
  },
});
