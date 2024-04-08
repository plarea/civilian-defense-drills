type Drill = {
  id: string;
  name: string;
};

export default Drill;

export type DrillForm = {
  name: string;
};

export function isDrill(drill: Drill | DrillForm): drill is Drill {
  return (<Drill>drill).id !== undefined;
}
