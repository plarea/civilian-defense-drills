import { v4 as uuid } from "uuid";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";
import { Target, TargetForm, isTarget } from "./models";

export function useQueryTargets(drillId: string): Target[] {
  return (
    useLiveQuery(() => db.targets.where("drillId").equals(drillId).toArray()) ??
    []
  );
}

export function createTarget(form: TargetForm): Target {
  return {
    id: uuid(),
    drillId: form.drillId,
    name: form.name,
  };
}

export async function upsertTarget(target: Target | TargetForm): Promise<void> {
  if (isTarget(target)) {
    await db.targets.update(target.id, target);
    return;
  }

  await db.targets.add(createTarget(target));
  return;
}
