import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.row}>
      <Image source={require('../assets/images/stream-wallet-logo.png')} style={compact ? styles.logoSmall : styles.logo} resizeMode="contain" />
      <View>
        <Text style={styles.kicker}>STREAM</Text>
        <Text style={styles.wordmark}>WALLET</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { width: 50, height: 50, borderRadius: 14 },
  logoSmall: { width: 34, height: 34, borderRadius: 10 },
  kicker: { color: colors.amber, fontSize: 10, letterSpacing: 2.5, fontWeight: '700' },
  wordmark: { color: colors.text, fontSize: 17, letterSpacing: 1.5, fontWeight: '800' },
});
