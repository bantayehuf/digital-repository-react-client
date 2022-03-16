import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaLock } from "react-icons/fa";

import SpinningButton from "../../../../../root-app/components/SpinningButton";
import { AUTH_API, loginInfo } from "../../../../../root-app/utils/auth";
import {
  notificationError,
  notificationSuccess,
} from "../../../../../root-app/utils/Nofications";

export const ChangePasswordForm = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const inputValueChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputsValue((state) => ({
      ...state,
      ...{ [name]: value },
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (inputsValue.new_password !== inputsValue.confirm_password) {
      notificationError({ message: "Password didn't match." });
      setInputsValue({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
      return;
    }

    try {
      setLoadingState(true);

      const response = await AUTH_API.post(
        "/user/change-password",
        {
          ...inputsValue,
        },
        {
          headers: {
            Authorization: `Bearer ${loginInfo().AUTH_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        notificationSuccess({
          message: "Password has been changed successfully !",
        });
      } else {
        throw new Error("Error occured!");
      }
    } catch (error) {
      if (!error.response) {
        notificationError({ message: "Can't connect to the server." });
      } else if (error.response.status === 401) {
        notificationError({ message: "Wrong old password." });
      } else {
        notificationError({ message: "Failed to change password." });
      }
    }
    setInputsValue({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    setLoadingState(false);
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="old_password">
                <FaLock />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="password"
              name="old_password"
              placeholder="Old password"
              aria-label="Old password"
              aria-describedby="old_password"
              value={inputsValue.old_password}
              onChange={inputValueChangeHandler}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="new_password">
                <FaLock />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="password"
              name="new_password"
              placeholder="New password"
              aria-label="New password"
              aria-describedby="new_password"
              value={inputsValue.new_password}
              onChange={inputValueChangeHandler}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="confirm_password">
                <FaLock />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              aria-label="Confirm password"
              aria-describedby="confirm_password"
              value={inputsValue.confirm_password}
              onChange={inputValueChangeHandler}
              required
            />
          </InputGroup>
        </Form.Group>

        <SpinningButton text="Change" type="submit" loading={loadingState} />
      </Form>
    </>
  );
};

export default ChangePasswordForm;
