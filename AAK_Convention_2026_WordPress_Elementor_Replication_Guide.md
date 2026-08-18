# Rebuilding the AAK Annual Convention 2026 Website with Free WordPress and Elementor Tools

**Implementation target:** Self-hosted WordPress + Elementor Free  
**Budget assumption:** No Elementor Pro, no ACF Pro, no paid theme, no paid template kit, and no paid booking, form, or animation add-on.  
**What you still need:** WordPress administrator access, hosting backup access, the ability to install free plugins, and either basic PHP support or a developer for the live AAK event-information bridge.

## 1. What this free-tier guide does and does not assume

This guide recreates the AAK Annual Convention 2026 public site using **Elementor Free** and free WordPress-compatible tools. It preserves the public pages, Coastal Civic Modernism visual direction, technical-tour studies, accessible motion, and automatic AAK event-information panel. It deliberately does **not** assume Elementor Pro’s Theme Builder, Loop Grid, Forms, Custom Code, Dynamic Tags, or custom-CSS controls.

> The automatic event panel does **not** require a paid service. It does require a small WordPress plugin or code snippet because the public AAK member event source cannot be read safely by a visitor’s browser across domains. This is a technical requirement, not a premium licence requirement.

| Need | Free solution | Do not use for this project |
|---|---|---|
| Page layouts | Elementor Free containers, headings, images, buttons, icons, HTML and Shortcode widgets | Paid Elementor template kits or generic conference templates. |
| Header/footer | **Header Footer Builder for Elementor** (free) | Elementor Pro Theme Builder. |
| Global colors/fonts | Elementor Free Site Settings, plus scoped CSS in WordPress Additional CSS or a child theme | Paid custom-CSS controls per widget. |
| Programme and tour layout | Manually duplicated Elementor containers, then saved as simple reusable templates where available | Elementor Pro Loop Grid or Dynamic Tags. |
| Structured content | WordPress pages/posts, or free **Custom Post Type UI** plus free **ACF** only if a developer will output the data with PHP/shortcodes | ACF Pro repeaters, flexible content, options pages, or gallery fields. |
| Motion | Elementor Free entrance effects sparingly, plus a free Code Snippets plugin or child-theme JavaScript for reveal motion | Paid animation add-ons. |
| Automatic AAK event panel | Small custom WordPress plugin, shortcode, WordPress HTTP API, and Transients cache | Browser-side scraping, iframe checkout, or a fake ticket system. |
| Registration | External link to the official AAK event/booking page | Elementor payment or registration forms. |

## 2. Free software to install

Install only what is needed. Before each plugin installation, take a host backup and confirm that a similar active plugin does not already exist.

| Order | Free tool | What it does | Why it is appropriate |
|---:|---|---|---|
| 1 | **Elementor Website Builder** | Builds the public draft pages. | The free page builder is sufficient for the site’s containers, type, images, buttons, and responsive layouts. |
| 2 | **Hello Elementor** theme | Provides a minimal theme base. | It avoids imposing a competing visual system. Install it during drafting; do not activate it until launch if the live site uses another theme. |
| 3 | **Header Footer Builder for Elementor** | Creates Elementor-based headers and footers with page/global conditions. | Its WordPress.org description states it works with Elementor Free and supports header/footer display conditions.[^1] |
| 4 | **Custom Post Type UI** — optional | Registers content types such as `technical_tour` or `speaker`. | It provides a free interface for custom post types and taxonomies.[^2] |
| 5 | **Advanced Custom Fields** — optional, free version | Adds simple fields such as a tour lens, source URL, timing label, and credit. | The free plugin supports custom fields and can register post types/taxonomies; avoid its Pro-only repeater, flexible-content, options-page, gallery, and clone features.[^3] |
| 6 | **Code Snippets** — optional, free version | Safely holds small PHP/JS snippets when a dedicated custom plugin is not available. | Use it only for the reveal motion or the live panel if you cannot create a proper plugin file. |
| 7 | One existing free SEO/caching solution | Manages basic SEO and caching if the site does not already have them. | Reuse an approved existing plugin rather than installing duplicates. |

