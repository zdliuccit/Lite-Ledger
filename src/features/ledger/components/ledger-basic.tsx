import { ReactNode } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';

type LedgerCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type LedgerPageHeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
};

type LedgerSegmentedTabsProps<T extends string> = {
  options: { key: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

type LedgerProgressBarProps = {
  progress: number;
  color?: string;
  trackColor?: string;
  height?: number;
};

type LedgerPrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  inverted?: boolean;
};

type LedgerIconActionProps = {
  icon: ImageSourcePropType;
  label: string;
  backgroundColor: string;
  iconTint?: string;
  onPress?: () => void;
};

export function LedgerCard({ children, style }: LedgerCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function LedgerPageHeader({ title, subtitle, rightSlot }: LedgerPageHeaderProps) {
  return (
    <View style={styles.pageHeader}>
      <View style={styles.headerCopy}>
        <Text style={styles.pageTitle}>{title}</Text>
        {subtitle ? <Text style={styles.pageSubtitle}>{subtitle}</Text> : null}
      </View>
      {rightSlot ? <View>{rightSlot}</View> : null}
    </View>
  );
}

export function LedgerHeaderAction({
  icon,
  onPress,
  label,
}: {
  icon?: ImageSourcePropType;
  onPress?: () => void;
  label?: string;
}) {
  return (
    <Pressable onPress={onPress} style={styles.headerAction}>
      {icon ? <Image source={icon} style={styles.headerActionIcon} resizeMode="contain" /> : null}
      {label ? <Text style={styles.headerActionLabel}>{label}</Text> : null}
    </Pressable>
  );
}

export function LedgerSegmentedTabs<T extends string>({
  options,
  value,
  onChange,
}: LedgerSegmentedTabsProps<T>) {
  return (
    <View style={styles.segmentedContainer}>
      {options.map((option) => {
        const isActive = option.key === value;
        return (
          <Pressable
            key={option.key}
            onPress={() => onChange(option.key)}
            style={[styles.segmentedButton, isActive ? styles.segmentedButtonActive : null]}>
            <Text style={[styles.segmentedLabel, isActive ? styles.segmentedLabelActive : null]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function LedgerProgressBar({
  progress,
  color = ledgerColors.brandGreen,
  trackColor = ledgerColors.divider,
  height = 10,
}: LedgerProgressBarProps) {
  return (
    <View style={[styles.progressTrack, { height, backgroundColor: trackColor }]}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${Math.min(100, Math.max(0, progress * 100))}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

export function LedgerPrimaryButton({
  label,
  onPress,
  inverted = false,
}: LedgerPrimaryButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.primaryButton, inverted ? styles.secondaryButton : null]}>
      <Text style={[styles.primaryButtonLabel, inverted ? styles.secondaryButtonLabel : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function LedgerIconAction({
  icon,
  label,
  backgroundColor,
  iconTint = '#FFFFFF',
  onPress,
}: LedgerIconActionProps) {
  return (
    <Pressable onPress={onPress} style={styles.iconAction}>
      <View style={[styles.iconActionBadge, { backgroundColor }]}>
        <Image source={icon} resizeMode="contain" style={[styles.iconActionIcon, { tintColor: iconTint }]} />
      </View>
      <Text style={styles.iconActionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ledgerColors.cardBackground,
    borderRadius: 28,
    padding: ledgerLayout.pageHorizontalPadding,
    shadowColor: ledgerColors.shadowColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 6,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: ledgerLayout.pageHorizontalPadding,
    paddingTop: 12,
  },
  headerCopy: {
    gap: 8,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  pageSubtitle: {
    fontSize: 18,
    color: ledgerColors.primaryText,
  },
  headerAction: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  headerActionIcon: {
    width: 24,
    height: 24,
    tintColor: ledgerColors.primaryText,
  },
  headerActionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: ledgerColors.brandGreen,
  },
  segmentedContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: ledgerLayout.pageHorizontalPadding,
  },
  segmentedButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#EEF2F7',
  },
  segmentedButtonActive: {
    backgroundColor: ledgerColors.brandGreen,
  },
  segmentedLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: ledgerColors.secondaryText,
  },
  segmentedLabelActive: {
    color: '#FFFFFF',
  },
  progressTrack: {
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    minHeight: 58,
    backgroundColor: ledgerColors.brandGreen,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: ledgerColors.brandGreen,
  },
  primaryButtonLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  secondaryButtonLabel: {
    color: ledgerColors.brandGreen,
  },
  iconAction: {
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconActionBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActionIcon: {
    width: 28,
    height: 28,
  },
  iconActionLabel: {
    fontSize: 15,
    color: ledgerColors.primaryText,
  },
});
