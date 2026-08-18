# Rebuilding the AAK Annual Convention 2026 Website in WordPress with Elementor

**Prepared for:** Architectural Association of Kenya  
**Implementation target:** WordPress + Elementor  
**Recommended approach:** Elementor Pro, a lightweight theme, a small set of reusable templates, and structured content for the programme, speakers, and technical tours.

## 1. Purpose and scope

This guide explains how to reproduce the current **AAK Annual Convention 2026** website in WordPress with Elementor while preserving the project’s strongest characteristics: its Convention-only identity, architectural editorial layout, accessible motion, source-aware technical-tour content, **automatic AAK event-information panel**, and safe external registration handoff.

The aim is **not** to reproduce the React code. The aim is to reconstruct the visitor experience in a WordPress-native way that an AAK content team can maintain after launch. The result should keep the same public routes, visual system, hierarchy, and editorial tone while making routine content changes manageable through WordPress.

> **Important constraint:** Do not imitate ticket availability, payment capture, M-PESA processing, or confirmation states inside Elementor unless AAK has an approved integration with the real booking system. The current site deliberately provides a branded handoff to the official AAK registration platform. Elementor should preserve that honesty rather than create a convincing but non-functional checkout.

| Area | Elementor implementation | Editorial rule |
|---|---|---|
| Header and footer | Elementor Theme Builder templates | Reuse sitewide; do not duplicate them page by page. |
| Public content routes | Elementor Pages | One page per public route; avoid one long page disguised as multiple routes. |
| Programme | Nested Tabs plus Accordion, or a lightweight custom post type | Show day, time, track, title, then progressive disclosure. |
| Speakers | Placeholder section or dynamic Loop Grid | Never invent speakers, titles, biographies, or portraits. |
| Technical tours | Dynamic Loop Grid or manually repeated containers | Use documented images, factual captions, and source links. |
| Live event information | Small custom WordPress plugin plus an Elementor shortcode/container | Refresh only public calendar facts, ticket tiers, listed prices, eligibility, and source status. |
| Registration | Branded handoff page plus live ticket ledger | Link to the official AAK system in a new tab; do not collect payment data. |

## 2. Required stack and pre-build decisions

### 2.1 Recommended software

Use a current supported WordPress release, a lightweight Elementor-compatible theme, and **Elementor Pro**. Elementor Pro is recommended because the Theme Builder is used to create and assign sitewide headers and footers; Elementor documents that Theme Builder manages site-part templates and their display conditions.[^1]

| Component | Recommendation | Why it is needed |
|---|---|---|
| Theme | **Hello Elementor** or another lightweight, well-maintained theme | Keeps theme styling from competing with the custom editorial design. |
| Page builder | **Elementor Pro** | Theme Builder, Custom CSS, Loop Grid, Forms if needed, and template conditions. |
| Structured content | **Advanced Custom Fields Pro** and either **Custom Post Type UI** or registered post types in a small site plugin | Makes tours, sessions, and speakers maintainable without editing page layouts. |
| Code insertion | Elementor Pro Custom Code or a carefully managed snippets plugin | Adds the small scroll-reveal script without editing the theme. |
| SEO | A single established SEO plugin, configured once | Controls title, meta description, Open Graph, sitemap, and Event schema. |
| Cache/image optimisation | Hosting-level cache first; then one image optimisation layer if required | Prevents duplicated optimisation plugins and preserves image quality. |
| Live event source bridge | A small AAK-owned custom plugin—not a generic scraping plugin | Retrieves, sanitises, caches, and exposes the approved public AAK event fields. |

### 2.2 Safe same-domain draft workflow: use this when no staging domain is available

**Yes. You can build the redesign on unpublished new draft pages within the existing WordPress installation.** You do not need another domain for this approach. The critical rule is that you must isolate the draft pages and their templates from the live site until the changeover window.

Use the following naming convention. Do not reuse the current public titles or slugs while the old site is live.

| Draft page title | Temporary draft slug | Final public slug at launch |
|---|---|---|
| `AAK 2026 — Draft — Home` | `/aak-2026-draft-home/` | `/` |
| `AAK 2026 — Draft — Programme` | `/aak-2026-draft-programme/` | `/programme/` |
| `AAK 2026 — Draft — Theme` | `/aak-2026-draft-theme/` | `/theme/` |
| `AAK 2026 — Draft — Speakers` | `/aak-2026-draft-speakers/` | `/speakers/` |
| `AAK 2026 — Draft — Experience` | `/aak-2026-draft-experience/` | `/experience/` |
| `AAK 2026 — Draft — Build Tours` | `/aak-2026-draft-build-tours/` | `/build-tours/` |
| `AAK 2026 — Draft — Venue` | `/aak-2026-draft-venue/` | `/venue/` |
| `AAK 2026 — Draft — Registration` | `/aak-2026-draft-registration/` | `/register/` |

WordPress supports saving work as drafts and opening previews in desktop, tablet, mobile, or a new browser tab.[^5] Give review access only to logged-in AAK administrators/editors unless a separate, approved temporary-preview mechanism is already available on the site.

> **Do not make a draft page the front page. Do not add draft pages to the public menu. Do not publish a new sitewide header/footer with an `Entire Site` condition. Do not switch the active WordPress theme during the draft phase.** Any of those actions can affect visitors to the existing live site.

#### 2.2.1 The safe template strategy

Use one of the following approaches. **Approach A is safest** when the existing site already has a live header/footer or uses an existing Elementor system.

| Approach | How it works | Best use | Risk level |
|---|---|---|---|
| **A. Draft-page bodies first** | Build each draft page body in Elementor. The live site header/footer remains visible around the preview until launch. Save the future header/footer as unused Elementor templates or as draft page sections. | Existing live site must not change at all. | Lowest. |
| **B. Page-specific draft templates** | Create a new Elementor Header and Footer, then set their display conditions to include only the named draft pages. | You need stakeholders to preview the full new shell before launch. | Low, but verify conditions twice. |
| **C. Duplicate-page testing with a maintenance window** | Build pages as drafts; only set sitewide Theme Builder conditions in a short approved launch window. | Full redesign replacing the entire public site. | Moderate; needs a rollback owner. |

For Approach A, create two saved Elementor templates named `AAK 2026 / Draft Header` and `AAK 2026 / Draft Footer`. Do **not** assign display conditions. If a stakeholder needs to see the proposed header/footer while reviewing a draft page, insert those saved templates at the top and bottom of that draft page temporarily. Remove them before converting the templates into true Theme Builder header/footer templates at launch.

For Approach B, in **Templates → Theme Builder**, create the header/footer but set display conditions one page at a time, for example `Include → Singular → Pages → AAK 2026 — Draft — Home`. Repeat for the other draft pages. Review every live page in an incognito browser after saving the conditions. If Elementor cannot select an unpublished page in the condition selector on your version, return to Approach A instead of publishing the page simply to make it selectable.

