import React from "react";
import { AppSidebar, AppHeader, AppFooter } from "../root-app/containers/index";

import RepositoryContent from "./pages/RepositoryContent";

import routes from "./utils/routes";
import _navItems from "./utils/_side_nav_items";

function App() {
  // headerLeftSideNavItems is the navigation items for shortly navigate b/n popular pages
  const headerLeftSideNavItems = [
    {
      to: "/repository",
      title: "Dashboard",
    },
    {
      to: "/repository/collections/add",
      title: "Add Collection",
    },
    {
      to: "/repository/items/add",
      title: "Add Item",
    },
  ];

  // ToastContainer is the container for toast notification
  // Here the container is defined in the root component of repository app
  // So not need to define it in child components of the app
  return (
    <div className="c-app c-default-layout">
      <AppSidebar navItems={_navItems} />
      <div className="c-wrapper">
        <AppHeader routes={routes} leftSideNavItems={headerLeftSideNavItems} />

        <div className="c-body">
          <RepositoryContent />
        </div>

        <AppFooter />
      </div>
    </div>
  );
}

export default App;
