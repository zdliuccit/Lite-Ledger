import { Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import { featureIcons } from '../design-assets';
import {
  LedgerCard,
  LedgerHeaderAction,
  LedgerIconAction,
  LedgerPageHeader,
  LedgerProgressBar,
} from '../components/ledger-basic';
import { LedgerLineChart } from '../components/ledger-charts';
import { LedgerRecordRow } from '../components/ledger-lists';
import LedgerPage from '../components/ledger-page';
import { homeQuickActions, recentBillRecords } from '../ledger-mock-data';

export default function HomePage() {
  const router = useRouter();

  return (
    <LedgerPage
      header={
        <LedgerPageHeader
          title="首页"
          subtitle="2026年4月"
          rightSlot={
            <LedgerHeaderAction
              icon={featureIcons.asset}
              onPress={() => router.push('/assets' as Href)}
            />
          }
        />
      }>
      <View style={styles.pageContent}>
        <LedgerCard>
          <View style={styles.summaryHeader}>
            <View style={styles.summaryCopy}>
              <Text style={styles.cardLabel}>本月支出(元)</Text>
              <Text style={styles.heroAmount}>4,230.00</Text>
            </View>
            <View style={styles.assetBadge}>
              <Pressable onPress={() => router.push('/assets' as Href)} style={styles.assetButton}>
                <Text style={styles.assetButtonLabel}>资产</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.dualMetricRow}>
            <View>
              <Text style={styles.metricLabel}>本月收入</Text>
              <Text style={styles.metricValue}>8,000.00</Text>
            </View>
            <View>
              <Text style={styles.metricLabel}>预算剩余</Text>
              <Text style={styles.metricValue}>1,770.00</Text>
            </View>
          </View>
        </LedgerCard>

        <View style={styles.quickActionsRow}>
          {homeQuickActions.map((item) => (
            <LedgerIconAction
              key={item.title}
              icon={item.icon}
              label={item.title}
              backgroundColor={item.backgroundColor}
              iconTint={item.iconTint}
              onPress={() => router.push(item.route as Href)}
            />
          ))}
        </View>

        <LedgerCard>
          <Text style={styles.sectionTitle}>预算进度</Text>
          <Text style={styles.sectionSubtitle}>月度预算 6,000.00</Text>
          <View style={styles.progressWrap}>
            <LedgerProgressBar progress={0.7} />
            <Text style={styles.progressPercent}>70%</Text>
          </View>
        </LedgerCard>

        <Pressable onPress={() => router.push('/statistics' as Href)}>
          <LedgerCard>
            <Text style={styles.sectionTitle}>支出趋势</Text>
            <View style={styles.chartSpacing}>
              <LedgerLineChart values={[28, 20, 34, 26, 41, 30, 48, 36, 56, 44, 62, 51]} />
            </View>
          </LedgerCard>
        </Pressable>

        <LedgerCard>
          <Text style={styles.sectionTitle}>最近账单</Text>
          <View style={styles.recordList}>
            {recentBillRecords.map((record, index) => (
              <View
                key={`${record.title}-${index}`}
                style={index < recentBillRecords.length - 1 ? styles.recordDivider : undefined}>
                <LedgerRecordRow
                  icon={record.icon}
                  iconBackgroundColor={record.iconBackgroundColor}
                  iconTint={record.iconTint}
                  title={record.title}
                  subtitle={`${record.category} · ${record.channel}`}
                  amount={record.amount}
                  isPositive={record.isPositive}
                />
              </View>
            ))}
          </View>
        </LedgerCard>
      </View>
    </LedgerPage>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    gap: ledgerLayout.pageSectionGap,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  summaryCopy: {
    flex: 1,
    gap: 10,
  },
  cardLabel: {
    fontSize: 16,
    color: ledgerColors.secondaryText,
  },
  heroAmount: {
    fontSize: 48,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  assetBadge: {
    justifyContent: 'center',
  },
  assetButton: {
    borderRadius: 18,
    backgroundColor: '#E8FFF0',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  assetButtonLabel: {
    fontSize: 15,
    color: ledgerColors.brandGreen,
    fontWeight: '700',
  },
  dualMetricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  metricLabel: {
    fontSize: 15,
    color: ledgerColors.primaryText,
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: ledgerColors.primaryText,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: ledgerColors.secondaryText,
    marginTop: 8,
    marginBottom: 14,
  },
  progressWrap: {
    gap: 12,
  },
  progressPercent: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: ledgerColors.brandGreen,
    fontWeight: '700',
  },
  chartSpacing: {
    marginTop: 16,
  },
  recordList: {
    marginTop: 18,
    gap: 18,
  },
  recordDivider: {
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ledgerColors.divider,
  },
});
