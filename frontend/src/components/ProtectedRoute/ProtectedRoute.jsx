import { Navigate } from "react-router";

export default function ProtectedRoute(props) {
  const { loggedIn, children } = props;

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
