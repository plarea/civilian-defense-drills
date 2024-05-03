export type Target = {
  id: string;
  drillId: string;
  name: string;
};

export type TargetForm = Omit<Target, "id">;

export function isTarget(string: Target | TargetForm): string is Target {
  return (<Target>string).id !== undefined;
}
