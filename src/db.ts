import Dexie, { Table } from 'dexie';
import Drill from './drills/models';

export class MySubClassedDexie extends Dexie {
  drills!: Table<Drill>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      drills: 'id, name'
    });
  }
}

export const db = new MySubClassedDexie();
