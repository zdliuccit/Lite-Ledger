import { useState } from 'react';
import { Href, useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { ledgerColors, ledgerLayout } from '../../../theme/ledger-theme';
import {
  LedgerCard,
  LedgerPageHeader,
  LedgerPrimaryButton,
  LedgerSegmentedTabs,
} from '../components/ledger-basic';
import LedgerKeypad from '../components/ledger-keypad';
import { LedgerKeyValueRow } from '../components/ledger-lists';
import LedgerPage from '../components/ledger-page';
import { addRecordCategories, keypadRows } from '../ledger-mock-data';

type RecordType = 'expense' | 'income' | 'transfer';

const recordTypeOptions: { key: RecordType; label: string }[] = [
  { key: 'expense', label: '支出' },
  { key: 'income', label: '收入' },
  { key: 'transfer', label: '转账' },
];

export default function AddRecordPage() {
  const router = useRouter();
  const [recordType, setRecordType] = useState<RecordType>('expense');
  const [amountText, setAmountText] = useState('28.00');
  const [categoryKey, setCategoryKey] = useState('food');

  const currentCategory =
    addRecordCategories.find((item) => item.key === categoryKey) ?? addRecordCategories[0];

  const handlePressKey = (key: string) => {
    if (key === 'delete') {
      setAmountText((current) => (current.length <= 1 ? '0' : current.slice(0, -1)));
      return;
    }

    setAmountText((current) => {
      if (key === '.' && current.includes('.')) {
        return current;
      }

      if (current === '0' && key !== '.') {
        return key;
      }

      return `${current}${key}`;
    });
  };

  return (
    <LedgerPage
      header={
        <LedgerPageHeader
          title="记一笔"
          rightSlot={
            <LedgerPrimaryButton
              label="账单"
              onPress={() => router.push('/bills' as Href)}
              inverted
            />
          }
        />
      }
      bottomSlot={<LedgerPrimaryButton label="保存" />}>
      <View style={styles.pageContent}>
        <LedgerSegmentedTabs
          options={recordTypeOptions}
          value={recordType}
          onChange={setRecordType}
        />

        <View style={styles.amountSection}>
          <Text style={styles.amountSymbol}>¥</Text>
          <Text style={styles.amountText}>{amountText}</Text>
        </View>

        <View style={styles.categoryGrid}>
          {addRecordCategories.map((item) => {
            const isActive = item.key === categoryKey;
            return (
              <Pressable
                key={item.key}
                onPress={() => setCategoryKey(item.key)}
                style={styles.categoryButton}>
                <View
                  style={[
                    styles.categoryIconBadge,
                    {
                      backgroundColor: isActive ? ledgerColors.brandGreen : '#FFFFFF',
                      borderColor: isActive ? ledgerColors.brandGreen : ledgerColors.divider,
                    },
                  ]}>
                  <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={[
                      styles.categoryIcon,
                      {
                        tintColor: isActive ? '#FFFFFF' : item.iconTint,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.categoryLabel}>{item.title}</Text>
              </Pressable>
            );
          })}
        </View>

        <LedgerCard>
          <LedgerKeyValueRow
            leftLabel="账户"
            rightValue={recordType === 'income' ? '招商银行卡 ›' : '微信钱包 ›'}
          />
          <LedgerKeyValueRow leftLabel="时间" rightValue="今天 4月25日 09:41 ›" />
          <LedgerKeyValueRow leftLabel="备注" rightValue={`${currentCategory.title} ›`} />
          <LedgerKeyValueRow leftLabel="标签" rightValue="选择标签 ›" />
        </LedgerCard>

        <LedgerKeypad rows={keypadRows} onPressKey={handlePressKey} />
      </View>
    </LedgerPage>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    gap: ledgerLayout.pageSectionGap,
  },
  amountSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: ledgerLayout.pageHorizontalPadding,
    paddingTop: 4,
    paddingBottom: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ledgerColors.divider,
  },
  amountSymbol: {
    fontSize: 40,
    fontWeight: '900',
    color: ledgerColors.primaryText,
    paddingBottom: 4,
  },
  amountText: {
    fontSize: 64,
    fontWeight: '900',
    color: ledgerColors.primaryText,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 22,
  },
  categoryButton: {
    width: '25%',
    alignItems: 'center',
    gap: 10,
  },
  categoryIconBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 26,
    height: 26,
  },
  categoryLabel: {
    fontSize: 16,
    color: ledgerColors.primaryText,
  },
});
