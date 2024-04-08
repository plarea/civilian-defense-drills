import { upsertDrill, useQueryDrills } from "../service";
import { Button, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { useState } from "react";
import DrillsForm from "../components/Form";
import Drill, { DrillForm } from "../models";
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
  const upsert = async (form: DrillForm | Drill) => {
    await upsertDrill(form);
    handleCancel();
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
            <li className="flex justify-between flex-row gap-3" key={drill.id}>
              {editId === drill.id ? (
                <DrillsForm
                  drill={drill}
                  onSubmit={upsert}
                  onCancel={handleCancel}
                />
              ) : (
                <>
                  <div>
                    <Text>{drill.name}</Text>
                  </div>
                  <div className="flex gap-3">
                    <Link to={`/drills/${drill.id}`}>View</Link>
                    <Button onClick={() => handleEdit(drill.id)} size="1">
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </li>
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