### 2.1 Exact installation procedure

1. Log in with a WordPress Administrator account.
2. Go to **Plugins → Add New**.
3. Search `Elementor Website Builder`, verify the publisher, select **Install Now**, then **Activate**.
4. Repeat for `Header Footer Builder for Elementor`. Do not create a global header or footer yet.
5. If the site needs editable tour/speaker records, install `Custom Post Type UI` and `Advanced Custom Fields`. If the page count is small and content will rarely change, skip both and build the three tours manually in Elementor.
6. Go to **Appearance → Themes → Add New**, search `Hello Elementor`, select **Install**, but keep the existing live theme active while you build drafts.
7. Open **Plugins** and take a screenshot of the full active-plugin list. This is part of the rollback record.

> Do not install Elementor Pro, Elementor Pro extensions, a paid theme, or a “premium unlocked” plugin. Do not install multiple cache, security, SEO, or header/footer plugins because they can conflict with the live site.

## 3. Safe same-domain draft workflow

You can build on the existing WordPress domain using unpublished draft pages. You do **not** need a second or dormant domain.

| Draft title | Temporary slug | Final slug |
|---|---|---|
| `AAK 2026 — Draft — Home` | `/aak-2026-draft-home/` | `/` |
| `AAK 2026 — Draft — Programme` | `/aak-2026-draft-programme/` | `/programme/` |
| `AAK 2026 — Draft — Theme` | `/aak-2026-draft-theme/` | `/theme/` |
| `AAK 2026 — Draft — Speakers` | `/aak-2026-draft-speakers/` | `/speakers/` |
| `AAK 2026 — Draft — Experience` | `/aak-2026-draft-experience/` | `/experience/` |
| `AAK 2026 — Draft — Build Tours` | `/aak-2026-draft-build-tours/` | `/build-tours/` |
| `AAK 2026 — Draft — Venue` | `/aak-2026-draft-venue/` | `/venue/` |
| `AAK 2026 — Draft — Registration` | `/aak-2026-draft-registration/` | `/register/` |

WordPress lets authors save a page as a draft and use a preview without making it public.[^4] Keep the pages private or draft until their full content, navigation, and external registration links are approved.

### 3.1 Things you must not change during drafting

| Existing live setting | Draft-phase instruction |
|---|---|
| Active theme | Leave it active. Do not activate Hello Elementor just to test a single draft page. |
| Current header/footer | Leave it untouched and public. |
| Current primary menu | Do not edit it in place. Create a separate `AAK 2026 Primary — Draft` menu. |
| Static front page | Do not change Settings → Reading until launch. |
| Existing global colors/fonts | Do not delete, rename, or overwrite them. |
| Existing Customizer CSS | Copy it into a dated text file; do not clear it. |
| Existing plugins | Do not deactivate unknown plugins to make the admin panel look cleaner. |

### 3.2 Create a restoration record before editing

Take a host-level files-and-database backup. Then record the active theme, WordPress/PHP versions, active plugins, existing header/footer plugin, existing menu structure, the current Home page, and the Settings → Reading configuration. WordPress uses this screen to select a static homepage.[^5]

Create two menus under **Appearance → Menus**:

* `Primary Navigation — Live` — do not alter this while building drafts.
* `AAK 2026 Primary — Draft` — add only the temporary draft page URLs.

## 4. Configure the free Elementor visual system

### 4.1 Page layout settings

Create each draft page through **Pages → Add New → Edit with Elementor**. In the bottom-left Elementor page settings, use `Elementor Full Width` where the theme header/footer will remain visible. Use `Elementor Canvas` only when a draft header/footer is intentionally inserted as page content; Canvas removes the theme chrome.

Open **Elementor → Site Settings** and create new global names rather than modifying legacy values:

