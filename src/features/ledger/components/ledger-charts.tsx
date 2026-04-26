import { StyleSheet, Text, View } from 'react-native';

import { ledgerColors } from '../../../theme/ledger-theme';

export function LedgerLineChart({
  values,
  color = ledgerColors.brandGreen,
  height = 180,
}: {
  values: number[];
  color?: string;
  height?: number;
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);

  return (
    <View style={[styles.lineChartContainer, { height }]}>
      <View style={styles.lineChartColumnWrap}>
        {values.map((value, index) => {
          const normalized = (value - min) / range;
          const lineHeight = 32 + normalized * (height - 52);

          return (
            <View key={`column-${index}`} style={styles.lineChartColumn}>
              <View
                style={[
                  styles.lineChartStem,
                  {
                    height: lineHeight,
                    backgroundColor: `${color}22`,
                  },
                ]}
              />
              <View style={[styles.lineChartDot, { backgroundColor: color }]} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function LedgerBarChart({
  values,
  labels,
  activeIndex,
  color = ledgerColors.brandGreen,
}: {
  values: number[];
  labels: string[];
  activeIndex?: number;
  color?: string;
}) {
  const max = Math.max(...values);

  return (
    <View style={styles.barChartContainer}>
      <View style={styles.barChartRow}>
        {values.map((value, index) => (
          <View key={labels[index]} style={styles.barChartColumn}>
            <View
              style={[
                styles.bar,
                {
                  height: 80 + (value / max) * 120,
                  backgroundColor: activeIndex === index ? color : '#CBD5E1',
                },
              ]}
            />
            <Text style={styles.barLabel}>{labels[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function LedgerRankingBars({
  items,
}: {
  items: { title: string; value: string; ratio: number; color: string }[];
}) {
  return (
    <View style={styles.rankingContainer}>
      {items.map((item) => (
        <View key={item.title} style={styles.rankingRow}>
          <Text style={styles.rankingTitle}>{item.title}</Text>
          <View style={styles.rankingMiddle}>
            <View style={styles.rankingTrack}>
              <View
                style={[
                  styles.rankingFill,
                  {
                    width: `${Math.max(10, item.ratio * 100)}%`,
                    backgroundColor: item.color,
                  },
                ]}
              />
            </View>
          </View>
          <Text style={styles.rankingValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  lineChartContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  lineChartColumnWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  lineChartColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  lineChartStem: {
    width: 6,
    borderRadius: 999,
  },
  lineChartDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  barChartContainer: {
    paddingTop: 12,
  },
  barChartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 14,
  },
  barChartColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  bar: {
    width: 28,
    borderRadius: 14,
  },
  barLabel: {
    fontSize: 15,
    color: ledgerColors.secondaryText,
  },
  rankingContainer: {
    gap: 16,
  },
  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rankingTitle: {
    width: 52,
    fontSize: 17,
    color: ledgerColors.primaryText,
  },
  rankingMiddle: {
    flex: 1,
  },
  rankingTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: ledgerColors.divider,
    overflow: 'hidden',
  },
  rankingFill: {
    height: '100%',
    borderRadius: 999,
  },
  rankingValue: {
    width: 92,
    textAlign: 'right',
    fontSize: 17,
    color: ledgerColors.primaryText,
  },
});
