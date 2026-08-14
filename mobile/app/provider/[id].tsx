import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Brand } from '@/components/Brand';
import { Screen } from '@/components/Screen';
import { getMovie } from '@/lib/catalog';
import { colors } from '@/constants/theme';

export default function ProviderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = getMovie(id);
  if (!movie) return <Screen><Text style={styles.copy}>Title not found.</Text></Screen>;
  const openProvider = () => void Linking.openURL(movie.provider.url);
  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}><View style={styles.header}><Brand compact /><Pressable onPress={() => router.back()}><MaterialCommunityIcons name="close" size={22} color={colors.text} /></Pressable></View><View style={styles.content}><View style={styles.sourceIcon}><MaterialCommunityIcons name="open-in-new" size={32} color={colors.amber} /></View><Text style={styles.kicker}>PROVIDER HANDOFF</Text><Text style={styles.title}>Your title is ready.</Text><Text style={styles.copy}>Stream Wallet is opening the recorded provider for {movie.title}. Playback and availability stay with that provider.</Text><View style={styles.record}><Text style={styles.recordLabel}>SOURCE</Text><Text style={styles.source}>{movie.provider.name}</Text><View style={styles.row}><Text style={styles.small}>{movie.provider.badge}</Text><Text style={styles.small}>{movie.provider.quality}</Text></View></View><Pressable onPress={openProvider} style={({ pressed }) => [styles.open, pressed && styles.pressed]}><Text style={styles.openText}>OPEN PROVIDER</Text><MaterialCommunityIcons name="arrow-top-right" size={18} color={colors.ink} /></Pressable><Pressable onPress={() => router.replace('/')} style={styles.browse}><Text style={styles.browseText}>RETURN TO BROWSE</Text></Pressable></View><Text style={styles.footer}>No media is stored by Stream Wallet in this MVP.</Text></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  content: { flex: 1, justifyContent: 'center' },
  sourceIcon: { width: 70, height: 70, borderRadius: 22, backgroundColor: '#2A2219', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  kicker: { color: colors.teal, fontSize: 10, letterSpacing: 1.7, fontWeight: '900' },
  title: { color: colors.text, fontSize: 36, lineHeight: 40, fontWeight: '800', marginTop: 8 },
  copy: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 12 },
  record: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, marginTop: 26, paddingVertical: 16 },
  recordLabel: { color: colors.muted, fontSize: 9, letterSpacing: 1.5, fontWeight: '900' },
  source: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  small: { color: colors.teal, fontSize: 11 },
  open: { backgroundColor: colors.amber, minHeight: 54, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 26 },
  openText: { color: colors.ink, fontSize: 11, letterSpacing: 1, fontWeight: '900' },
  browse: { alignItems: 'center', marginTop: 18, padding: 12 },
  browseText: { color: colors.muted, fontSize: 11, letterSpacing: 1.2, fontWeight: '800' },
  footer: { color: colors.muted, textAlign: 'center', fontSize: 11, paddingBottom: 14 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});
