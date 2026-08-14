import { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Brand } from '@/components/Brand';
import { Screen } from '@/components/Screen';
import { TitleCard } from '@/components/TitleCard';
import { catalog, genres } from '@/lib/catalog';
import { colors, spacing } from '@/constants/theme';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const featured = catalog[0];
  const filtered = useMemo(() => catalog.filter(movie => {
    const matchesGenre = genre === 'All' || movie.genre === genre;
    const matchesQuery = `${movie.title} ${movie.genre}`.toLowerCase().includes(query.toLowerCase());
    return matchesGenre && matchesQuery;
  }), [genre, query]);

  return (
    <Screen>
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={movie => movie.id}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TitleCard movie={item} />}
        ListHeaderComponent={
          <View>
            <View style={styles.topbar}><Brand compact /><Text style={styles.live}>MVP / 01</Text></View>
            <View style={styles.intro}><Text style={styles.eyebrow}>YOUR NIGHT, EDITED</Text><Text style={styles.heading}>Pick a title.{"\n"}<Text style={styles.headingAccent}>Keep it moving.</Text></Text><Text style={styles.subheading}>A small shelf of films with a clean handoff to the source.</Text></View>
            <Pressable onPress={() => router.push(`/title/${featured.id}`)} style={({ pressed }) => [styles.featured, pressed && styles.featuredPressed]}>
              <Image source={{ uri: featured.backdrop }} style={StyleSheet.absoluteFill} />
              <View style={styles.scrim} />
              <View style={styles.featuredCopy}><Text style={styles.featuredEyebrow}>FEATURED TONIGHT</Text><Text style={styles.featuredTitle}>{featured.title}</Text><Text style={styles.featuredMeta}>{featured.year}  ·  {featured.runtime}  ·  {featured.genre}</Text><View style={styles.watchTag}><Text style={styles.watchTagText}>VIEW TITLE</Text></View></View>
            </Pressable>
            <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search the shelf" placeholderTextColor={colors.muted} style={styles.search} returnKeyType="done" /></View>
            <FlatList data={genres} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item} contentContainerStyle={styles.genres} renderItem={({ item }) => <Pressable onPress={() => setGenre(item)} style={[styles.genrePill, genre === item && styles.genrePillActive]}><Text style={[styles.genreText, genre === item && styles.genreTextActive]}>{item}</Text></Pressable>} />
            <View style={styles.sectionRow}><Text style={styles.sectionTitle}>The short shelf</Text><Text style={styles.sectionMeta}>{filtered.length} TITLES</Text></View>
          </View>
        }
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>Nothing on this shelf.</Text><Text style={styles.emptyCopy}>Try another title or genre.</Text></View>}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.md, paddingBottom: 30 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, paddingBottom: 24 },
  live: { color: colors.muted, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  intro: { marginBottom: 22 },
  eyebrow: { color: colors.amber, fontSize: 10, letterSpacing: 2, fontWeight: '800', marginBottom: 10 },
  heading: { color: colors.text, fontSize: 34, lineHeight: 38, fontWeight: '800', letterSpacing: -1 },
  headingAccent: { color: colors.amber },
  subheading: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 12, maxWidth: 285 },
  featured: { height: 208, borderRadius: 18, overflow: 'hidden', marginBottom: 18, backgroundColor: colors.surfaceRaised },
  featuredPressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(9,9,10,0.56)' },
  featuredCopy: { flex: 1, justifyContent: 'flex-end', padding: 18 },
  featuredEyebrow: { color: colors.teal, fontSize: 9, letterSpacing: 1.6, fontWeight: '800' },
  featuredTitle: { color: colors.text, fontSize: 28, fontWeight: '800', marginTop: 6 },
  featuredMeta: { color: '#D6CEC3', fontSize: 12, marginTop: 6 },
  watchTag: { alignSelf: 'flex-start', marginTop: 14, backgroundColor: colors.amber, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  watchTagText: { color: colors.ink, fontSize: 10, letterSpacing: 1.3, fontWeight: '900' },
  searchBox: { height: 48, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  searchIcon: { color: colors.amber, fontSize: 25, marginRight: 8, marginTop: -4 },
  search: { color: colors.text, flex: 1, fontSize: 14 },
  genres: { gap: 8, paddingVertical: 14 },
  genrePill: { borderWidth: 1, borderColor: colors.border, borderRadius: 99, paddingVertical: 8, paddingHorizontal: 13, backgroundColor: colors.surface },
  genrePillActive: { borderColor: colors.amber, backgroundColor: colors.amber },
  genreText: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  genreTextActive: { color: colors.ink },
  sectionRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 4, marginBottom: 14 },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '800' },
  sectionMeta: { color: colors.muted, fontSize: 9, letterSpacing: 1.4, fontWeight: '800' },
  columns: { justifyContent: 'space-between' },
  empty: { paddingVertical: 40, alignItems: 'center' },
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  emptyCopy: { color: colors.muted, marginTop: 8 },
});
