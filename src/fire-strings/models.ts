type FireString = {
  id: string;
  drillId: string;
  name: string;
  description: string;
};

export default FireString;

export type FireStringForm = {
  name: string;
  drillId: string;
  description: string;
};

export function isFireString(
  string: FireString | FireStringForm,
): string is FireString {
  return (<FireString>string).id !== undefined;
}