| Name | Value | Use |
|---|---:|---|
| `AAK 2026 / Cardinal Red` | `#B72028` | Actions, active states, section numbers, status outlines. |
| `AAK 2026 / Mineral Paper` | `#F3F0E8` | Primary background. |
| `AAK 2026 / Near White` | `#FAF9F5` | Light editorial fields. |
| `AAK 2026 / Stone Surface` | `#E9E5DB` | Secondary surfaces. |
| `AAK 2026 / Civic Ink` | `#171714` | Dark hero/theme/tour/footer fields. |
| `AAK 2026 / Rule Grey` | `#D3CEC3` | Borders and fine rules. |
| `AAK 2026 / Muted Text` | `#68655E` | Secondary text and metadata. |

Use these free font choices through Elementor global fonts or the theme’s typography controls:

| Role | Font | Use |
|---|---|---|
| Display | Space Grotesk | H1/H2/H3. |
| Body | DM Sans | Paragraphs and ledes. |
| Metadata | DM Mono | Labels, dates, buttons, captions, prices. |

### 4.2 Use free CSS safely

Elementor Free does not provide the Pro custom-CSS interface. Use one of these free methods instead:

1. For classic themes, go to **Appearance → Customize → Additional CSS** and paste the central AAK CSS there.
2. If the current theme does not expose Additional CSS, add the same CSS to a small child theme’s `style.css` with a developer’s help.
3. Do not paste long CSS blocks into individual Elementor widgets. Add classes in **Advanced → CSS Classes** and keep the CSS centralized.

Use these design rules consistently:

* Major sections use `1px` rules and only occasional `22–30px` radius.
* Buttons use a `10px` radius, not a pill shape.
* Avoid shadows. Separate fields with spacing, borders, background contrast, rails, captions, and asymmetric image crops.
* Use cardinal red only for actions, numbers, status outlines, and selected headline emphasis. Do not use it as a generic large background.
* Use one canonical dark `Civic Ink`; do not introduce a second dark teal/green surface.

## 5. Build the shared header and footer with free tools

Elementor Free does not include Theme Builder. Use the free **Header Footer Builder for Elementor** plugin instead.

### 5.1 Draft header and footer

1. Open the Header/Footer Builder plugin’s template screen.
2. Create `AAK 2026 / Draft Header` and `AAK 2026 / Draft Footer`.
3. If the plugin can target drafts, set conditions to include only the AAK 2026 draft pages. If it cannot target drafts, do **not** activate global conditions; use the existing public header/footer while reviewing draft page bodies.
4. Build the header as one horizontal container: structural mark + stacked wordmark on the left; draft navigation centre; Register button on the right.
5. Build the footer as one dark `Civic Ink` plane with the AAK Convention identity, factual dates/Diani label, Secretariat contacts, and Association links.

The free plugin documents page-specific and global header/footer conditions for Elementor Free and Elementor Pro.[^1] Verify every public live page in a logged-out browser after saving a template condition.

### 5.2 Header construction

| Area | Free Elementor build |
|---|---|
| Outer field | One container, 1px `Rule Grey` border, `16px` radius, Mineral Paper background, margin `12px 3vw 0`. |
| Brand | Image widget for the AAK structural mark and two Heading/Text widgets for `AAK / Annual Convention / 2026`. |
| Navigation | Header/Footer Builder’s menu widget tied to `AAK 2026 Primary — Draft`. |
| Register CTA | Standard Elementor Button, Cardinal Red background, linked to `/aak-2026-draft-registration/` while drafting. |
| Mobile | Use the header builder’s responsive menu control if available. If not, create a second mobile-only container with a simple vertical link list and show/hide by Elementor responsive settings. |

## 6. Build the pages manually in Elementor Free

Do not rely on dynamic Loop Grids or Theme Builder templates. The project has a finite number of key sections and can be faithfully recreated through disciplined manual containers.

### 6.1 Home page structure

Build these fields in this exact order:

