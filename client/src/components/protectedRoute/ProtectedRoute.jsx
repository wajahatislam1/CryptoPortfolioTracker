import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { loading, loggedIn } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Replace this with your actual loading component
  }

  if (!loggedIn) {
    return <Navigate to="/users/auth" state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
