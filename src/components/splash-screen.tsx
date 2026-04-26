import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SizableText, YStack } from 'tamagui';

const appIcon = require('../assets/app/icon/icon.png');

type RingPosition = {
  size: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

const ringPositions = [
  { top: 152, left: 48, size: 28 },
  { top: 214, right: 36, size: 38 },
  { bottom: 182, left: 78, size: 34 },
  { bottom: 110, right: 52, size: 28 },
] satisfies readonly RingPosition[];

const waveWidths = [136, 88, 144, 104, 152, 118, 132] as const;
const waveOffsets = [0, 9, 2, 12, 4, 10, 3] as const;

function SplashSparkles({ scale }: { scale: number }) {
  return (
    <>
      <View
        style={[
          styles.sparkle,
          {
            width: 14 * scale,
            height: 14 * scale,
            top: -10 * scale,
            left: 18 * scale,
          },
        ]}
      />
      <View
        style={[
          styles.sparkle,
          {
            width: 9 * scale,
            height: 9 * scale,
            top: 1 * scale,
            left: 39 * scale,
          },
        ]}
      />
    </>
  );
}

function SplashWaves({ scale }: { scale: number }) {
  return (
    <View pointerEvents="none" style={[styles.wavesWrap, { height: 168 * scale }]}>
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <View
          key={`wave-row-${rowIndex}`}
          style={[
            styles.waveRow,
            {
              bottom: rowIndex * 22 * scale,
              left: -28 * scale,
              right: -28 * scale,
            },
          ]}>
          {waveWidths.map((width, segmentIndex) => (
            <View
              key={`wave-segment-${rowIndex}-${segmentIndex}`}
              style={[
                styles.waveSegment,
                {
                  width: width * scale,
                  marginRight: 10 * scale,
                  transform: [
                    {
                      translateY:
                        (waveOffsets[(segmentIndex + rowIndex) % waveOffsets.length] - 6) * scale,
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export default function SplashScreenView() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const baseWidth = 375;
  const scale = Math.min(width / baseWidth, 1.2);
  const iconSize = Math.min(width * 0.42, 156);
  const contentTop = Math.max(height * 0.23, 148);
  const bottomTextOffset = Math.max(insets.bottom + 24, 44);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <LinearGradient
        colors={['#F5FFF7', '#EFFBF9', '#EEFDFD']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <LinearGradient
        colors={['rgba(163, 230, 53, 0.18)', 'rgba(163, 230, 53, 0)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          styles.glow,
          {
            width: 260 * scale,
            height: 320 * scale,
            left: -56 * scale,
            top: 74 * scale,
          },
        ]}
      />

      <LinearGradient
        colors={['rgba(34, 197, 94, 0.08)', 'rgba(6, 182, 212, 0.14)', 'rgba(6, 182, 212, 0)']}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.glow,
          {
            width: 320 * scale,
            height: 420 * scale,
            right: -110 * scale,
            top: 92 * scale,
          },
        ]}
      />

      <LinearGradient
        colors={['rgba(163, 230, 53, 0.2)', 'rgba(6, 182, 212, 0.02)', 'rgba(6, 182, 212, 0)']}
        start={{ x: 0.45, y: 0 }}
        end={{ x: 0.55, y: 1 }}
        style={[
          styles.glow,
          {
            width: 286 * scale,
            height: 400 * scale,
            left: width * 0.14,
            bottom: -70 * scale,
          },
        ]}
      />

      {ringPositions.map((ring, index) => (
        <View
          key={`ring-${index}`}
          style={[
            styles.ring,
            {
              width: ring.size * scale,
              height: ring.size * scale,
              borderRadius: ring.size * scale,
              top: ring.top ? ring.top * scale : undefined,
              right: ring.right ? ring.right * scale : undefined,
              bottom: ring.bottom ? ring.bottom * scale : undefined,
              left: ring.left ? ring.left * scale : undefined,
            },
          ]}
        />
      ))}

      <SplashWaves scale={scale} />

      <SafeAreaView style={styles.safeArea}>
        <YStack
          flex={1}
          style={[
            styles.mainContent,
            {
              paddingTop: contentTop,
              paddingBottom: bottomTextOffset,
            },
          ]}>
          <YStack style={styles.centered}>
            <View
              style={[
                styles.iconWrap,
                {
                  width: iconSize,
                  height: iconSize,
                  borderRadius: 36 * scale,
                },
              ]}>
              <Image source={appIcon} style={styles.iconImage} resizeMode="contain" />
              <SplashSparkles scale={scale} />
            </View>

            <YStack style={[styles.centered, { marginTop: 34 * scale, gap: 10 * scale }]}>
              <SizableText
                color="#0F172A"
                style={[
                  styles.cnTitle,
                  {
                    fontSize: 34 * scale,
                    lineHeight: 42 * scale,
                  },
                ]}>
                轻账本
              </SizableText>

              <SizableText
                color="#16A34A"
                style={[
                  styles.enTitle,
                  {
                    fontSize: 24 * scale,
                    lineHeight: 30 * scale,
                  },
                ]}>
                Lite Ledger
              </SizableText>

              <SizableText
                color="#64748B"
                style={{
                  fontSize: 16 * scale,
                  lineHeight: 24 * scale,
                  fontWeight: '500',
                  letterSpacing: 0.2 * scale,
                  textAlign: 'center',
                }}>
                轻松记账 · 掌控生活
              </SizableText>
            </YStack>
          </YStack>

          <YStack style={[styles.centered, { gap: 16 * scale }]}>
            <SizableText
              color="rgba(100, 116, 139, 0.72)"
              style={{
                fontSize: 16 * scale,
                lineHeight: 22 * scale,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Smart Budget · Clear Life
            </SizableText>

            <View
              style={[
                styles.homeIndicator,
                {
                  width: 92 * scale,
                  marginBottom: Math.max(insets.bottom * 0.16, 0),
                },
              ]}
            />
          </YStack>
        </YStack>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5FFF7',
  },
  safeArea: {
    flex: 1,
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centered: {
    alignItems: 'center',
  },
  glow: {
    position: 'absolute',
    borderRadius: 999,
  },
  ring: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'rgba(217, 220, 160, 0.46)',
    backgroundColor: 'transparent',
  },
  wavesWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  waveRow: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveSegment: {
    height: 3,
    borderRadius: 999,
    backgroundColor: 'rgba(187, 247, 208, 0.82)',
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 12,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
  sparkle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  cnTitle: {
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  enTitle: {
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  homeIndicator: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#0F172A',
  },
});
