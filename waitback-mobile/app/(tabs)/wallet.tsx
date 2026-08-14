import { ScrollView, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { SummaryCard } from "@/components/summary-card";
import { formatUsdFromCents } from "@/lib/waitback-ledger";
import { useWaitBack } from "@/lib/waitback-store";

export default function WalletScreen() {
  const { summary } = useWaitBack();

  return (
    <ScreenContainer className="bg-background" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28 }}>
        <Text className="text-3xl font-bold tracking-tight text-foreground">Wallet</Text>
        <Text className="mt-1 text-sm leading-5 text-muted">
          Your marketplace ledger is transparent by design.
        </Text>

        <View className="mt-5">
          <SummaryCard
            eyebrow="Verified share"
            amount={formatUsdFromCents(summary.verifiedCents)}
            description="Test mode does not create cash value or enable withdrawals. Verified shares appear only after a future campaign ledger confirms delivery."
          />
        </View>

        <View className="mt-4 rounded-3xl border border-border bg-surface p-5">
          <Text className="text-base font-semibold text-foreground">What happens next</Text>
          <Text className="mt-2 text-sm leading-5 text-muted">
            Long-running tasks can become eligible for a sponsored view. When the marketplace is connected, delivery, fraud checks, and advertiser billing must be confirmed before a user share is verified.
          </Text>
          <View className="mt-4 flex-row gap-3">
            <Metric label="Eligible tasks" value={String(summary.eligibleTasks)} />
            <Metric label="Pending value" value={formatUsdFromCents(summary.pendingCents)} />
          </View>
        </View>

        <View className="mt-4 rounded-3xl bg-background px-1 py-2">
          <Text className="text-xs font-semibold uppercase tracking-[1.4px] text-muted">Trust standard</Text>
          <Text className="mt-2 text-sm leading-5 text-foreground">
            WaitBack never asks you to wait longer, click an ad, or pay money to become eligible. A sponsor placement is separate from task completion.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-background px-3 py-3">
      <Text className="text-lg font-bold text-foreground">{value}</Text>
      <Text className="mt-1 text-xs leading-4 text-muted">{label}</Text>
    </View>
  );
}
