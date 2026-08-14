// Midnight Ticket Stub: dense discovery cards, calm hover lift, source stamps always visible.
import { Link } from "wouter";
import { Bookmark, BookmarkCheck, Captions, Play } from "lucide-react";
import type { Film } from "@/lib/catalog";

type TitleCardProps = { film: Film; saved: boolean; onToggleSave: (id: string) => void; compact?: boolean };

export function TitleCard({ film, saved, onToggleSave, compact = false }: TitleCardProps) {
  return <article className={compact ? "title-card title-card--compact" : "title-card"}>
    <Link href={`/title/${film.id}`} className="title-card__poster-link" aria-label={`Open ${film.title}`}>
      <div className="title-card__poster"><img src={film.poster} alt="" loading="lazy" /><div className="title-card__poster-overlay" /><span className="source-stamp source-stamp--card">{film.providerLabel.includes("public") ? "PUBLIC DEMO" : "OPEN FILM"}</span><span className="title-card__play"><Play size={15} fill="currentColor" /></span></div>
    </Link>
    <div className="title-card__body"><div className="title-card__heading-row"><Link href={`/title/${film.id}`} className="title-card__title">{film.title}</Link><button className="icon-button icon-button--small" onClick={() => onToggleSave(film.id)} aria-label={saved ? `Remove ${film.title} from wallet` : `Save ${film.title} to wallet`}>{saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}</button></div><div className="title-card__meta"><span>{film.year}</span><span>{film.runtime}</span><span className="meta-rating">★ {film.rating}</span></div>{!compact && <div className="title-card__caption"><Captions size={13} /> {film.captions} caption languages</div>}</div>
  </article>;
}
