import { canViewFeature, FeatureKey } from "../libs/featureFlags";
import { getUser } from "../utils/getUser";

export function FeatureFlag({
  feature,
  children,
  fallback,
}: {
  feature: FeatureKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const user = getUser();
  const canView = canViewFeature(feature, user);
  return canView ? <>{children}</> : fallback ?? null;
}
