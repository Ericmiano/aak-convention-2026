/**
 * Coastal Civic Modernism: reusable editorial primitives use sharp frames,
 * indexed labels, and connecting rules instead of generic cards.
 */
import { ArrowUpRight, CalendarDays, MapPin, Award } from "lucide-react";
import { eventData } from "@/data/conventionData";

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return <p className="section-label"><span>{index}</span>{label}</p>;
}

export function ArchitecturalGrid({ tone = "light" }: { tone?: "light" | "dark" }) {
  return <div className={`architectural-grid ${tone}`} aria-hidden="true"><i /><i /><i /><i /></div>;
}

export function EventMeta() {
  return <dl className="event-meta">
    <div><dt><CalendarDays size={17} /> Dates</dt><dd>16—19<br />September</dd></div>
    <div><dt><MapPin size={17} /> Place</dt><dd>Diani,<br />Kenya</dd></div>
    <div><dt><Award size={17} /> Learning</dt><dd>{eventData.cpdPoints}<br />CPD points</dd></div>
  </dl>;
}

export function RegistrationCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`registration-cta ${compact ? "compact" : ""}`}>
      <div><SectionLabel index="09" label="Registration" /><h2>Choose your place<br />in the Convention.</h2></div>
      <div className="cta-details"><p>Review the official registration journey before continuing to select your ticket, share attendee details, and complete your booking.</p><a href="/register" className="button-primary">Registration information <ArrowUpRight size={18} /></a></div>
    </section>
  );
}
