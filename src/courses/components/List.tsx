import Course, { CourseForm } from "../models";
import CourseDetail from "./Detail";
import Form from "./Form";

type Props = {
  courses: Course[];
  editId?: string;
  onCancel: () => void;
  onEditClick: (id: string) => void;
  onUpdate: (course: Course | CourseForm) => void;
};

export default function ListCourses({
  courses,
  editId,
  onUpdate,
  onCancel,
  onEditClick,
}: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {courses.map((course) => (
        <li key={course.id}>
          {editId === course.id ? (
            <Form course={course} onSubmit={onUpdate} onCancel={onCancel} />
          ) : (
            <CourseDetail
              isEditable={!editId}
              course={course}
              onEditClick={() => onEditClick(course.id)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
