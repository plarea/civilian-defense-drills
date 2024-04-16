import Dexie, { Table } from "dexie";
import Drill from "./drills/models";
import { FireString } from "./fire-strings/models";

export class MySubClassedDexie extends Dexie {
  drills!: Table<Drill>;
  fireStrings!: Table<FireString>;

  constructor() {
    super("myDatabase");
    this.version(6).stores({
      drills: "id, name",
      fireStrings: `id, drillId, order`,
    });
  }
}

export const db = new MySubClassedDexie();
