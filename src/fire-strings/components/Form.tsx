import {
  Dispatch,
  FocusEvent,
  FormEvent,
  SetStateAction,
  useMemo,
  useState,
} from "react";
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
  const [shots, setShots] = useState<number>(fireString?.shots || 0);
  const handleNumberChange = (
    change: string | undefined,
    setter: Dispatch<SetStateAction<number>>,
  ) => {
    if (!change) {
      setter(0);
      return;
    }
    if (change === "") {
      setter(0);
      return;
    }
    const changeActual = Number(change);
    if (isNaN(changeActual)) {
      setter(0);
      return;
    }
    setter(changeActual);
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
      return;
    }
    const drillId = fireString ? fireString.drillId : drill.id;
    return {
      ...(fireString || {}),
      distance,
      drillId,
      description,
      order,
      shots,
    };
  }, [fireString, drill, distance, description, order, shots]);

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
    <Card variant="surface">
      <form
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        className="flex flex-col gap-1 w-full"
      >
        <Text as="label">String description:</Text>
        <TextArea
          size="3"
          radius="full"
          id="string-description"
          name="string-description"
          value={description}
          placeholder="2 shots center target, headbox"
          onChange={handleDescriptionChange}
          autoFocus
        />
        <Text as="label">Distance</Text>
        <TextField.Root
          size="3"
          radius="full"
          type="text"
          id="string-distance"
          name="string-distance"
          value={distance}
          placeholder="5m or 25m > 10m"
          onChange={(e) => setDistance(e.target.value)}
        />
        <Text as="label">Shots</Text>
        <TextField.Root
          size="3"
          radius="full"
          type="number"
          id="string-shots"
          name="string-shots"
          value={shots === 0 ? "" : shots}
          placeholder="3"
          onChange={(e) => handleNumberChange(e.target.value, setShots)}
        />
        <Text as="label">Order</Text>
        <TextField.Root
          size="3"
          radius="full"
          type="number"
          id="string-order"
          name="string-order"
          value={order === 0 ? "" : order}
          placeholder="2"
          onChange={(e) => handleNumberChange(e.target.value, setOrder)}
        />
        <input type="submit" hidden />
      </form>
    </Card>
  );
}
