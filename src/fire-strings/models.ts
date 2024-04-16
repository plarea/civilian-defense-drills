export type FireString = {
  id: string;
  drillId: string;
  order: number;
  distance: string;
  description: string;
  shots: number;
};

export type FireStringForm = Omit<FireString, "id">;

export function isFireString(
  string: FireString | FireStringForm,
): string is FireString {
  return (<FireString>string).id !== undefined;
}
