import { StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import { LedgerCard, LedgerPageHeader, LedgerProgressBar } from '../components/ledger-basic';
import LedgerPage from '../components/ledger-page';
import { budgetCategories } from '../ledger-mock-data';

export default function BudgetPage() {
  return (
    <LedgerPage header={<LedgerPageHeader title="预算" subtitle="2026年4月" />}>
      <View style={styles.pageContent}>
        <LedgerCard>
          <View style={styles.budgetOverview}>
            <View style={styles.budgetOverviewLeft}>
              <Text style={styles.sectionTitle}>月度预算</Text>
              <Text style={styles.heroAmount}>6,000.00</Text>
              <View style={styles.progressWrap}>
                <LedgerProgressBar progress={0.7} />
              </View>
              <View style={styles.budgetSummaryRow}>
                <Text style={styles.budgetSummaryText}>已使用 4,230.00</Text>
                <Text style={styles.budgetSummaryText}>剩余 1,770.00</Text>
              </View>
            </View>
            <View style={styles.percentageRing}>
              <Text style={styles.percentageText}>70%</Text>
            </View>
          </View>
        </LedgerCard>

        <LedgerCard>
          <Text style={styles.sectionTitle}>分类预算</Text>
          <View style={styles.categoryBudgetList}>
            {budgetCategories.map((item) => (
              <View key={item.title} style={styles.categoryBudgetItem}>
                <View style={styles.categoryBudgetHeader}>
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                  <Text style={styles.amountText}>{item.budgetAmount}</Text>
                  <Text style={styles.categorySpentText}>已用 {item.spentAmount}</Text>
                </View>
                <View style={styles.categoryProgressRow}>
                  <LedgerProgressBar progress={item.progress} color={item.color} />
                  <Text style={[styles.progressText, { color: item.color }]}>
                    {Math.round(item.progress * 100)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </LedgerCard>

        <LedgerCard>
          <Text style={styles.sectionTitle}>预算提醒</Text>
          <Text style={styles.noticeText}>
            餐饮预算已使用83%，剩余255.00元，建议接下来每天控制在36.00元以内。
          </Text>
        </LedgerCard>
      </View>
    </LedgerPage>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    gap: ledgerLayout.pageSectionGap,
  },
  budgetOverview: {
    flexDirection: 'row',
    gap: 18,
  },
  budgetOverviewLeft: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  heroAmount: {
    marginTop: 18,
    fontSize: 44,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  progressWrap: {
    marginTop: 22,
  },
  budgetSummaryRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetSummaryText: {
    fontSize: 16,
    color: ledgerColors.secondaryText,
  },
  percentageRing: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 12,
    borderColor: ledgerColors.brandGreen,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  percentageText: {
    fontSize: 26,
    fontWeight: '800',
    color: ledgerColors.brandGreen,
  },
  categoryBudgetList: {
    marginTop: 18,
    gap: 22,
  },
  categoryBudgetItem: {
    gap: 12,
  },
  categoryBudgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    flex: 1,
    fontSize: 18,
    color: ledgerColors.primaryText,
  },
  amountText: {
    width: 96,
    fontSize: 18,
    color: ledgerColors.primaryText,
  },
  categorySpentText: {
    width: 110,
    textAlign: 'right',
    fontSize: 16,
    color: ledgerColors.secondaryText,
  },
  categoryProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressText: {
    width: 42,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '700',
  },
  noticeText: {
    marginTop: 16,
    fontSize: 17,
    lineHeight: 28,
    color: ledgerColors.primaryText,
  },
});
