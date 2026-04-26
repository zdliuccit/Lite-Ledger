import { StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import { LedgerCard, LedgerPageHeader, LedgerPrimaryButton } from '../components/ledger-basic';
import { LedgerLineChart } from '../components/ledger-charts';
import { LedgerRecordRow } from '../components/ledger-lists';
import LedgerPage from '../components/ledger-page';
import { assetItems } from '../ledger-mock-data';

export default function AssetsPage() {
  return (
    <LedgerPage
      header={<LedgerPageHeader title="资产" />}
      bottomSlot={<LedgerPrimaryButton label="+ 添加账户" inverted />}>
      <View style={styles.pageContent}>
        <LedgerCard>
          <Text style={styles.sectionTitle}>资产总览</Text>
          <View style={styles.chartSpacing}>
            <LedgerLineChart
              values={[40, 36, 46, 39, 43, 33, 38, 31, 36, 43, 40, 55, 49, 61]}
              color={ledgerColors.assetBlue}
            />
          </View>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.label}>总资产</Text>
              <Text style={styles.amount}>52,300.00</Text>
            </View>
            <View>
              <Text style={styles.label}>总负债</Text>
              <Text style={styles.amount}>8,200.00</Text>
            </View>
            <View>
              <Text style={[styles.label, styles.netAssetLabel]}>净资产</Text>
              <Text style={[styles.amount, styles.netAssetAmount]}>44,100.00</Text>
            </View>
          </View>
        </LedgerCard>

        <LedgerCard>
          <Text style={styles.sectionTitle}>资产明细</Text>
          <View style={styles.listContainer}>
            {assetItems.map((item, index) => (
              <View key={item.title} style={index < assetItems.length - 1 ? styles.divider : undefined}>
                <LedgerRecordRow
                  icon={item.icon}
                  iconBackgroundColor={item.iconBackgroundColor}
                  title={item.title}
                  subtitle="资产账户"
                  amount={item.amount}
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  chartSpacing: {
    marginTop: 14,
  },
  summaryRow: {
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
    fontSize: 18,
    color: ledgerColors.primaryText,
    fontWeight: '700',
  },
  netAssetLabel: {
    color: ledgerColors.brandGreen,
  },
  netAssetAmount: {
    color: ledgerColors.brandGreen,
  },
  listContainer: {
    marginTop: 18,
    gap: 18,
  },
  divider: {
    paddingBottom: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ledgerColors.divider,
  },
});
