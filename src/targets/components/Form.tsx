import { TextArea } from "@radix-ui/themes";
import { FormEvent, useMemo, useState, FocusEvent } from "react";
import { Target } from "../models";
import { Drill } from "../../drills/models";
import { upsertTarget } from "../service";

type EditProps = {
  drill?: undefined;
  target: Target;
};

type NewProps = {
  drill: Drill;
  target?: undefined;
};

type Props = {
  onDone: () => void;
} & (EditProps | NewProps);

export default function Form({ target, drill, onDone }: Props) {
  const [name, setName] = useState("");
  const targetForm = useMemo(() => {
    if (name.length <= 0) {
      return;
    }
    const drillId = target ? target.drillId : drill.id;
    return {
      ...(target || {}),
      drillId,
      name,
    };
  }, [name, target, drill]);
  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!targetForm) {
      onDone();
      return;
    }
    upsertTarget(targetForm);
    onDone();
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // don't allow line breaks in the text area
    // @ts-expect-error inputType does exist on nativeEvent
    if (e.nativeEvent.inputType === "insertLineBreak") {
      handleSubmit();
      return;
    }

    setName(e.target.value);
  };
  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (e.relatedTarget) {
      return;
    }

    handleSubmit();
  };
  return (
    <form
      onBlur={handleBlur}
      onSubmit={handleSubmit}
      className="flex flex-col gap-1 w-full"
    >
      <label htmlFor="target-name">Target name:</label>
      <TextArea
        size="3"
        radius="full"
        id="target-name"
        name="target-name"
        value={name}
        placeholder="Center"
        rows={4}
        onChange={handleNameChange}
        autoFocus
      />
    </form>
  );
}
