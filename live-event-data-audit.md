# Live Event Data Audit — 18 August 2026

## Public authoritative event source

The public source reviewed is the AAK member event page at:

`https://members.aak.or.ke/eventdetailv2?eid=baM8JnQ3%2BAaNamasUK2rTg%3D%3D`

## Publicly displayed fields

The page displays the public event title, organizer, venue/property label, date and daily time range, minimum ticket price, CPD points, category, event type, ticket tiers, ticket amounts, ticket-status text, theme statement, about text, and topic areas. It also contains links to the login/booking flow, event programme, accommodation/tours, and speaker pages.

## Ticket fields currently exposed

The public table exposes eight tier labels, KES amounts, audience restrictions, and a status string such as `29 Days Left` or `CLOSED`. It does **not** expose a literal numeric inventory count in the public markdown view. Therefore the new site should never label a tier `X tickets remaining` unless the member platform supplies that value through an approved API.

## Preliminary integration finding

The public page is suitable as a factual source and can support a transparent external registration handoff. It is not yet proven to expose a stable, documented API suitable for directly powering a live ticket-price/availability widget. Further network and endpoint analysis is required before adding automatic live claims to the Convention redesign.

## Verified ticket-data behavior

The event page’s own client-side code calls an undocumented public web method:

`POST https://members.aak.or.ke/EventDetail4.aspx/reloadRepeater`

with the public event/company identifiers `eventID: 70965` and `companyID: 12`. A read-only request returned an HTTP 200 JSON response containing ticket names, member eligibility, ticket amount, currency, ticket-expiry date, active flags, ticket type identifiers, and group fields.

The public page computes its visible ticket-status label from the expiry date: a future expiry is displayed as `N Days Left` and an expired date is displayed as `CLOSED`. The response examined did not establish that a stock count or remaining-inventory field is exposed. It also did not include an `Access-Control-Allow-Origin` response header, so a browser-based public Convention page cannot safely or reliably call it directly across domains.

## Implication

The source can support an automatic **ticket catalogue and public status** feature only through a server-side integration that AAK controls, or through a formally approved members-platform API. The design must label availability exactly as the source does—for example, `Available until 16 September` or `Closed`—rather than calling it real-time remaining inventory.

## Fallback destination verification

On 18 August 2026, the public fallback destination remained reachable and displayed the AAK Annual Convention 2026 event title, 16–19 September 2026 date range, Diamond Leisure Lodge/Diani venue label, 10 CPD points, public ticket table, and `Book Now` action. The redesigned fallback therefore leads visitors to a functioning authoritative event page rather than an unavailable or unrelated destination.
