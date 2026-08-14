import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { getMovie } from '@/lib/catalog';
import { useWallet } from '@/lib/wallet';
import { colors } from '@/constants/theme';

export default function TitleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = getMovie(id);
  const { isSaved, toggleSaved } = useWallet();
  if (!movie) return <Screen><Text style={styles.missing}>Title not found.</Text></Screen>;
  const saved = isSaved(movie.id);
  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ImageBackground source={{ uri: movie.backdrop }} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.heroScrim} />
          <Pressable onPress={() => router.back()} style={styles.back}><MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} /></Pressable>
          <View style={styles.heroFooter}><Text style={styles.eyebrow}>{movie.eyebrow.toUpperCase()}</Text><Text style={styles.title}>{movie.title}</Text><Text style={styles.meta}>{movie.year}  ·  {movie.runtime}  ·  {movie.genre}  ·  {movie.rating}</Text></View>
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.actionRow}>
            <Pressable onPress={() => router.push(`/gate/${movie.id}`)} style={({ pressed }) => [styles.watchButton, pressed && styles.pressed]}><MaterialCommunityIcons name="play" size={19} color={colors.ink} /><Text style={styles.watchText}>WATCH AFTER SPONSOR</Text></Pressable>
            <Pressable onPress={() => toggleSaved(movie.id)} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}><MaterialCommunityIcons name={saved ? 'bookmark' : 'bookmark-outline'} size={21} color={saved ? colors.amber : colors.text} /></Pressable>
          </View>
          <Text style={styles.sectionLabel}>THE NOTE</Text><Text style={styles.synopsis}>{movie.synopsis}</Text>
          <View style={styles.record}><View><Text style={styles.recordLabel}>SOURCE</Text><Text style={styles.recordValue}>{movie.provider.name}</Text></View><View><Text style={styles.recordLabel}>QUALITY</Text><Text style={styles.recordValue}>{movie.provider.quality}</Text></View></View>
          <Text style={styles.disclosure}>Stream Wallet does not host this title. Playback opens the provider recorded for this title.</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 30 },
  hero: { height: 440, justifyContent: 'space-between', padding: 18 },
  heroImage: { opacity: 0.9 },
  heroScrim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(7,7,8,0.5)' },
  back: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(10,10,10,0.52)', alignItems: 'center', justifyContent: 'center' },
  heroFooter: { paddingBottom: 4 },
  eyebrow: { color: colors.teal, fontSize: 10, letterSpacing: 1.4, fontWeight: '800' },
  title: { color: colors.text, fontSize: 38, lineHeight: 41, fontWeight: '800', letterSpacing: -1.2, marginTop: 8 },
  meta: { color: '#D8D0C7', fontSize: 13, marginTop: 8 },
  body: { padding: 18 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  watchButton: { flex: 1, minHeight: 52, borderRadius: 10, backgroundColor: colors.amber, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  watchText: { color: colors.ink, fontSize: 11, letterSpacing: 0.8, fontWeight: '900' },
  saveButton: { width: 52, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
  sectionLabel: { color: colors.amber, fontSize: 10, letterSpacing: 1.6, fontWeight: '900' },
  synopsis: { color: colors.text, fontSize: 18, lineHeight: 27, marginTop: 10 },
  record: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, paddingVertical: 16, marginTop: 28, flexDirection: 'row', justifyContent: 'space-between' },
  recordLabel: { color: colors.muted, fontSize: 9, letterSpacing: 1.4, fontWeight: '800' },
  recordValue: { color: colors.text, fontSize: 13, fontWeight: '700', marginTop: 5 },
  disclosure: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 18 },
  missing: { color: colors.text, padding: 24 },
});
