import { Href, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import { LedgerCard, LedgerPageHeader } from '../components/ledger-basic';
import { LedgerMenuRow } from '../components/ledger-lists';
import LedgerPage from '../components/ledger-page';
import { mineMenuItems } from '../ledger-mock-data';

export default function MinePage() {
  const router = useRouter();

  return (
    <LedgerPage header={<LedgerPageHeader title="我的" />}>
      <View style={styles.pageContent}>
        <View style={styles.userCard}>
          <View style={styles.avatar} />
          <View style={styles.userCopy}>
            <Text style={styles.userName}>小清听呀</Text>
            <Text style={styles.userId}>ID：12345678</Text>
          </View>
          <View style={styles.vipButton}>
            <Text style={styles.vipLabel}>会员中心</Text>
          </View>
        </View>

        <LedgerCard>
          <View style={styles.menuSection}>
            {mineMenuItems.map((item) => (
              <LedgerMenuRow
                key={item.title}
                icon={item.icon}
                iconTint={item.iconTint}
                title={item.title}
                onPress={
                  item.title === '账本管理'
                    ? () => router.push('/accounts' as Href)
                    : item.title === '分类管理'
                      ? () => router.push('/budget' as Href)
                      : item.title === '标签管理'
                        ? () => router.push('/report' as Href)
                        : undefined
                }
              />
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
  userCard: {
    marginHorizontal: ledgerLayout.pageHorizontalPadding,
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: ledgerColors.brandGreen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#DDFCE7',
  },
  userCopy: {
    flex: 1,
    gap: 6,
  },
  userName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  userId: {
    fontSize: 18,
    color: '#DCFCE7',
  },
  vipButton: {
    borderRadius: 24,
    backgroundColor: '#FDE68A',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  vipLabel: {
    fontSize: 16,
    color: '#B45309',
    fontWeight: '700',
  },
  menuSection: {
    gap: 0,
  },
});
