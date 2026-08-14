// Midnight Ticket Stub: playback handoff page keeps the external-provider boundary visible.
import { Link, useParams } from "wouter";
import { ArrowLeft, ExternalLink, Maximize2, ShieldCheck } from "lucide-react";
import { getFilm } from "@/lib/catalog";

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const film = getFilm(id);
  return <div className="page-wrap page-wrap--watch"><div className="detail-back"><Link href={`/title/${film.id}`} className="back-link"><ArrowLeft size={17} /> Back to title</Link><span className="source-stamp">EXTERNAL PLAYBACK</span></div><section className="watch-shell"><div className="watch-ticket__header"><span>STREAM-WALLET / PLAYBACK PASS</span><span>HD WHERE AVAILABLE</span></div><div className="watch-shell__player"><div className="watch-shell__grain" /><div className="watch-shell__center"><span className="watch-shell__play">▶</span><p>Playback stays with the provider.</p><span>This page is a handoff, not a hosted movie file.</span></div><button className="watch-shell__expand" aria-label="Fullscreen is handled by the provider"><Maximize2 size={17} /></button></div><div className="watch-shell__info"><div><p className="eyebrow">Now handing off</p><h1>{film.title}</h1><p>{film.description}</p></div><div className="provider-handoff"><div className="provider-handoff__row"><span className="provider-handoff__badge"><ShieldCheck size={16} /> Provider</span><strong>{film.providerLabel}</strong></div><p>{film.sourceNote}</p><a className="button button--primary" href={film.providerUrl} target="_blank" rel="noreferrer">Open provider <ExternalLink size={16} /></a></div></div></section></div>;
}