### 2.3 Before touching anything: create a restoration record

Do this before installing Elementor or changing any setting. It is how you protect the existing live system.

1. Ask the hosting provider for a **full host-level backup** that includes files and database. Record the timestamp and the restoration process.
2. In WordPress, record the active theme, active child theme, WordPress version, PHP version, and all active plugins. Take screenshots of **Plugins**, **Appearance → Themes**, **Appearance → Menus**, **Settings → Reading**, **Settings → Permalinks**, and the current homepage.
3. Record the existing home-page setting: in **Settings → Reading**, note whether the site uses `Your latest posts` or `A static page`, and record the named Home and Posts pages. WordPress uses this screen to choose a static front page.[^6]
4. Export the existing menus if the current menu plugin supports it; otherwise take screenshots and copy every menu item, URL, target, and order into a spreadsheet.
5. Copy any existing custom CSS from **Appearance → Customize → Additional CSS**, theme settings, Elementor Custom CSS, and snippet/code plugins into a dated text file. Do not delete it.
6. Note all active caching, security, redirect, page-builder, and header/footer plugins. Do not deactivate unknown plugins on a live site just to “clean things up.”
7. Open the live site in a private/incognito browser and capture screenshots of every current important route. This is the visual rollback reference.

### 2.4 Do not mix design systems during the draft phase

The finished redesign should use Elementor Site Settings for global colors and global fonts, because Elementor’s centralized controls are designed to keep a visual system consistent.[^2][^3] However, **do not reset existing global Elementor fonts, colors, theme typography, or theme button defaults while the legacy live pages still depend on them.** Those changes may restyle live pages immediately.

During the draft phase, use one of these two isolation methods:

1. Apply the AAK styles through classes scoped to the new draft-page wrapper, for example `aak-convention-draft`, and use the scoped CSS in Section 8. This is the safest method on an established site.
2. Create new global colors/fonts with unique names such as `AAK 2026 / Cardinal Red` and `AAK 2026 / Display`, then use only those new values on draft pages. Do not rename or delete old global entries until after the live changeover.

At launch, when old pages are no longer being served, consolidate the whole site around the new global settings. Do not delete a global font/color before checking whether an existing live Elementor template still references it.

## 3. Build the global design system first

Do this before constructing any page. It prevents spacing, color, and type from drifting as additional pages are built.

### 3.0 Install the required software: exact dashboard procedure

Complete this **after** the backup and restoration record in Section 2.3. WordPress documents the dashboard installation sequence as **Plugins → Add New → search → Install Now → Activate** and recommends a current backup before plugin updates.[^7]

| Order | What to install | Exact action | Draft-phase rule |
|---:|---|---|---|
| 1 | Elementor Website Builder | Go to **Plugins → Add New**. Search `Elementor Website Builder`. Check the plugin author and compatibility notice. Click **Install Now**, then **Activate**. | Activating Elementor does not change a page until you edit/build with it. |
| 2 | Elementor Pro | Download the licensed `.zip` from the AAK Elementor account. Go to **Plugins → Add New → Upload Plugin**, select the ZIP, click **Install Now**, then **Activate**. Connect/activate the license when prompted. | Do not create sitewide Theme Builder conditions yet. |
| 3 | Hello Elementor (optional, do not activate yet) | Go to **Appearance → Themes → Add New**. Search `Hello Elementor`, install it, but leave the current live theme active during drafts. | Theme activation affects the whole site; postpone it to the approved launch window. |
| 4 | Advanced Custom Fields Pro (recommended for managed content) | Upload/install from AAK’s valid ACF Pro licence account, then activate. | Create fields only; they do not alter public pages by themselves. |
| 5 | Custom Post Type UI (optional) | Install from **Plugins → Add New** only if you do not have a small custom plugin/developer registering the content types. | Register content types with `publicly_queryable` only when ready; do not expose incomplete content. |
| 6 | One SEO plugin and one caching/image layer | Reuse an existing approved plugin if one is already present. Do not install a competing duplicate. | Do not run two SEO, cache, or optimisation plugins in parallel. |

Elementor’s plugin listing documents installation through the WordPress plugin installer and then the normal page workflow of **Pages → Add New → Edit with Elementor**.[^8]

#### 3.0.1 What not to install

Do not install a generic “Elementor addon pack” merely to add visual effects. Do not add a countdown, testimonials, booking, payment, popup, review, or form plugin unless there is an explicit functional need and an AAK owner for the data it collects. The redesign should not use fabricated reviews or a simulated checkout.

#### 3.0.2 Minimum access you need

You need a WordPress account with **Administrator** capability, access to the Elementor Pro licence registered to AAK, access to the current host backup process, and the authority to change the static front page and navigation during launch. If any of these are unavailable, build the guide’s pages as drafts but do not attempt the final switch.

### 3.0.3 Configure Elementor without altering the live site

After activating Elementor/Elementor Pro, complete these actions in this order:

1. Go to **Elementor → Settings**. Under General, ensure `Pages` is enabled as an editable post type. Enable any proposed custom types only after they have been registered and populated.
2. Do not disable Elementor’s default fonts/colors sitewide if the existing public pages use them. That is a **launch-phase** decision, not a draft-phase decision.
3. Go to **Elementor → Editor → Customize** or open **Site Settings** from an Elementor editor. Create **new named AAK 2026 global colors and fonts**; do not overwrite existing legacy entries.
4. Go to **Site Settings → Layout**. Record existing content width and breakpoints before changing them. For drafts, set the container width locally on the draft-page wrapper if global width changes would affect legacy templates.
5. In the Elementor editor, use the page’s Settings icon to select `Elementor Full Width` or `Elementor Canvas` **only on the draft page**. Use Canvas when you are inserting a temporary draft header/footer into the body; use Full Width when the existing safe header/footer should remain visible.
6. Go to **Elementor → Tools** only when you need to regenerate CSS/data after a design change. Do not use broad reset or replace-URL tools on a production site without a backup and a clear rollback plan.

### 3.0.4 Existing setting removal: the non-destructive method

The correct draft-phase instruction is not “remove existing settings.” It is **document, isolate, replace deliberately, then remove only after launch**.

| Existing item | Draft phase action | Launch phase action | What never to do |
|---|---|---|---|
| Active theme | Leave it active. | Change only if the new pages have been tested with the new theme and a rollback is ready. | Never activate a new theme just to test one draft page. |
| Existing header/footer | Leave its conditions untouched. | Replace conditions during launch; retain old template as a disabled/archive template. | Never delete the old header/footer before testing the new one in an incognito browser. |
| Global fonts/colors | Keep them. Add new `AAK 2026` entries. | Migrate current new pages to the new global system; then retire unused legacy entries. | Never reset/rename a legacy global token without checking its current consumers. |
| Theme Customizer CSS | Copy it to your restoration record. | Remove only rules proven to be obsolete after the whole site is tested. | Never clear the Additional CSS box as a “clean start.” |
| WordPress menus | Build a second menu, `AAK 2026 Primary — Draft`. | Assign the new menu in the launch window. | Never edit the live menu in place while stakeholders are reviewing drafts. |
| Existing pages | Keep them published but unlinked, or leave unchanged during drafting. | Archive/draft them only after the new route is live and verified. | Never delete the old homepage before the new front page is live. |

