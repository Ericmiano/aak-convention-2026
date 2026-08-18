/**
 * Coastal Civic Modernism: Content is separated from presentation so the
 * Convention Secretariat can update official information without redesigning pages.
 */
export const assets = {
  hero: "/manus-storage/aak-convention-hero_ece079ab.jpg",
  place: "/manus-storage/aak-convention-place_466a7ef5.jpg",
  people: "/manus-storage/aak-convention-people_85dad0bd.jpg",
  mark: "/manus-storage/aak-structural-span-mark_edef5493.png",
};

export const eventData = {
  name: "AAK Annual Convention 2026",
  shortName: "AAK Convention 2026",
  dates: { start: "2026-09-16", end: "2026-09-19", label: "16—19 September 2026" },
  location: "Diani, Kenya",
  venue: "Diamond Leisure Beach & Golf Resort",
  theme: "Shifting the Built Environment from Fragility to Resilience",
  cpdPoints: 10,
  priceFrom: "KES 18,000",
  registrationUrl: "https://members.aak.or.ke/eventdetailv2?eid=baM8JnQ3%2BAaNamasUK2rTg%3D%3D",
  programmeUrl:
    "https://members.aak.or.ke/uploads/event/12_202608161506324419_AAKConventionxBiennaleProgramme2026.pdf",
  contact: { email: "aak@aak.or.ke", phone: "+254 721 691 337", official: "https://aak.or.ke" },
};

export const themeData = {
  title: "Shifting the Built Environment from Fragility to Resilience",
  paragraphs: [
    "The Convention calls for a fundamental rethinking of how we design, build and sustain our spaces.",
    "Much of the fragility evident in today’s built environment stems from imported models that disregard local climate, context and indigenous knowledge systems, resulting in spaces that are vulnerable, inefficient and disconnected from the communities they serve.",
    "Yet within Kenya and across Africa lies a deep reservoir of spatial intelligence—rooted in adaptive design, material efficiency and collective living—that has long enabled resilience.",
    "The Convention challenges practitioners and policymakers to move beyond imposed approaches and re-anchor the built environment in locally grounded, ecologically responsive and socially attuned practices, positioning resilience not as a future goal, but as an existing foundation to be recognised, restored and advanced.",
  ],
  areas: [
    "Climate Action and Sustainability",
    "Policy, Urban Governance, and Regulatory Reform",
    "People, Place, and Community Resilience",
    "Innovation, Technology, and the Future of Construction",
  ],
};

export type ProgrammeItem = {
  day: "16 Sept" | "17 Sept" | "18 Sept" | "19 Sept";
  time: string;
  type: string;
  title: string;
  detail?: string;
  speaker?: string;
};

