import { addDrill, createDrill, useQueryDrills, updateDrill } from "../service";
import { Button, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { useState } from "react";
import DrillsForm from "./Form";
import { DrillForm } from "../models";
import Link from "../../components/Link";

export default function DrillsList() {
  const drills = useQueryDrills();
  const [editId, setEditId] = useState<string>();
  const handleCreateDrill = () => {
    setEditId("new");
  };
  const handleCancel = () => {
    setEditId(undefined);
  };
  const upsert = async (form: DrillForm, id?: string) => {
    if (editId === "new") {
      await addDrill(createDrill(form));
      handleCancel();
      return;
    }

    if (id) {
      await updateDrill(id, { id, ...form });
      handleCancel();
      return;
    }
  };
  const handleEdit = (id: string) => {
    setEditId(id);
  };

  return (
    <Flex gap="2" direction="column">
      <Heading>Drills</Heading>
      <section className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {!drills.length && <Text>No saved drills. Lets create one!</Text>}
          {drills.map((drill) => (
            <>
              {editId === drill.id ? (
                <DrillsForm
                  key={drill.id}
                  drill={drill}
                  onSubmit={(form) => upsert(form, drill.id)}
                  onCancel={handleCancel}
                />
              ) : (
                <li
                  className="flex justify-between flex-row gap-3"
                  key={drill.id}
                >
                  <div>
                    <Text>{drill.name}</Text>
                  </div>
                  <div className="flex gap-3">
                    <Link to={`/drills/${drill.id}`}>View</Link>
                    <Button onClick={() => handleEdit(drill.id)} size="1">
                      Edit
                    </Button>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
        {!editId && <Button onClick={handleCreateDrill}>Create Drill</Button>}
        {editId === "new" && (
          <>
            <Separator size="4" />
            <DrillsForm onSubmit={upsert} onCancel={handleCancel} />
          </>
        )}
      </section>
    </Flex>
  );
}