### 3.0.5 Build draft navigation safely

Create two menus under **Appearance → Menus**:

* `Primary Navigation — Live` — do not edit it during drafting.
* `AAK 2026 Primary — Draft` — add only the temporary draft-page URLs.

If you use the temporary header/footer inserted into each draft page, link this draft menu directly in the Elementor Nav Menu widget. If you use page-specific Theme Builder conditions, use this draft menu only in the new draft header. The public live menu remains untouched.

### 3.1 Set global colors

In WordPress, open **Elementor → Editor → Customize → Global Colors**. Create the following named colors.

| Global color name | Hex value | Use |
|---|---:|---|
| `AAK Cardinal Red` | `#B72028` | Primary action, active state, index number, and rare civic emphasis. |
| `Mineral Paper` | `#F3F0E8` | Main page background. |
| `Near White` | `#FAF9F5` | Quiet editorial planes and light media fields. |
| `Stone Surface` | `#E9E5DB` | Secondary sections and programme surfaces. |
| `Civic Ink` | `#171714` | Hero, dark theme feature, dark tour guide, footer. |
| `Rule Grey` | `#D3CEC3` | 1px rules, borders, structural separation. |
| `Muted Text` | `#68655E` | Supporting copy and metadata. |
| `Coastal Teal` | `#155950` | Very limited contextual reference; do not use it as a competing primary accent. |

Do **not** retain a second dark green-black token. `Civic Ink` is the single canonical dark. Do **not** introduce gradients. Avoid broad red background fields except for a genuinely major institutional moment.

### 3.2 Set global typography

In **Elementor → Editor → Customize → Global Fonts**, define these styles. Elementor allows custom global font styles and later adjustment from a central location.[^2]

| Global font name | Family | Weight | Typical use |
|---|---|---:|---|
| `Display / Civic` | Space Grotesk | 500 | H1, H2, major titles. |
| `Body / Editorial` | DM Sans | 400–500 | Paragraphs and normal reading text. |
| `Metadata / Mono` | DM Mono | 400–500 | Dates, labels, buttons, captions, section numbering. |

Use these practical Elementor settings:

| Element | Desktop size | Tablet size | Mobile size | Line height |
|---|---:|---:|---:|---:|
| H1 hero | 112–144px | 76–92px | 56–66px | 0.92–0.98em |
| H1 internal page | 86–118px | 64–76px | 48–58px | 0.94em |
| H2 section | 56–88px | 44–60px | 34–44px | 0.96–1.04em |
| H3 tour/session | 30–54px | 28–40px | 26–34px | 1.0–1.08em |
| Body | 16–18px | 16–17px | 15–16px | 1.45–1.6em |
| Metadata | 10–12px | 10–11px | 9–10px | 1.2em |

Set all metadata and buttons in uppercase with `0.08em–0.12em` letter spacing. Do not use Inter as a default substitute.

### 3.3 Establish the spacing and geometry rules

Create Elementor global spacing conventions and document them in the team’s handover notes:

| Token | Suggested value | Use |
|---|---:|---|
| Horizontal page inset | `clamp(20px, 3vw, 56px)` | Most containers. |
| Large section padding | `clamp(72px, 10vw, 160px)` | Major editorial sections. |
| Standard rule | `1px solid #D3CEC3` | Primary form of visual separation. |
| Small radius | `10px` | Buttons and small metadata fields. |
| Medium radius | `16px` | Secondary media frame. |
| Large radius | `22px` | Primary image frame. |
| Largest radius | `30px` | Hero or major thematic field only. |

Avoid `999px` pills. Avoid blanket `40px+` radius. Avoid large soft shadows. The system should feel like **paper, rails, captions, and architectural planes**, not floating interface cards.

## 4. WordPress page and content architecture

### 4.1 Create the required pages

Create these WordPress pages and assign the Elementor Canvas or Full Width page layout, depending on whether your Theme Builder header/footer are set globally.

| WordPress title | Slug | Navigation label | Primary purpose |
|---|---|---|---|
| AAK Annual Convention 2026 | `/` | Home | Narrative landing page. |
| Programme | `/programme/` | Programme | Day-based programme explorer. |
| Theme | `/theme/` | Theme | Official theme statement and four conversations. |
| Speakers | `/speakers/` | Speakers | Confirmed people or honest placeholder. |
| Experience | `/experience/` | Experience | Convention moments plus technical tours. |
| Build Tours | `/build-tours/` | Optional secondary link | Documentary field-guide version of tours. |
| Venue | `/venue/` | Venue | Diani context and approved venue data. |
| Registration | `/register/` | CTA target | Branded handoff to AAK registration. |

### 4.2 Use structured content where updates are expected

For a one-off launch with a small content team, you can build sections manually in Elementor. For maintainability, however, create the following content types and field groups.

| Content type | Required fields | Elementor output |
|---|---|---|
| `programme_session` | Day, start/end time, track, title, detail, speaker, sort order | Tabs/accordion rows. |
| `technical_tour` | Number, timing label, title, lens, summary, image, image credit, source URL, confirmed status | Experience tour studies and Build Tours field guide. |
| `speaker` | Name, role, organisation, biography, portrait, session, announcement status | Loop Grid when approved. |
| `event_setting` or Options page | Registration URL, programme PDF URL, dates, location label, official contact details, live-source enabled flag | Header, CTA, footer, and structured data. |
| `aak_live_event_cache` transient | Normalised source title, date range, venue, CPD, ticket entries, programme URL, fetched time | Read-only payload for the live Elementor panel. |

For `technical_tour`, create exactly three initial entries:

| Number | Title | Timing label | Field lens |
|---|---|---|---|
| 01 | Mwache Multipurpose Dam Project | 18 September / field study | Water infrastructure / catchment resilience |
| 02 | Ukunda Airport Terminal Expansion | 18 September / field study | Regional mobility / airport infrastructure |
| 03 | Kisite Mpunguti Marine Park & Wasini Island | 19 September / post-Convention field study | Marine habitats / coastal ecology |

Store the **source URL** and **image credit/source** alongside every third-party image. Do not leave the image provenance only in a caption on a page.

### 4.3 Add the AAK live event-information bridge

