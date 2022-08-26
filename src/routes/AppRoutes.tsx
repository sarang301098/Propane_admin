import { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { BarsLoader } from "../components/loader/Loader";
import PrivateRoute from "../components/routing/PrivateRoute";
import PublicRoute from "../components/routing/PublicRoute";
import ProtectedRoutes from "../components/routing/ProtectedRoutes";
import TRootState from "../store/root.types";

const LoginPage = lazy(() => import("../pages/login/login"));
const ForgotPasswordPage = lazy(
  () => import("../pages/forgot-password/forgot-password")
);
const ResetPassword = lazy(
  () => import("../pages/forgot-password/resetPassword")
);
const EmailVerification = lazy(
  () => import("../components/email-verification/EmailVerification")
);
const CmsPageView = lazy(
  () => import("../components/cms-page-view/CmsPageView")
);

const AppRoutes = () => {
  const isAuthenticated = useSelector((state: TRootState) => state.auth.token);

  return (
    <Suspense fallback={<BarsLoader />}>
      <Switch>
        <PublicRoute
          path="/login"
          isAuthenticated={isAuthenticated}
          exact={true}
        >
          <LoginPage />
        </PublicRoute>

        <PublicRoute
          path="/forgot-password"
          isAuthenticated={isAuthenticated}
          exact={true}
        >
          <ForgotPasswordPage />
        </PublicRoute>
        <PublicRoute
          path="/resetPassword"
          isAuthenticated={isAuthenticated}
          exact={true}
        >
          <ResetPassword />
        </PublicRoute>
        <PublicRoute
          path="/verify-email"
          isAuthenticated={isAuthenticated}
          exact={true}
        >
          <EmailVerification />
        </PublicRoute>
        <PublicRoute
          path="/cms-view"
          isAuthenticated={isAuthenticated}
          exact={true}
        >
          <CmsPageView />
        </PublicRoute>
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <ProtectedRoutes />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
