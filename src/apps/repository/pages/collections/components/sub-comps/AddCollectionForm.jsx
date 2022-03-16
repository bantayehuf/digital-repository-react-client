import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import SpinningButton from "../../../../../root-app/components/SpinningButton";
import { API } from "../../../../../root-app/utils/configs";
import {
  notificationOnProgress,
  notificationUpdateToSuccess,
  notificationUpdateToError,
} from "../../../../../root-app/utils/Nofications";

export default class AddCollectionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      inputsValue: {
        name: "",
        description: "",
      },
    };
  }

  inputValueChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState((state) => ({
      inputsValue: {
        ...state.inputsValue,
        ...{ [name]: value },
      },
    }));
  };

  submitHandler = async (e) => {
    e.preventDefault();

    const data = { ...this.state.inputsValue };
    this.loadingState(true);

    try {
      const response = await API.post("/repository/collections/create", {
        ...data,
      });
      if (response.status === 201) {
        this.setState({
          inputsValue: {
            name: "",
            description: "",
          },
        });
        notificationUpdateToSuccess({
          message: "Collection has been added successfully !",
        });
      } else {
        throw new Error("Error occured!");
      }
    } catch (error) {
      if (!error.response) {
        notificationUpdateToError({ message: "Can't connect to the server" });
      } else {
        notificationUpdateToError({ message: "Failed to submit collection" });
      }
    }

    this.loadingState(false);
  };

  loadingState = (loading) => {
    this.setState({
      loading: loading,
    });
    if (loading) {
      notificationOnProgress({ message: "Collection submitting..." });
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              Name<span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                className="name"
                name="name"
                required
                placeholder="Enter collection name"
                value={this.state.inputsValue.name}
                onChange={this.inputValueChangeHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="description"
              placeholder="Enter the decription of the collection."
              value={this.state.inputsValue.description}
              onChange={this.inputValueChangeHandler}
            />
          </Form.Group>

          <SpinningButton
            text="Add"
            type="submit"
            loading={this.state.loading}
          />
        </Form>
      </>
    );
  }
}
