# Stream-Wallet visual direction

## Three possible approaches

### Theme Name: Midnight Ticket Stub
Very Brief Intro: A restrained cinematic interface inspired by paper tickets, dark screening rooms, and warm marquee light. It keeps the flow fast and legible while making the Watch action feel like the single clear destination.
Probability: 0.07

### Theme Name: Daylight Program Guide
Very Brief Intro: An editorial, light-first catalog that feels like a trusted weekend newspaper for what to watch. It emphasizes calm scanning, source transparency, and generous whitespace.
Probability: 0.04

### Theme Name: Signal Room
Very Brief Intro: A technical broadcast-console aesthetic with cool blue surfaces, data labels, and crisp status signals. It would make provider and rights metadata feel operational and precise.
Probability: 0.08

## Selected approach: Midnight Ticket Stub

### Design Movement
Contemporary cinematic editorial design with cues from independent cinema programs, old ticket stock, and modern streaming utility.

### Core Principles
1. One clear action: browsing is relaxed, but the Watch flow is direct and unambiguous.
2. Trust is visible: provider/source labels, “HD available,” and ad disclosure are treated as product UI, not legal footnotes.
3. Contrast over decoration: near-black surfaces, warm paper tones, and a single amber accent create hierarchy without neon effects.
4. Compact discovery, spacious decisions: rails can be dense, while title detail and the ad gate get enough room to feel calm.

### Color Philosophy
The base is a blue-black charcoal that feels like a screening room without becoming oppressive. Warm ivory is used for reading surfaces and primary text, while a burnt-marquee amber marks the Watch action and saved states. A muted sea-glass teal is reserved for authorized-provider and availability signals. The palette is deliberately narrow so the user always knows where to look next.

### Layout Paradigm
Use a persistent left rail on desktop and a bottom dock on mobile, with a wide asymmetric content stage. The home screen leads with a compact hero and then moves into horizontal rails rather than a centered marketing grid. Detail pages use a split poster/metadata composition that collapses into a stacked mobile flow. The ad gate is a focused two-column card, not a full-screen dark interruption.

### Signature Elements
1. Ticket-edge micro dividers: short perforation-like rules used between metadata groups.
2. Marquee amber Watch button: the only high-saturation action color in the product.
3. Provider/source stamp: a small uppercase stamp that communicates “authorized link” or “demo playback.”

### Interaction Philosophy
Every interaction should reduce uncertainty. Cards reveal title metadata on hover without autoplay. The Watch button explains the next step (“Sponsor message, then provider”) before opening the ad gate. The provider handoff names the destination and opens it in a new tab only after a deliberate click.

### Animation
Use 180–240ms ease-out transitions for cards, buttons, drawers, and the ad gate. Cards lift by 2px and brighten their border on hover. The ad gate enters with a small translateY and opacity transition, never a scale-from-zero effect. Rails scroll smoothly only for pointer gestures; keyboard navigation remains instant. Respect prefers-reduced-motion.

### Typography System
Use a display serif with a slightly literary feel for hero and title headings, paired with a neutral sans for navigation, metadata, and CTAs. Headings should be high contrast and compact; metadata should use uppercase tracking sparingly; body copy should remain 15–17px with generous line-height. Do not use Inter.

### Brand Essence
Stream-Wallet is a focused watch-first discovery companion for people who want to pick a title quickly and continue through an authorized provider without noise. Personality: **direct, warm, trustworthy**.

### Brand Voice
Headlines are short and cinematic. CTAs name the next action and its consequence. Microcopy is transparent about ads, providers, and demo content.

Example lines:
- “Pick a title. Keep the night moving.”
- “One sponsor message, then you’ll continue with the provider.”

### Wordmark & Logo
Use a custom “ticket notch” mark: a compact rounded rectangle with one offset perforation cut and a small forward-pointing play wedge inside. The symbol should work without text in the header and favicon; the wordmark should pair the mark with a custom-spaced uppercase STREAM and a lighter WALLET.

### Signature Brand Color
Marquee Amber: `#F3B34C` — warm enough to feel cinematic, restrained enough to remain trustworthy, and ownable as the singular Watch/action signal.

## Scope rules for this MVP

The first release contains only title discovery, search/filtering, title detail, an ad/interstitial step, and a clearly labeled handoff to an authorized third-party playback URL or a local demo playback route. It does not host movies, download media, scrape unknown streaming sites, include community features, or claim that a third-party URL is legal without a verified provider record.
