import Dexie, { Table } from "dexie";
import { Drill } from "./drills/models";
import { FireString } from "./fire-strings/models";
import { Target } from "./targets/models";

export class MySubClassedDexie extends Dexie {
  drills!: Table<Drill>;
  fireStrings!: Table<FireString>;
  targets!: Table<Target>;

  constructor() {
    super("myDatabase");
    this.version(7).stores({
      drills: "id, name",
      fireStrings: `id, drillId, order`,
      targets: "id, drillId",
    });
  }
}

export const db = new MySubClassedDexie();
