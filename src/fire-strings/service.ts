import { v4 as uuid } from "uuid";
import FireString, { FireStringForm, isFireString } from "./models";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";

export function useQueryFireStrings(drillId: string): FireString[] {
  return (
    useLiveQuery(() => db.fireStrings.where("drillId").equals(drillId).toArray()) ??
    []
  );
}

export function createFireString(form: FireStringForm): FireString {
  return {
    id: uuid(),
    drillId: form.drillId,
    name: form.name,
    description: form.description,
  };
}

export async function upsertFireString(fireString: FireString | FireStringForm): Promise<void> {
  if (isFireString(fireString)) {
    await db.fireStrings.update(fireString.id, fireString);
    return;
  }

  await db.fireStrings.add(createFireString(fireString));
  return;
}