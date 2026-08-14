# Stream Wallet Android MVP

Stream Wallet is a focused Expo/React Native Android app inspired by the architecture patterns of Vega App, with original Stream Wallet branding and a deliberately small first-release scope.

## Flow

Browse the local demo shelf, open a title, save it to the local wallet, press Watch, wait through the clearly labeled sponsor gate, and open the recorded provider handoff. The app does not host or download media in this milestone.

## Commands

```bash
pnpm install
pnpm check
pnpm export:android
pnpm start
```

For native Android files and a signed release, run `pnpm prebuild:clean` and then configure EAS or a local Android toolchain. Use a distinct production package ID if `com.streamwallet.app` is unavailable.

## Provider boundary

The demo records use open-film archive links so the flow can be exercised without embedding a commercial stream. Replace them with provider records that include an authorized API or deep link, supported territory, playback mode, quality capability, and verification date. Do not add runtime executable provider modules until source authentication, integrity checks, revocation, sandboxing, and a review process are implemented.
