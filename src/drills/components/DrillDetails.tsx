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
  const handleSubmit = async (course: Course | CourseForm) => {
    await upsertCourse(course);
    setIsCreatingCourse(false);
  };
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
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
      <Heading as="h2" size="4">Course of Fires:</Heading>
      {courses.length > 0 && <ListCourses courses={courses} />}
      {isCreatingCourse ? (
        <Form
          drill={drill}
          onCancel={() => setIsCreatingCourse(false)}
          onSubmit={handleSubmit}
        />
      ) : (
        <IconButton
          className="w-full mt-auto"
          onClick={() => setIsCreatingCourse(true)}
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
