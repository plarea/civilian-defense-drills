import FireString, { FireStringForm } from "../models";
import FireStringDetail from "./Detail";
import Form from "./Form";

type Props = {
  fireStrings: FireString[];
  editId?: string;
  onEditClick: (id: string) => void;
  onDone: () => void;
  onChange: (fireString: FireString | FireStringForm) => void;
};

export default function FireStringList({
  fireStrings,
  editId,
  onChange,
  onDone,
  onEditClick,
}: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {fireStrings.map((fireString) => (
        <li key={fireString.id}>
          {editId === fireString.id ? (
            <Form onDone={onDone} fireString={fireString} onChange={onChange} />
          ) : (
            <FireStringDetail
              fireString={fireString}
              onEditClick={() => onEditClick(fireString.id)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
