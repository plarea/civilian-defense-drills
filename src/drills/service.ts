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