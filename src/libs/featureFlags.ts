import { murmurhash3 } from "../utils/murmurhash";
import { User, UserRole } from "../utils/getUser";

type FeatureFlagRule = {
  userRoles?: UserRole[];
  percentageOfUsers?: number;
} & (
  | {
      percentageOfUsers: number;
    }
  | {
      userRoles: UserRole[];
    }
);

export type FeatureKey = keyof typeof FEATURE_FLAGS;

export const FEATURE_FLAGS = {
  ADVANCED_SEARCH: true,
  NEW_INTEGRATION_PAGE: true,
  NEW_ONBOARDING_PAGE: [
    {
      userRoles: ["admin", "owner"],
    },
  ],
  SHARE_WITH_TEAM: [{ percentageOfUsers: 0.5 }],
} as const satisfies Record<string, FeatureFlagRule[] | boolean>;

export function canViewFeature(feature: FeatureKey, user: User) {
  const rules = FEATURE_FLAGS[feature];
  if (typeof rules === "boolean") {
    return rules;
  }
  return rules.some((rule) => checkRule(rule, feature, user));
}

function checkRule(
  { userRoles, percentageOfUsers }: FeatureFlagRule,
  feature: FeatureKey,
  user: User
) {
  return (
    userHasValidRole(userRoles, user) &&
    userIsInPercentageOfUsers(feature, percentageOfUsers, user)
  );
}

function userHasValidRole(allowedRoles: UserRole[] | undefined, user: User) {
  return allowedRoles == null || allowedRoles.includes(user.role);
}

const MAX_UINT_32 = Math.pow(2, 32);
function userIsInPercentageOfUsers(
  feature: FeatureKey,
  allowedPercentage: number | undefined,
  user: User
) {
  if (allowedPercentage == null) {
    return true;
  }
  const hash = `${feature}-${user.id}`;
  return (murmurhash3(hash) >>> 0) / MAX_UINT_32 < allowedPercentage;
}
