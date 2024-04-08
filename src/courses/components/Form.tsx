import { FormEvent, useState } from "react";
import { TextField, Text, Button, TextArea } from "@radix-ui/themes";
import Course, { CourseForm } from "../models";
import Drill from "../../drills/models";

type UpdateProps = {
  drill?: undefined;
  course: Course;
};

type CreateProps = {
  drill: Drill;
  course?: undefined;
};

type Props = {
  onSubmit: (form: Course | CourseForm) => void;
  onCancel: () => void;
} & (UpdateProps | CreateProps);

export default function Form(props: Props) {
  const [name, setName] = useState(props.course?.name ?? "");
  const [description, setDescription] = useState(
    props.course?.description ?? "",
  );
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length <= 0 || description.length <= 0) {
      // TODO show error
      return;
    }
    const drillId = props.course ? props.course.drillId : props.drill.id;
    const course = { ...(props.course || {}), name, drillId, description };
    setName("");
    setDescription("");
    props.onSubmit(course);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Text as="label">Course name:</Text>
      <TextField.Root
        type="text"
        id="course-name"
        name="course-name"
        value={name}
        placeholder="1st COF"
        onChange={(e) => setName(e.target.value)}
      />
      <Text as="label">Course description:</Text>
      <TextArea
        id="course-description"
        name="course-description"
        value={description}
        placeholder="2 shots center target, headbox"
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-3 ml-auto">
        <Button onClick={props.onCancel} variant="soft">
          Cancel
        </Button>
        <Button variant="outline" type="submit">
          {props.course ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
