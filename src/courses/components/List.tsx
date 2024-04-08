import { useState } from "react";
import Course, { CourseForm } from "../models";
import CourseDetail from "./Detail";
import Form from "./Form";
import { upsertCourse } from "../service";

type Props = {
  courses: Course[];
};

export default function ListCourses({ courses }: Props) {
  const [editId, setEditId] = useState<string>();
  const handleEditClick = (id: string) => {
    setEditId(id);
  };
  const handleCancel = () => {
    setEditId(undefined);
  };
  const handleUpdateCourse = async (course: Course | CourseForm) => {
    await upsertCourse(course);
    setEditId(undefined);
  };
  return (
    <ul className="flex flex-col gap-3">
      {courses.map((course) => (
        <li key={course.id}>
          {editId === course.id ? (
            <Form
              course={course}
              onSubmit={handleUpdateCourse}
              onCancel={handleCancel}
            />
          ) : (
            <CourseDetail
              isEditable={!editId}
              course={course}
              onEditClick={() => handleEditClick(course.id)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
