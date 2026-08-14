import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { getMovie } from '@/lib/catalog';
import { colors } from '@/constants/theme';

export default function GateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = getMovie(id);
  const [seconds, setSeconds] = useState(4);
  useEffect(() => { const timer = setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000); return () => clearInterval(timer); }, []);
  if (!movie) return <Screen><Text style={styles.copy}>Title not found.</Text></Screen>;
  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.close}><MaterialCommunityIcons name="close" size={22} color={colors.text} /></Pressable>
        <View style={styles.ticket}><View style={styles.ticketTop}><Text style={styles.ticketKicker}>SPONSOR MESSAGE</Text><Text style={styles.ticketNumber}>01 / 01</Text></View><View style={styles.divider} /><View style={styles.adMark}><MaterialCommunityIcons name="ticket-percent-outline" size={36} color={colors.amber} /></View><Text style={styles.title}>One short pause.</Text><Text style={styles.copy}>Stream Wallet uses a sponsor slot before the provider opens. This prototype gate is ready for your compliant ad SDK.</Text><View style={styles.adBox}><Text style={styles.adLabel}>ADVERTISEMENT SLOT</Text><Text style={styles.adCopy}>Your sponsor creative will appear here.</Text><Text style={styles.countdown}>{seconds > 0 ? `Continue in ${seconds}s` : 'Ready when you are'}</Text></View><Pressable disabled={seconds > 0} onPress={() => router.replace(`/provider/${movie.id}`)} style={({ pressed }) => [styles.continueButton, seconds > 0 && styles.disabled, pressed && styles.pressed]}><Text style={styles.continueText}>CONTINUE TO PROVIDER</Text><MaterialCommunityIcons name="arrow-right" size={17} color={colors.ink} /></Pressable></View>
        <Text style={styles.footer}>Title: {movie.title}  ·  Source: {movie.provider.name}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, justifyContent: 'center' },
  close: { position: 'absolute', top: 16, right: 18, width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  ticket: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 20, overflow: 'hidden' },
  ticketTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ticketKicker: { color: colors.amber, fontSize: 10, letterSpacing: 1.6, fontWeight: '900' },
  ticketNumber: { color: colors.muted, fontSize: 10, letterSpacing: 1.2, fontWeight: '800' },
  divider: { borderTopWidth: 1, borderColor: colors.border, borderStyle: 'dashed', marginVertical: 18 },
  adMark: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#2A2219', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  title: { color: colors.text, fontSize: 30, lineHeight: 34, fontWeight: '800' },
  copy: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 10 },
  adBox: { marginTop: 20, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, backgroundColor: colors.background },
  adLabel: { color: colors.teal, fontSize: 9, letterSpacing: 1.4, fontWeight: '900' },
  adCopy: { color: colors.text, fontSize: 14, marginTop: 7 },
  countdown: { color: colors.muted, fontSize: 12, marginTop: 10 },
  continueButton: { minHeight: 52, backgroundColor: colors.amber, borderRadius: 10, marginTop: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  disabled: { opacity: 0.45 },
  pressed: { transform: [{ scale: 0.97 }] },
  continueText: { color: colors.ink, fontSize: 11, letterSpacing: 0.7, fontWeight: '900' },
  footer: { color: colors.muted, textAlign: 'center', fontSize: 11, marginTop: 18 },
});
