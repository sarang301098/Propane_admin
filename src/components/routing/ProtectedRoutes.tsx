import { Route, Switch } from "react-router-dom";
import routes from "../../routes/routes";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import Header from "../header/header";

const ProtectedRoutes: React.FC<any> = () => (
  <Switch>
    {routes.map(({ component: Component, path, exact }) => (
      <Route path={`/${path}`} exact={exact} key={path}>
        <ErrorBoundary>
          <Header />
          <Component />
        </ErrorBoundary>
      </Route>
    ))}
  </Switch>
);

export default ProtectedRoutes;
