import { Heading, IconButton } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Drill from "../models";
import ListCourses from "../../courses/components/List";
import { upsertCourse, useQueryCourses } from "../../courses/service";
import Form from "../../courses/components/Form";
import { useState } from "react";
import Course, { CourseForm } from "../../courses/models";
import Link from "../../components/Link";

type Props = {
  drill: Drill;
};
export default function DrillDetails({ drill }: Props) {
  const courses = useQueryCourses(drill.id);
  const [editId, setEditId] = useState<string>();
  const handleEditClick = (id: string) => {
    setEditId(id);
  };
  const handleCancel = () => {
    setEditId(undefined);
  };
  const handleSubmit = async (course: Course | CourseForm) => {
    await upsertCourse(course);
    setEditId(undefined);
  };
  return (
    <section className="flex flex-col gap-3 flex-auto">
      <div className="flex justify-between">
        <Link to="/drills">Back</Link>
        <Link to={`/drills/${drill.id}/edit`} state={{ origin: "detail" }}>
          Edit
        </Link>
      </div>
      <Heading>{drill.name}</Heading>
      <span>{drill.description}</span>
      <Heading as="h2" size="4">
        Course of Fires:
      </Heading>
      {courses.length > 0 && (
        <ListCourses
          courses={courses}
          editId={editId}
          onCancel={handleCancel}
          onUpdate={handleSubmit}
          onEditClick={handleEditClick}
        />
      )}
      {editId === "new" && (
        <Form
          drill={drill}
          onCancel={() => setEditId(undefined)}
          onSubmit={handleSubmit}
        />
      )}
      {!editId && (
        <IconButton
          className="w-full mt-auto"
          onClick={() => setEditId("new")}
          color="orange"
          variant="soft"
        >
          <PlusCircledIcon width="18" height="18" />
          &nbsp;Add Course of Fire
        </IconButton>
      )}
    </section>
  );
}
