import React from "react";
import { Route, Redirect } from "react-router-dom";

import { PageLoading, ComponentLoading } from "../components/LoadingSpinner";
import { validateToken } from "../utils/auth";

export default function ProtectedRoutes({
  component: Component,
  spinning,
  roles,
  ...rest
}) {
  /**
   *  Protected route is to verify user permission for protected page before load it.
   */
  const [checkingPerm, setCheckingPerm] = React.useState({
    checking: true,
    permittedUser: false,
  });

  React.useEffect(() => {
    async function checkUserToken() {
      const validated = await validateToken(roles);
      setCheckingPerm({
        checking: false,
        permittedUser: validated,
      });
    }
    checkUserToken();
  }, [roles]);

  const SpinningComponent = () => {
    /**
     * Spinning to show progress bar until the reserver respond permission result
     * If CP is passed as spinning prop render ComponentLoading
     */
    if (spinning === "CP") return <ComponentLoading />;
    else return <PageLoading />;
  };

  return (
    <>
      {/* Page loading speen will be shown until the server sent user permission state  */}
      {checkingPerm.checking ? (
        <>{SpinningComponent()}</>
      ) : (
        <>
          {/* If  a user is permitted to view a page load it, Else redirect to 403 error page  */}
          {checkingPerm.permittedUser ? (
            <Route {...rest} render={(props) => <Component {...props} />} />
          ) : (
            <Redirect to="/error-403" />
          )}
        </>
      )}
    </>
  );
}

ProtectedRoutes.defaultProps = {
  SpinningComponet: <PageLoading />,
};
