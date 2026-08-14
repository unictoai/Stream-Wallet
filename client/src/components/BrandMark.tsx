// Midnight Ticket Stub: a ticket-notch mark is the only expressive brand symbol.
export function BrandMark({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "brand-mark brand-mark--compact" : "brand-mark"} aria-hidden="true"><svg viewBox="0 0 44 44"><path d="M8 10.5A3.5 3.5 0 0 1 11.5 7h21A3.5 3.5 0 0 1 36 10.5v4.2a3.8 3.8 0 0 0 0 7.6v4.2A3.5 3.5 0 0 1 32.5 30h-21A3.5 3.5 0 0 1 8 26.5v-4.2a3.8 3.8 0 0 0 0-7.6v-4.2Z" fill="currentColor" /><path d="m18 13.5 10 5-10 5v-10Z" fill="#0D1117" /><path d="M14 11.5v2M14 25v2" stroke="#0D1117" strokeWidth="1.5" strokeLinecap="round" /></svg></span>;
}