The automatic panel is **not** an Elementor widget that calls the members site directly from the visitor’s browser. The AAK member page currently exposes event information through its own page and an undocumented ticket-data method. The audit found that the browser cannot reliably call that method cross-domain and that it exposes expiry-derived ticket status, not numeric remaining-seat inventory. Therefore, reproduce the current implementation with a small **server-side WordPress plugin** that reads a fixed AAK source, reduces it to approved public fields, caches it for five minutes, and renders a shortcode inside Elementor.[^9]

> **Public language rule:** Use the source wording such as `29 Days Left`, `Available`, or `Closed`. Never relabel this as `tickets left`, `seats remaining`, or `live inventory` unless the AAK platform formally provides a numeric inventory field.

Create an AAK-owned plugin folder named `aak-convention-live-event` in `wp-content/plugins/`. The plugin should be version-controlled or stored with the final handover, rather than pasted into the theme’s `functions.php`. This keeps the source integration independent from theme changes and gives AAK a clear owner for future maintenance.

| Plugin responsibility | Required behavior | Must not do |
|---|---|---|
| Source allowlist | Use the fixed approved event URL and fixed AAK ticket method only. | Accept a source URL, event ID, or company ID from a public query parameter. |
| Retrieval | Use WordPress HTTP functions with a strict timeout and TLS verification. | Fetch the members data in browser JavaScript or through an Elementor HTML widget. |
| Normalisation | Return only title, date range, venue, CPD points, ticket name, eligibility, KES price, expiry-derived status, source programme URL, and fetched timestamp. | Return source HTML, hidden fields, internal ticket IDs, member data, booking data, or payment data. |
| Cache | Store normalised data for five minutes; refresh on the next request after expiry. | Request the external members platform on every page view. |
| Fallback | Render a clear source-unavailable message and the official AAK event-page link. | Leave a blank block or replace factual information with stale, unlabeled guesses. |
| Public endpoint | If a REST endpoint is used, make it read-only and output only the normalised public payload. | Create a public refresh, update, or payment endpoint. |

#### 4.3.1 Required source contract

Store these values as **plugin constants**, not editable front-end fields:

```text
AAK_EVENT_SOURCE_URL = https://members.aak.or.ke/eventdetailv2?eid=baM8JnQ3+AaNamasUK2rTg==
AAK_TICKET_ENDPOINT  = https://members.aak.or.ke/EventDetail4.aspx/reloadRepeater
AAK_EVENT_ID         = 70965
AAK_COMPANY_ID       = 12
AAK_LIVE_CACHE_TTL   = 5 minutes
```

The event-detail page is the authoritative public source for the current event title, dates, venue label, CPD points, ticket names, listed prices, eligibility, and source status.[^12] The ticket endpoint is an implementation dependency rather than a published API contract. Treat changes to its response shape, availability, or access policy as an AAK members-platform maintenance issue.

#### 4.3.2 Server-side implementation recipe

Use `wp_safe_remote_get()`/`wp_safe_remote_post()` against the fixed allowlisted AAK URLs. WordPress documents its HTTP functions for remote requests and advises a safe remote request function where URL safety needs attention.[^9] Cache the normalised array with the Transients API. A transient expiration is a maximum lifetime, and the cache may disappear sooner, so the plugin must regenerate data safely when the transient is absent.[^10]

The implementation should follow this sequence:

1. Call `get_transient( 'aak_live_event_v1' )`. If it contains a valid array, return it immediately.
2. Request the fixed event-detail page with a 10–12 second timeout. Parse only the visible event facts: public title, date range, venue label, CPD points, category, event type, and the current programme PDF URL.
3. POST the fixed JSON request body to the fixed ticket method. Parse the returned public ticket records into `name`, `audience`, `amount`, `currency`, `ticketExpiryDate`, `isActive`, and `ticketTypeActive`.
4. Derive `status` exactly from the source’s active state and expiry date. If the source is inactive or expired, return `Closed`; otherwise return `N Days Left`. Do not calculate, store, or display a numeric quantity.
5. Sanitise text using WordPress sanitisation functions, cast amounts to numbers, format the fetched timestamp as UTC internally, and store the resulting array using `set_transient( 'aak_live_event_v1', $data, 5 * MINUTE_IN_SECONDS )`.
6. If either source request or parse step fails, return a structured error state without overwriting the last valid cache. The rendered panel must show the fallback described in Section 4.3.5.

If the Elementor presentation fetches data asynchronously, register the public read-only route on the `rest_api_init` hook under a versioned namespace such as `aak-convention/v1`. WordPress requires REST routes to be registered on that hook and requires an explicit `permission_callback`; a public read-only route can use `__return_true` only because the payload contains no private data.[^11]

```text
GET /wp-json/aak-convention/v1/event

Response fields only:
name, dateRange, venue, cpdPoints, category, eventType,
tickets[{name, audience, amount, currency, expiryDate, status, isOpen}],
programmeUrl, sourceUrl, registrationUrl, fetchedAt
```

Do not expose a `refresh`, `force`, `admin`, or ticket-ID parameter in the public route. Create a separate administrator-only `Clear AAK event cache` action in the plugin settings page if the Secretariat needs an immediate refresh after changing the members platform.

#### 4.3.3 Elementor implementation: place the panel in the right locations

Create a shortcode, for example `[aak_live_event_panel]`, in the custom plugin. The shortcode can either render the complete accessible ticket ledger server-side or output the scoped panel wrapper and retrieve the public REST payload from same-origin JavaScript. The server-rendered approach is preferred because it avoids an empty first paint and is simpler for public event information.

In Elementor, insert a **Shortcode** widget at these two locations:

| Page | Placement | Elementor wrapper class | Why it belongs there |
|---|---|---|---|
| Home | Immediately after the Convention introduction/event-metadata field and before the dark Theme field. | `aak-live-event-field` | Gives ticket and current calendar facts early without interrupting the narrative hero. |
| Registration | Immediately after the dark Registration hero and before the five-step route. | `aak-live-event-field aak-live-event-field--compact` | Lets visitors compare current source details before entering the official booking journey. |

The panel should contain the following in this exact hierarchy:

```text
07 / CURRENT EVENT INFORMATION
LIVE SOURCE / AAK EVENT PAGE
What is open now.
Source-status explanation

Calendar | Venue | Learning / CPD points

Ticket type | Price | Source status
Ticket name + eligibility | KES amount | N DAYS LEFT or CLOSED

Last checked [date/time] | Open current programme | Continue to AAK registration
```

Use the same mineral-paper field, thin rule grid, mono metadata, cardinal status outline, and non-pill buttons described elsewhere in this guide. Do not render it as a generic pricing-card grid. The ticket ledger is a factual publication field.

#### 4.3.4 Example status and pricing rules

