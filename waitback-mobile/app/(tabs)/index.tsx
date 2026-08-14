import { useEffect, useRef, useState } from "react";
import { Alert, Platform, Pressable, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as Sharing from "expo-sharing";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ScreenContainer } from "@/components/screen-container";
import { SummaryCard } from "@/components/summary-card";
import { haptic } from "@/lib/haptics";
import {
  formatUsdFromCents,
  resolveSponsorStatus,
  type TaskKind,
} from "@/lib/waitback-ledger";
import { useWaitBack } from "@/lib/waitback-store";

type ProcessingState = {
  title: string;
  total: number;
  completed: number;
  startedAt: number;
  cancelling: boolean;
};

type CompressionMode = {
  title: string;
  kind: TaskKind;
  targetWidth: number;
  quality: number;
  shareFirstResult?: boolean;
};

const tools: {
  title: string;
  detail: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  action: "pack" | "share" | "scan";
}[] = [
  { title: "Compress a photo pack", detail: "Resize several images locally for easier sharing.", icon: "photo-library", action: "pack" },
  { title: "Prepare one photo", detail: "Make one image smaller and open the share sheet.", icon: "send", action: "share" },
  { title: "Quick document photo", detail: "Capture a page and create a share-ready JPEG.", icon: "document-scanner", action: "scan" },
];

