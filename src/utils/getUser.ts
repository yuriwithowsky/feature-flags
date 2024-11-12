export type UserRole = "admin" | "owner" | "member";

export type User = {
  role: UserRole;
  id: string;
};

export function getUser(): User {
  return {
    id: "1",
    role: "admin",
  };
}
