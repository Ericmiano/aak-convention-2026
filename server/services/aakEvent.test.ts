import { describe, expect, it } from "vitest";
import { mapTickets, parseEventPage } from "./aakEvent";

describe("AAK event source mapping", () => {
  it("maps the public expiry logic without inventing a numeric inventory value", () => {
    const now = new Date("2026-08-18T10:00:00Z");
    const tickets = mapTickets([
      { Name: "Member", ForMember: 1, ticketAmount: 35000, currency: "KES", ticketExpiryDate: "2026-09-16T00:00:00", isActive: true, ticketTypeActive: true },
      { Name: "Early Bird", ForMember: 2, ticketAmount: 25000, currency: "KES", ticketExpiryDate: "2026-08-01T00:00:00", isActive: true, ticketTypeActive: true },
    ], now);

    expect(tickets[0]).toMatchObject({ name: "Member", audience: "Members only", amount: 35000, currency: "KES", isOpen: true, status: "29 days left" });
    expect(tickets[1]).toMatchObject({ name: "Early Bird", audience: "Members and non-members", isOpen: false, status: "Closed" });
    expect(tickets[0]).not.toHaveProperty("remainingTickets");
  });

  it("extracts only public calendar and event context fields from the event page", () => {
    const page = parseEventPage('<div>About this event <h2>AAK ANNUAL CONVENTION 2026</h2><i class="fa fa-map-marker"></i><span>Diamond Leisure Lodge, Diani</span><h2 class="">16 Sep, 2026 - 19 Sep, 2026</h2><span>10 CPD Points</span><span>Category: AAK Annual Convention Event type: Physical Tickets Available</span><a href="/uploads/event/programme.pdf"><span>Event Programme PDF</span></a></div>');

    expect(page).toMatchObject({ name: "AAK ANNUAL CONVENTION 2026", dateRange: "16 Sep, 2026 - 19 Sep, 2026", venue: "Diamond Leisure Lodge, Diani", cpdPoints: 10, category: "AAK Annual Convention", eventType: "Physical", programmeUrl: "https://members.aak.or.ke/uploads/event/programme.pdf" });
  });
});