export default function HomeScreen() {
  const { addRecord, records, sponsoredCardsEnabled, summary } = useWaitBack();
  const [processing, setProcessing] = useState<ProcessingState | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const cancelRequested = useRef(false);

  useEffect(() => {
    if (!processing) {
      setElapsedSeconds(0);
      return;
    }
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - processing.startedAt) / 1000));
    }, 250);
    return () => clearInterval(timer);
  }, [processing]);

  async function choosePhotos(mode: CompressionMode, allowMultipleSelection: boolean) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: allowMultipleSelection,
      selectionLimit: allowMultipleSelection ? 12 : 1,
      quality: 1,
      base64: Platform.OS === "web",
    });
    if (result.canceled) return;
    await processAssets(mode, result.assets);
  }

  async function takeDocumentPhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert("Camera access needed", "Allow camera access to capture and prepare a document photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: Platform.OS === "web",
    });
    if (result.canceled) return;
    await processAssets(
      { title: "Document photo", kind: "scan", targetWidth: 1800, quality: 0.82, shareFirstResult: true },
      result.assets,
    );
  }

  async function processAssets(mode: CompressionMode, assets: ImagePicker.ImagePickerAsset[]) {
    const startedAt = Date.now();
    cancelRequested.current = false;
    setProcessing({ title: mode.title, total: assets.length, completed: 0, startedAt, cancelling: false });

    const outputs: string[] = [];
    try {
      for (let index = 0; index < assets.length; index += 1) {
        if (cancelRequested.current) break;
        const asset = assets[index];
        const source =
          Platform.OS === "web" && asset.base64
            ? `data:image/jpeg;base64,${asset.base64}`
            : asset.uri;
        const result = await ImageManipulator.manipulateAsync(
          source,
          [{ resize: { width: mode.targetWidth } }],
          { compress: mode.quality, format: ImageManipulator.SaveFormat.JPEG },
        );
        outputs.push(result.uri);
        setProcessing((current) => (current ? { ...current, completed: index + 1 } : current));
      }

      if (cancelRequested.current) {
        haptic.light();
        return;
      }

      const durationSeconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      addRecord({
        title: mode.title,
        kind: mode.kind,
        outputCount: outputs.length,
        durationSeconds,
        sponsorStatus: resolveSponsorStatus(sponsoredCardsEnabled, durationSeconds),
        sponsorViewSeconds: sponsoredCardsEnabled ? durationSeconds : 0,
        verifiedShareCents: 0,
      });
      haptic.success();

      if (mode.shareFirstResult && outputs[0] && (await Sharing.isAvailableAsync())) {
        if (Platform.OS === "web") {
          Alert.alert("Prepared", "Your photo is ready. Local file sharing is available on Android and iOS.");
        } else {
          await Sharing.shareAsync(outputs[0], { mimeType: "image/jpeg", dialogTitle: "Share prepared image" });
        }
      }
    } catch {
      haptic.medium();
      Alert.alert("Could not prepare this image", "Please try a different image or a smaller photo pack.");
    } finally {
      setProcessing(null);
    }
  }

  function beginTool(action: (typeof tools)[number]["action"]) {
    haptic.light();
    if (action === "pack") {
      void choosePhotos({ title: "Photo pack", kind: "compress", targetWidth: 1600, quality: 0.72 }, true);
      return;
    }
    if (action === "share") {
      void choosePhotos({ title: "Prepared photo", kind: "share", targetWidth: 1280, quality: 0.65, shareFirstResult: true }, false);
      return;
    }
    void takeDocumentPhoto();
  }

  function requestCancel() {
    if (!processing || processing.cancelling) return;
    cancelRequested.current = true;
    setProcessing({ ...processing, cancelling: true });
    haptic.medium();
  }

  if (processing) {
    const progress = processing.total ? Math.max(0.08, processing.completed / processing.total) : 0;
    const hasPreview = sponsoredCardsEnabled && elapsedSeconds >= 4;
    return (
      <ScreenContainer className="bg-background px-5" edges={["top", "left", "right", "bottom"]}>
        <View className="flex-1 justify-center">
          <View className="self-center rounded-full bg-surface p-5">
            <MaterialIcons name="auto-awesome" size={30} color="#0D9F6E" />
          </View>
          <Text className="mt-7 text-center text-3xl font-bold tracking-tight text-foreground">{processing.title}</Text>
          <Text className="mt-2 text-center text-sm leading-5 text-muted">
            {processing.cancelling
              ? "Finishing the current file safely…"
              : `Processing ${Math.max(processing.completed, 1)} of ${processing.total} on this device.`}
          </Text>
          <View className="mt-7 h-3 overflow-hidden rounded-full bg-surface">
            <View className="h-full rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
          </View>
          <Text className="mt-3 text-center text-xs font-semibold uppercase tracking-[1.2px] text-muted">
            {elapsedSeconds}s elapsed
          </Text>

          {hasPreview ? (
            <View className="mt-8 rounded-3xl border border-border bg-surface p-4">
              <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-primary">Sponsored placement preview</Text>
              <Text className="mt-2 text-base font-semibold text-foreground">Save time with a better mobile workspace</Text>
              <Text className="mt-1 text-sm leading-5 text-muted">
                This prototype card is not a live campaign and has no cash value. Eligible delivery requires a future verified marketplace ledger.
              </Text>
            </View>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cancel processing"
            disabled={processing.cancelling}
            onPress={requestCancel}
            style={({ pressed }) => [{ opacity: pressed || processing.cancelling ? 0.55 : 1 }]}
            className="mt-8 items-center rounded-2xl border border-border py-4"
          >
            <Text className="text-sm font-semibold text-foreground">
              {processing.cancelling ? "Cancelling…" : "Cancel safely"}
            </Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background" edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28 }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold tracking-tight text-foreground">WaitBack</Text>
            <Text className="mt-1 text-sm text-muted">Make phone tasks feel lighter.</Text>
          </View>
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-foreground">
            <MaterialIcons name="bolt" size={23} color="#1CE6A2" />
          </View>
        </View>

        <View className="mt-6">
          <SummaryCard
            eyebrow="Verified share"
            amount={formatUsdFromCents(summary.verifiedCents)}
            description={
              summary.completedTasks === 0
                ? "Complete a useful task to begin your local activity ledger. This prototype never promises earnings."
                : `${summary.completedTasks} completed task${summary.completedTasks === 1 ? "" : "s"} recorded on this device.`
            }
          />
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-foreground">Start a task</Text>
          <Text className="text-xs font-semibold uppercase tracking-[1px] text-muted">Local processing</Text>
        </View>

        <View className="mt-3 gap-3">
          {tools.map((tool) => (
            <Pressable
              key={tool.title}
              accessibilityRole="button"
              accessibilityLabel={tool.title}
              onPress={() => beginTool(tool.action)}
              style={({ pressed }) => [{ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
              className="flex-row items-center gap-4 rounded-3xl border border-border bg-surface px-4 py-4"
            >
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-background">
                <MaterialIcons name={tool.icon} size={23} color="#0D9F6E" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{tool.title}</Text>
                <Text className="mt-1 text-sm leading-5 text-muted">{tool.detail}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#66727D" />
            </Pressable>
          ))}
        </View>

        <View className="mt-6 rounded-3xl bg-surface p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold text-foreground">How WaitBack stays fair</Text>
            <MaterialIcons name="verified-user" size={20} color="#0D9F6E" />
          </View>
          <Text className="mt-2 text-sm leading-5 text-muted">
            A sponsor card can appear only inside a task you started. The task finishes whether or not a card is enabled, and any future revenue share depends on verified delivery—not clicks or artificial waiting.
          </Text>
          <Text className="mt-3 text-xs font-semibold text-primary">
            {sponsoredCardsEnabled ? "Sponsor cards enabled" : "Sponsor cards disabled"}
          </Text>
        </View>

        {records.length > 0 ? (
          <View className="mt-6">
            <Text className="text-lg font-bold text-foreground">Latest task</Text>
            <View className="mt-3 rounded-3xl border border-border bg-surface p-4">
              <Text className="text-base font-semibold text-foreground">{records[0].title}</Text>
              <Text className="mt-1 text-sm text-muted">
                {records[0].outputCount} {records[0].outputCount === 1 ? "file" : "files"} prepared in {records[0].durationSeconds}s
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
}
