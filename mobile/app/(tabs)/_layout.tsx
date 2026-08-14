import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.amber,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 74, paddingBottom: 12, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="filmstrip-box-multiple" size={23} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookmark-multiple-outline" size={23} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
