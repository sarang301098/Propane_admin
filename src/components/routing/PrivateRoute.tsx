import { Route, Redirect } from "react-router-dom";

const PrivateRoute: React.FC<any> = ({
  children,
  isAuthenticated,
  ...rest
}) => {
  return (
    <>
      <Route
        {...rest}
        render={() => (isAuthenticated ? children : <Redirect to="/login" />)}
      />
    </>
  );
};

export default PrivateRoute;
