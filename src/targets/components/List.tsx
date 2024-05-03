import { Card } from "@radix-ui/themes";
import { useState } from "react";
import BoxButton from "../../components/BoxButton";
import TargetForm from "../../targets/components/Form";
import { Drill } from "../../drills/models";
import { useQueryTargets } from "../service";

type Props = {
  drill: Drill;
};

export default function TargetList({ drill }: Props) {
  const [targetEditId, setTargetEditId] = useState<string>();
  const targets = useQueryTargets(drill.id);
  return (
    <div className="grid grid-cols-3 gap-3">
      {targets.map((target) => (
        <Card key={target.id} className="flex min-h-36" variant="surface">
          <span className="text-center text-lg font-bold m-auto">
            {target.name}
          </span>
        </Card>
      ))}
      {targetEditId === "new" && (
        <Card className="flex min-h-36 col-span-3" variant="surface">
          <TargetForm drill={drill} onDone={() => setTargetEditId(undefined)} />
        </Card>
      )}
      {targetEditId !== "new" && (
        <BoxButton className="min-h-36" onClick={() => setTargetEditId("new")}>
          <span className="font-bold">Add Target</span>
        </BoxButton>
      )}
    </div>
  );
}
