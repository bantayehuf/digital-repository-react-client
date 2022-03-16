import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { FaTimes } from "react-icons/fa";

import brandImage from "../assets/images/brand-logo.png";
import { navShowOption } from '../redux_slice/mainNavSlice';

const AppSidebar = ({navItems, brandLogo=brandImage}) => {
  const show = useSelector(state => state.rootApp.mainNav.sidebarShow);
  const dispatch = useDispatch();
  
  const hideNavHandler = () => {
    dispatch(navShowOption(false));
  }

  return (
    <CSidebar show={show}>
      <CSidebarBrand className="d-md-down-none" to="#">
        <CIcon
          className="c-sidebar-brand-full"
          src={brandLogo}
          height={35}
        />
      </CSidebarBrand>

      <div 
      className="d-flex justify-content-end p-2 d-lg-none" 
      style={{"backgroundColor": "#00001533"}} 
      onClick={hideNavHandler}>
        <FaTimes size={18} />
      </div>


      
      <CSidebarNav>
        <CCreateElement
          items={navItems}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
