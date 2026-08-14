import { describe, expect, it } from "vitest";

import {
  calculateLedger,
  resolveSponsorStatus,
  SPONSOR_VIEW_THRESHOLD_SECONDS,
  type TaskRecord,
} from "../lib/waitback-ledger";

describe("WaitBack ledger", () => {
  it("requires the minimum continuous view threshold before a task becomes eligible", () => {
    expect(resolveSponsorStatus(true, SPONSOR_VIEW_THRESHOLD_SECONDS - 1)).toBe("not_eligible");
    expect(resolveSponsorStatus(true, SPONSOR_VIEW_THRESHOLD_SECONDS)).toBe("awaiting_verification");
    expect(resolveSponsorStatus(false, SPONSOR_VIEW_THRESHOLD_SECONDS + 5)).toBe("disabled");
  });

  it("counts only verified earnings and separately counts awaiting verification", () => {
    const records: TaskRecord[] = [
      {
        id: "verified",
        createdAt: "2026-08-14T00:00:00.000Z",
        title: "Photo pack",
        kind: "compress",
        outputCount: 2,
        durationSeconds: 14,
        sponsorStatus: "verified",
        sponsorViewSeconds: 14,
        verifiedShareCents: 28,
      },
      {
        id: "pending",
        createdAt: "2026-08-14T00:00:00.000Z",
        title: "Quick scan",
        kind: "scan",
        outputCount: 1,
        durationSeconds: 12,
        sponsorStatus: "awaiting_verification",
        sponsorViewSeconds: 12,
        verifiedShareCents: 0,
      },
    ];

    expect(calculateLedger(records)).toEqual({
      completedTasks: 2,
      eligibleTasks: 1,
      verifiedCents: 28,
      pendingCents: 0,
    });
  });
});
