import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import {
  BsCaretDownFill,
  BsBoxArrowRight,
  BsPencilSquare,
} from "react-icons/bs";
import { useHistory } from "react-router-dom";

import { logoutUser, loginInfo } from "../utils/auth";

const AppHeaderDropdown = () => {
  const USER_LOGIN_INFO = loginInfo().USER_LOGIN_INFO;
  const history = useHistory();
  return (
    <CDropdown inNav className="c-header-nav-items mx-" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/11.jpg"}
            className="c-avatar-img"
            alt="User profile avatar"
          />
          <span>
            {" "}
            <BsCaretDownFill />
          </span>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 m-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center mb-1"
        >
          <strong>
            {`${USER_LOGIN_INFO.first_name} ${USER_LOGIN_INFO.middle_name}`}{" "}
          </strong>
        </CDropdownItem>

        <CDropdownItem
          onClick={() => history.push("/repository/change-password")}
        >
          <BsPencilSquare />
          <span className="ml-2">Change password</span>
        </CDropdownItem>

        <CDropdownItem onClick={() => logoutUser()}>
          <BsBoxArrowRight />
          <span className="ml-2">Log out</span>
        </CDropdownItem>

        {/* <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Account
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
