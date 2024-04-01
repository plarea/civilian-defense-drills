import { v4 as uuid } from "uuid";
import Drill, { DrillForm } from "./models";
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

export async function addDrill(drill: Drill): Promise<void> {
  await db.drills.add(drill);
}

export async function updateDrill(id: string, drill: Drill): Promise<void> {
  await db.drills.update(id, drill);
}

export function useFindDrill(id: string): Drill | undefined {
  return useLiveQuery(() => db.drills.get(id));
}
