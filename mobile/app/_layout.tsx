import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { WalletProvider } from '@/lib/wallet';
import { colors } from '@/constants/theme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <WalletProvider>
      <ThemeProvider value={{ ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, text: colors.text, border: colors.border, primary: colors.amber } }}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background }, headerTintColor: colors.text, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="title/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="gate/[id]" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="provider/[id]" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </WalletProvider>
  );
}
