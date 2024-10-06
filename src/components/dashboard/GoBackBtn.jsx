import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const GoBackBtn = () => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(-1)}>Go Back</Button>;
};

export default GoBackBtn;