| Source condition | Visitor-facing text | Styling |
|---|---|---|
| Active ticket with future expiry | `29 DAYS LEFT` or source-equivalent day count | Cardinal red 1px outline; no filled alert background. |
| Active ticket without a parseable expiry | `AVAILABLE` | Cardinal red 1px outline. |
| Inactive ticket or passed expiry | `CLOSED` | Muted grey 1px outline. |
| Currency `KES`, amount `35000` | `KES 35,000` | DM Mono, aligned numeric column. |
| Member flag = member-only | `MEMBERS ONLY` | Small uppercase metadata below ticket name. |
| Member flag = member/non-member | `MEMBERS AND NON-MEMBERS` | Small uppercase metadata below ticket name. |

The panel is allowed to show a ticket price that has changed on the source. It must never show a manually hardcoded price alongside a `Live source` label.

#### 4.3.5 Failure, stale-data, and source-change behavior

If a source request fails and no valid cache is available, replace the ledger with this compact fallback:

> **Current AAK information**  
> **View the latest ticket and event details.**  
> The official AAK event page remains the current source while this page reconnects.  
> `[Open AAK event page ↗]`

If a valid cached payload exists but the fresh request fails, show the cached ledger with `Last checked [timestamp]` and a discreet note that the official AAK event page remains the latest booking source. Do not hide the age of cached data. In all failure states, keep the external AAK event-page button visible and working.

Test this state before launch by temporarily blocking outbound access in a local/staging test, or by using an administrator-only test switch that never exists for public visitors. Check desktop and mobile, keyboard focus, the fallback button, and the restoration of normal data after the source returns.

## 5. Build the Theme Builder templates

Elementor Theme Builder can create site-part templates such as headers and footers and apply them through display conditions.[^1] Use it rather than recreating the same shell on every page.

### 5.1 Header template

During the draft phase, go to **Templates → Theme Builder → Header → Add New**, create `AAK 2026 / Draft Header`, and leave it with **no `Entire Site` condition**. Use the safe-template strategy in Section 2.2. Only in the approved launch window should the final `AAK 2026 / Global Header` receive an `Entire Site` display condition.

Create one main container with this structure:

1. Outer container: max width `none`, page margin `12px 3vw 0`, background `Near White`, 1px `Rule Grey` border, `16px` radius, sticky positioning.
2. Inner container: horizontal flex, justified between, minimum height `64–72px`.
3. Left: AAK structural mark plus a stacked wordmark reading `AAK / ANNUAL / CONVENTION / 2026`.
4. Centre: WordPress Menu widget with Programme, Theme, Speakers, Experience, Venue.
5. Right: Cardinal red **Register** button linking directly to the official AAK registration page in a new tab.
6. Mobile: retain the brand lock-up, hide the desktop menu, and use an Elementor popup or mobile menu button. Include Registration in the mobile navigation.

Give the header container class `aak-site-header`. Give the register button class `aak-register-button`.

### 5.2 Footer template

Create `AAK 2026 / Draft Footer` as a saved template or draft-only Theme Builder footer. Do not apply it to the entire live site during construction. At launch, promote it to `AAK 2026 / Global Footer` and set the final display condition after you remove/disable the old footer condition.

The footer should include the following columns: stacked AAK Convention identity; Convention dates and Diani label; Secretariat email/phone; Association links. Keep the footer factual. It should not contain invented testimonials, social proof, or arbitrary calls to action.

## 6. Build the homepage in Elementor

Create the home page in this order. Use Elementor Containers, not legacy Sections/Inner Sections, so each major field has an explicit flex or grid layout.

### 6.1 Hero

Use a two-column parent container on desktop and one-column stack on tablet/mobile.

| Element | Elementor build instruction |
|---|---|
| Outer field | Dark background, 1px dark border, maximum `30px` radius, `overflow: hidden`, class `aak-hero`. |
| Left column | Kicker, H1, theme statement, primary Register button, secondary Programme text link. |
| Right column | Image widget with the approved coastal architecture image, `object-fit: cover`, `22px` radius. |
| Metadata strip | Absolutely position a small date/location caption at the image bottom. |
| Structural lines | Use two or three absolutely positioned Divider widgets; each must terminate at a caption, section number, or image edge. |

Do not use a background image behind hero text. Place the image in its own container so text remains readable and content remains accessible.

### 6.2 Convention introduction

Use a three-column grid on desktop: `section label / editorial lede / event metadata`. On mobile, stack label, lede, then metadata. The metadata can be three small columns: dates, place, CPD points. Use a rule and background contrast; no shadow.

### 6.2a Live event-information field

Immediately after the introduction, add the `[aak_live_event_panel]` Shortcode widget inside an Elementor container with the `aak-live-event-field` class. Do not manually rebuild the ticket rows in Elementor; the plugin-controlled output prevents a visual `Live source` claim from drifting away from the actual source values. The panel must show its own last-checked timestamp, current programme action, and official AAK registration action.

### 6.3 Theme: the emotional high point

This must be the strongest editorial section on the homepage.

1. Add a dark full-width container with `Civic Ink` background and light text.
2. Add the section label `02 / The Theme` using cardinal red for the number.
3. Set the major heading as: **From a field of fragments to a shared structure.**
4. Add the official theme paragraph without rewriting it into generic marketing language.
5. Add a horizontal transition rail: `Fragility — Adaptation — Resilience`.
6. Add the four thematic conversations in a 4-column desktop grid, 2-column tablet grid, and single column mobile list.
7. Use thin connecting lines that clearly terminate at the section label, transition rail, or grid edge.

The dark theme field may use the largest radius in the system. Do not make every other section look like it.

### 6.4 Programme preview

Build a two-column field: headline and explanatory text on the left; a compact programme accordion on the right. The full Programme page holds the complete schedule.

For the preview, use a static four-row list or a filtered Loop Grid. Each row should show `time / track / title / chevron`. The click state reveals the additional detail. Do not fake speaker details where they have not been confirmed.

### 6.5 Experience, venue, tours, and registration

Build the remaining homepage sections as distinct planes rather than uniform cards:

* **Experience:** dark split field with a real editorial image on one side and the Convention experiences on the other.
* **Venue:** light offset field with Diani/place copy and an approved image. Do not name a property until the Secretariat confirms one canonical venue name.
* **Build Tours preview:** use a light paper field, not a large red promotional block. Show the three tour titles, numbered metadata, short factual summaries, and a link to `/build-tours/`.
* **Registration CTA:** light stone field with one clear action linking to `/register/`.

## 7. Build the internal pages

### 7.1 Programme page

Use Elementor Nested Tabs for the four days: `16`, `17`, `18`, and `19 September`. Inside each tab, use Accordion or Toggle widgets for sessions.

**Row anatomy:**

```text
TIME     TRACK / CATEGORY      SESSION TITLE                         CHEVRON
detail, speaker, or Secretariat confirmation note on expansion
```

Make one accordion item open at a time, give the focus state a visible `1px` outline, and ensure the day tabs work by keyboard. Add the official programme PDF as a supporting link, not the only source of schedule information.

