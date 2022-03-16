import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import SpinningButton from "../../../../../root-app/components/SpinningButton";
import { API } from "../../../../../root-app/utils/configs";
import {
  notificationOnProgress,
  notificationUpdateToSuccess,
  notificationUpdateToError,
  notificationError,
} from "../../../../../root-app/utils/Nofications";
export default class AddSubCollectionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      collections: [],
      inputsValue: {
        root_collection: "",
        name: "",
        description: "",
      },
    };
  }
  componentDidMount() {
    // After the component has rendered fetch collections from API
    this.fetchCollections();
  }

  fetchCollections = async () => {
    try {
      const response = await API.get(
        "/repository/collections/list?page_size=100"
      );
      if (response.status === 200) {
        this.setState({
          collections: response.data.results,
        });
      } else {
        throw new Error("Error occured!");
      }
    } catch (error) {
      if (!error.response) {
        notificationError({
          message: "Can't connect to the server, please refresh the page",
        });
      } else if (error.response.status === 404) {
        notificationError({
          message: "Error, There is no registered collection.",
        });
      } else {
        notificationError({
          message: "Failed to load the page, please refresh the page !",
        });
      }
    }
  };

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
      const response = await API.post("/repository/sub_collections/create", {
        ...data,
      });
      if (response.status === 201) {
        this.setState((state) => ({
          inputsValue: {
            ...state.inputsValue,
            ...{ name: "", description: "" },
          },
        }));
        notificationUpdateToSuccess({
          message: "Sub collection has been added successfully !",
        });
      } else {
        throw new Error("Error occured!");
      }
    } catch (error) {
      if (!error.response) {
        notificationUpdateToError({ message: "Can't connect to the server" });
      } else {
        notificationUpdateToError({
          message: "Failed to submit sub collection",
        });
      }
    }

    this.loadingState(false);
  };

  loadingState = (loading) => {
    this.setState({
      loading: loading,
    });
    if (loading) {
      notificationOnProgress({ message: "Sub collection submitting..." });
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.submitHandler}>
          <Form.Group>
            <Form.Label>
              Collection<span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="root_collection"
                as="select"
                required
                value={this.state.inputsValue.root_collection}
                onChange={this.inputValueChangeHandler}
              >
                <option value="" className="text-secondary">
                  **Select top collection**
                </option>
                {this.state.collections.map((collection) => {
                  return (
                    <option value={collection.id} key={collection.id}>
                      {collection.name}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Name<span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="name"
                required
                placeholder="**Enter top collection name**"
                value={this.state.inputsValue.name}
                onChange={this.inputValueChangeHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="description"
              placeholder="**Enter the decription of the collection**"
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
