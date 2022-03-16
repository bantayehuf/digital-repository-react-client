import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CContainer } from "@coreui/react";

// routes config
import routes from "../utils/routes";

import { ComponentLoading } from "../../root-app/components/LoadingSpinner";
import ProtectedRoutes from "../../root-app/components/ProtectedRoutes";

const RepositoryContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid className="h-100">
        <Suspense fallback={<ComponentLoading />}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <ProtectedRoutes
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    component={() => <route.component />}
                    spinning="CP"
                    roles={route.user_role}
                  />
                )
              );
            })}
            <Redirect from="/" to="/repository" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(RepositoryContent);
