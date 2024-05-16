import { IconButton, Link as RadixLink } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Drill } from "../models";
import FireStringList from "../../fire-strings/components/List";
import {
  deleteFireStrings,
  upsertFireString,
  useQueryFireStrings,
} from "../../fire-strings/service";
import DrillForm from "./Form";
import StringForm from "../../fire-strings/components/Form";
import { useState } from "react";
import { FireString, FireStringForm } from "../../fire-strings/models";
import Link from "../../components/Link";
import { upsertDrill } from "../service";
import TargetList from "../../targets/components/List";

type Props = {
  drill: Drill;
};

type Mode = "edit" | "regular";

export default function DrillDetails({ drill }: Props) {
  const fireStrings = useQueryFireStrings(drill.id);
  const highestOrder = fireStrings
    .map((fs) => fs.order)
    .reduce((cur, acc) => Math.max(cur, acc), 0);
  const totalShots = fireStrings
    .map((fs) => fs.shots)
    .reduce((acc, cur) => acc + cur, 0);
  const [fireStringEditId, setFireStringEditId] = useState<string>();
  const [fireStringDeleteIds, setFireStringDeleteIds] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("regular");
  const handleEditClick = (id: string) => {
    if (mode === "edit") {
      setFireStringDeleteIds((cur) => {
        if (cur.includes(id)) {
          return cur.filter((dId) => dId !== id);
        }
        return cur.concat(id);
      });
      return;
    }
    setFireStringEditId(id);
  };
  const handleChange = async (fireString: FireString | FireStringForm) => {
    await upsertFireString(fireString);
  };
  const handleUpdate = async (drill: Drill) => {
    await upsertDrill(drill);
  };
  const handleDone = () => {
    setMode("regular");
    setFireStringDeleteIds([]);
  };
  const handleDelete = () => {
    if (!fireStringDeleteIds.length) {
      handleDone();
      return;
    }
    deleteFireStrings(fireStringDeleteIds);
    handleDone();
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
              <RadixLink onClick={handleDone}>Done</RadixLink>
            </>
          )}
        </div>
        <h1 className="text-xl font-bold">{drill.name}</h1>
      </div>
      <div className="flex gap-3 flex-col flex-auto overflow-y-auto">
        {mode === "regular" && <span>{drill.description}</span>}
        {mode === "edit" && <DrillForm drill={drill} onChange={handleUpdate} />}
        <div className="flex">
          <h2 className="text-lg font-bold flex-auto">Targets</h2>
        </div>
        <TargetList drill={drill} />
        <div className="flex">
          <h2 className="text-lg font-bold flex-auto">Strings of Fire</h2>
          <span className="flex text-sm flex-initial items-center">
            {totalShots} shots
          </span>
        </div>
        {fireStrings.length > 0 && (
          <FireStringList
            mode={mode === "regular" ? "view" : "select"}
            onDone={() => setFireStringEditId(undefined)}
            fireStrings={fireStrings}
            editId={fireStringEditId}
            onChange={handleChange}
            onClick={handleEditClick}
            selectedIds={fireStringDeleteIds}
          />
        )}
      </div>
      <div className="flex-initial">
        {fireStringEditId === "new" ? (
          <StringForm
            onDone={() => setFireStringEditId(undefined)}
            drill={drill}
            onChange={handleChange}
            defaultOrder={highestOrder + 1}
          />
        ) : (
          <IconButton
            size="3"
            className="w-full mt-auto gap-2"
            onClick={() => setFireStringEditId("new")}
            variant="soft"
          >
            <PlusCircledIcon width="24" height="24" /> Add String of Fire
          </IconButton>
        )}
      </div>
    </section>
  );
}
