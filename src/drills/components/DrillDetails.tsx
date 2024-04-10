import { Heading, IconButton } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Drill from "../models";
import FireStringList from "../../fire-strings/components/List";
import {
  upsertFireString,
  useQueryFireStrings,
} from "../../fire-strings/service";
import Form from "../../fire-strings/components/Form";
import { useState } from "react";
import FireString, { FireStringForm } from "../../fire-strings/models";
import Link from "../../components/Link";

type Props = {
  drill: Drill;
};
export default function DrillDetails({ drill }: Props) {
  const fireStrings = useQueryFireStrings(drill.id);
  const highestOrder = fireStrings
    .map((fs) => fs.order)
    .reduce((cur, acc) => Math.max(cur, acc), 0);
  const [editId, setEditId] = useState<string>();
  const handleEditClick = (id: string) => {
    setEditId(id);
  };
  const handleChange = async (fireString: FireString | FireStringForm) => {
    await upsertFireString(fireString);
  };
  return (
    <section className="flex flex-col gap-3 flex-auto">
      <div className="flex justify-between">
        <Link to="/drills">Back</Link>
        <Link to={`/drills/${drill.id}/edit`} state={{ origin: "detail" }}>
          Edit
        </Link>
      </div>
      <Heading>{drill.name}</Heading>
      <span>{drill.description}</span>
      <Heading as="h2" size="4">
        Strings of Fire:
      </Heading>
      {fireStrings.length > 0 && (
        <FireStringList
          onDone={() => setEditId(undefined)}
          fireStrings={fireStrings}
          editId={editId}
          onChange={handleChange}
          onEditClick={handleEditClick}
        />
      )}
      {editId === "new" && (
        <Form
          onDone={() => setEditId(undefined)}
          drill={drill}
          onChange={handleChange}
          defaultOrder={highestOrder + 1}
        />
      )}
      <IconButton
        className="w-full mt-auto"
        onClick={() => setEditId("new")}
        color="orange"
        variant="soft"
      >
        <PlusCircledIcon width="18" height="18" />
        &nbsp;Add String of Fire
      </IconButton>
    </section>
  );
}
