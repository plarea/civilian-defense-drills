import { v4 as uuid } from "uuid";
import Drill, { DrillForm, isDrill } from "./models";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";

export function useQueryDrills(): Drill[] {
  return useLiveQuery(() => db.drills.toArray()) ?? [];
}

export function createDrill(form: DrillForm): Drill {
  return {
    id: uuid(),
    name: form.name,
  };
}

export async function upsertDrill(drill: Drill | DrillForm): Promise<void> {
  if (isDrill(drill)) {
    await db.drills.update(drill.id, drill);
    return;
  }

  await db.drills.add(createDrill(drill));
  return;
}

export function useFindDrill(id: string): Drill | undefined {
  return useLiveQuery(() => db.drills.get(id));
}
