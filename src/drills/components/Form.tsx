import { useDebouncedCallback } from "use-debounce";
import { FocusEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { TextField, Flex, Button, TextArea } from "@radix-ui/themes";
import Drill, { DrillForm } from "../models";

type NewProps = {
  drill?: undefined;
  onSubmit: (form: DrillForm) => void;
  onCancel: () => void;
};

type EditProps = {
  drill: Drill;
  onChange: (drill: Drill) => void;
};

type Props = NewProps | EditProps;

export default function DrillsForm(props: Props) {
  const [name, setName] = useState(props.drill?.name ?? "");
  const [description, setDescription] = useState(
    props.drill?.description ?? "",
  );
  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (name.length <= 0) {
      // TODO show error
      return;
    }

    if (props.drill) {
      const drill = { ...props.drill, name, description };
      props.onChange(drill);
      return;
    }
    const drill = { name, description };
    props.onSubmit(drill);
  };
  const updatedDrill = useMemo(() => {
    if (!props.drill) {
      return;
    }

    return {
      id: props.drill.id,
      name,
      description,
    };
  }, [name, description, props.drill]);

  const handleUpdate = useDebouncedCallback((updatedDrill: Drill) => {
    if (!props.drill) {
      return;
    }
    props.onChange(updatedDrill);
  }, 333);

  useEffect(() => {
    if (!updatedDrill) {
      return;
    }
    handleUpdate(updatedDrill);
  }, [updatedDrill, handleUpdate]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    // don't allow line breaks in the text area
    // @ts-expect-error inputType does exist on nativeEvent
    if (e.nativeEvent.inputType === "insertLineBreak") {
      handleSubmit();
      return;
    }

    setDescription(e.target.value);
  };

  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (e.relatedTarget || !props.drill) {
      return;
    }

    handleSubmit();
  };
  return (
    <form
      onBlur={handleBlur}
      onSubmit={handleSubmit}
      className="flex flex-col flex-auto"
    >
      <Flex gap="3" direction="column" className="flex flex-auto">
        {!props.drill && <span>Name:</span>}
        <TextField.Root
          size="3"
          radius="full"
          type="text"
          id="drill-name"
          name="drill-name"
          value={name}
          placeholder="50 round carbine"
          onChange={(e) => setName(e.target.value)}
        />
        {!props.drill && <span>Description:</span>}
        <TextArea
          size="3"
          radius="full"
          id="drill-description"
          name="drill-description"
          value={description}
          rows={5}
          placeholder="Drill description..."
          onChange={handleDescriptionChange}
        />
        {!props.drill && (
          <div className="grid gap-3">
            <Button size="3" variant="outline" type="submit">
              {props.drill ? "Update" : "Create"}
            </Button>
            <Button size="3" onClick={props.onCancel} variant="soft">
              Cancel
            </Button>
          </div>
        )}
        {props.drill && <input type="submit" hidden />}
      </Flex>
    </form>
  );
}
