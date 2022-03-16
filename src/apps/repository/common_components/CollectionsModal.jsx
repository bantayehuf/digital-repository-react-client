import React, { useState, useContext, useEffect } from "react";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CLink,
  CButton,
} from "@coreui/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  BsFillExclamationTriangleFill,
  BsPlusLg,
  BsChevronDoubleRight,
} from "react-icons/bs";

import { API } from "../../root-app/utils/configs";
import { notificationError } from "../../root-app/utils/Nofications";
import { ComponentLoading } from "../../root-app/components/LoadingSpinner";

const CollectionsContext = React.createContext();

const CollectionsModal = () => {
  const [showCollectionModal, setShowCollectionModal] = useState(true);
  const [inputsValue, setInputsValue] = useState({ root_collection: "" });
  const [collections, setCollections] = useState([]);
  const [collectionLoading, setCollectionLoading] = useState(true);

  const { rootCollection, setRootCollection } = useContext(CollectionsContext);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await API.get(
          "/repository/collections/list?page_size=100"
        );
        if (response.status === 200) {
          setCollections(response.data.results);
        } else {
          throw new Error("Error occured!");
        }
      } catch (error) {
        if (!error.response) {
          notificationError({
            message: "Can't connect to the server",
          });
        } else if (error.response.status === 404) {
          notificationError({
            message: "There is no registered collection to select.",
          });
        } else {
          notificationError({
            message: "Failed to load the page, please refresh the page !",
          });
        }
      }
      setCollectionLoading(false);
    }
    fetchCollections();
  }, []);

  const inputValueChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputsValue({ [name]: value });
  };

  const applyCollectionChanges = () => {
    // If root collection is not set nothing to be apply.
    if (!inputsValue.root_collection) {
      notificationError({
        message: "There is no selected collection to apply !",
      });
      return;
    }
    setRootCollection(inputsValue.root_collection);
    setShowCollectionModal(false);
  };

  return (
    <>
      {rootCollection ? (
        <>
          <span>
            <span className="text-capitalize">
              <strong>Collection:</strong>
              {` ${rootCollection.split(":::")[1]}`}
            </span>
            <CLink
              className="pl-1 text-sre"
              onClick={() => setShowCollectionModal(true)}
            >
              (Change)
            </CLink>
          </span>
        </>
      ) : (
        <>
          <span className="d-flex">
            <BsFillExclamationTriangleFill className="text-danger" />
            <h6 className="pl-1">Please select collection.</h6>
            <CLink
              className="pl-1 text-sre"
              onClick={() => setShowCollectionModal(true)}
            >
              (Select)
            </CLink>
          </span>
        </>
      )}
      <CModal
        show={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Select Collection</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {collectionLoading ? (
            <ComponentLoading className="py-3" />
          ) : (
            <Form.Group>
              <Form.Label>
                Collection<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="root_collection"
                as="select"
                required
                onChange={inputValueChangeHandler}
                htmlSize={10}
              >
                {collections.map((collection) => {
                  return (
                    <option
                      className="py-1"
                      value={`${collection.id}:::${collection.name}`}
                      key={collection.id}
                    >
                      {collection.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          )}
        </CModalBody>
        <CModalFooter>
          <Button className="bg-sre" onClick={applyCollectionChanges}>
            Apply
          </Button>{" "}
          <Button
            className="btn-secondary"
            onClick={() => setShowCollectionModal(false)}
          >
            Cancel
          </Button>
        </CModalFooter>
      </CModal>
    </>
  );
};

const CollectionsModalWithSubCollections = () => {
  const [showCollectionModal, setShowCollectionModal] = useState(true);
  const [collections, setCollections] = useState([]);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [subCollections, setSubCollections] = useState([]);
  const [subCollectionExists, setSubCollectionExists] = useState(false);
  const [subCollectionLoading, setSubCollectionLoading] = useState({
    intialized: false,
    loading: false,
  });
  const [inputsValue, setInputsValue] = useState({
    root_collection: "",
    sub_collection: "",
  });

  const { rootCollection, setRootCollection, subCollection, setSubCollection } =
    useContext(CollectionsContext);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await API.get(
          "/repository/collections/list?page_size=100"
        );
        if (response.status === 200) {
          setCollections(response.data.results);
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
            message: "There is no registered collection to select.",
          });
        } else {
          notificationError({
            message: "Failed to load the page, please refresh the page !",
          });
        }
      }
      setCollectionLoading(false);
    }
    fetchCollections();
  }, []);

  const inputValueChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // Checking whether root collection is changing and
    // reset sub collection saved states while root collection has changed
    if (name === "root_collection") {
      setInputsValue((inputsValue) => ({
        ...inputsValue,
        ...{ sub_collection: "" },
      }));
      setSubCollectionLoading((subCollectionLoading) => ({
        ...subCollectionLoading,
        ...{ intialized: false, loading: false },
      }));
    }

    setInputsValue((inputsValue) => ({
      ...inputsValue,
      ...{ [name]: value },
    }));
  };

  const fetchSubCollection = async (e) => {
    e.preventDefault();

    const root_collection = inputsValue.root_collection.split(":::")[0];
    setSubCollectionLoading((subCollectionLoading) => ({
      ...subCollectionLoading,
      ...{ intialized: true, loading: true },
    }));

    try {
      const response = await API.get(
        `/repository/sub_collections/list?root_collection=${root_collection}&page_size=100`
      );
      if (response.status === 200) {
        setSubCollections(response.data.results);
        setSubCollectionExists(true);
      } else {
        throw new Error("Error occured!");
      }
    } catch (error) {
      if (!error.response) {
        notificationError({ message: "Can't connect to the server !" });
      } else if (error.response.status === 404) {
        setSubCollectionExists(false);
      } else {
        notificationError({ message: "Failed to load sub collection !" });
      }
    }

    setSubCollectionLoading((subCollectionLoading) => ({
      ...subCollectionLoading,
      ...{ loading: false },
    }));
  };

  const applyCollectionChanges = () => {
    // If root collection is not set nothing to be apply.
    // Sub collection is optional.
    if (!inputsValue.root_collection) {
      notificationError({
        message: "There is no selected collection to apply !",
      });
      return;
    }

    setRootCollection(inputsValue.root_collection);
    setSubCollection(inputsValue.sub_collection);
    setShowCollectionModal(false);
  };

  return (
    <>
      {rootCollection ? (
        <>
          <span>
            <span className="text-capitalize">
              <strong>Collection:</strong>
              {` ${rootCollection.split(":::")[1]}`}
            </span>
            {subCollection && (
              <>
                <span className="text-success">
                  {" "}
                  <BsChevronDoubleRight size={12}/>{" "}
                </span>
                <span className="text-capitalize">
                  {subCollection.split(":::")[1]}
                </span>
              </>
            )}
            <CLink
              className="pl-1 text-sre"
              onClick={() => setShowCollectionModal(true)}
            >
              (Change)
            </CLink>
          </span>
        </>
      ) : (
        <>
          <span className="d-flex">
            <BsFillExclamationTriangleFill className="text-danger" />
            <h6 className="pl-1">Please select collection.</h6>
            <CLink
              className="pl-1 text-sre"
              onClick={() => setShowCollectionModal(true)}
            >
              (Select)
            </CLink>
          </span>
        </>
      )}
      <CModal
        show={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Select Collection</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {collectionLoading ? (
            <ComponentLoading className="py-3" />
          ) : (
            <Form onSubmit={fetchSubCollection}>
              <Form.Group>
                <Form.Label>
                  Collection<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="root_collection"
                  as="select"
                  required
                  onChange={inputValueChangeHandler}
                >
                  <option value="" className="text-secondary">
                    **Select collection**
                  </option>
                  {collections.map((collection) => {
                    return (
                      <option
                        value={`${collection.id}:::${collection.name}`}
                        key={collection.id}
                      >
                        {collection.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              {subCollectionLoading.intialized ? (
                <>
                  {subCollectionLoading.loading ? (
                    <ComponentLoading className="py-3" />
                  ) : (
                    <>
                      {" "}
                      {subCollectionExists ? (
                        <Form.Group>
                          <Form.Label>
                            Sub Collection<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            name="sub_collection"
                            as="select"
                            required
                            onChange={inputValueChangeHandler}
                            htmlSize={10}
                          >
                            {/* <option value="" className="text-secondary">**Select sub collection**</option> */}
                            {subCollections.map((collection) => {
                              return (
                                <option
                                  className="py-1"
                                  value={`${collection.id}:::${collection.name}`}
                                  key={collection.id}
                                >
                                  {collection.name}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <BsFillExclamationTriangleFill />
                          <h6 className="pl-1">Not Found</h6>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <CButton
                  className="text-sre"
                  style={{ outline: "none!important" }}
                  type="submit"
                >
                  <BsPlusLg size={12} /> <span>Add sub collection</span>
                </CButton>
              )}
            </Form>
          )}
        </CModalBody>
        <CModalFooter>
          <Button className="bg-sre" onClick={applyCollectionChanges}>
            Apply
          </Button>{" "}
          <Button
            className="btn-secondary"
            onClick={() => setShowCollectionModal(false)}
          >
            Cancel
          </Button>
        </CModalFooter>
      </CModal>
    </>
  );
};

export {
  CollectionsContext,
  CollectionsModal,
  CollectionsModalWithSubCollections,
};