| Order | Section | Desktop composition | Mobile behavior |
|---:|---|---|---|
| 1 | Hero | Dark two-column container: headline/copy/actions left, image right. | Stack image after text; preserve H1 line breaks. |
| 2 | Introduction | Three columns: index label, editorial lede, event facts. | Stack label, lede, then facts. |
| 3 | **Live AAK event panel** | Full-width mineral-paper ticket ledger after introduction. | Stack calendar/venue/CPD; retain price/status hierarchy. |
| 4 | Theme | Large dark field with official statement, transition rail, four topics. | One-column topic list. |
| 5 | Programme preview | Copy left, four compact programme rows right. | Stack rows below heading. |
| 6 | Experience | Dark split field with documentary image and event moments. | Image first or second depending on legibility. |
| 7 | Venue | Light offset place field and image. | Stack and preserve caption. |
| 8 | Build Tours preview | Paper field with three numbered factual tour entries. | Single-column list. |
| 9 | Registration CTA | Stone field with one action to Registration page. | Full-width button. |

### 6.2 Recreate the hero

Use a dark parent container with a maximum `30px` radius and `overflow: hidden`. Add two inner containers: 52% text / 48% image on desktop. Use a normal Image widget, not a background image, so alt text is available and the crop remains controllable. Add a bottom image caption with the date range and `Diani, Kenya`.

The text column should contain the small AAK label, `AAK Annual Convention 2026` H1, the approved theme line, the primary Registration button, and the secondary Programme text link. Use thin dividers only where they terminate at the label, caption, or image edge.

### 6.3 Recreate the dark Theme field

Use one dark container with a label `02 / The Theme`, the heading **From a field of fragments to a shared structure**, the approved theme text, and a simple horizontal transition line:

```text
FRAGILITY  —  ADAPTATION  —  RESILIENCE
```

Below it, create four manually duplicated topic containers. Give each a number, title, and short factual summary. This must be the homepage’s emotional and editorial high point; do not turn it into four rounded cards.

### 6.4 Programme page without premium tabs

Elementor Free installations vary in which tab widgets are included. Use the dependable no-cost fallback: a simple day navigation row built from Anchor links and native HTML `<details>` elements in an Elementor HTML widget, or free Accordion widgets if your installed Elementor version includes them.

```html
<details class="aak-programme-item">
  <summary><span>09:00</span><span>PLENARY</span><strong>Session title</strong></summary>
  <p>Approved session description and confirmation note.</p>
</details>
```

Build four day anchors (`#day-16`, `#day-17`, `#day-18`, `#day-19`) above the lists. This approach remains keyboard accessible and does not require Elementor Pro Nested Tabs. Add the official programme PDF link as the canonical full-calendar action.

### 6.5 Speakers page

Until the AAK Secretariat has approved names, roles, bios, and portraits, create a deliberate text-led placeholder. Do not use invented speaker cards. When the roster is approved, manually duplicate a 3-column speaker card container for the actual number of speakers. A premium dynamic Loop Grid is unnecessary for a small one-off convention roster.

### 6.6 Experience and technical tours

The Experience page begins with named Convention moments and then adds the technical-tour chapter:

> **The region becomes part of the curriculum.**

Create three alternating image/text containers manually. Each tour study needs a number, timing label, title, field lens, real sourced image, caption, concise verified description, source link, and a clear note that final access/timing/inclusions come from the Secretariat.

| Number | Title | Field lens |
|---:|---|---|
| 01 | Mwache Multipurpose Dam Project | Water infrastructure / catchment resilience |
| 02 | Ukunda Airport Terminal Expansion | Regional mobility / airport infrastructure |
| 03 | Kisite Mpunguti Marine Park & Wasini Island | Marine habitats / coastal ecology |

The Build Tours page uses the same three records in a dark field-guide layout. Manual duplication is the lowest-risk free approach. If AAK expects frequent updates, use CPT UI and free ACF fields, but a developer must create a shortcode to display those records because Elementor Free does not offer the Pro dynamic loop output.

### 6.7 Registration page

Build a dark Registration hero, then place the live event panel, then show the five-step journey:

```text
01 Ticket selection → 02 Registration details → 03 Booking type → 04 Payment → 05 Confirmation
```

End with the external official AAK event-page button. Use `Open in new window` in the Elementor link settings and label it plainly, for example **Continue to AAK registration**. Do not use an Elementor Form for ticket selection, attendee data, payment, or confirmation.

