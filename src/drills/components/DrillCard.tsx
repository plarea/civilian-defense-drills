import { Button, Card, DropdownMenu } from "@radix-ui/themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Drill from "../models";
import { useNavigate } from "react-router-dom";

type Props = {
  drill: Drill;
  onEditClick: () => void;
};

export default function DrillCard({ drill, onEditClick }: Props) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/drills/${drill.id}`);
  };
  return (
    <Card variant="surface" className="flex gap-1 flex-col w-full">
      <div className="flex justify-between">
        <span className="font-bold">{drill.name}</span>
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
      <span className="line-clamp-4">{drill.description}</span>
      <Button variant="surface" onClick={handleView}>
        View
      </Button>
    </Card>
  );
}
