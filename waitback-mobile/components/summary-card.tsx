import { Text, View } from "react-native";

type SummaryCardProps = {
  eyebrow: string;
  amount: string;
  description: string;
};

export function SummaryCard({ eyebrow, amount, description }: SummaryCardProps) {
  return (
    <View className="overflow-hidden rounded-[28px] bg-foreground px-5 py-5">
      <View className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary opacity-80" />
      <Text className="text-xs font-semibold uppercase tracking-[1.6px] text-background opacity-70">
        {eyebrow}
      </Text>
      <Text className="mt-2 text-4xl font-bold tracking-tight text-background">{amount}</Text>
      <Text className="mt-2 max-w-[270px] text-sm leading-5 text-background opacity-80">
        {description}
      </Text>
    </View>
  );
}
