import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import {
  // CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

import SpinningButton from "../../../components/SpinningButton";
import {
  AUTH_API,
  LOGIN_INFO_LOCAL_STORAGE_INDEX,
  loginInfo,
} from "../../../utils/auth";
import { notificationError } from "../../../utils/Nofications";

const Login = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const inputValueChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputsValue((state) => ({
      ...inputsValue,
      ...{ [name]: value },
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoadingState(true);

    try {
      const response = await AUTH_API.post("/login", {
        ...inputsValue,
      });
      if (response.status === 200) {
        localStorage.setItem(
          LOGIN_INFO_LOCAL_STORAGE_INDEX,
          JSON.stringify(response.data)
        );

        // After a user logged in the access token might not registered in local storage immediately
        // so check it in local storage in the given time interval,
        // Then if the current token has been registred clear interval and chage the page
        let timeInterval = setInterval(() => {
          const loging = loginInfo();

          if (
            loging.LOGIN_INFO.user_role &&
            loging.LOGIN_INFO.user_role === response.data.user_role
          ) {
            clearInterval(timeInterval);
            history.replace("/repository");
          }
        }, 300);
      } else {
        throw new Error("Error occured!");
      }
    } catch (error) {
      if (!error.response) {
        notificationError({ message: "Can't connect to the server !" });
      } else if (error.response.status === 401) {
        notificationError({ message: "Wrong username and password !" });
      } else {
        notificationError({ message: "Failed to login !" });
      }

      setLoadingState(false);
      setInputsValue({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCard className="p-4">
              <CCardBody>
                <Form onSubmit={loginHandler} method="post">
                  <h3>Digital Repository</h3>
                  <p className="text-muted">Login In to your account</p>

                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="username">
                        <FaUserAlt />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="username"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="username"
                      value={inputsValue.username}
                      onChange={inputValueChangeHandler}
                      required
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="password">
                        <FaLock />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type="password"
                      name="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="password"
                      value={inputsValue.password}
                      onChange={inputValueChangeHandler}
                      required
                    />
                  </InputGroup>

                  <CRow>
                    <CCol xs="6">
                      <SpinningButton
                        type="submit"
                        text="Login"
                        loading={loadingState}
                      />
                    </CCol>
                    {/* <CCol xs="6" className="text-right">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CCol> */}
                  </CRow>
                </Form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