## 7. Automatic AAK event-information panel: free implementation

### 7.1 What the panel may show

The panel can automatically display the public AAK source’s event title, dates, venue label, CPD points, category, event type, ticket names, eligibility, KES prices, expiry-derived status, programme PDF link, and official event-page link.[^9]

| Field | Allowed visitor display | Not allowed |
|---|---|---|
| Ticket price | `KES 35,000` | A manually typed price beside a `Live` badge. |
| Status | `29 DAYS LEFT`, `AVAILABLE`, or `CLOSED` based on source flags/expiry. | `12 SEATS LEFT`, `ONLY 3 LEFT`, or any numeric stock claim. |
| Registration | External official AAK event/booking link. | A fake on-site checkout or payment form. |
| Calendar | Current date range plus programme PDF action. | Invented sessions or hidden internal schedule data. |
| Data source | `Live source / AAK event page` plus last checked time. | An unlabelled scrape that looks like AAK-managed inventory. |

### 7.2 Why a free custom plugin is required

The AAK member event page’s ticket details are loaded through its own public web method. A browser on the new design cannot reliably request that data across domains, and raw source data must not be exposed unchanged. Use a small **free custom plugin** named `aak-convention-live-event` in `wp-content/plugins/`.

The plugin is code you own; it has no licence cost. If you cannot create PHP files yourself, ask a developer to create this small plugin once. Do not use a generic “web scraper” plugin, and do not paste remote-request PHP into the active theme.

| Plugin responsibility | Exact requirement |
|---|---|
| Fixed source | Hardcode the approved AAK event source URL, event ID, company ID, and ticket method in the plugin. Do not let visitors submit a URL. |
| Retrieval | Use WordPress `wp_safe_remote_get()` and `wp_safe_remote_post()` with a strict 10–12 second timeout. WordPress documents the HTTP API for remote POST requests and advises its safe method where URL safety matters.[^6] |
| Cache | Use `get_transient()` / `set_transient()` with a five-minute expiry. WordPress documents Transients as temporary cached values that may disappear before their maximum expiry, so the plugin must regenerate safely.[^7] |
| Filtering | Return only approved public fields. Remove HTML, hidden IDs, member data, payment data, and source response metadata. |
| Output | Provide one server-rendered shortcode: `[aak_live_event_panel]`. |
| Fallback | If there is no valid cache and the source fails, render the fallback content and official event-page button. |
| Refresh | Add an Administrator-only “Clear AAK Event Cache” button in the plugin’s settings page. Do not expose a public refresh URL. |

### 7.3 Required plugin flow

```text
Visitor opens Home or Registration
        ↓
WordPress runs [aak_live_event_panel]
        ↓
Valid five-minute transient exists? ── Yes → Render normalized cached panel
        │
        No
        ↓
Plugin requests the fixed AAK page + fixed ticket method server-side
        ↓
Parse only approved public values, calculate expiry-derived status, sanitize
        ↓
Store normalized result in transient for 5 minutes
        ↓
Render ticket ledger + programme link + official registration link
```

If you decide to use JavaScript after the first version, create a read-only same-origin REST route such as `/wp-json/aak-convention/v1/event`. WordPress requires REST routes to register on `rest_api_init` and use an explicit permission callback.[^8] This is optional. For the free Elementor path, the server-rendered shortcode is simpler and avoids an empty loading state.

### 7.4 Place the shortcode in Elementor

On **Home**, add a full-width container immediately after the Introduction section. Drag in Elementor’s **Shortcode** widget and enter:

```text
[aak_live_event_panel]
```

Give its parent container the class `aak-live-event-field`. Repeat this on **Registration** immediately after the dark hero and before the five-step route. Use the class `aak-live-event-field aak-live-event-field--compact` on the Registration version.

The shortcode should render this hierarchy:

```text
07 / CURRENT EVENT INFORMATION
LIVE SOURCE / AAK EVENT PAGE
What is open now.

Calendar | Venue | Learning / CPD points

Ticket type | Price | Source status
Member ticket / MEMBERS ONLY | KES amount | N DAYS LEFT

Last checked [time] | Open current programme | Continue to AAK registration
```

