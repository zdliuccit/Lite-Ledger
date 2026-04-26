import { Slot, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ledgerColors } from '../../../theme/ledger-theme';
import { getMainTabByRoute } from '../route-map';
import LedgerBottomTabBar from './ledger-bottom-tab-bar';

export default function LedgerSharedLayout() {
  const pathname = usePathname();
  const activeTab = getMainTabByRoute(pathname);

  return (
    <View style={styles.page}>
      <Slot />
      <LedgerBottomTabBar activeTab={activeTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: ledgerColors.pageBackground,
  },
});
