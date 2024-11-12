import { expect, test } from "vitest";

import { canViewFeature } from "../libs/featureFlags";

test("should return true when the user has the role and is in the percentage of users", () => {
  expect(canViewFeature("SHARE_WITH_TEAM", { id: "1", role: "admin" })).toBe(
    true
  );
});
