import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/theme';
import type { Movie } from '@/lib/catalog';

export function TitleCard({ movie }: { movie: Movie }) {
  return (
    <Pressable onPress={() => router.push(`/title/${movie.id}`)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.genre}>{movie.genre.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <Text style={styles.meta}>{movie.year}  ·  {movie.runtime}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%', marginBottom: 18 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
  poster: { width: '100%', aspectRatio: 0.72, borderRadius: 12, backgroundColor: colors.surfaceRaised },
  info: { paddingTop: 9 },
  genre: { color: colors.teal, fontSize: 9, letterSpacing: 1.4, fontWeight: '800' },
  title: { color: colors.text, fontSize: 16, lineHeight: 20, fontWeight: '700', marginTop: 4 },
  meta: { color: colors.muted, fontSize: 12, marginTop: 4 },
});
