/**
 * Coastal Civic Modernism: converts the public AAK event page into a narrow,
 * source-faithful event brief without pretending it exposes numeric ticket stock.
 */
import axios from "axios";

export const AAK_EVENT_SOURCE_URL = "https://members.aak.or.ke/eventdetailv2?eid=baM8JnQ3%2BAaNamasUK2rTg%3D%3D";
const AAK_TICKET_ENDPOINT = "https://members.aak.or.ke/EventDetail4.aspx/reloadRepeater";
const SOURCE_EVENT_ID = "70965";
const SOURCE_COMPANY_ID = "12";
const CACHE_TTL_MS = 5 * 60 * 1000;

type SourceTicket = {
  Name?: string;
  ForMember?: string | number;
  ticketAmount?: number;
  currency?: string;
  ticketExpiryDate?: string;
  isActive?: boolean;
  ticketTypeActive?: boolean;
};

export type LiveTicket = {
  name: string;
  audience: "Members only" | "Non-members only" | "Members and non-members";
  amount: number;
  currency: string;
  expiryDate: string | null;
  status: string;
  isOpen: boolean;
};

export type LiveAakEvent = {
  name: string;
  dateRange: string;
  venue: string;
  cpdPoints: number | null;
  category: string | null;
  eventType: string | null;
  tickets: LiveTicket[];
  sourceUrl: string;
  registrationUrl: string;
  programmeUrl: string | null;
  fetchedAt: number;
};

let cachedEvent: { value: LiveAakEvent; expiresAt: number } | null = null;

function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&ndash;/gi, "–")
    .replace(/&rsquo;/gi, "’")
    .replace(/\s+/g, " ")
    .trim();
}

function extractText(html: string, pattern: RegExp) {
  const match = html.match(pattern);
  return match?.[1] ? stripHtml(match[1]) : null;
}

function audienceFromMemberFlag(flag: SourceTicket["ForMember"]): LiveTicket["audience"] {
  if (String(flag) === "1") return "Members only";
  if (String(flag) === "0") return "Non-members only";
  return "Members and non-members";
}

function toStatus(ticket: SourceTicket, now: Date): Pick<LiveTicket, "status" | "isOpen" | "expiryDate"> {
  const expiry = ticket.ticketExpiryDate ? new Date(ticket.ticketExpiryDate) : null;
  const sourceActive = ticket.isActive !== false && ticket.ticketTypeActive !== false;
  const validExpiry = Boolean(expiry && !Number.isNaN(expiry.valueOf()));
  const isOpen = sourceActive && (!validExpiry || (expiry as Date).getTime() > now.getTime());

  if (!isOpen) return { status: "Closed", isOpen: false, expiryDate: validExpiry ? (expiry as Date).toISOString() : null };
  if (!validExpiry) return { status: "Available", isOpen: true, expiryDate: null };

  const daysLeft = Math.ceil(((expiry as Date).getTime() - now.getTime()) / 86_400_000);
  return {
    status: `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`,
    isOpen: true,
    expiryDate: (expiry as Date).toISOString(),
  };
}

export function mapTickets(source: SourceTicket[], now = new Date()): LiveTicket[] {
  return source
    .filter(ticket => typeof ticket.Name === "string" && typeof ticket.ticketAmount === "number")
    .map(ticket => ({
      name: ticket.Name!.trim(),
      audience: audienceFromMemberFlag(ticket.ForMember),
      amount: ticket.ticketAmount as number,
      currency: ticket.currency || "KES",
      ...toStatus(ticket, now),
    }));
}

export function parseEventPage(html: string) {
  const pageText = stripHtml(html);
  const dateRange = extractText(html, /<h2[^>]*>\s*([^<]*\d{1,2}\s+Sep[^<]*)<\/h2>/i) || "Dates to be confirmed";
  const venue = extractText(html, /fa-map-marker[\s\S]{0,400}?<span>([^<]+)<\/span>/i) || "Venue information on the official AAK event page";
  const title = extractText(html, /About this event[\s\S]{0,700}?<h2[^>]*>\s*([^<]+)<\/h2>/i) || "AAK Annual Convention 2026";
  const cpdMatch = pageText.match(/(\d+)\s+CPD\s+Points/i);
  const categoryMatch = pageText.match(/Category:\s*([^\s][\s\S]{0,80}?)\s+Event type:/i);
  const eventTypeMatch = pageText.match(/Event type:\s*([^\s][\s\S]{0,60}?)(?:\s+Tickets Available|\s+The AAK Annual|$)/i);
  const programmeMatch = html.match(/href=["']([^"']+\.pdf)["'][^>]*>[\s\S]{0,300}?Event Programme PDF/i);

  return {
    name: title,
    dateRange,
    venue,
    cpdPoints: cpdMatch ? Number(cpdMatch[1]) : null,
    category: categoryMatch?.[1]?.trim() || null,
    eventType: eventTypeMatch?.[1]?.trim() || null,
    programmeUrl: programmeMatch?.[1] ? new URL(programmeMatch[1], "https://members.aak.or.ke").toString() : null,
  };
}

export async function getLiveAakEvent(forceRefresh = false): Promise<LiveAakEvent> {
  if (!forceRefresh && cachedEvent && cachedEvent.expiresAt > Date.now()) return cachedEvent.value;

  const [pageResponse, ticketResponse] = await Promise.all([
    axios.get<string>(AAK_EVENT_SOURCE_URL, { timeout: 12_000, responseType: "text" }),
    axios.post<{ d?: string }>(
      AAK_TICKET_ENDPOINT,
      { forMember: "0", eventID: SOURCE_EVENT_ID, companyID: SOURCE_COMPANY_ID, category: "", groupID: "" },
      { timeout: 12_000, headers: { "Content-Type": "application/json; charset=utf-8" } },
    ),
  ]);

  const page = parseEventPage(pageResponse.data);
  const rawTicketPayload = ticketResponse.data?.d;
  const rawTickets = rawTicketPayload ? (JSON.parse(rawTicketPayload) as SourceTicket[]) : [];
  const event: LiveAakEvent = {
    ...page,
    tickets: mapTickets(Array.isArray(rawTickets) ? rawTickets : []),
    sourceUrl: AAK_EVENT_SOURCE_URL,
    registrationUrl: AAK_EVENT_SOURCE_URL,
    programmeUrl: page.programmeUrl,
    fetchedAt: Date.now(),
  };

  cachedEvent = { value: event, expiresAt: Date.now() + CACHE_TTL_MS };
  return event;
}
