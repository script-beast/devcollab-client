import { useNavigate } from "react-router";
import EmptyState from "../components/common/EmptyState";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <EmptyState
      title="Page not found"
      description="This route does not exist in the current DevCollab workspace shell."
      actionLabel="Go to Projects"
      onAction={() => navigate("/projects")}
    />
  );
};

export default NotFoundPage;
