# Mobile preview notes

The Expo web preview rendered the Stream Wallet home screen successfully with the brand header, featured title, search field, genre filters, catalog entries, and Browse/Wallet tabs. The browser console showed no errors.

Two polish issues were observed: remote poster/backdrop images did not render in the preview, so the catalog needs local bundled artwork or a reliable project asset source; and the template’s unused `two` route is still visible as a third tab because `mobile/app/(tabs)/two.tsx` remains in the route directory. Remove the unused template route before committing.

After switching to local bundled artwork and deleting `two.tsx`, the refreshed preview shows only Browse and Wallet routes, and the Expo Android export succeeds. The screenshot renderer still shows dark image rectangles for the bundled artwork, although the logo asset is present in the route output and the Android bundle contains the asset references. Treat native Android rendering as the authoritative check for these packaged images.

The `/title/big-buck-bunny` route renders successfully with back navigation, Watch After Sponsor, bookmark control, synopsis, source record, quality label, and disclosure copy. No route error appeared in the browser smoke test.

The `/gate/big-buck-bunny` route renders a sponsor message, advertisement slot placeholder, 4-second countdown, and disabled Continue button. After the countdown the action changes to “Ready when you are” and the Continue button becomes enabled, confirming the intended gate transition.

Clicking Continue routes successfully to `/provider/big-buck-bunny`, which shows the Stream Wallet logo, provider handoff copy, source name, demo badge, HD label, Open Provider action, Return to Browse action, and the no-media-stored disclosure.
