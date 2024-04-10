import { Card } from "@radix-ui/themes";
import Drill from "../models";
import { useNavigate } from "react-router-dom";

type Props = {
  drill: Drill;
};

export default function DrillCard({ drill }: Props) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/drills/${drill.id}`);
  };
  return (
    <Card
      variant="surface"
      className="flex gap-1 flex-col w-full"
      onClick={handleView}
    >
      <div className="flex justify-between">
        <span className="font-bold">{drill.name}</span>
      </div>
      <span className="line-clamp-4">{drill.description}</span>
    </Card>
  );
}
