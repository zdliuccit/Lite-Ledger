import { StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import { featureIcons } from '../design-assets';
import { LedgerCard, LedgerHeaderAction, LedgerPageHeader } from '../components/ledger-basic';
import { LedgerRecordRow } from '../components/ledger-lists';
import LedgerPage from '../components/ledger-page';
import { billGroups } from '../ledger-mock-data';

export default function BillsPage() {
  return (
    <LedgerPage
      header={
        <LedgerPageHeader
          title="账单"
          subtitle="2026年4月"
          rightSlot={<LedgerHeaderAction icon={featureIcons.search} />}
        />
      }>
      <View style={styles.pageContent}>
        <LedgerCard>
          <View style={styles.summaryCard}>
            <View>
              <Text style={styles.label}>支出</Text>
              <Text style={styles.amount}>4,230.00</Text>
            </View>
            <View>
              <Text style={styles.label}>收入</Text>
              <Text style={styles.amount}>8,000.00</Text>
            </View>
          </View>
        </LedgerCard>

        {billGroups.map((group) => (
          <View key={group.dateTitle} style={styles.groupBlock}>
            <Text style={styles.dateTitle}>{group.dateTitle}</Text>
            <LedgerCard>
              <View style={styles.billList}>
                {group.records.map((record, index) => (
                  <View
                    key={`${group.dateTitle}-${record.title}-${index}`}
                    style={index < group.records.length - 1 ? styles.billDivider : undefined}>
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
        ))}
      </View>
    </LedgerPage>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    gap: ledgerLayout.pageSectionGap,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: ledgerColors.secondaryText,
    marginBottom: 12,
  },
  amount: {
    fontSize: 32,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  groupBlock: {
    gap: 14,
  },
  dateTitle: {
    paddingHorizontal: ledgerLayout.pageHorizontalPadding,
    fontSize: 28,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  billList: {
    gap: 18,
  },
  billDivider: {
    paddingBottom: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ledgerColors.divider,
  },
});
