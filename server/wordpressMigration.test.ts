import { describe, expect, it } from "vitest";
import {
  buildWordPressMigrationPayload,
  validateWordPressMigrationPayload,
  wordpressContentModel,
} from "../client/src/data/wordpressMigration";

describe("WordPress migration content bridge", () => {
  it("exports a complete database-free content handoff", () => {
    const payload = buildWordPressMigrationPayload();

    expect(validateWordPressMigrationPayload(payload)).toEqual([]);
    expect(payload.programmeSessions.length).toBeGreaterThan(0);
    expect(payload.technicalTours).toHaveLength(3);
    expect(payload.siteOptions.registration_url).toContain("members.aak.or.ke");
  });

  it("maps the required fields to clear future WordPress content groups", () => {
    expect(wordpressContentModel.siteOptions.fields).toContain("registration_url");
    expect(wordpressContentModel.programmeSession.fields).toContain("speaker");
    expect(wordpressContentModel.technicalTour.fields).toContain("source_url");
  });
});
