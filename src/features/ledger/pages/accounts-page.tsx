import { Href, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import { LedgerCard, LedgerHeaderAction, LedgerPageHeader } from '../components/ledger-basic';
import { LedgerRecordRow } from '../components/ledger-lists';
import LedgerPage from '../components/ledger-page';
import { accountItems } from '../ledger-mock-data';

export default function AccountsPage() {
  const router = useRouter();

  return (
    <LedgerPage
      header={
        <LedgerPageHeader
          title="账户"
          rightSlot={
            <LedgerHeaderAction
              label="管理"
              onPress={() => router.push('/assets' as Href)}
            />
          }
        />
      }>
      <View style={styles.pageContent}>
        <LedgerCard>
          <View style={styles.headerSummary}>
            <View style={styles.headerLeft}>
              <Text style={styles.label}>净资产(元)</Text>
              <Text style={styles.heroAmount}>44,100.00</Text>
              <View style={styles.dualSummary}>
                <View>
                  <Text style={styles.summaryLabel}>总资产</Text>
                  <Text style={styles.summaryValue}>52,300.00</Text>
                </View>
                <View>
                  <Text style={styles.summaryLabel}>总负债</Text>
                  <Text style={styles.summaryValue}>8,200.00</Text>
                </View>
              </View>
            </View>
            <View style={styles.ringWrap}>
              <View style={styles.outerRing}>
                <View style={styles.innerRing} />
              </View>
            </View>
          </View>
        </LedgerCard>

        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>我的账户</Text>
        </View>

        <LedgerCard>
          <View style={styles.listContainer}>
            {accountItems.map((item, index) => (
              <View key={item.title} style={index < accountItems.length - 1 ? styles.divider : undefined}>
                <LedgerRecordRow
                  icon={item.icon}
                  iconBackgroundColor={item.iconBackgroundColor}
                  title={item.title}
                  subtitle="可用余额"
                  amount={item.amount}
                  showChevron
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
  headerSummary: {
    flexDirection: 'row',
    gap: 14,
  },
  headerLeft: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: ledgerColors.secondaryText,
  },
  heroAmount: {
    marginTop: 18,
    fontSize: 54,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  dualSummary: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 15,
    color: ledgerColors.primaryText,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    color: ledgerColors.primaryText,
    fontWeight: '700',
  },
  ringWrap: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 16,
    borderColor: ledgerColors.brandGreen,
    borderRightColor: ledgerColors.accentCyan,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
  },
  sectionTitleWrap: {
    paddingHorizontal: ledgerLayout.pageHorizontalPadding,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  listContainer: {
    gap: 18,
  },
  divider: {
    paddingBottom: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ledgerColors.divider,
  },
});
