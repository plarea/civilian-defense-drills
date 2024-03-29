import { FormEvent, useState } from "react";
import { addDrill, createDrill } from "../service";
import { useNavigate } from "react-router-dom";
import { TextField, Text, Flex, Button, Heading } from "@radix-ui/themes";

export default function DrillsForm() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length <= 0) {
      // TODO show error
      return;
    }
    const drill = createDrill({ name });
    setName("");
    await addDrill(drill);
    navigate("/drills");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Heading>Create Drill</Heading>
      <Flex gap="3" direction="column">
        <Text as="label">Drill name:</Text>
        <TextField.Root
          type="text"
          id="drill-name"
          name="drill-name"
          value={name}
          placeholder="50 round carbine"
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="outline" type="submit">
          Create
        </Button>
      </Flex>
    </form>
  );
}
