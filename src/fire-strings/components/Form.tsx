import { FocusEvent, FormEvent, useMemo, useState } from "react";
import { TextField, Text, TextArea, Card } from "@radix-ui/themes";
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
  defaultOrder?: number;
  onChange: (form: FireString | FireStringForm) => void;
  onDone: () => void;
} & (UpdateProps | CreateProps);

export default function Form({
  onChange,
  fireString,
  drill,
  onDone,
  defaultOrder,
}: Props) {
  const [distance, setDistance] = useState(fireString?.distance ?? "");
  const [description, setDescription] = useState(fireString?.description ?? "");
  const [order, setOrder] = useState<number>(
    defaultOrder || fireString?.order || 0,
  );
  const handleOrderChange = (orderChange?: string) => {
    if (!orderChange) {
      setOrder(0);
      return;
    }
    if (orderChange === "") {
      setOrder(0);
      return;
    }
    const orderActual = Number(orderChange);
    if (isNaN(orderActual)) {
      setOrder(0);
      return;
    }
    setOrder(orderActual);
  };
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
  const fireStringForm = useMemo(() => {
    if (description.length <= 0) {
      // TODO show error
      return;
    }
    const drillId = fireString ? fireString.drillId : drill.id;
    return {
      ...(fireString || {}),
      distance,
      drillId,
      description,
      order,
    };
  }, [fireString, drill, distance, description, order]);

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!fireStringForm) {
      onDone();
      return;
    }
    onChange(fireStringForm);
    onDone();
  };

  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (e.relatedTarget) {
      return;
    }

    handleSubmit();
  };

  return (
    <Card variant="surface" className="flex flex-col gap-2 w-full">
      <form onBlur={handleBlur} onSubmit={handleSubmit}>
        <Text as="label">String description:</Text>
        <TextArea
          id="string-description"
          name="string-description"
          value={description}
          placeholder="2 shots center target, headbox"
          onChange={handleDescriptionChange}
          autoFocus
        />
        <Text as="label">Distance</Text>
        <TextField.Root
          type="text"
          id="string-distance"
          name="string-distance"
          value={distance}
          placeholder="5m or 25m to 10m"
          onChange={(e) => setDistance(e.target.value)}
        />
        <Text as="label">Order</Text>
        <TextField.Root
          type="number"
          id="string-order"
          name="string-order"
          value={order === 0 ? "" : order}
          placeholder="2"
          onChange={(e) => handleOrderChange(e.target.value)}
        />
        <input type="submit" hidden />
      </form>
    </Card>
  );
}
