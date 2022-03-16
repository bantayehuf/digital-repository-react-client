import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { BsFillTrashFill } from "react-icons/bs";

import SpinningButton from "../../../../../root-app/components/SpinningButton";
import FileUpload from "./FileUpload";
import { API } from "../../../../../root-app/utils/configs";
import {
  notificationOnProgress,
  notificationUpdateToSuccess,
  notificationUpdateToError,
  notificationError,
} from "../../../../../root-app/utils/Nofications";

const getYears = () => {
  const current_year = new Date().getFullYear();
  let years = [];
  for (var year = current_year; year >= 1990; year--) {
    years.push(year);
  }
  return years;
};

// To generate dynamic inputes for authors and subject
// the key to generate unique react element key prop and
// unique input name
var subjectInputsKeyValue = 0;
var authorInputsKeyValue = 0;
export default class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      numberOfAuthors: 3,
      authorInputs: [],
      subjectInputs: [],
      temporaryUploadedFilesId: {},
      inputsValue: {
        root_collection: "",
        sub_collection: "",
        title: "",
        author: {
          author_0: "",
        },
        advisor_of_author: "",
        issue_date: {
          issue_date_year: "",
          issue_date_month: "",
          issue_date_date: "",
        },
        item_type: "",
        subject: {
          subject_0: "",
        },
        abstract: "",
        publisher: "",
        citation: "",
        description: "",
        files: "",
      },
      itemsType: [],
    };
  }

  componentDidMount() {
    // After the component has rendered fetch items type from API
    this.fetchItemsType();
  }

  fetchItemsType = async () => {
    try {
      const response = await API.get(
        "/repository/items_type/list?page_size=100"
      );
      if (response.status === 200) {
        this.setState({
          itemsType: response.data.results,
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
        notificationError({ message: "There is no registered items type." });
      } else {
        notificationError({
          message: "Failed to load the page, please refresh the page !",
        });
      }
    }
  };

  clearAllTemporaryUploadedFiles = () => {};
  setClearAllTemporaryUploadedFiles = (callback) => {
    this.clearAllTemporaryUploadedFiles = callback;
  };

  componentDidUpdate(prevProps) {
    if (this.props.rootCollection !== prevProps.rootCollection) {
      this.setInputsValue("root_collection", this.props.rootCollection);
    }

    if (this.props.subCollection !== prevProps.subCollection) {
      this.setInputsValue("sub_collection", this.props.subCollection);
    }
  }

  addTemporaryUploadedFilesId = (fileId) => {
    let newFile = { [fileId]: fileId };
    this.setState((state, props) => ({
      temporaryUploadedFilesId: {
        ...state.temporaryUploadedFilesId,
        ...newFile,
      },
    }));
  };

  removeTemporaryUploadedFilesId = (fileId) => {
    let fileIds = { ...this.state.temporaryUploadedFilesId };
    delete fileIds[fileId];

    this.setState((state, props) => ({
      temporaryUploadedFilesId: fileIds,
    }));
  };

  addAuthorInputHandler = () => {
    authorInputsKeyValue = Number(authorInputsKeyValue) + 1;
    var newInputKey = `author_${authorInputsKeyValue.toString()}`;
    this.setState((prevState) => ({
      authorInputs: prevState.authorInputs.concat([newInputKey]),
    }));
  };

  removeAuthorInputHandler = (inputKey) => {
    const inputs = [...this.state.authorInputs];
    const author = { ...this.state.inputsValue.author };

    // Delete the deleted inputes value from state
    for (var index = 0; index < inputs.length; index++) {
      if (inputs[index] === inputKey) {
        inputs.splice(index, 1);
        delete author[inputKey];
      }
    }

    this.setState((state) => ({
      authorInputs: [...inputs],
      inputsValue: {
        ...state.inputsValue,
        ...{ author: author },
      },
    }));
  };

  addSubjectInputHandler = () => {
    subjectInputsKeyValue = Number(subjectInputsKeyValue) + 1;
    var newInputKey = `subject_${subjectInputsKeyValue.toString()}`;
    this.setState((prevState) => ({
      subjectInputs: prevState.subjectInputs.concat([newInputKey]),
    }));
  };

  removeSubjectInputHandler = (inputKey) => {
    const inputs = [...this.state.subjectInputs];
    const subject = { ...this.state.inputsValue.subject };

    // Delete the deleted inputes value from state
    for (var index = 0; index < inputs.length; index++) {
      if (inputs[index] === inputKey) {
        inputs.splice(index, 1);
        delete subject[inputKey];
      }
    }

    this.setState((state) => ({
      subjectInputs: [...inputs],
      inputsValue: {
        ...state.inputsValue,
        ...{ subject: subject },
      },
    }));
  };

  setInputsValue = (name, value) => {
    this.setState((state) => ({
      inputsValue: {
        ...state.inputsValue,
        ...{ [name]: value },
      },
    }));
  };

  inputValueChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name.startsWith("author_")) {
      let author = {
        ...this.state.inputsValue["author"],
        ...{ [name]: value },
      };
      this.setInputsValue("author", author);
    } else if (name.startsWith("subject_")) {
      let subject = {
        ...this.state.inputsValue["subject"],
        ...{ [name]: value },
      };
      this.setInputsValue("subject", subject);
    } else if (name.startsWith("issue_date_")) {
      let issue_date = {
        ...this.state.inputsValue["issue_date"],
        ...{ [name]: value },
      };
      this.setInputsValue("issue_date", issue_date);
    } else {
      this.setInputsValue(name, value);
    }
  };

  stringifyInpuntsValueFromObject = (object) => {
    let result = "";
    for (const index in object) {
      if (object[index]) {
        result += result ? `:::${object[index]}` : object[index];
      }
    }
    // Check if the requested result exists in the object list and return
    // the stringified value, else return false.
    if (result) return result;

    return false;
  };

  submitHandler = async (e) => {
    e.preventDefault();

    // Checking wheither collection is selected or not.
    if (!this.state.inputsValue.root_collection) {
      notificationError({
        message: "There is no selected collection to submit.",
      });
      return;
    }

    // Checking wheither the file is teporary uploaded or not
    if (Object.keys(this.state.temporaryUploadedFilesId).length < 1) {
      notificationError({ message: "There is no upload file to submit." });
      return;
    }

    // Start loading state
    this.loadingState(true);
    const files = { ...this.state.temporaryUploadedFilesId };
    let data = {
      ...this.state.inputsValue,
      ...{ files: files },
    };

    // Convert authors input values to a single string
    if (data["author"]) {
      // Check wheither the stringified author is found or not.
      // If it exists update the author property with that.
      // Else not found delete the author property from the data.
      const stringifiedAuthors = this.stringifyInpuntsValueFromObject(
        data["author"]
      );
      if (stringifiedAuthors) {
        data["author"] = stringifiedAuthors;
      } else {
        delete data["author"];
      }
    }

    // Convert subjects input values to a single string
    if (data["subject"]) {
      // Check wheither the stringified subject is found or not.
      // If it exists update the subject property with that.
      // Else not found delete the subject property from the data.
      const stringifiedSubjects = this.stringifyInpuntsValueFromObject(
        data["subject"]
      );
      if (stringifiedSubjects) {
        data["subject"] = stringifiedSubjects;
      } else {
        delete data["subject"];
      }
    }

    // Make a valid date for issue date
    if (data["issue_date"]) {
      let date = "";
      if (data["issue_date"]["issue_date_year"]) {
        date += data["issue_date"]["issue_date_year"];
      }

      if (
        data["issue_date"]["issue_date_year"] &&
        data["issue_date"]["issue_date_month"]
      ) {
        const months = [
          "",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        date = `${date}-${months[data["issue_date"]["issue_date_month"]]}`;
      }

      if (
        data["issue_date"]["issue_date_year"] &&
        data["issue_date"]["issue_date_month"] &&
        data["issue_date"]["issue_date_date"]
      ) {
        date = `${date}-${data["issue_date"]["issue_date_date"]}`;
      }

      if (date) {
        data["issue_date"] = date;
      } else {
        delete data["issue_date"];
      }
    }

    try {
      const response = await API.post("/repository/items/create", { ...data });
      if (response.status === 201) {
        const resetForm = {
          title: "",
          author: {
            author_0: "",
          },
          advisor_of_author: "",
          issue_date: {
            issue_date_year: "",
            issue_date_month: "",
            issue_date_date: "",
          },
          item_type: "",
          subject: {
            subject_0: "",
          },
          abstract: "",
          publisher: "",
          citation: "",
          description: "",
          files: "",
        };
        this.setState((state) => ({
          inputsValue: {
            ...state.inputsValue,
            ...resetForm,
          },
          authorInputs: [],
          subjectInputs: [],
          temporaryUploadedFilesId: {},
        }));
        this.clearAllTemporaryUploadedFiles();
        notificationUpdateToSuccess({
          message: "Sub collection has been added successfully !",
        });
      } else {
        throw new Error(response);
      }
    } catch (error) {
      if (!error.response) {
        notificationUpdateToError({ message: "Can't connect to the server" });
      } else if (error.response.status === 406) {
        notificationUpdateToError({
          message: "Failed to submit all files.",
          autoClose: 15000,
        });
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
        <FileUpload
          addTemporaryUploadedFiles={this.addTemporaryUploadedFilesId}
          removeTemporaryUploadedFiles={this.removeTemporaryUploadedFilesId}
          clearAllFiles={this.setClearAllTemporaryUploadedFiles}
        />
        <Form onSubmit={this.submitHandler}>
          <Form.Group>
            <Form.Label>
              Title<span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="title"
                required
                placeholder="**Title**"
                value={this.state.inputsValue.title}
                onChange={this.inputValueChangeHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Author<span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="author_0"
                required
                placeholder="**Author 1**"
                value={this.state.inputsValue.author.author_0}
                onChange={this.inputValueChangeHandler}
              />
              <InputGroup.Append>
                <Button variant="sre" onClick={this.addAuthorInputHandler}>
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>

            {this.state.authorInputs.map((inputKey, index) => {
              return (
                <InputGroup key={inputKey} className="mt-2">
                  <Form.Control
                    type="text"
                    name={inputKey.toString()}
                    required
                    placeholder={
                      "**Author " + (Number(index) + 2).toString() + "**"
                    }
                    onChange={this.inputValueChangeHandler}
                  />
                  <InputGroup.Append>
                    <Button
                      className="bg-white border-secondary"
                      onClick={() => this.removeAuthorInputHandler(inputKey)}
                    >
                      <BsFillTrashFill className="text-danger" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              );
            })}

            <Form.Control.Feedback type="invalid">
              Please enter a author name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Author advisor</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="advisor_of_author"
                placeholder="**Author advisor**"
                value={this.state.inputsValue.advisor_of_author}
                onChange={this.inputValueChangeHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Issue date<span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="issue_date_year"
                as="select"
                required
                value={this.state.inputsValue.issue_date.issue_date_year}
                onChange={this.inputValueChangeHandler}
              >
                <option value="" className="text-secondary">
                  **Year**
                </option>
                {getYears().map((year) => {
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control
                name="issue_date_month"
                as="select"
                value={this.state.inputsValue.issue_date.issue_date_month}
                onChange={this.inputValueChangeHandler}
              >
                <option value="" className="text-secondary">
                  **Month**
                </option>
                {[...Array(13)].map((_, i) => {
                  if (i === 0) return null;
                  return (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control
                name="issue_date_date"
                as="select"
                value={this.state.inputsValue.issue_date.issue_date_date}
                onChange={this.inputValueChangeHandler}
              >
                <option value="" className="text-secondary">
                  **Date**
                </option>
                {[...Array(31)].map((_, i) => {
                  if (i === 0) return null;
                  return (
                    <option value={i} key={i}>
                      {i}
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
              Type<span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="item_type"
                as="select"
                required
                value={this.state.inputsValue.item_type}
                onChange={this.inputValueChangeHandler}
              >
                <option value="" className="text-secondary">
                  **Select document type**
                </option>
                {this.state.itemsType.map((itemType) => {
                  return (
                    <option value={itemType.id} key={itemType.id}>
                      {itemType.name}
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
            <Form.Label>Subject</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="subject_0"
                placeholder="**Subject 1**"
                value={this.state.inputsValue.subject.subject_0}
                onChange={this.inputValueChangeHandler}
              />
              <InputGroup.Append>
                <Button variant="sre" onClick={this.addSubjectInputHandler}>
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {this.state.subjectInputs.map((inputKey, index) => {
              return (
                <InputGroup key={inputKey} className="mt-2">
                  <Form.Control
                    type="text"
                    name={inputKey.toString()}
                    placeholder={
                      "**Subject " + (Number(index) + 2).toString() + "**"
                    }
                    onChange={this.inputValueChangeHandler}
                  />
                  <InputGroup.Append>
                    <Button
                      className="bg-white border-secondary"
                      onClick={() => this.removeSubjectInputHandler(inputKey)}
                    >
                      <BsFillTrashFill className="text-danger" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              );
            })}
            
            <Form.Control.Feedback type="invalid">
              Please enter subject.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Abstract</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="abstract"
              placeholder="**Enter the abstract of the item**"
              value={this.state.inputsValue.abstract}
              onChange={this.inputValueChangeHandler}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Publisher</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="publisher"
                placeholder="**Publisher**"
                value={this.state.inputsValue.publisher}
                onChange={this.inputValueChangeHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Citation</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                name="citation"
                placeholder="**Citation**"
                value={this.state.inputsValue.citation}
                onChange={this.inputValueChangeHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid value.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="description"
              placeholder="**Enter the decription of the item**"
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
