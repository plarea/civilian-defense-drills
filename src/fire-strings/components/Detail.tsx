import { Card } from "@radix-ui/themes";
import FireString from "../models";

type Props = {
  fireString: FireString;
  onEditClick: () => void;
};

export default function FireStringDetail({ fireString, onEditClick }: Props) {
  return (
    <Card variant="surface" className="flex gap-2 w-full" onClick={onEditClick}>
      <span className="flex-initial font-extrabold text-2xl items-center flex mx-2">
        {fireString.order}
      </span>
      <div className="flex-auto flex flex-col gap-1">
        <span className="text-sm">{fireString.description}</span>
        {fireString.distance.length > 0 && (
          <span className="text-xs">Distance: {fireString.distance}</span>
        )}
      </div>
    </Card>
  );
}
