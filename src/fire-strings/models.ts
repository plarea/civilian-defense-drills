type FireString = {
  id: string;
  drillId: string;
  order: number;
  distance: string;
  description: string;
};

export default FireString;

export type FireStringForm = {
  order: number;
  distance: string;
  drillId: string;
  description: string;
};

export function isFireString(
  string: FireString | FireStringForm,
): string is FireString {
  return (<FireString>string).id !== undefined;
}
