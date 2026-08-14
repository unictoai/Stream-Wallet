import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Brand } from '@/components/Brand';
import { Screen } from '@/components/Screen';
import { TitleCard } from '@/components/TitleCard';
import { catalog } from '@/lib/catalog';
import { useWallet } from '@/lib/wallet';
import { colors, spacing } from '@/constants/theme';

export default function WalletScreen() {
  const { savedIds, ready } = useWallet();
  const saved = catalog.filter(movie => savedIds.includes(movie.id));
  return (
    <Screen>
      <FlatList
        data={saved}
        numColumns={2}
        keyExtractor={movie => movie.id}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => <TitleCard movie={item} />}
        ListHeaderComponent={<View><View style={styles.topbar}><Brand compact /><Text style={styles.label}>YOUR WALLET</Text></View><Text style={styles.title}>Saved for later.</Text><Text style={styles.copy}>A small local pocket for the titles you want to keep close.</Text></View>}
        ListEmptyComponent={ready ? <View style={styles.empty}><Text style={styles.emptyMark}>＋</Text><Text style={styles.emptyTitle}>Your wallet is light.</Text><Text style={styles.emptyCopy}>Save a title from Browse and it will appear here.</Text><Text onPress={() => router.push('/')} style={styles.browse}>BACK TO BROWSE</Text></View> : null}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.md, paddingBottom: 30 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, paddingBottom: 30 },
  label: { color: colors.teal, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  title: { color: colors.text, fontSize: 34, fontWeight: '800', letterSpacing: -1 },
  copy: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 10, marginBottom: 26, maxWidth: 290 },
  columns: { justifyContent: 'space-between' },
  empty: { alignItems: 'center', paddingTop: 76, paddingHorizontal: 20 },
  emptyMark: { color: colors.amber, fontSize: 32, marginBottom: 14 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  emptyCopy: { color: colors.muted, textAlign: 'center', lineHeight: 20, marginTop: 8 },
  browse: { color: colors.amber, fontSize: 11, letterSpacing: 1.4, fontWeight: '900', marginTop: 22 },
});
