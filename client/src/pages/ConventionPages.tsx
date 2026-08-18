/**
 * Coastal Civic Modernism: internal pages retain the shared editorial spine,
 * sharp media frames, and factual Convention-only content.
 */
import { Link } from "wouter";
import { ArrowUpRight, Download, MoveRight } from "lucide-react";
import { assets, eventData, registrationCapabilities, themeData, toursData, venueData } from "@/data/conventionData";
import { ArchitecturalGrid, RegistrationCTA, SectionLabel } from "@/components/ConventionPrimitives";
import { ProgrammeTimeline } from "@/components/ProgrammeTimeline";

function PageHero({ number, eyebrow, title, text, image, variant = "standard" }: { number: string; eyebrow: string; title: React.ReactNode; text: string; image?: string; variant?: "programme" | "theme" | "venue" | "speakers" | "experience" | "standard" }) {
  return <section className={`page-hero ${variant}-hero`}><ArchitecturalGrid /><div className="page-hero-copy"><SectionLabel index={number} label={eyebrow} /><h1>{title}</h1><p>{text}</p></div>{variant === "programme" && <div className="programme-document-index" aria-hidden="true"><span>16</span><span>17</span><span>18</span><span>19</span><i /></div>}{variant === "theme" && <div className="theme-transition-index" aria-hidden="true"><span>Fragility</span><i /><span>Adaptation</span><i /><span>Resilience</span></div>}{variant === "venue" && <div className="venue-context-index" aria-hidden="true"><span>Climate</span><span>Material</span><span>Place</span></div>}{image && <figure><img src={image} alt="" /><figcaption>AAK Annual Convention 2026</figcaption></figure>}</section>;
}

export function ProgrammePage() {
  return <><PageHero number="01" eyebrow="Programme" variant="programme" title={<>The work<br />ahead, <em>in room.</em></>} text="A day-based programme structured around resilient practice, policy, people, place, and construction." image={assets.people} /><section className="programme-page"><div className="programme-page-intro"><p>The Secretariat updates the programme as the Convention approaches. Use this page alongside your registration communications for the latest schedule.</p><a href={eventData.programmeUrl} target="_blank" rel="noreferrer" className="button-outline">Open programme PDF <Download size={17} /></a></div><ProgrammeTimeline /></section><RegistrationCTA compact /></>;
}

export function ThemePage() {
  return <><PageHero number="02" eyebrow="Theme" variant="theme" title={<>Shifting the<br />built environment<br /><em>from fragility<br />to resilience.</em></>} text="A Convention premise rooted in climate, local knowledge, material intelligence, and collective practice." /><section className="theme-long"><ArchitecturalGrid tone="dark" /><div className="theme-long-copy">{themeData.paragraphs.map((paragraph, index) => <p key={paragraph} className={index === 0 ? "lede" : ""}>{paragraph}</p>)}</div><div className="theme-areas theme-areas--detail"><p className="eyebrow">Four conversations</p>{themeData.areas.map((area, index) => <div key={area}><span>0{index + 1}</span><p>{area}</p></div>)}</div></section><RegistrationCTA compact /></>;
}

export function SpeakersPage() {
  return <><PageHero number="03" eyebrow="Speakers" title={<>The people<br />shaping the<br /><em>conversation.</em></>} text="Speaker announcements will be published here when the Convention Secretariat confirms the final programme roster." image={assets.people} /><section className="speakers-empty"><div><p className="eyebrow">Speaker roster</p><h2>Being confirmed<br />with the Secretariat.</h2><p>We have intentionally not published a speaker grid before official confirmation. When available, each profile will include role, organisation, session, topic, and biography.</p></div><Link href="/programme" className="text-action">Explore current programme sessions <ArrowUpRight size={18} /></Link></section><RegistrationCTA compact /></>;
}

export function ExperiencePage() {
  const moments = ["Opening cocktail", "Built Environment Baraza", "Dedicated networking spaces", "Team building", "Closing Gala Dinner", "Grow A Classroom awards"];
  return <><PageHero number="04" eyebrow="Experience" title={<>Ideas move<br />when people<br /><em>meet.</em></>} text="The Convention unfolds through professional conversation, informal exchange, shared celebration, and activity beyond the presentation." image={assets.people} /><section className="experience-page"><div className="experience-moments">{moments.map((moment, index) => <article key={moment}><span>0{index + 1}</span><h2>{moment}</h2><MoveRight size={22} /></article>)}</div><div className="experience-note"><p className="eyebrow">Programme note</p><p>Each of these experiences appears in the current AAK programme source. Detailed timings and inclusions should be confirmed with the Secretariat before participant communications are finalised.</p></div></section><RegistrationCTA compact /></>;
}

export function VenuePage() {
  return <><PageHero number="05" eyebrow="Diani / Venue" variant="venue" title={<>A coast that<br />puts practice<br /><em>in context.</em></>} text="Diani is not a backdrop. It is a setting in which resilience, infrastructure, ecology, and community become concrete questions." image={assets.place} /><section className="venue-page"><figure><img src={assets.hero} alt="A Kenyan coastal built-environment landscape" /><figcaption>Coastal context / Diani, Kenya</figcaption></figure><div><p className="eyebrow">Venue</p><h2>{venueData.name}</h2><p>{venueData.copy}</p><p className="venue-caution">{venueData.note}</p><a href={eventData.registrationUrl} target="_blank" rel="noreferrer" className="button-outline">Open accommodation & event source <ArrowUpRight size={17} /></a></div></section><RegistrationCTA compact /></>;
}

export function BuildToursPage() {
  return <><PageHero number="08" eyebrow="Build Tours" title={<>The region is<br />part of the<br /><em>curriculum.</em></>} text="Technical visits connect the Convention’s themes to working infrastructure, mobility, ecology, and community across Kwale and the coast." /><section className="build-tours-page">{toursData.map((tour, index) => <article key={tour.name}><div><span>{tour.number}</span><h2>{tour.name}</h2></div><p>{tour.summary}</p><Link href="/register" className="text-action">Plan your registration <ArrowUpRight size={18} /></Link>{index !== toursData.length - 1 && <i />}</article>)}</section><RegistrationCTA compact /></>;
}

export function RegisterPage() {
  return <><section className="register-hero"><ArchitecturalGrid tone="dark" /><SectionLabel index="09" label="Registration" /><h1>Secure your<br />place in the<br /><em>Convention.</em></h1><p>AAK’s official registration journey guides you from choosing a ticket to receiving your Convention confirmation.</p><a className="button-primary light" href={eventData.registrationUrl} target="_blank" rel="noreferrer">Continue to AAK registration <ArrowUpRight size={18} /></a></section><section className="register-page"><div className="register-steps"><p className="eyebrow">Your route</p>{["Ticket selection", "Registration details", "Booking type", "Payment", "Confirmation"].map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div><div className="register-copy"><p className="eyebrow registration-destination">Official AAK registration</p><p className="lede">Review the steps before continuing to AAK’s official registration journey, where your booking is completed.</p><div className="register-capabilities">{registrationCapabilities.map((capability) => <p key={capability}>{capability}</p>)}</div><p className="register-note">The official registration page opens in a new tab and shows the latest ticket availability and payment options.</p><a className="button-outline" href={eventData.registrationUrl} target="_blank" rel="noreferrer">Open AAK registration <ArrowUpRight size={17} /></a></div></section></>;
}
