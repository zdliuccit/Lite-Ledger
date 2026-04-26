import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { ledgerColors } from '../../../theme/ledger-theme';

type LedgerRecordRowProps = {
  icon: ImageSourcePropType;
  iconBackgroundColor: string;
  title: string;
  subtitle: string;
  amount: string;
  iconTint?: string;
  isPositive?: boolean;
  showChevron?: boolean;
  onPress?: () => void;
};

type LedgerMenuRowProps = {
  icon: ImageSourcePropType;
  title: string;
  iconTint?: string;
  onPress?: () => void;
};

export function LedgerRecordRow({
  icon,
  iconBackgroundColor,
  title,
  subtitle,
  amount,
  iconTint = '#FFFFFF',
  isPositive = false,
  showChevron = false,
  onPress,
}: LedgerRecordRowProps) {
  const RowComponent = onPress ? Pressable : View;

  return (
    <RowComponent onPress={onPress} style={styles.recordRow}>
      <View style={styles.recordLeft}>
        <View style={[styles.iconBadge, { backgroundColor: iconBackgroundColor }]}>
          <Image source={icon} resizeMode="contain" style={[styles.icon, { tintColor: iconTint }]} />
        </View>
        <View style={styles.recordCopy}>
          <Text style={styles.recordTitle}>{title}</Text>
          <Text style={styles.recordSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.recordRight}>
        <Text style={[styles.recordAmount, isPositive ? styles.positiveAmount : null]}>{amount}</Text>
        {showChevron ? <Text style={styles.chevron}>{'›'}</Text> : null}
      </View>
    </RowComponent>
  );
}

export function LedgerMenuRow({
  icon,
  title,
  iconTint = '#64748B',
  onPress,
}: LedgerMenuRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.menuRow}>
      <View style={styles.menuLeft}>
        <Image source={icon} resizeMode="contain" style={[styles.menuIcon, { tintColor: iconTint }]} />
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <Text style={styles.chevron}>{'›'}</Text>
    </Pressable>
  );
}

export function LedgerKeyValueRow({
  leftLabel,
  rightValue,
}: {
  leftLabel: string;
  rightValue: string;
}) {
  return (
    <View style={styles.keyValueRow}>
      <Text style={styles.keyLabel}>{leftLabel}</Text>
      <Text style={styles.valueLabel}>{rightValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  recordLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  recordCopy: {
    flex: 1,
    gap: 2,
  },
  recordTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: ledgerColors.primaryText,
  },
  recordSubtitle: {
    fontSize: 15,
    color: ledgerColors.secondaryText,
  },
  recordRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recordAmount: {
    fontSize: 17,
    color: ledgerColors.primaryText,
  },
  positiveAmount: {
    color: ledgerColors.brandGreen,
  },
  chevron: {
    fontSize: 28,
    lineHeight: 28,
    color: '#94A3B8',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 58,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ledgerColors.divider,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
  menuTitle: {
    fontSize: 17,
    color: ledgerColors.primaryText,
  },
  keyValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ledgerColors.divider,
  },
  keyLabel: {
    fontSize: 16,
    color: ledgerColors.secondaryText,
  },
  valueLabel: {
    fontSize: 16,
    color: ledgerColors.primaryText,
    fontWeight: '600',
  },
});