### 7.2 Theme page

Start with a light page hero, then move directly into the large dark official-theme panel. Use the `technical_tour`-style editorial rhythm: number, statement, body, and a field of four conversations. This prevents the official theme from feeling like generic light-page body copy.

### 7.3 Speakers page

Until speakers are approved, create a deliberate placeholder that says the roster is being confirmed with the Secretariat. Do not place dummy portraits or fabricated titles.

When data is ready, create a Loop Item template with portrait, name, role, organisation, session, and a short biography link. Configure the Loop Grid to show only `speaker` entries where `announcement status = approved`.

### 7.4 Experience page and technical tours

The Experience page should start with named Convention moments, then add a secondary chapter titled:

> **The region becomes part of the curriculum.**

Use an alternating image/text list for the three `technical_tour` records. For every tour study, include:

| Field | Purpose |
|---|---|
| Number and timing label | Gives the field guide an ordered, programme-aware structure. |
| Published location image | Real, documented image—not an invented illustration. |
| Alt text | Describes the image’s visible location/works. |
| Tour title | Uses the official programme name. |
| Field lens | Explains why the location matters: water, mobility, or marine ecology. |
| Summary | Concise and factual; no unconfirmed logistics. |
| Source link | Opens the published project or park context in a new tab. |
| Programme note | States that access conditions, timing, inclusions, and participant arrangements remain subject to Secretariat confirmation. |

For the three source records currently used, maintain these references in WordPress notes or custom fields:

| Tour | Published context |
|---|---|
| Mwache Multipurpose Dam | Coast Development Authority project page. |
| Ukunda Airport works | Cementers project documentation for Kenya Airports Authority work. |
| Kisite Mpunguti Marine Park | Kenya Wildlife Service park page. |

### 7.5 Build Tours page

Build this as a dark **field guide**, not a bare dark list. Use the same tour content fields and images as Experience, but in a denser desktop row layout:

```text
NUMBER + TITLE | DOCUMENTARY IMAGE + CAPTION | CONTEXT + SOURCE LINK | PLAN REGISTRATION
```

If you use Elementor Loop Grid, create a dedicated Loop Item named `Technical Tour / Field Guide`. Otherwise, save one complete tour row as a reusable Elementor template and duplicate it three times.

### 7.6 Venue page

Keep the public location label at `Diani, Kenya` until AAK reconciles the conflicting property names upstream. Add a calm note directing visitors to the official registration information for the latest accommodation/event source; do not select a property name by guesswork.

### 7.7 Registration page

This is a branded, transparent handoff page. Construct it as follows:

1. Dark hero with `09 / Registration`, title, short statement, and a cardinal-red or near-white external button.
2. A vertical five-step route: `Ticket selection → Registration details → Booking type → Payment → Confirmation`.
3. Editorial copy explaining that the official AAK registration journey opens in a new tab and shows the current ticket availability and available payment options.
4. Add the `[aak_live_event_panel]` shortcode after the hero, then show the five-step route below it.
5. Include the current programme action and one clear external button to the known official registration URL.

Use `target="_blank"` and `rel="noopener noreferrer"` if you insert a custom HTML link. Elementor’s Link settings also allow opening a URL in a new window.

Do **not** use an Elementor Form to collect payment details. Until AAK provides an approved integration, that would create a misleading and potentially unsafe booking experience. The live panel shows source-derived ticket details only; it does not create a booking, reserve stock, or collect payment data.

## 8. Add the reusable CSS layer

Add the following CSS in **Elementor Site Settings → Custom CSS** when available, or in **Appearance → Customize → Additional CSS**. Give the relevant Elementor containers the classes named in the comments.

```css
:root {
  --aak-red: #B72028;
  --aak-paper: #F3F0E8;
  --aak-white: #FAF9F5;
  --aak-stone: #E9E5DB;
  --aak-ink: #171714;
  --aak-rule: #D3CEC3;
  --aak-muted: #68655E;
  --aak-radius-sm: 10px;
  --aak-radius-md: 16px;
  --aak-radius-lg: 22px;
  --aak-radius-xl: 30px;
  --aak-ease: cubic-bezier(.23, 1, .32, 1);
}

/* Apply to major fields only, not every inner container. */
.aak-plane {
  background: var(--aak-white);
  border: 1px solid var(--aak-rule);
  border-radius: var(--aak-radius-xl);
  position: relative;
  overflow: hidden;
}

.aak-plane--dark {
  background: var(--aak-ink);
  border-color: #3a3934;
  color: var(--aak-paper);
}

/* Use on label widgets: 02 / THE THEME. */
.aak-index-label {
  align-items: center;
  display: flex;
  gap: 12px;
  font-family: "DM Mono", monospace;
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.aak-index-label::after {
  background: var(--aak-red);
  content: "";
  display: block;
  height: 1px;
  opacity: .7;
  width: clamp(36px, 5vw, 80px);
}

/* Use on the technical-tour image container. */
.aak-tour-image img {
  aspect-ratio: 16 / 10;
  border: 1px solid var(--aak-rule);
  border-radius: var(--aak-radius-lg);
  display: block;
  height: auto;
  object-fit: cover;
  transition: transform .55s var(--aak-ease), filter .55s var(--aak-ease);
  width: 100%;
}

.aak-tour-row:hover .aak-tour-image img {
  filter: saturate(1);
  transform: scale(1.015);
}

/* Tactile CTA, not a pill. */
.aak-register-button .elementor-button,
.aak-cta .elementor-button {
  background: var(--aak-red);
  border: 1px solid var(--aak-red);
  border-radius: var(--aak-radius-sm);
  box-shadow: none;
  font-family: "DM Mono", monospace;
  font-size: 11px;
  letter-spacing: .09em;
  text-transform: uppercase;
  transition: background .2s var(--aak-ease), transform .16s var(--aak-ease);
}

.aak-register-button .elementor-button:hover,
.aak-cta .elementor-button:hover {
  background: var(--aak-ink);
  border-color: var(--aak-ink);
}

.aak-register-button .elementor-button:active,
.aak-cta .elementor-button:active { transform: scale(.97); }

/* Respect accessibility preferences. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .001ms !important;
  }
}
```

If styling a specific Elementor element, add the relevant class under **Advanced → CSS Classes**. Do not paste a large CSS block into each widget’s custom CSS field; centralisation makes future maintenance safer.

## 9. Add purposeful motion, not decorative animation

The current site’s motion is restrained: reading progress, reveal-on-entry, line alignment, compact button response, programme disclosure, and subtle image depth. Keep the same restraint in Elementor.

### 9.1 Native Elementor motion

Use Elementor entrance animations only for primary fields. Configure `Fade In Up` or a modest `Fade In` with a duration around `400–650ms`. Do not animate every heading, divider, card, or icon. On mobile, reduce animation use further.

