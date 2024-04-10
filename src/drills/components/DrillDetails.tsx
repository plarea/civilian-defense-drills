import { Heading, IconButton, Link as RadixLink } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Drill from "../models";
import FireStringList from "../../fire-strings/components/List";
import {
  deleteFireStrings,
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

type Mode = "edit" | "regular";

export default function DrillDetails({ drill }: Props) {
  const fireStrings = useQueryFireStrings(drill.id);
  const highestOrder = fireStrings
    .map((fs) => fs.order)
    .reduce((cur, acc) => Math.max(cur, acc), 0);
  const [editId, setEditId] = useState<string>();
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("regular");
  const handleEditClick = (id: string) => {
    if (mode === "edit") {
      setDeleteIds((cur) => {
        if (cur.includes(id)) {
          return cur.filter((dId) => dId !== id);
        }
        return cur.concat(id);
      });
      return;
    }
    setEditId(id);
  };
  const handleChange = async (fireString: FireString | FireStringForm) => {
    await upsertFireString(fireString);
  };
  const handleCancel = () => {
    setMode("regular");
    setDeleteIds([]);
  };
  const handleDelete = () => {
    if (!deleteIds.length) {
      handleCancel();
      return;
    }
    deleteFireStrings(deleteIds);
    handleCancel();
  };
  return (
    <section className="flex flex-col gap-3 flex-auto h-full">
      <div className="flex gap-3 flex-col flex-initial">
        <div className="flex justify-between">
          {mode === "regular" && (
            <>
              <Link to="/drills">Back</Link>
              <RadixLink onClick={() => setMode("edit")}>Edit</RadixLink>
            </>
          )}
          {mode === "edit" && (
            <>
              <RadixLink onClick={handleDelete}>Delete</RadixLink>
              <RadixLink onClick={handleCancel}>Cancel</RadixLink>
            </>
          )}
        </div>
        <Heading>{drill.name}</Heading>
      </div>
      <div className="flex gap-3 flex-col flex-auto overflow-y-auto">
        <span>{drill.description}</span>
        <Heading as="h2" size="4">
          Strings of Fire:
        </Heading>
        {fireStrings.length > 0 && (
          <FireStringList
            mode={mode === "regular" ? "view" : "select"}
            onDone={() => setEditId(undefined)}
            fireStrings={fireStrings}
            editId={editId}
            onChange={handleChange}
            onClick={handleEditClick}
            selectedIds={deleteIds}
          />
        )}
      </div>
      <div className="flex-initial">
        {editId === "new" ? (
          <Form
            onDone={() => setEditId(undefined)}
            drill={drill}
            onChange={handleChange}
            defaultOrder={highestOrder + 1}
          />
        ) : (
          <IconButton
            className="w-full mt-auto"
            onClick={() => setEditId("new")}
            color="orange"
            variant="soft"
          >
            <PlusCircledIcon width="18" height="18" />
            &nbsp;Add String of Fire
          </IconButton>
        )}
      </div>
    </section>
  );
}