Make this a paper-and-rule ticket ledger, not a generic pricing-card grid. The red status uses a 1px outline; the price uses DM Mono; the ticket name and eligibility use a publication-style text hierarchy.

### 7.5 Source-unavailable fallback

The plugin must render this instead of a blank panel if no valid source/cache is available:

> **Current AAK information**  
> **View the latest ticket and event details.**  
> The official AAK event page remains the current source while this page reconnects.  
> **Open AAK event page ↗**

Test this before launch by temporarily disabling the custom plugin on a private/draft preview or using an Administrator-only local test switch. Confirm that the button works on desktop and mobile and that the normal ledger returns after the source is restored.

## 8. Free CSS and motion workflow

Put central CSS in **Appearance → Customize → Additional CSS** or in a child theme. Use classes from Elementor Advanced settings. Do not rely on Elementor Pro Custom CSS.

```css
:root {
  --aak-red: #B72028;
  --aak-paper: #F3F0E8;
  --aak-ink: #171714;
  --aak-rule: #D3CEC3;
  --aak-muted: #68655E;
}

.aak-plane,
.aak-live-event-field {
  background: #FAF9F5;
  border: 1px solid var(--aak-rule);
  border-radius: 30px;
  overflow: hidden;
}

.aak-status--open {
  border: 1px solid var(--aak-red);
  color: var(--aak-red);
  font-family: "DM Mono", monospace;
  font-size: 11px;
  letter-spacing: .08em;
  padding: 6px 9px;
  text-transform: uppercase;
}

.aak-register-button .elementor-button {
  background: var(--aak-red);
  border: 1px solid var(--aak-red);
  border-radius: 10px;
  font-family: "DM Mono", monospace;
  letter-spacing: .08em;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    transition-duration: .001ms !important;
  }
}
```

Use Elementor Free entrance effects only on a few major fields. For the optional scroll reveal, use a free Code Snippets plugin or a child-theme script to add an `is-visible` class when `.aak-reveal` enters the viewport. Do not use paid animation packs. Motion must use opacity/transform, respect `prefers-reduced-motion`, and stay below roughly 700ms.

## 9. Responsive and accessibility checks

Elementor supports device-specific editing controls; use desktop, tablet, and mobile views for each container.[^5] Do not merely shrink desktop layouts.

| Area | Free-tier acceptance test |
|---|---|
| Header | The Header/Footer Builder mobile header remains usable; Register stays visible. |
| Hero | H1 does not clip; image is stacked or cropped intentionally. |
| Programme | `<details>` or Accordion controls work by keyboard and touch. |
| Live panel | Price and status remain readable; no horizontal scroll; fallback link remains visible. |
| Technical tours | Each image has factual alt text and a working source link. |
| Registration | External AAK handoff opens clearly in a new tab. |
| Motion | Reduced-motion preferences remove non-essential movement. |

Use exactly one H1 per page, clear H2/H3 hierarchy, descriptive image alt text, visible keyboard focus, and sufficient contrast. Use empty alt text only for decorative structural marks.

## 10. Controlled launch without premium features

### 10.1 Before the launch window

1. Test every draft page while logged out and in an incognito browser.
2. Check the AAK source URL, registration link, programme PDF, Secretariat contacts, final dates, and venue language.
3. Confirm the free Header/Footer Builder templates are either draft-page-only or unassigned globally.
4. Confirm the live-event plugin is active, has a valid five-minute cached payload, and has a working fallback.
5. Take a new full backup and preserve the legacy menu/header/footer record.

### 10.2 Launch order

