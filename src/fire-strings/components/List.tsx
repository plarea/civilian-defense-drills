import FireString, { FireStringForm } from "../models";
import FireStringDetail from "./Detail";
import Form from "./Form";

type Props = {
  fireStrings: FireString[];
  editId?: string;
  onCancel: () => void;
  onEditClick: (id: string) => void;
  onUpdate: (fireString: FireString | FireStringForm) => void;
};

export default function FireStringList({
  fireStrings,
  editId,
  onUpdate,
  onCancel,
  onEditClick,
}: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {fireStrings.map((fireString) => (
        <li key={fireString.id}>
          {editId === fireString.id ? (
            <Form fireString={fireString} onSubmit={onUpdate} onCancel={onCancel} />
          ) : (
            <FireStringDetail
              isEditable={!editId}
              fireString={fireString}
              onEditClick={() => onEditClick(fireString.id)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
