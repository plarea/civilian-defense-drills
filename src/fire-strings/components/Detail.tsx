import { Card, Checkbox } from "@radix-ui/themes";
import FireString from "../models";

type Props = {
  fireString: FireString;
  onClick: () => void;
  isSelected?: boolean;
  mode: "view" | "select";
};

export default function FireStringDetail({
  fireString,
  onClick,
  mode,
  isSelected = false,
}: Props) {
  return (
    <Card variant="surface" className="flex gap-2 w-full" onClick={onClick}>
      <span className="flex-initial font-extrabold text-2xl items-center flex mx-2">
        {mode === "select" && <Checkbox size="3" checked={isSelected} />}
        {mode === "view" && fireString.order}
      </span>
      <div className="flex-auto flex flex-col gap-1">
        <span className="text-sm">{fireString.description}</span>
        <div className="flex">
          <div className="flex-auto">
            {fireString.distance.length > 0 && (
              <span className="text-xs">Distance: {fireString.distance}</span>
            )}
          </div>
          <div className="flex-initial">
            {fireString.shots > 0 && (
              <span className="text-xs">
                {fireString.shots} Shot{fireString.shots > 1 ? "s" : ""} 
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
