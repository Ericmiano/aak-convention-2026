/**
 * A database-free bridge between the code-first Convention site and a future
 * WordPress content model. The visual frontend continues to consume the
 * existing Convention data directly; this module makes the eventual migration
 * fields explicit and provides a portable export shape for content entry.
 */
import {
  assets,
  eventData,
  programmeData,
  registrationCapabilities,
  technicalTourData,
  themeData,
  toursData,
  venueData,
} from "./conventionData";

export const wordpressContentModel = {
  siteOptions: {
    label: "Convention settings",
    fields: [
      "event_name",
      "short_name",
      "start_date",
      "end_date",
      "date_label",
      "location",
      "venue_name",
      "theme",
      "cpd_points",
      "registration_url",
      "programme_url",
      "contact_email",
      "contact_phone",
      "hero_image",
      "place_image",
      "people_image",
      "structural_mark",
    ],
  },
  themePage: {
    label: "Theme page fields",
    fields: ["title", "intro_paragraphs", "focus_areas"],
  },
  programmeSession: {
    label: "Programme session custom post type",
    fields: ["day", "time", "session_type", "title", "detail", "speaker"],
  },
  technicalTour: {
    label: "Technical tour custom post type",
    fields: ["number", "timing", "name", "lens", "image", "image_alt", "summary", "source_label", "source_url"],
  },
  registration: {
    label: "Registration page fields",
    fields: ["registration_url", "booking_capabilities"],
  },
} as const;

export type WordPressMigrationPayload = {
  siteOptions: Record<string, string | number>;
  themePage: {
    title: string;
    introParagraphs: string[];
    focusAreas: string[];
  };
  programmeSessions: typeof programmeData;
  technicalTours: typeof technicalTourData;
  registration: {
    registrationUrl: string;
    bookingCapabilities: readonly string[];
  };
};

/**
 * Produces a JSON-serialisable, WordPress-ready content handoff. It is an
 * export contract only: no database, WordPress request, or frontend rendering
 * path depends on this function.
 */
export function buildWordPressMigrationPayload(): WordPressMigrationPayload {
  return {
    siteOptions: {
      event_name: eventData.name,
      short_name: eventData.shortName,
      start_date: eventData.dates.start,
      end_date: eventData.dates.end,
      date_label: eventData.dates.label,
      location: eventData.location,
      venue_name: eventData.venue,
      theme: eventData.theme,
      cpd_points: eventData.cpdPoints,
      registration_url: eventData.registrationUrl,
      programme_url: eventData.programmeUrl,
      contact_email: eventData.contact.email,
      contact_phone: eventData.contact.phone,
      hero_image: assets.hero,
      place_image: assets.place,
      people_image: assets.people,
      structural_mark: assets.mark,
    },
    themePage: {
      title: themeData.title,
      introParagraphs: [...themeData.paragraphs],
      focusAreas: [...themeData.areas],
    },
    programmeSessions: programmeData.map(session => ({ ...session })),
    technicalTours: technicalTourData.map(tour => ({ ...tour })),
    registration: {
      registrationUrl: eventData.registrationUrl,
      bookingCapabilities: [...registrationCapabilities],
    },
  };
}

/**
 * Guards the portable contract so a future WordPress import never receives
 * incomplete source-labelled event content from the code-first site.
 */
export function validateWordPressMigrationPayload(payload: WordPressMigrationPayload): string[] {
  const issues: string[] = [];
  const options = payload.siteOptions;

  if (!options.event_name || !options.start_date || !options.end_date) {
    issues.push("Convention settings must include an event name and date range.");
  }

  if (!String(options.registration_url).startsWith("https://members.aak.or.ke/")) {
    issues.push("Registration must keep the official AAK members-platform URL.");
  }

  if (payload.programmeSessions.length === 0) {
    issues.push("At least one programme session is required.");
  }

  if (payload.technicalTours.some(tour => !tour.sourceLabel || !tour.sourceUrl.startsWith("https://"))) {
    issues.push("Every technical tour must preserve a source label and HTTPS source URL.");
  }

  if (payload.themePage.introParagraphs.length === 0 || payload.themePage.focusAreas.length === 0) {
    issues.push("The theme page must retain its introductory copy and focus areas.");
  }

  return issues;
}

export const legacyTourSummaries = toursData.map(tour => ({ ...tour }));
