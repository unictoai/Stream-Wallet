# WaitBack Mobile — Interface Design Plan

## Product intent

WaitBack Mobile is an Android-first utility that makes phone maintenance tasks feel useful and transparent. Users start real tasks such as organizing documents, compressing images, preparing files for sharing, and saving quick scans. While a task is visibly processing, the app may display a clearly labeled, non-blocking sponsored card. A future marketplace can allocate a verified share of eligible campaign revenue to the user, but the launch interface must never promise guaranteed income or force users to wait longer.

The interface is designed for **9:16 portrait screens**, right-hand and one-handed use, and mainstream Android ergonomics while retaining the calm hierarchy and large targets expected from a first-party iOS-style experience. Primary actions stay in the lower half of the screen, touch targets are at least 44 points, and the navigation is deliberately limited to four tabs.

## Screen list

| Screen | Primary content and functionality |
|---|---|
| Home | A balance card, transparent earnings status, today’s completed tasks, and a primary `Start a task` action. The card explains that earnings reflect verified sponsor delivery rather than guaranteed cash. |
| Task picker | A bottom sheet of useful job types: image compression, document cleanup, file preparation, and quick scan. The first release uses local, simulated task processing while retaining the real product vocabulary. |
| Processing | A focused progress view that identifies the user-initiated task, shows elapsed time and a cancel control, and displays one clearly labeled sponsored card only when a task remains in progress. |
| Activity | A chronological task ledger showing status, processing duration, eligible sponsored views, and the estimated pending share. The layout separates completed, pending, and unavailable data so it never fabricates a payout. |
| Wallet | A transparent revenue-share dashboard that explains the current test mode, verification states, payout threshold placeholder, and future account-verification requirements. The MVP has no withdrawal action. |
| Settings | Controls for sponsor-card visibility, task history privacy, notification preference, help, and a plain-language “How earnings work” explanation. |

## Key user flows

| User goal | Flow |
|---|---|
| Complete a useful task | Home → `Start a task` → Task picker → select a task → Processing → completion confirmation → Activity entry. |
| Understand earnings | Home balance card → Wallet → verification explanation → activity ledger. |
| Control the sponsored experience | Settings → `Sponsored cards during processing` → toggle preference → confirmation copy explains that this affects eligibility only and does not block task completion. |
| Review processing history | Activity tab → select an entry → see task duration, completion state, and any verified sponsor-view status. |

## Visual system

WaitBack uses a **midnight ink** foundation (`#10151A`) with **mint signal** (`#1CE6A2`) for verified progress and **warm amber** (`#F5B544`) for pending states. The palette is distinct from Kickbacks.ai’s visual identity and avoids a “cash reward” aesthetic that could overpromise earnings. Surfaces are soft charcoal or off-white depending on system appearance, with clear contrast for text and status labels.

Typography is clean, compact, and highly legible. Large numbers are reserved for actual earned or pending balance data, while explanations use concise labels and lower contrast. Sponsor placements always carry a `Sponsored` label, use a contained card rather than a deceptive system-like status bar, and remain visually separate from task controls.

## MVP boundaries

The first build validates the user experience and the audit-ready event model. It includes local task simulation, persistent activity history, a transparent test earnings ledger, sponsor-card preference controls, and a campaign-ready data structure. It excludes real payments, cash withdrawals, background overlays, advertising SDK reward callbacks, public bidding, and user claims that revenue is guaranteed.

## Accessibility and trust requirements

Every status communicates textually rather than color alone. Users can complete all tasks without engaging with a sponsor, cancel safely, and understand whether an amount is pending, verified, or unavailable. Sponsor content will appear only within the open app and only at a natural wait state after a user initiates a task. No experience will create artificial delays, obscure navigation, or access unrelated apps.
