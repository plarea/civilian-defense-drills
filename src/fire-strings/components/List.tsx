import { FireString, FireStringForm } from "../models";
import FireStringDetail from "./Detail";
import Form from "./Form";

type Props = {
  fireStrings: FireString[];
  editId?: string;
  onClick: (id: string) => void;
  onDone: () => void;
  onChange: (fireString: FireString | FireStringForm) => void;
  selectedIds?: string[];
  mode: "view" | "select";
};

export default function FireStringList({
  fireStrings,
  editId,
  onChange,
  onDone,
  onClick,
  mode,
  selectedIds = [],
}: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {fireStrings.map((fireString) => (
        <li key={fireString.id}>
          {editId === fireString.id ? (
            <Form onDone={onDone} fireString={fireString} onChange={onChange} />
          ) : (
            <FireStringDetail
              mode={mode}
              fireString={fireString}
              onClick={() => onClick(fireString.id)}
              isSelected={selectedIds.includes(fireString.id)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
