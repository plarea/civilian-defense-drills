import { FormEvent, useState } from "react";
import { TextField, Text, Button, TextArea } from "@radix-ui/themes";
import FireString, { FireStringForm } from "../models";
import Drill from "../../drills/models";

type UpdateProps = {
  drill?: undefined;
  fireString: FireString;
};

type CreateProps = {
  drill: Drill;
  fireString?: undefined;
};

type Props = {
  onSubmit: (form: FireString | FireStringForm) => void;
  onCancel: () => void;
} & (UpdateProps | CreateProps);

export default function Form(props: Props) {
  const [name, setName] = useState(props.fireString?.name ?? "");
  const [description, setDescription] = useState(
    props.fireString?.description ?? "",
  );
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length <= 0 || description.length <= 0) {
      // TODO show error
      return;
    }
    const drillId = props.fireString ? props.fireString.drillId : props.drill.id;
    const fireString = { ...(props.fireString || {}), name, drillId, description };
    setName("");
    setDescription("");
    props.onSubmit(fireString);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Text as="label">String name:</Text>
      <TextField.Root
        type="text"
        id="string-name"
        name="string-name"
        value={name}
        placeholder="1st COF"
        onChange={(e) => setName(e.target.value)}
      />
      <Text as="label">String description:</Text>
      <TextArea
        id="string-description"
        name="string-description"
        value={description}
        placeholder="2 shots center target, headbox"
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-3 ml-auto">
        <Button onClick={props.onCancel} variant="soft">
          Cancel
        </Button>
        <Button variant="outline" type="submit">
          {props.fireString ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
