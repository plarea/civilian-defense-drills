import { upsertDrill, useQueryDrills } from "../service";
import { Button, Heading, Separator, Text } from "@radix-ui/themes";
import { useState } from "react";
import DrillsForm from "../components/Form";
import Drill, { DrillForm } from "../models";
import DrillCard from "../components/DrillCard";

export default function DrillsList() {
  const drills = useQueryDrills();
  const [editId, setEditId] = useState<string>();
  const handleCreateDrill = () => {
    setEditId("new");
  };
  const handleCancel = () => {
    setEditId(undefined);
  };
  const upsert = async (form: DrillForm | Drill) => {
    await upsertDrill(form);
    handleCancel();
  };
  const handleEdit = (id: string) => {
    setEditId(id);
  };

  return (
    <div className="flex flex-col gap-2 flex-auto">
      <Heading>Drills</Heading>
      <section className="flex flex-col gap-3 flex-auto">
        <ul className="flex flex-col gap-3">
          {!drills.length && <Text>No saved drills. Lets create one!</Text>}
          {drills.map((drill) => (
            <li className="flex justify-between flex-row gap-3" key={drill.id}>
              {editId === drill.id ? (
                <DrillsForm
                  drill={drill}
                  onSubmit={upsert}
                  onCancel={handleCancel}
                />
              ) : (
                <DrillCard
                  drill={drill}
                  onEditClick={() => handleEdit(drill.id)}
                />
              )}
            </li>
          ))}
        </ul>
        {editId === "new" && (
          <>
            <Separator size="4" />
            <DrillsForm onSubmit={upsert} onCancel={handleCancel} />
          </>
        )}
        {!editId && (
          <Button onClick={handleCreateDrill} className="mt-auto">
            Create Drill
          </Button>
        )}
      </section>
    </div>
  );
}