### 9.2 Optional custom reveal script

If Elementor Pro Custom Code is available, add the following at `</body>` and give major fields the class `aak-reveal`. If no Custom Code facility is available, use a trusted snippets management method rather than editing the parent theme.

```html
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var items = document.querySelectorAll('.aak-reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (item) { observer.observe(item); });
});
</script>
```

Add this companion CSS:

```css
.aak-reveal { opacity: 0; transform: translateY(24px); transition: opacity .65s cubic-bezier(.23,1,.32,1), transform .65s cubic-bezier(.23,1,.32,1); }
.aak-reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .aak-reveal { opacity: 1; transform: none; transition: none; } }
```

Never animate layout properties such as `height`, `top`, `left`, margin, or width for this effect. Prefer `opacity` and `transform` for lower-impact motion.

## 10. Responsive implementation procedure

Elementor provides responsive editing controls and default desktop/tablet/mobile breakpoints; its documentation states that responsive settings can be changed per device and that default breakpoints are desktop above 1024px, tablet from 1024px to 767px, and mobile below 767px.[^4]

For every major page, do this procedure in order:

1. Design the **desktop** container structure first.
2. Switch to **tablet** view in Elementor and collapse two-column structures before text becomes cramped.
3. Switch to **mobile** view and recompose; do not merely shrink desktop typography.
4. Reduce H1 size, line length, metadata columns, and decorative rules at mobile width.
5. Stack image/text tour studies. Alternate desktop order may become image-first on every mobile item.
6. Keep programme day tabs horizontally scrollable if necessary; never allow them to wrap into unreadable mini buttons.
7. Verify the header menu, Register button, Experience technical tours, and registration handoff on a real phone.

Use these mobile acceptance criteria:

| Area | Mobile acceptance test |
|---|---|
| Header | Brand lock-up remains legible; menu is reachable; Register is not lost. |
| Hero | H1 has no accidental clipping or horizontal scroll. |
| Programme | Tabs and accordions remain keyboard/touch usable. |
| Technical tours | Every image loads, has correct aspect ratio, and source/context link is reachable. |
| Registration | New-tab handoff is plainly explained. |
| Motion | Reduced-motion setting removes non-essential movement. |

## 11. Accessibility, SEO, and performance checklist

### 11.1 Accessibility

* Use exactly one H1 per page. Use H2 for major sections and H3 for tour/session titles.
* Use landmark-like page structure: one header, one main content region, one footer.
* Use descriptive alt text for substantive location images. Use `alt=""` only for the purely decorative structural-span mark.
* Maintain visible focus outlines on links, accordions, tabs, buttons, and external registration CTAs.
* Ensure all background/text combinations meet accessible contrast; do not place unprotected text over unpredictable photographs.
* Do not rely on red alone to convey active programme tabs or confirmation states.

### 11.2 SEO and structured data

Set the homepage title to:

```text
AAK Annual Convention 2026 | Architectural Association of Kenya
```

Add the approved meta description, social image, canonical URL, and `Event` structured data. The JSON-LD should use the confirmed dates, final location, public Convention name, official registration URL, and the appropriate event status. Do not publish a venue property name until AAK has reconciled its official source data.

### 11.3 Image and performance rules

1. Upload authorised image files at roughly twice their rendered dimensions, then generate WebP versions through WordPress or your optimisation layer.
2. Use an image-specific alt text, a meaningful media title, and a custom field for credit/source.
3. Lazy-load below-the-fold images, except the principal hero image and any first-view technical-tour image that would otherwise appear blank.
4. Do not add a visual loading screen. Use Elementor’s normal rendering or a quiet skeleton only when a genuinely asynchronous dynamic section requires it.
5. Minimise third-party scripts, font variants, popup plugins, and motion plugins. The site’s editorial character should come from layout and imagery, not from heavy effects.

### 11.4 Live event-information QA

| Check | Pass condition |
|---|---|
| Public source values | Date range, venue label, CPD, ticket names, KES amounts, eligibility, and status match the official AAK event page at the time tested. |
| Source-status wording | Open/closed labels are derived from active/expiry status and do not claim seats, capacity, or numeric inventory. |
| Cache | First live retrieval is cached for five minutes; repeated visitor requests do not re-query the members platform during the cache window. |
| Error handling | No JavaScript error or blank field occurs if the members source is unavailable. |
| Fallback | The fallback message and official AAK event-page button render on desktop and mobile. |
| Security | No hidden ticket fields, member data, booking data, payment data, or arbitrary remote URL is exposed. |
| Operations | An AAK administrator can clear the event cache after a confirmed source update. |

## 12. Registration and platform dependency plan

The WordPress site can create a **visually continuous transition**, but it cannot fix the separate `members.aak.or.ke` experience unless its owner updates that platform or provides an approved API/integration.

| Dependency | Required owner action | WordPress action now |
|---|---|---|
| Nairobi Biennale banner on registration site | Remove or replace it in the member platform’s event configuration | Keep the public site Biennale-free and do not repeat the asset. |
| Different registration visual system | Reskin members-platform event and booking templates | Preserve clear AAK-branded handoff page. |
| Public ticket catalogue/status | The members platform maintains the source page and undocumented ticket method, or provides a documented replacement API | Use the server-side live bridge, cache for five minutes, label status as expiry-derived, and retain the AAK source link. |
| Real ticket inventory/payment data | Provide a documented booking/payment API with numeric inventory and approved payment flow | Do not simulate inventory, forms, reservation, or payment. |
| Venue/date inconsistency | Secretariat confirms one canonical venue name and date range | Use Diani, Kenya and the approved date label until confirmation. |

When AAK later provides a secure integration, add the true ticket-to-confirmation journey as a separate scoped project. It will need authentication, payment security, data protection review, error states, confirmation emails, and an authoritative registration data source. It should not be improvised inside a visual page builder. Until then, the automated panel is an informed public-event display—not a checkout or inventory system.

## 13. Controlled same-domain launch and rollback procedure

This section is the operational answer to “how do I switch from draft pages to the public site without another domain?” Plan a low-traffic launch window and identify one AAK decision-maker who can approve content, one person with WordPress admin access, and one person with host-backup/rollback access.

### 13.1 Pre-launch day checklist

Complete these actions before the launch window—not during it.

1. Check every draft page in an incognito browser, desktop/mobile preview, and at least one real mobile phone.
2. Confirm the external registration link, programme PDF link, email, phone number, dates, and final venue wording with the Secretariat.
3. Check the `AAK 2026 Primary — Draft` menu page by page.
4. Check the new header/footer template conditions and make sure they are either unassigned or restricted solely to draft pages.
5. Create a fresh full host backup and export the live menu/customizer/settings record again.
6. Prepare a short internal launch log with exact time, people present, new home page title, old home page title, new menu name, old menu name, new header/footer template names, and rollback sequence.
7. Clear no caches yet. Caches should be cleared after the switch, not before it.
8. Confirm the `aak-convention-live-event` plugin is active, the source constants are correct, and the pre-launch cache contains a valid normalised payload. Do not rely on the first public visitor to discover an integration failure.

