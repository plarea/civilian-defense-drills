export type Drill = {
  id: string;
  name: string;
  description: string;
};

export type DrillForm = {
  name: string;
  description: string;
};

export function isDrill(drill: Drill | DrillForm): drill is Drill {
  return (<Drill>drill).id !== undefined;
}
