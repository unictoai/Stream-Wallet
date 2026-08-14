// Midnight Ticket Stub: a transparent sponsor gate before an external provider handoff.
import { useEffect, useState } from "react";
import { ExternalLink, ShieldCheck, X } from "lucide-react";
import type { Film } from "@/lib/catalog";

type AdGateProps = { film: Film; onClose: () => void; onContinue: () => void };

export function AdGate({ film, onClose, onContinue }: AdGateProps) {
  const [seconds, setSeconds] = useState(4);
  useEffect(() => { const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, []);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="ad-gate" role="dialog" aria-modal="true" aria-labelledby="ad-gate-title"><button className="icon-button ad-gate__close" onClick={onClose} aria-label="Close sponsor message"><X size={20} /></button>
      <div className="ad-gate__label"><span className="ad-dot" /> Sponsored message <span className="ticket-perforation" aria-hidden="true" /></div>
      <div className="ad-gate__content"><div className="ad-gate__art" style={{ backgroundImage: `url(${film.backdrop})` }}><div className="ad-gate__art-shade" /><span>STREAM-WALLET</span></div><div className="ad-gate__copy"><p className="eyebrow">Before you watch</p><h2 id="ad-gate-title">One short sponsor message, then the provider.</h2><p>Stream-Wallet does not host this film. You will continue to <strong>{film.providerLabel}</strong> in a new tab.</p><div className="ad-gate__trust"><ShieldCheck size={17} /><span>Provider handoff · no downloads from Stream-Wallet</span></div><button className="button button--primary button--wide" disabled={seconds > 0} onClick={onContinue}>{seconds > 0 ? `Continue in 0:0${seconds}` : <>Continue to provider <ExternalLink size={16} /></>}</button><span className="ad-gate__fineprint">Prototype sponsor slot. Connect a compliant ad partner before production launch.</span></div></div>
    </section>
  </div>;
}
