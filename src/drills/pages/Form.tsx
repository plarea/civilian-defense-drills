import { useLocation, useNavigate, useParams } from "react-router-dom";
import { upsertDrill, useFindDrill } from "../service";
import Form from "../components/Form";
import Drill, { DrillForm } from "../models";

export default function FormPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const origin = (state.origin as string) ?? "list";
  const navigate = useNavigate();
  const drill = useFindDrill(id);
  const handleCancel = () => {
    if (origin === "detail") {
      navigate(`/drills/${id}`);
      return;
    }
    navigate("/drills");
  };
  const handleSubmit = async (drill: DrillForm | Drill) => {
    await upsertDrill(drill);
    handleCancel();
  };

  if (id && !drill) {
    // TODO create nicer error page/message
    return <div>ID provided but no drill was found for ID: {id}</div>;
  }
  return <Form drill={drill} onCancel={handleCancel} onSubmit={handleSubmit} />;
}
