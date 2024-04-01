import { useParams } from "react-router-dom";
import { useFindDrill } from "../service";
import DrillDetails from "../components/DrillDetails";

export default function ViewDrill() {
  const { id } = useParams();
  if (!id) {
    throw new Error("'id' is required");
  }
  const drill = useFindDrill(id);
  if (!drill) {
    return <div>drill required</div>;
  }
  return <DrillDetails drill={drill} />;
}
