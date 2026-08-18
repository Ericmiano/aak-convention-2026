# Code-First to WordPress Migration Reference

## Purpose

This project is designed to run as a **code-first Convention website** today while keeping its official content portable to WordPress later. The public site does **not** need a database for its present information architecture. Most content is static, source-controlled TypeScript data in `client/src/data/conventionData.ts`; the only live information is retrieved server-side from the official AAK members platform and held in a five-minute in-memory cache.

> The existing database capability remains available for future authenticated features, but it is deliberately not a dependency for the public Convention routes.

## Portable Content Contract

`client/src/data/wordpressMigration.ts` is the migration boundary. It exports a JSON-serialisable `WordPressMigrationPayload` and a field model that maps directly to a future WordPress setup. It does not change page rendering, make browser requests, or require WordPress at runtime.

| Code-first group | Future WordPress location | Key fields |
|---|---|---|
| Convention identity and contacts | Site options page or ACF options page | Event name, dates, venue, theme, contacts, assets, official links |
| Theme copy | Theme page fields | Title, paragraph collection, focus areas |
| Programme | `programme_session` custom post type | Day, time, type, title, detail, speaker |
| Technical tours | `technical_tour` custom post type | Number, timing, lens, image, alt text, summary, source label, source URL |
| Registration | Registration page fields | Official AAK link and booking capabilities |

## What Must Remain Outside WordPress

The official ticket, availability, and calendar panel should remain a server-to-server integration. It is currently implemented in `server/services/aakEvent.ts`, which reads the public AAK event source and uses expiry-derived status rather than claiming inventory. A future WordPress implementation can reproduce this with a small plugin, shortcode, or server-side REST proxy, but it should not expose the upstream endpoint directly in browser code.

## Future Migration Steps

1. Keep updating official static material in `conventionData.ts` until a WordPress editorial workflow is needed.
2. Run `buildWordPressMigrationPayload()` and export the result as the content-entry reference for the WordPress administrator.
3. Create the stated WordPress post types and fields, including media alt text and source attribution fields for technical tours.
4. Replace the frontend data module with an adapter that reads WordPress REST responses or a small server-side normalization route. The page components should remain unchanged.
5. Recreate the live AAK information panel as a server-side WordPress plugin/shortcode. Preserve its fallback state and official registration handoff.
6. Validate the WordPress output against the code-first production site before changing DNS or the Convention domain.

## Operational Decision Rule

Use the code-first model when a technical owner can make controlled content updates through GitHub and deployments. Introduce WordPress only when the Secretariat needs frequent independent content publishing. The migration bridge intentionally lets either model use the same factual Convention data without redesigning the frontend.
