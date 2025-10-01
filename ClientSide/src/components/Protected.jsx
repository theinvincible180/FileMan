import { Navigate } from "react-router-dom";

// const getTokenFromCookie = () => {
//   return document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("token="))
//     ?.split("=")[1];
// };

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />; // redirect if no token
  }

  return children; // render the protected page if token exists
};

export default ProtectedRoute;
