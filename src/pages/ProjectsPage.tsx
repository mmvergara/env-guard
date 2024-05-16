import { useUserData } from "@/context";
import { Navigate } from "react-router-dom";

const ProjectsPage = () => {
  const { session } = useUserData();
  if (!session) {
    return <Navigate to="/" />;
  }
  return <></>;
};

export default ProjectsPage;
