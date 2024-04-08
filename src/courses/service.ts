import { v4 as uuid } from "uuid";
import Course, { CourseForm, isCourse } from "./models";
import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";

export function useQueryCourses(drillId: string): Course[] {
  return (
    useLiveQuery(() => db.courses.where("drillId").equals(drillId).toArray()) ??
    []
  );
}

export function createCourse(form: CourseForm): Course {
  return {
    id: uuid(),
    drillId: form.drillId,
    name: form.name,
    description: form.description,
  };
}

export async function upsertCourse(course: Course | CourseForm): Promise<void> {
  if (isCourse(course)) {
    await db.courses.update(course.id, course);
    return;
  }

  await db.courses.add(createCourse(course));
  return;
}

export function useFindCourse(id: string): Course | undefined {
  return useLiveQuery(() => db.courses.get(id));
}
