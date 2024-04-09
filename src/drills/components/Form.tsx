import { FormEvent, useState } from "react";
import { TextField, Text, Flex, Button, TextArea } from "@radix-ui/themes";
import Drill, { DrillForm } from "../models";

type Props = {
  onSubmit: (form: DrillForm | Drill) => void;
  onCancel: () => void;
  drill?: Drill;
};

export default function DrillsForm(props: Props) {
  const [name, setName] = useState(props.drill?.name ?? "");
  const [description, setDescription] = useState(
    props.drill?.description ?? "",
  );
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length <= 0) {
      // TODO show error
      return;
    }
    const drill = { ...props.drill, name, description };
    setName("");
    setDescription("");
    props.onSubmit(drill);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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
        <Text as="label">Drill description:</Text>
        <TextArea
          id="drill-description"
          name="drill-description"
          value={description}
          rows={5}
          placeholder="Drill description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-3 ml-auto">
          <Button onClick={props.onCancel} variant="soft">
            Cancel
          </Button>
          <Button variant="outline" type="submit">
            {props.drill ? "Update" : "Create"}
          </Button>
        </div>
      </Flex>
    </form>
  );
}
