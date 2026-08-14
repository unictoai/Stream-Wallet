export const SPONSOR_VIEW_THRESHOLD_SECONDS = 10;

export type TaskKind = "compress" | "share" | "scan";
export type SponsorStatus =
  | "disabled"
  | "not_eligible"
  | "awaiting_verification"
  | "verified";

export type TaskRecord = {
  id: string;
  createdAt: string;
  title: string;
  kind: TaskKind;
  outputCount: number;
  durationSeconds: number;
  sponsorStatus: SponsorStatus;
  sponsorViewSeconds: number;
  verifiedShareCents: number;
};

export type LedgerSummary = {
  completedTasks: number;
  eligibleTasks: number;
  verifiedCents: number;
  pendingCents: number;
};

export function resolveSponsorStatus(
  sponsoredCardsEnabled: boolean,
  durationSeconds: number,
): SponsorStatus {
  if (!sponsoredCardsEnabled) return "disabled";
  if (durationSeconds < SPONSOR_VIEW_THRESHOLD_SECONDS) return "not_eligible";
  return "awaiting_verification";
}

export function calculateLedger(records: TaskRecord[]): LedgerSummary {
  return records.reduce<LedgerSummary>(
    (summary, record) => {
      summary.completedTasks += 1;
      if (record.sponsorStatus === "awaiting_verification") {
        summary.eligibleTasks += 1;
      }
      if (record.sponsorStatus === "verified") {
        summary.verifiedCents += record.verifiedShareCents;
      }
      return summary;
    },
    { completedTasks: 0, eligibleTasks: 0, verifiedCents: 0, pendingCents: 0 },
  );
}

export function formatUsdFromCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