### 13.2 Launch steps: perform in this order

| Order | Exact action | Verify immediately |
|---:|---|---|
| 1 | Publish all approved `AAK 2026 — Draft — [Page]` pages except the home page last if you want to reduce partial exposure. | Open each temporary draft slug while logged out. |
| 2 | Rename each published page to its final public title and change its slug to the final slug. If an existing page uses that slug, first rename the old page to `Legacy — [Name] — 2026-09-XX` and give it a legacy slug. | WordPress confirms that each new slug is unique. |
| 3 | In **Appearance → Menus**, assign `AAK 2026 Primary — Draft` to the active primary-menu location and rename it `AAK 2026 Primary`. Preserve the old menu as `Legacy Primary — YYYY-MM-DD`. | Test every menu link in an incognito browser. |
| 4 | In Elementor Theme Builder, change the new header/footer conditions to `Include → Entire Site`. Immediately edit the old header/footer conditions so they are no longer active for the entire site; keep the old templates as drafts/archives. | Open Home, Programme, Experience, Registration, and a legacy/non-Convention page. No duplicate header/footer appears. |
| 5 | Go to **Settings → Reading**. Select `A static page`, then choose the new AAK 2026 home page as `Home page`; save changes. WordPress uses this setting to determine the site front page.[^6] | Open the root domain in an incognito browser. |
| 6 | Only now convert the old home page to Draft or leave it published but unlinked under a legacy slug, according to AAK’s archive policy. | Root domain still resolves to the new home page. |
| 7 | If a theme change was approved, activate the prepared theme now and recheck all public routes. If no theme change is required, leave the current theme active. | Header, footer, forms, menus, and legacy pages render correctly. |
| 8 | Clear the host/CDN/page cache, regenerate Elementor CSS/data if required, clear the live-event transient once, and test again while logged out. | No old cached header, missing CSS, 404, blank live panel, or misleading ticket-status label remains. |

### 13.3 Five-minute rollback plan

If a critical issue appears, do not debug it on the public home page while visitors are affected. Restore the known public experience first.

1. Go to **Settings → Reading** and reselect the previous live home page.
2. Reassign the `Primary Navigation — Live` menu to the active primary-menu location.
3. In Elementor Theme Builder, remove the `Entire Site` condition from the new header/footer and restore the old templates’ previous conditions.
4. If a theme switch occurred, reactivate the recorded previous theme.
5. Clear cache again and test the root domain while logged out.
6. If the site remains broken, ask the host to restore the timestamped host-level backup from immediately before launch.

Do not delete the new pages after a rollback. Change their status to Draft and investigate them later. Keeping the work intact is why this workflow uses duplicate draft pages rather than destructive in-place editing.

## 14. Recommended build order

Follow this order. It reduces rework and keeps the site publishable during content collection.

| Step | Deliverable | Completion test |
|---:|---|---|
| 1 | Backup, restoration record, draft naming plan | Live site remains unchanged; rollback owner is known. |
| 2 | Elementor/Pro and optional content plugins | Plugins active; no live template or theme switch has occurred. |
| 3 | Draft global AAK tokens, spacing, scoped CSS | Sample draft page matches design system without changing a live page. |
| 4 | Draft header/footer and draft menu | Preview is complete without an `Entire Site` condition. |
| 5 | Draft Home, Theme, Programme, Venue | Core narrative and factual event data are in place. |
| 6 | Draft Experience and technical tours | Three cited location studies load with correct images. |
| 7 | Draft Build Tours and Registration | Field-guide consistency and honest handoff are in place. |
| 8 | Live event-source bridge and source-labelled ledger | Current AAK facts, ticket prices, source status, fallback, and external handoff are verified. |
| 9 | Draft speakers placeholder or approved roster | No fabricated people data. |
| 10 | Mobile, keyboard, reduced-motion, SEO, performance QA | All acceptance tests pass. |
| 11 | Controlled same-domain changeover | New front page, menu, templates, cache, and live source panel work; rollback is tested. |

## 15. Final pre-launch checklist

Before publishing, check each item manually.

| Check | Pass condition |
|---|---|
| Biennale removal | The WordPress public site contains no Biennale text, logos, or assets. |
| Event facts | Date, venue, CPD points, contact, and registration URL are confirmed by AAK. |
| Theme | Official theme copy appears in the dark editorial high-point section. |
| Technical tours | Images have permission/source records and source links work. |
| Registration | Every Register CTA opens the correct official system; no fake checkout exists. |
| Live event panel | Source facts and ticket-status language match the AAK event page; fallback action works; no numeric inventory is claimed. |
| Mobile | Tested on at least one iOS and one Android viewport/device. |
| Accessibility | Keyboard navigation, focus state, heading hierarchy, alt text, and reduced motion checked. |
| SEO | Title, description, Open Graph, canonical, sitemap, and Event JSON-LD validated. |
| Performance | Images optimised, unnecessary plugins removed, no visual loading screen. |
| Backup | Full backup and export of Elementor templates taken before launch. |

## References

[^1]: [Elementor, “What is the Theme Builder?”](https://elementor.com/help/the-elementor-theme-builder/)
[^2]: [Elementor, “View and edit global fonts”](https://elementor.com/help/view-and-edit-global-fonts/)
[^3]: [Elementor, “View and edit global colors”](https://elementor.com/help/view-and-edit-global-colors/)
[^4]: [Elementor, “Responsive editing for mobile and tablets”](https://elementor.com/help/mobile-editing/)
[^5]: [WordPress, “How to use the preview function”](https://wordpress.org/documentation/article/how-to-use-the-preview-function/)
[^6]: [WordPress, “Settings Reading Screen”](https://wordpress.org/documentation/article/settings-reading-screen/)
[^7]: [WordPress, “Manage Plugins”](https://wordpress.org/documentation/article/manage-plugins/)
[^8]: [WordPress.org, “Elementor Website Builder”](https://wordpress.org/plugins/elementor/)
[^9]: [WordPress Developer Resources, “wp_remote_post()”](https://developer.wordpress.org/reference/functions/wp_remote_post/)
[^10]: [WordPress Developer Resources, “Transients API”](https://developer.wordpress.org/apis/transients/)
[^11]: [WordPress Developer Resources, “register_rest_route()”](https://developer.wordpress.org/reference/functions/register_rest_route/)
[^12]: [Architectural Association of Kenya, “AAK Annual Convention 2026 Event Registration”](https://members.aak.or.ke/eventdetailv2?eid=baM8JnQ3%2BAaNamasUK2rTg%3D%3D)
