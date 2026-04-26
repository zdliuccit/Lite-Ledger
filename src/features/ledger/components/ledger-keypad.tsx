import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { ledgerColors } from '../../../theme/ledger-theme';
import { featureIcons } from '../design-assets';

export default function LedgerKeypad({
  rows,
  onPressKey,
}: {
  rows: readonly (readonly string[])[];
  onPressKey: (key: string) => void;
}) {
  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((keyValue) => (
            <Pressable key={keyValue} onPress={() => onPressKey(keyValue)} style={styles.keyButton}>
              {keyValue === 'delete' ? (
                <Image source={featureIcons.delete} resizeMode="contain" style={styles.deleteIcon} />
              ) : (
                <Text style={styles.keyLabel}>{keyValue}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  keyButton: {
    flex: 1,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ledgerColors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyLabel: {
    fontSize: 22,
    fontWeight: '800',
    color: ledgerColors.primaryText,
  },
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: ledgerColors.primaryText,
  },
});
