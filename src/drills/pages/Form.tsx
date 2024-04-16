import { useNavigate } from "react-router-dom";
import { upsertDrill } from "../service";
import Form from "../components/Form";
import { Drill, DrillForm } from "../models";

export default function FormPage() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/drills");
  };
  const handleSubmit = async (drill: DrillForm | Drill) => {
    await upsertDrill(drill);
    handleCancel();
  };

  return <Form onCancel={handleCancel} onSubmit={handleSubmit} />;
}
