import { ReactNode, useState } from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import { getMainTabBarHeight } from '../layout-metrics';

type LedgerPageProps = {
  header?: ReactNode;
  children: ReactNode;
  bottomSlot?: ReactNode;
  scrollable?: boolean;
  reserveMainTabBarSpace?: boolean;
  handleTopSafeArea?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  pageStyle?: StyleProp<ViewStyle>;
  extraBottomSpacing?: number;
};

export default function LedgerPage({
  header,
  children,
  bottomSlot,
  scrollable = true,
  reserveMainTabBarSpace = true,
  handleTopSafeArea = true,
  contentContainerStyle,
  contentStyle,
  pageStyle,
  extraBottomSpacing = ledgerLayout.pageBottomBreathingSpace,
}: LedgerPageProps) {
  const insets = useSafeAreaInsets();
  const [bottomSlotHeight, setBottomSlotHeight] = useState(0);

  const topPadding = handleTopSafeArea ? insets.top : 0;
  const mainTabBarSpace = reserveMainTabBarSpace ? getMainTabBarHeight(insets.bottom) : 0;
  const pageBottomSpacing = reserveMainTabBarSpace
    ? mainTabBarSpace + extraBottomSpacing
    : Math.max(insets.bottom, ledgerLayout.pageBottomBreathingSpace) + extraBottomSpacing;
  const contentBottomPadding = bottomSlot
    ? pageBottomSpacing + bottomSlotHeight + ledgerLayout.pageSectionGap
    : pageBottomSpacing;

  const handleBottomSlotLayout = (event: LayoutChangeEvent) => {
    setBottomSlotHeight(event.nativeEvent.layout.height);
  };

  const contentNode = (
    <View
      style={[
        styles.contentContainer,
        contentContainerStyle,
        {
          paddingTop: topPadding,
          paddingBottom: contentBottomPadding,
        },
      ]}>
      {header ? <View style={styles.headerContainer}>{header}</View> : null}
      <View style={[styles.contentArea, contentStyle]}>{children}</View>
    </View>
  );

  return (
    <View style={[styles.page, pageStyle]}>
      {scrollable ? (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContentContainer}>
          {contentNode}
        </ScrollView>
      ) : (
        contentNode
      )}

      {bottomSlot ? (
        <View
          pointerEvents="box-none"
          style={[
            styles.bottomSlotOuter,
            {
              bottom: reserveMainTabBarSpace ? mainTabBarSpace : 0,
              paddingBottom: reserveMainTabBarSpace
                ? 0
                : Math.max(insets.bottom, ledgerLayout.pageBottomBreathingSpace),
            },
          ]}>
          <View onLayout={handleBottomSlotLayout} style={styles.bottomSlotInner}>
            {bottomSlot}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: ledgerColors.pageBackground,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: ledgerLayout.pageSectionGap,
  },
  contentArea: {
    flex: 1,
  },
  bottomSlotOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: ledgerLayout.pageHorizontalPadding,
  },
  bottomSlotInner: {
    width: '100%',
  },
});
