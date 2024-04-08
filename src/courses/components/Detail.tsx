import { Button, Text } from "@radix-ui/themes";
import Course from "../models";

type Props = {
  course: Course;
  onEditClick: () => void;
  isEditable?: boolean;
};

export default function CourseDetail({
  course,
  onEditClick,
  isEditable = true,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <Text weight="medium">{course.name}</Text>
        {isEditable && (
          <Button onClick={onEditClick} size="1">
            Edit
          </Button>
        )}
      </div>
      <Text weight="light" size="1">
        {course.description}
      </Text>
    </div>
  );
}
