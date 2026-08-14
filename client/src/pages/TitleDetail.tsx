// Midnight Ticket Stub: title detail makes the provider, source, and post-ad action explicit.
import { useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, Play, ShieldCheck, Star } from "lucide-react";
import { AdGate } from "@/components/AdGate";
import { getFilm } from "@/lib/catalog";

export default function TitleDetail() {
  const { id } = useParams<{ id: string }>();
  const film = getFilm(id);
  const [, navigate] = useLocation();
  const [showAd, setShowAd] = useState(false);
  const [saved, setSaved] = useState(() => JSON.parse(window.localStorage.getItem("stream-wallet") ?? "[]").includes(film.id));
  const toggleSave = () => setSaved((current: boolean) => { const list: string[] = JSON.parse(window.localStorage.getItem("stream-wallet") ?? "[]"); const next = current ? list.filter((item) => item !== film.id) : [...list, film.id]; window.localStorage.setItem("stream-wallet", JSON.stringify(next)); return !current; });
  return <div className="page-wrap page-wrap--detail"><div className="detail-back"><Link href="/" className="back-link"><ArrowLeft size={17} /> Back to shelf</Link><span className="source-stamp">TITLE DETAIL</span></div><section className="detail-hero"><div className="detail-hero__visual"><img src={film.backdrop} alt="" /><div className="detail-hero__visual-shade" /><div className="detail-hero__poster"><img src={film.poster} alt="" /></div></div><div className="detail-hero__copy"><p className="eyebrow">{film.type} · {film.year}</p><h1>{film.title}</h1><div className="detail-meta"><span><Star size={15} fill="currentColor" /> {film.rating}</span><span>{film.runtime}</span><span>{film.language}</span><span>{film.captions} caption languages</span></div><p className="detail-description">{film.description}</p><div className="detail-actions"><button className="button button--primary" onClick={() => setShowAd(true)}><Play size={17} fill="currentColor" /> Watch in HD</button><button className="button button--secondary" onClick={toggleSave}>{saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}{saved ? "Saved to wallet" : "Save to wallet"}</button></div><div className="provider-card"><div className="provider-card__icon"><ShieldCheck size={18} /></div><div><p className="eyebrow">Authorized provider record</p><strong>{film.providerLabel}</strong><span>{film.sourceNote}</span></div><ExternalLink size={15} /></div></div></section><section className="detail-lower"><div><p className="eyebrow">What happens next</p><h2>One clear handoff.</h2></div><div className="steps"><div><span>01</span><strong>Watch</strong><p>Choose Watch in HD from this title page.</p></div><div><span>02</span><strong>Sponsor message</strong><p>See a short, clearly labeled ad slot.</p></div><div><span>03</span><strong>Provider</strong><p>Continue to the documented external source.</p></div></div></section>{showAd && <AdGate film={film} onClose={() => setShowAd(false)} onContinue={() => navigate(`/watch/${film.id}`)} />}</div>;
}
