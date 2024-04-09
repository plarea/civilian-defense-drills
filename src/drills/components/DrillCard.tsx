import { Card, DropdownMenu } from "@radix-ui/themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Drill from "../models";
import Link from "../../components/Link";

type Props = {
  drill: Drill;
  onEditClick: () => void;
};

export default function DrillCard({ drill, onEditClick }: Props) {
  return (
    <Card variant="surface" className="flex gap-1 flex-col w-full">
      <div className="flex justify-between">
        <div className="font-bold">{drill.name}</div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="text-accent">
              <DotsVerticalIcon width="18" height="18" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={onEditClick}>Edit</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div>Start building your next project in minutes</div>
      <div className="flex flex-col gap-1">
        <Link className="flex-auto mx-auto" to={`/drills/${drill.id}`}>
          View
        </Link>
      </div>
    </Card>
  );
}
