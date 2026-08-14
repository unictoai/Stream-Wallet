import { Switch, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { haptic } from "@/lib/haptics";
import { useWaitBack } from "@/lib/waitback-store";

export default function SettingsScreen() {
  const {
    sponsoredCardsEnabled,
    privacyModeEnabled,
    setSponsoredCardsEnabled,
    setPrivacyModeEnabled,
  } = useWaitBack();

  return (
    <ScreenContainer className="bg-background px-5" edges={["top", "left", "right"]}>
      <View className="pt-3">
        <Text className="text-3xl font-bold tracking-tight text-foreground">Settings</Text>
        <Text className="mt-1 text-sm leading-5 text-muted">Simple controls for a respectful wait-state experience.</Text>
      </View>

      <View className="mt-6 overflow-hidden rounded-3xl border border-border bg-surface">
        <SettingRow
          title="Sponsored cards"
          description="Allow clearly labeled cards during longer, user-started tasks. Turning this off does not stop a task."
          value={sponsoredCardsEnabled}
          onValueChange={(enabled) => {
            haptic.medium();
            setSponsoredCardsEnabled(enabled);
          }}
        />
        <View className="ml-5 h-px bg-border" />
        <SettingRow
          title="Private task history"
          description="Keep this device’s activity ledger available locally. No task content is used in this prototype."
          value={privacyModeEnabled}
          onValueChange={(enabled) => {
            haptic.medium();
            setPrivacyModeEnabled(enabled);
          }}
        />
      </View>

      <View className="mt-5 rounded-3xl bg-foreground p-5">
        <Text className="text-base font-semibold text-background">Prototype disclosure</Text>
        <Text className="mt-2 text-sm leading-5 text-background opacity-75">
          This release is a product foundation. It records local task events but has no ad network, live campaigns, billing, or cash payout connection.
        </Text>
      </View>
    </ScreenContainer>
  );
}

function SettingRow({
  title,
  description,
  value,
  onValueChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row items-center gap-4 px-5 py-5">
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{title}</Text>
        <Text className="mt-1 text-sm leading-5 text-muted">{description}</Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: "#59636D", true: "#1CE6A2" }} />
    </View>
  );
}
