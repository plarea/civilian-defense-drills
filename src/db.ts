import Dexie, { Table } from 'dexie';
import Drill from './drills/models';
import Course from './courses/models';

export class MySubClassedDexie extends Dexie {
  drills!: Table<Drill>;
  courses!: Table<Course>;

  constructor() {
    super('myDatabase');
    this.version(3).stores({
      drills: 'id, name',
      courses: `id, drillId, name, description`
    });
  }
}

export const db = new MySubClassedDexie();