export const programmeData: ProgrammeItem[] = [
  { day: "16 Sept", time: "All day", type: "Arrival", title: "Arrival and registration", detail: "AAK Secretariat" },
  { day: "16 Sept", time: "09:00—14:00", type: "Community", title: "Grow A Classroom mentorship at Mabokoni Primary School" },
  { day: "16 Sept", time: "18:00—18:15", type: "Opening", title: "Welcome remarks", speaker: "Arch. George A. Ndege, President, Architectural Association of Kenya" },
  { day: "16 Sept", time: "18:15—18:30", type: "Opening", title: "Guest address", speaker: "Dr. Margarita Garfias Royo, University College London" },
  { day: "16 Sept", time: "18:30—18:45", type: "Opening", title: "International body remarks", speaker: "QS Audily Chatora, President, Zimbabwe Institute of Quantity Surveyors" },
  { day: "16 Sept", time: "19:00—21:00", type: "Reception", title: "Opening cocktail" },
  { day: "17 Sept", time: "09:00—09:20", type: "Climate Action", title: "Nature Based Solutions as a tool for Resilience in the Built Environment", speaker: "Dr. Land. Arch. Sunday Abuje" },
  { day: "17 Sept", time: "09:20—09:40", type: "Climate Action", title: "Beyond Green Buildings: Circular Material as the Next Frontier of Urban Resilience in Ecosystems in Africa", speaker: "Arch. Roy Githaiga" },
  { day: "17 Sept", time: "09:40—10:20", type: "Climate Action", title: "Plenary and Q&A discussion", detail: "With Arch. Roy Githaiga and Dr. Land. Arch. Sunday Abuje" },
  { day: "17 Sept", time: "11:00—12:00", type: "Governance", title: "Workshop: Discussion on implementation of subthemes in the Built Environment", detail: "ADC Fellowship and MASS Design Team" },
  { day: "17 Sept", time: "12:10—12:30", type: "Governance", title: "Devolution Has Fragmented Urban Governance in Kenya: Legislative Layering, Coordinated Resilience Planning, and the Case of the Nairobi Metropolitan Region", speaker: "Pln. Simon Kamau" },
  { day: "17 Sept", time: "12:30—12:50", type: "Governance", title: "Urban Rental Housing: The Missing Lever in City Climate Action — A Policy Brief", speaker: "Dr. Linda Gichuyia" },
  { day: "17 Sept", time: "14:30—16:00", type: "Practice", title: "Built Environment Baraza", detail: "Discussion on outcomes of the survey on practice in the built environment" },
  { day: "18 Sept", time: "09:30—09:50", type: "People & Place", title: "From Sophistication to Stigma: Reclaiming the Swahili Urban Legacy for a Resilient Kenya", speaker: "Mohammed Ali Mwenje, National Museums of Kenya" },
  { day: "18 Sept", time: "09:50—10:10", type: "People & Place", title: "Designing Africa from Within: Cultural Anchors and Community Resilience in the Built Environment", speaker: "Arch. Hatem El Taher / Arch. Rehab Elnaggar" },
  { day: "18 Sept", time: "10:10—10:40", type: "People & Place", title: "Panel and Q&A session" },
  { day: "18 Sept", time: "11:20—11:40", type: "Innovation", title: "The Role of Material Logic on Spatial Outcomes in Kenyan Juakalis: A Case of Thika Kigandaini", speaker: "CPM. Maria Wanjiku Gicheha" },
  { day: "18 Sept", time: "12:00—12:40", type: "Innovation", title: "Panel and Q&A session" },
  { day: "18 Sept", time: "12:40—13:00", type: "Closing", title: "Call to Action: Rapporteur General Report", speaker: "Arch. Michael Mathenge" },
  { day: "18 Sept", time: "14:00—18:00", type: "Build Tour", title: "Build tour of Kwale", detail: "Ukunda Airport and Mwache Dam" },
  { day: "18 Sept", time: "14:00—18:00", type: "Experience", title: "Team building", detail: "Water polo and beach volleyball" },
  { day: "18 Sept", time: "19:00—Late", type: "Gala", title: "Closing gala dinner", detail: "Including Grow A Classroom Student Design Competition Awards" },
  { day: "19 Sept", time: "All day", type: "Build Tour", title: "Post-Convention build tour", detail: "Kisite Mpunguti Marine National Park / Wasini Island and Mombasa Lunatic Express" },
];

export const toursData = [
  { number: "01", name: "Mwache Dam Project", summary: "A technical visit focused on water infrastructure and regional resilience in Kwale County." },
  { number: "02", name: "Ukunda Airport Terminal Expansion", summary: "A close look at a changing regional mobility gateway serving Diani and the South Coast." },
  { number: "03", name: "Kisite Mpunguti Marine Park & Wasini Island", summary: "A coastal landscape visit framing ecology, community, and place in the wider Convention context." },
];

export const venueData = {
  name: "Diamond Leisure Beach & Golf Resort",
  location: "Diani, Kenya",
  note: "Venue name should be reconfirmed against AAK’s final approved event data before public launch.",
  copy: "Diani gives the Convention a setting in which questions of climate, infrastructure, material practice, community, and the coastal environment can be considered in lived context—not only from the conference room.",
};

export const registrationCapabilities = [
  "Member and non-member registration",
  "Individual and multiple-ticket bookings",
  "Self-sponsored and organisation-sponsored booking",
  "M-PESA, Visa / Mastercard, and offline payment",
];
