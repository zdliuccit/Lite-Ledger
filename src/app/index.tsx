import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H1, H2, Paragraph, SizableText, XStack, YStack } from 'tamagui';

export default function HomeScreen() {
  const platformLabel =
    Platform.OS === 'ios' ? 'iOS' : Platform.OS === 'android' ? 'Android' : 'Web';

  return (
    <YStack flex={1} background="$background">
      <SafeAreaView style={styles.safeArea}>
        <YStack flex={1} gap="$6" style={styles.content}>
          <YStack gap="$4">
            <YStack gap="$2">
              <SizableText size="$5" color="$blue10">
                Expo SDK 55 + Tamagui
              </SizableText>
              <H1>lite-ledger</H1>
              <Paragraph size="$7" color="$gray11">
                一个已经接好 Expo Router、Tamagui 与 pnpm 的 React Native 基线工程，
                可以直接继续做 Android 和 iOS 开发。
              </Paragraph>
            </YStack>

            <YStack
              gap="$4"
              style={styles.card}
              borderWidth={1}
              borderColor="$borderColor"
              background="$background">
              <H2 size="$8">当前环境</H2>
              <YStack gap="$3">
                <XStack style={styles.row}>
                  <SizableText size="$4" color="$gray11">
                    运行平台
                  </SizableText>
                  <SizableText size="$4">{platformLabel}</SizableText>
                </XStack>
                <XStack style={styles.row}>
                  <SizableText size="$4" color="$gray11">
                    包管理器
                  </SizableText>
                  <SizableText size="$4">pnpm</SizableText>
                </XStack>
                <XStack style={styles.row}>
                  <SizableText size="$4" color="$gray11">
                    路由
                  </SizableText>
                  <SizableText size="$4">Expo Router</SizableText>
                </XStack>
              </YStack>
            </YStack>
          </YStack>

          <YStack gap="$3">
            <Button size="$5" theme="blue">
              pnpm start
            </Button>
            <Button size="$5" variant="outlined">
              pnpm ios / pnpm android
            </Button>
          </YStack>
        </YStack>
      </SafeAreaView>
    </YStack>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  card: {
    padding: 20,
    borderRadius: 20,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
