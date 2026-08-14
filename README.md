# Stream-Wallet

Stream-Wallet is a focused streaming-discovery web MVP. The current flow is deliberately small: browse a rights-safe demo catalog, open a title, choose **Watch in HD**, see a clearly labeled sponsor interstitial, and then open an external provider handoff in a new tab.

## Scope boundary

This project does not host movies or series, does not download media, and does not scrape unknown streaming sites. The sample catalog uses open-film/demo provider links so the interaction can be tested without pretending that Stream-Wallet owns or licenses a commercial catalog. Before production, each `providerUrl` must be replaced with a provider record that has documented rights, territories, permitted playback actions, and a current verification date.

The sponsor screen is a UI prototype, not a live ad-network integration. Replace it with a compliant ad partner only after reviewing the provider’s policies, consent requirements, frequency rules, age restrictions, and app-store requirements.

## Run locally

```bash
pnpm install
pnpm dev
```

The MVP is a static React frontend. The watchlist is stored in browser local storage, and playback remains outside the app. The main routes are `/`, `/title/:id`, and `/watch/:id`.

## Before launch

Use a distinct brand and original artwork. Verify every playable provider and title right, publish current privacy and terms pages, add a takedown contact, and do not market third-party playback as legal unless the provider rights have been reviewed. Google Play’s intellectual-property policy warns against unauthorized streaming and requires original or licensed app/store content: https://support.google.com/googleplay/android-developer/answer/9888072?hl=en.
