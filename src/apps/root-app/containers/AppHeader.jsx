import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import {
  AppHeaderDropdown,
  // AppHeaderDropdownMssg,
  // AppHeaderDropdownNotif,
  // AppHeaderDropdownTasks,
} from "./index";

import { navShowOption } from "../redux_slice/mainNavSlice";
import brandImage from "../assets/images/brand-logo.png";

const AppHeader = (props) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.rootApp.mainNav.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch(navShowOption(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(navShowOption(val));
  };
  // console.log(props.brandLogo);
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />

      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />

      <CHeaderBrand className="mx-auto d-lg-none" to="#">
        <CIcon
          src={props.brandLogo ? props.brandLogo : brandImage}
          height="48"
          alt="Logo"
        />
      </CHeaderBrand>

      {props.leftSideNavItems && (
        <CHeaderNav className="d-md-down-none">
          {props.leftSideNavItems.map((navItem, index) => {
            return (
              <CHeaderNavItem className="px-3" key={index}>
                <CHeaderNavLink to={navItem.to}>{navItem.title}</CHeaderNavLink>
              </CHeaderNavItem>
            );
          })}
        </CHeaderNav>
      )}

      <CHeaderNav className="px-3 ml-auto">
        <AppHeaderDropdown />
      </CHeaderNav>

      {/* <CHeaderNav className="px-3 ml-auto">
        <AppHeaderDropdownNotif />
        <AppHeaderDropdownTasks />
        <AppHeaderDropdownMssg />
        <AppHeaderDropdown />
      </CHeaderNav> */}

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={props.routes}
        />
        {/* <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />
            &nbsp;Settings
          </CLink>
        </div> */}
      </CSubheader>
    </CHeader>
  );
};

export default AppHeader;
