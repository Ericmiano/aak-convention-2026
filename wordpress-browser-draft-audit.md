# WordPress Draft Audit: Initial Findings

**Audit date:** 18 August 2026  
**Operating constraint:** No publishing, no change to live homepage, no change to live navigation, and no activation of sitewide templates without explicit approval.

## Confirmed WordPress state

The WordPress administrator dashboard at `https://convention.aak.or.ke/wp-admin/` is accessible through the user’s authenticated browser. The Pages list contains one published Elementor front page named **Home** and ten drafts. The relevant AAK 2026 drafts are:

| Draft page | Editor status | Last-modified pattern |
|---|---|---|
| AAK 2026 — Draft — Home | Elementor enabled | 18 August 2026, later than the supporting route drafts |
| AAK 2026 — Draft — Programme | Draft | 18 August 2026 |
| AAK 2026 — Draft — Theme | Draft | 18 August 2026 |
| AAK 2026 — Draft — Speakers | Draft | 18 August 2026 |
| AAK 2026 — Draft — Experience | Draft | 18 August 2026 |
| AAK 2026 — Draft — Build Tours | Draft | 18 August 2026 |
| AAK 2026 — Draft — Venue | Draft | 18 August 2026 |
| AAK 2026 — Draft — Registration | Draft | 18 August 2026 |

## Available administration features

The left-side WordPress administration menu confirms Elementor, ACF, CPT UI, UpdraftPlus, Appearance, Plugins, and Settings are installed/available. The current audit has not modified their settings, plugin activation state, templates, pages, menus, or the published front page.

## Next audit focus

The next steps are to inspect the existing AAK 2026 Draft Home visual preview, then review Elementor Site Settings, free header/footer tooling, draft menu state, and the supporting draft-page content before choosing draft-safe implementation actions.

## Draft Home editor finding

The page `AAK 2026 — Draft — Home` (post ID 456) is confirmed as **Draft**, with the temporary slug `aak-2026-draft-home`. Its standard WordPress editor canvas is visually empty, while the page exposes the `Edit with Elementor` action. This indicates that any existing Claude-built composition is either held in Elementor page data or has not yet been added. Opening the Elementor editor did not publish, save, or alter the page.

## Elementor and plugin findings

The Elementor editor is available and the Draft Home canvas currently contains only the page title and an empty “Drag widget here” field. No completed public-page composition was visible. The editor exposes a custom **AAK Convection** widget collection, but its currently visible named widgets are Biennale-specific and should not be used in the Convention implementation.

The active free-tool stack consists of AAK Convection, Elementor Free, Ultimate Addons for Elementor, Advanced Custom Fields, Custom Post Type UI, and UpdraftPlus. Ultimate Addons for Elementor documents that it can create Elementor headers/footers and reusable blocks, making it the existing free header/footer route. No plugin activation, deactivation, update, setting, template, or draft-page content was changed during this audit.

## Initial design-system finding

The Elementor Design System panel currently reports no saved variables. This confirms that the Convention colors and fonts mentioned by the user are either held in another Elementor/global configuration area, in theme-level CSS, or are not yet saved as Elementor variables. The panel was inspected only; no variable, class, font, color, or page setting was created or changed.

## Header and footer template finding

Ultimate Addons for Elementor contains two new draft templates: `AAK 2026 / Draft Header` (post ID 476) and `AAK 2026 / Draft Footer` (post ID 479). They are both draft/unpublished, while the existing published `Header` and `Footer` templates remain assigned to **Entire Website**. This is the correct non-destructive starting point: the new templates must remain drafts and must not receive global display conditions during implementation. Opening the Draft Header editor did not save, publish, or change its display conditions.

The `AAK 2026 / Draft Header` Elementor canvas currently contains only empty containers and empty widget drop zones. It has no visible completed navigation, brand lock-up, menu, or Register CTA. The header can therefore be completed from scratch within the draft template without overwriting existing Claude-created content.

## Navigation and footer findings

The active WordPress theme reports that it does not support WordPress navigation menus or widgets. The Convention draft header should therefore use a manual Elementor/UAE link row or the existing AAK Convection navigation mechanism rather than relying on `Appearance → Menus`.

The `AAK 2026 / Draft Footer` editor was opened and remains an unpublished draft. Its visual canvas is pending final load inspection, but no publish, display-rule, theme, menu, or live footer change has been made. The published Header and Footer remain the only templates assigned to the live site.

The Draft Footer Elementor canvas was subsequently confirmed as empty, so both draft shared templates can be built from scratch without overwriting existing Convention layout work.

## Live-site separation finding

The active public WordPress theme is **Twenty Twenty-Five**. Its current Customizer preview visibly presents the Nairobi Biennale public experience, including a Biennale-specific header, hero, and visual identity. This confirms the Convention project must remain strictly isolated in drafts until an explicit launch approval. No Customizer setting, Additional CSS field, theme setting, front-page setting, or publish control was changed during inspection.

The active theme’s Additional CSS editor is currently empty. There is therefore no existing scoped Convention CSS to reuse from the WordPress Customizer. To avoid touching the live Biennale site, the first draft implementation must use Elementor’s per-element styling and page-local structure. A shared global CSS layer should be added only later in a carefully scoped, draft-safe manner or during the approved launch process.

## Convention media import

The approved `aak-convention-hero` image was uploaded successfully to the WordPress Media Library as an unattached item. It has not been inserted into any published page, post, header, footer, or live template. The Media Library also contains numerous pre-existing Biennale assets; the Convention implementation will use only explicitly identified Convention/tour files and will not reuse Biennale visual assets.

The WordPress multi-file uploader is now active and ready to receive the remaining approved Convention and technical-tour files. This upload path changes the unattached Media Library asset pool only; it does not publish content or associate files with existing live Biennale pages.

The approved `aak-convention-people` image was also uploaded successfully as an unattached Media Library item. Both currently imported Convention assets remain isolated from all live Biennale pages and templates.

## Draft-safe implementation priorities

The audit establishes that the AAK 2026 work is a clean draft scaffold rather than a partly completed content build. The safe implementation sequence is therefore:

1. Upload the approved Convention images to the WordPress Media Library without inserting them into published posts or pages.
2. Build the `AAK 2026 / Draft Header` and `AAK 2026 / Draft Footer` as unpublished Elementor templates using manual Convention links rather than existing Biennale widgets or live-theme navigation.
3. Build the Draft Home as a self-contained Convention landing page with its own header/footer markup in preview, ensuring it can be reviewed before any global display condition is considered.
4. Build the remaining draft pages using the same page-local editorial system: Programme, Theme, Speakers placeholder, Experience/technical tours, Venue, Build Tours, and Registration.
5. Preserve all live Biennale theme, header, footer, homepage, and Customizer settings. The only future launch action should be a separately approved switchover plan.

The current free stack is adequate for these draft-only layouts. The automatic AAK event-information panel remains a small custom-plugin requirement and should be represented in drafts as a clearly labelled source placeholder until a WordPress plugin is added.
