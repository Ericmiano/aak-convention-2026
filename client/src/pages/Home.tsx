/**
 * Coastal Civic Modernism: homepage moves from an unsettled editorial hero toward
 * aligned programme, place, and registration sections without Biennale content.
 */
import { Link } from "wouter";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { assets, eventData, themeData, toursData, venueData } from "@/data/conventionData";
import { ArchitecturalGrid, EventMeta, RegistrationCTA, SectionLabel } from "@/components/ConventionPrimitives";
import { ProgrammeTimeline } from "@/components/ProgrammeTimeline";

export default function Home() {
  return <>
    <section className="hero-section">
      <ArchitecturalGrid tone="dark" />
      <div className="hero-copy">
        <p className="hero-kicker">Architectural Association of Kenya <span /> Annual Convention</p>
        <h1><span>AAK Annual</span>Convention<br /><em>2026</em></h1>
        <p className="hero-theme">Shifting the Built Environment<br />from Fragility to Resilience</p>
        <div className="hero-actions"><a href={eventData.registrationUrl} target="_blank" rel="noreferrer" className="button-primary light">Register for the Convention <ArrowUpRight size={18} /></a><Link href="/programme" className="text-action">Explore programme <ArrowDownRight size={18} /></Link></div>
      </div>
      <div className="hero-image-wrap"><img src={assets.hero} alt="A coastal Kenyan architectural landscape" className="hero-image" /><div className="hero-caption"><span>16—19 September</span><span>Diani, Kenya</span></div></div>
      <div className="hero-index" aria-hidden="true"><span>01</span><i /><span>2026</span></div>
    </section>

    <section className="intro-section editorial-section">
      <div className="section-rail"><SectionLabel index="01" label="The Convention" /></div>
      <div className="intro-copy"><p className="lede">AAK’s annual gathering brings practitioners from national and county government, private practice, and academia together to examine the conditions shaping Kenya’s built environment.</p><p>The 2026 Convention is a place to exchange grounded knowledge, test ideas across disciplines, and move professional practice toward resilient, ecologically responsive futures.</p></div>
      <EventMeta />
    </section>

    <section className="theme-section">
      <div className="theme-gridline" aria-hidden="true" /><div className="theme-intro"><SectionLabel index="02" label="The Theme" /><h2>From a field<br />of <em>fragments</em><br />to a shared<br /><strong>structure.</strong></h2></div>
      <div className="theme-body"><p>{themeData.paragraphs[1]}</p><Link href="/theme" className="text-action">Read the theme in full <ArrowUpRight size={18} /></Link></div>
      <div className="theme-areas">{themeData.areas.map((area, index) => <Link href="/theme" key={area}><span>0{index + 1}</span><p>{area}</p><ArrowUpRight size={16} /></Link>)}</div>
    </section>

    <section className="programme-section editorial-section">
      <div className="programme-heading"><SectionLabel index="03" label="Programme" /><h2>Ideas in<br />conversation.</h2><p>Explore the Convention day by day. Session detail is drawn from AAK’s current programme source and remains subject to official confirmation.</p></div>
      <ProgrammeTimeline limit={4} />
      <Link href="/programme" className="text-action programme-link">Open full programme <ArrowUpRight size={18} /></Link>
    </section>

    <section className="experience-section">
      <div className="experience-image"><img src={assets.people} alt="Built-environment professionals working around architectural drawings" loading="lazy" /><p>Professional exchange,<br />made tangible.</p></div>
      <div className="experience-copy"><SectionLabel index="04" label="The Convention Experience" /><h2>More than<br />the session<br /><em>room.</em></h2><p>The programme extends through networking, the opening cocktail, a baraza on practice, team activity, the Closing Gala Dinner, and technical visits that put Diani and Kwale’s built environment into context.</p><Link href="/experience" className="button-outline">Explore the experience <ArrowUpRight size={17} /></Link></div>
    </section>

    <section className="venue-section">
      <div className="venue-copy"><SectionLabel index="05" label="Diani / Venue" /><h2>Diani.<br /><em>Where the conversation happens.</em></h2><p>{venueData.copy}</p><Link href="/venue" className="text-action">Explore the setting <ArrowUpRight size={18} /></Link></div>
      <figure><img src={assets.place} alt="Climate-responsive coastal architecture in Kenya" loading="lazy" /><figcaption>{venueData.name}<br />{venueData.location}</figcaption></figure>
    </section>

    <section className="tours-section editorial-section"><div className="tours-heading"><SectionLabel index="06" label="Build Tours" /><h2>See the built<br />environment<br />in context.</h2></div><div className="tours-list">{toursData.map((tour) => <Link href="/build-tours" key={tour.name}><span>{tour.number}</span><div><h3>{tour.name}</h3><p>{tour.summary}</p></div><ArrowUpRight size={20} /></Link>)}</div></section>
    <RegistrationCTA />
  </>;
}
