import { FlatList, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useWaitBack } from "@/lib/waitback-store";

function sponsorLabel(status: string) {
  if (status === "awaiting_verification") return "Awaiting verification";
  if (status === "verified") return "Verified";
  if (status === "disabled") return "Sponsored cards off";
  return "No eligible view";
}

export default function ActivityScreen() {
  const { records, hydrated } = useWaitBack();

  if (!hydrated) {
    return <ScreenContainer className="bg-background" />;
  }

  return (
    <ScreenContainer className="bg-background px-5" edges={["top", "left", "right"]}>
      <View className="pb-4 pt-3">
        <Text className="text-3xl font-bold tracking-tight text-foreground">Activity</Text>
        <Text className="mt-1 text-sm leading-5 text-muted">
          A local record of completed utility tasks and their eligibility state.
        </Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        contentContainerStyle={records.length === 0 ? { flexGrow: 1 } : { paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View className="mb-3 rounded-3xl border border-border bg-surface px-4 py-4">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{item.title}</Text>
                <Text className="mt-1 text-sm text-muted">
                  {item.outputCount} {item.outputCount === 1 ? "file" : "files"} prepared · {item.durationSeconds}s
                </Text>
              </View>
              <Text className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted">
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View className="mt-3 self-start rounded-full bg-background px-3 py-1.5">
              <Text className="text-xs font-semibold text-foreground">{sponsorLabel(item.sponsorStatus)}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center px-8 pb-20">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-surface">
              <Text className="text-2xl text-primary">+</Text>
            </View>
            <Text className="mt-5 text-lg font-semibold text-foreground">Nothing recorded yet</Text>
            <Text className="mt-2 text-center text-sm leading-5 text-muted">
              Complete a photo task from Home and it will appear here with a clear verification status.
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
