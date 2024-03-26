import { v4 as uuid } from "uuid";
import Course, { CourseForm } from "./models";

export function queryCourses(): Promise<Course[]> {
  return Promise.resolve([]);
}

export function createCourse(form: CourseForm): Course {
  return {
    id: uuid(),
    name: form.name,
  };
}
