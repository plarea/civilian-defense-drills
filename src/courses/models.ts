type Course = {
  id: string;
  drillId: string;
  name: string;
  description: string;
};

export default Course;

export type CourseForm = {
  name: string;
  drillId: string;
  description: string;
};

export function isCourse(course: Course | CourseForm): course is Course {
  return (<Course>course).id !== undefined;
}
