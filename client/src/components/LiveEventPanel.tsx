/**
 * Coastal Civic Modernism: a source-labelled ticket ledger gives visitors current
 * AAK event facts without disguising expiry status as numeric ticket inventory.
 */
import { ArrowUpRight, Award, CalendarDays, CircleAlert, MapPin, Ticket } from "lucide-react";
import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { eventData } from "@/data/conventionData";
import { ArchitecturalGrid, SectionLabel } from "@/components/ConventionPrimitives";

function TicketPanelSkeleton() {
  return <section className="live-event-panel live-event-panel--loading" aria-live="polite" aria-busy="true"><span className="sr-only">Loading current AAK event information</span><div className="live-skeleton"><i /><i /><i /><i /></div></section>;
}

export function LiveEventPanel({ compact = false }: { compact?: boolean }) {
  const simulateFailure = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("liveSource") === "fallback";
  const sourceInput = useMemo(() => simulateFailure ? { simulateFailure: true } : undefined, [simulateFailure]);
  const eventQuery = trpc.liveEvent.get.useQuery(sourceInput, { staleTime: 5 * 60 * 1000, retry: 0, refetchOnWindowFocus: true });

  if (eventQuery.isLoading) return <TicketPanelSkeleton />;
  if (eventQuery.isError || !eventQuery.data) {
    return <section className="live-event-panel live-event-panel--fallback"><CircleAlert size={20} aria-hidden="true" /><div><p className="eyebrow">Current AAK information</p><h2>View the latest ticket and event details.</h2><p>The official AAK event page remains the current source while this page reconnects.</p></div><a href={eventData.registrationUrl} target="_blank" rel="noreferrer" className="button-outline">Open AAK event page <ArrowUpRight size={17} /></a></section>;
  }

  const event = eventQuery.data;
  const refreshedAt = new Intl.DateTimeFormat("en-KE", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }).format(new Date(event.fetchedAt));
  return <section className={`live-event-panel ${compact ? "is-compact" : ""}`}>
    <ArchitecturalGrid />
    <div className="live-event-heading"><SectionLabel index="07" label="Current event information" /><div><p className="eyebrow">Live source / AAK event page</p><h2>What is<br /><em>open now.</em></h2></div><p>Prices, eligibility, and ticket status are refreshed from the public AAK event source. Status reflects the source’s active and expiry information, not a numeric remaining-seat count.</p></div>
    <div className="live-event-facts"><div><CalendarDays size={17} /><span>Calendar</span><strong>{event.dateRange}</strong></div><div><MapPin size={17} /><span>Venue</span><strong>{event.venue}</strong></div><div><Award size={17} /><span>Learning</span><strong>{event.cpdPoints ? `${event.cpdPoints} CPD points` : "See source"}</strong></div></div>
    <div className="live-ticket-ledger"><div className="live-ticket-ledger-head"><p>Ticket type</p><p>Price</p><p>Source status</p></div>{event.tickets.map(ticket => <article key={`${ticket.name}-${ticket.amount}`}><div><p>{ticket.name}</p><span>{ticket.audience}</span></div><strong>{new Intl.NumberFormat("en-KE", { style: "currency", currency: ticket.currency, maximumFractionDigits: 0 }).format(ticket.amount)}</strong><span className={`ticket-status ${ticket.isOpen ? "is-open" : "is-closed"}`}>{ticket.status}</span></article>)}</div>
    <div className="live-event-footer"><p>Last checked {refreshedAt}. Ticket selection, booking details, and payment are completed in the official AAK registration journey.</p><div className="live-event-actions">{event.programmeUrl && <a href={event.programmeUrl} target="_blank" rel="noreferrer" className="button-outline">Open current programme <ArrowUpRight size={17} /></a>}<a href={event.registrationUrl} target="_blank" rel="noreferrer" className="button-primary"><Ticket size={17} /> Continue to AAK registration <ArrowUpRight size={17} /></a></div></div>
  </section>;
}
