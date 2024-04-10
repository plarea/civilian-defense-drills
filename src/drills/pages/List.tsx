import { useQueryDrills } from "../service";
import { Button, Heading, Text } from "@radix-ui/themes";
import DrillCard from "../components/DrillCard";
import { useNavigate } from "react-router-dom";

export default function DrillsList() {
  const drills = useQueryDrills();
  const navigate = useNavigate();
  const handleCreateDrill = () => {
    navigate("/drills/new");
  };

  return (
    <div className="flex flex-col gap-2 flex-auto">
      <Heading>Drills</Heading>
      <section className="flex flex-col gap-3 flex-auto">
        <ul className="flex flex-col gap-3">
          {!drills.length && <Text>No saved drills. Lets create one!</Text>}
          {drills.map((drill) => (
            <li className="flex justify-between flex-row gap-3" key={drill.id}>
              <DrillCard drill={drill} />
            </li>
          ))}
        </ul>
        <Button onClick={handleCreateDrill} className="mt-auto">
          Create Drill
        </Button>
      </section>
    </div>
  );
}
