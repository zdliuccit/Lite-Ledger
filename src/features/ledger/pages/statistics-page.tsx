import { StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import { LedgerCard, LedgerPageHeader } from '../components/ledger-basic';
import { LedgerBarChart, LedgerRankingBars } from '../components/ledger-charts';
import LedgerPage from '../components/ledger-page';
import { statisticsCategories } from '../ledger-mock-data';

export default function StatisticsPage() {
  return (
    <LedgerPage header={<LedgerPageHeader title="统计" subtitle="2026年4月" />}>
      <View style={styles.pageContent}>
        <LedgerCard>
          <Text style={styles.sectionTitle}>支出占比</Text>
          <View style={styles.summarySection}>
            <View style={styles.ringPlaceholder}>
              <Text style={styles.ringValue}>4,230</Text>
              <Text style={styles.ringLabel}>总支出</Text>
            </View>
            <View style={styles.statisticsList}>
              {statisticsCategories.map((item) => (
                <View key={item.title} style={styles.statisticsRow}>
                  <View style={styles.statisticsLeft}>
                    <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                    <Text style={styles.statisticsTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.statisticsAmount}>{item.amount}</Text>
                  <Text style={styles.statisticsPercentage}>{item.percentage}</Text>
                </View>
              ))}
            </View>
          </View>
        </LedgerCard>

        <LedgerCard>
          <Text style={styles.sectionTitle}>支出趋势</Text>
          <LedgerBarChart
            values={[24, 16, 31, 18, 39, 22, 33, 24, 44, 20, 36, 26, 48, 34]}
            labels={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']}
          />
        </LedgerCard>

        <LedgerCard>
          <Text style={styles.sectionTitle}>支出排行榜</Text>
          <View style={styles.rankingSpacing}>
            <LedgerRankingBars
              items={statisticsCategories.map((item, index) => ({
                title: item.title,
                value: item.amount,
                ratio: [0.63, 0.54, 0.4, 0.33, 0.24][index] ?? 0.2,
                color: item.color,
              }))}
            />
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: ledgerColors.primaryText,
    marginBottom: 18,
  },
  summarySection: {
    flexDirection: 'row',
    gap: 18,
  },
  ringPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 16,
    borderColor: ledgerColors.brandGreen,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  ringValue: {
    fontSize: 22,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  ringLabel: {
    fontSize: 16,
    color: ledgerColors.primaryText,
  },
  statisticsList: {
    flex: 1,
    gap: 14,
    justifyContent: 'center',
  },
  statisticsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statisticsLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statisticsTitle: {
    fontSize: 16,
    color: ledgerColors.primaryText,
  },
  statisticsAmount: {
    width: 86,
    textAlign: 'right',
    fontSize: 16,
    color: ledgerColors.secondaryText,
  },
  statisticsPercentage: {
    width: 54,
    textAlign: 'right',
    fontSize: 16,
    color: ledgerColors.secondaryText,
  },
  rankingSpacing: {
    marginTop: 6,
  },
});
