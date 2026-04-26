import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SizableText, XStack, YStack } from 'tamagui';

import { ledgerColors, ledgerLayout, ledgerRadius } from '../../../theme/ledger-theme';
import { getMainTabBarHeight } from '../layout-metrics';
import { useGoToMainTab } from '../main-tab-navigation';
import { mainTabConfig } from '../navigation-config';
import type { MainTabKey } from '../types';

type LedgerBottomTabBarProps = {
  activeTab: MainTabKey;
};

export default function LedgerBottomTabBar({ activeTab }: LedgerBottomTabBarProps) {
  const goToMainTab = useGoToMainTab();
  const insets = useSafeAreaInsets();
  const bottomSafePadding = Math.max(insets.bottom, ledgerLayout.tabBarMinSafePadding);
  const tabBarHeight = getMainTabBarHeight(insets.bottom);

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottomSafePadding,
          height: tabBarHeight,
        },
      ]}>
      <XStack style={styles.contentRow}>
        {mainTabConfig.map((tab) => {
          const isActive = tab.key === activeTab;
          const iconTint =
            tab.key === 'add-record'
              ? undefined
              : isActive
                ? ledgerColors.brandGreen
                : ledgerColors.tabInactive;
          const textColor = isActive ? ledgerColors.brandGreen : ledgerColors.tabInactive;

          return (
            <Pressable
              key={tab.key}
              accessibilityRole="button"
              accessibilityLabel={`切换到${tab.label}`}
              onPress={() => {
                goToMainTab(tab.key);
              }}
              style={styles.tabButton}>
              <YStack style={styles.tabContent}>
                <Image
                  source={tab.icon}
                  resizeMode="contain"
                  style={[styles.tabIcon, iconTint ? { tintColor: iconTint } : null]}
                />
                <SizableText size="$3" color={textColor} fontWeight={isActive ? '700' : '500'}>
                  {tab.label}
                </SizableText>
              </YStack>
            </Pressable>
          );
        })}
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ledgerColors.cardBackground,
    shadowColor: ledgerColors.shadowColor,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 18,
    borderTopLeftRadius: ledgerRadius.tabBarRadius,
    borderTopRightRadius: ledgerRadius.tabBarRadius,
    overflow: 'hidden',
  },
  contentRow: {
    height: ledgerLayout.tabBarVisualHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ledgerLayout.tabBarHorizontalPadding,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: ledgerColors.divider,
  },
  tabButton: {
    flex: 1,
    height: '100%',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  tabIcon: {
    width: ledgerLayout.tabBarIconSize,
    height: ledgerLayout.tabBarIconSize,
  },
});
