import { Button, Text } from "@radix-ui/themes";
import FireString from "../models";

type Props = {
  fireString: FireString;
  onEditClick: () => void;
  isEditable?: boolean;
};

export default function FireStringDetail({
  fireString,
  onEditClick,
  isEditable = true,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <Text weight="medium">{fireString.name}</Text>
        {isEditable && (
          <Button onClick={onEditClick} size="1">
            Edit
          </Button>
        )}
      </div>
      <Text weight="light" size="1">
        {fireString.description}
      </Text>
    </div>
  );
}
