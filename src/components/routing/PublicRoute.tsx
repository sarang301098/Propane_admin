import { Route, Redirect } from "react-router-dom";

const PublicRoute: React.FC<any> = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? <Redirect to="/dashboard" /> : children)}
    />
  );
};

export default PublicRoute;