| Order | Action | Immediate check |
|---:|---|---|
| 1 | Publish approved new pages and change temporary slugs to final slugs. Rename old conflicting pages to `Legacy — [Name] — YYYY-MM-DD` first. | No slug collision. |
| 2 | Assign `AAK 2026 Primary — Draft` as the active menu and rename it `AAK 2026 Primary`. Preserve the old menu as `Legacy Primary`. | Test links while logged out. |
| 3 | In Header Footer Builder, make the final AAK header/footer global and disable the old global header/footer templates. | No duplicate header/footer appears. |
| 4 | Go to **Settings → Reading**, choose the new AAK 2026 Home as the static homepage, then save. | Root domain shows the new Home page. |
| 5 | Clear host/CDN/page cache and the AAK event transient once. | Live panel loads or shows the transparent fallback. |
| 6 | Check Home, Programme, Experience, Registration, and one legacy route on desktop and mobile. | No 404, missing CSS, or misleading ticket statement. |

### 10.3 Rollback order

If a critical issue appears, restore the public experience first:

1. Re-select the previous Homepage in **Settings → Reading**.
2. Reassign `Primary Navigation — Live`.
3. Disable the new global Header/Footer Builder templates and restore the legacy templates.
4. Clear cache and test logged out.
5. If the problem remains, restore the timestamped host backup.

Do not delete the new pages after a rollback. Set them back to Draft and investigate without affecting visitors.

## 11. Free-tier limitations you should expect

| Free-tier limitation | Practical consequence | Free workaround |
|---|---|---|
| No Elementor Pro Theme Builder | Header/footer needs a separate free plugin. | Use Header Footer Builder for Elementor. |
| No Loop Grid/Dynamic Tags | Content will not auto-generate Elementor cards from fields. | Manually duplicate the finite tour/speaker/programme sections, or create a shortcode with developer help. |
| No Pro Forms/checkout | No native ticket purchase, payment, or confirmation flow. | Use the official AAK external registration journey. |
| No Pro Custom Code | No dashboard area for global JavaScript. | Use a child theme or free Code Snippets. |
| No ACF Pro repeater/options pages | Complex repeatable field groups need code or manual editing. | Keep records separate as normal posts or manually manage the three tours. |
| Undocumented AAK ticket method | The automatic source may change without notice. | Keep the fallback active and ask AAK for a documented API. |

## 12. Final pre-launch checklist

| Check | Pass condition |
|---|---|
| No paid dependency | The site works without Elementor Pro, ACF Pro, paid theme, or paid addon. |
| Public site safety | Existing pages remain unchanged until the controlled launch window. |
| Convention identity | No Biennale text, logos, or imagery appear on the public Convention pages. |
| Event facts | Date, venue, CPD points, contacts, and registration link are confirmed by AAK. |
| Live event panel | Source facts/status match the AAK page; no numeric inventory is claimed; fallback works. |
| Technical tours | Real images have permission/source records and working source links. |
| Registration | Every CTA links to the official AAK path; no fake checkout exists. |
| Mobile and accessibility | Keyboard, focus, mobile width, heading structure, alt text, and reduced motion are tested. |
| Backup | A current full host backup and rollback owner are confirmed. |

## References

[^1]: [Header Footer Builder for Elementor, WordPress.org](https://wordpress.org/plugins/header-footer-builder-for-elementor/)
[^2]: [Custom Post Type UI, WordPress.org](https://wordpress.org/plugins/custom-post-type-ui/)
[^3]: [Advanced Custom Fields, WordPress.org](https://wordpress.org/plugins/advanced-custom-fields/)
[^4]: [WordPress, “How to use the preview function”](https://wordpress.org/documentation/article/how-to-use-the-preview-function/)
[^5]: [Elementor, “Responsive editing for mobile and tablets”](https://elementor.com/help/mobile-editing/)
[^6]: [WordPress Developer Resources, “wp_remote_post()”](https://developer.wordpress.org/reference/functions/wp_remote_post/)
[^7]: [WordPress Developer Resources, “Transients API”](https://developer.wordpress.org/apis/transients/)
[^8]: [WordPress Developer Resources, “register_rest_route()”](https://developer.wordpress.org/reference/functions/register_rest_route/)
[^9]: [Architectural Association of Kenya, “AAK Annual Convention 2026 Event Registration”](https://members.aak.or.ke/eventdetailv2?eid=baM8JnQ3%2BAaNamasUK2rTg%3D%3D)
