import React, { useState, createContext, useContext } from "react";
import {
  CRow,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useSelector } from "react-redux";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { API } from "../../root-app/utils/configs";
import SpinningButton from "../../root-app/components/SpinningButton";
import {
  notificationError,
  notificationSuccess,
} from "../../root-app/utils/Nofications";

const DeletingItemsContext = createContext();

export default function ActionHeader(props) {
  const [showItemDeletingModal, setShowItemDeletingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");

  const actionChangeHandler = (e) => {
    setAction(e.target.value);
  };

  const actionSubmitHandler = (e) => {
    e.preventDefault();
    switch (action) {
      case "delete":
        setShowItemDeletingModal(true);
        break;
      default:
        break;
    }
  };

  const deleteItems = async (items) => {
    const itemsId = items.map((item) => item.id);
    setLoading(true);
    try {
      const response = await API.delete(props.urlForDeleteItems, {
        params: {
          id: "multiple_items",
        },
        data: {
          deleting_items: [...itemsId],
        },
      });
      if (response.status === 204) {
        setLoading(false);
        setShowItemDeletingModal(false);
        setAction("");
        notificationSuccess({ message: "Deleted successfully!" });
        // Refreshing datatable value from the parent componenet
        props.refreshThePage();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      setShowItemDeletingModal(false);
      if (!error.response) {
        notificationError({ message: "Can't connect to the server" });
      } else {
        notificationError({
          message: "Failed to perform the action, please try again.",
        });
      }
    }
  };

  return (
    <>
      <DeletingItemsContext.Provider
        value={{
          showItemDeletingModal,
          setShowItemDeletingModal,
          deleteItems,
          loading,
        }}
      >
        <DeletingItemsModal deleteItems={deleteItems} />
      </DeletingItemsContext.Provider>

      <CRow className="pb-2">
        <CCol className="col-12 col-md-4 ">
          <Form onSubmit={actionSubmitHandler}>
            <div className="input-group mb-2">
              <div className="input-group-prepend pr-2">
                <span className="align-self-center">Actions</span>
              </div>
              <Form.Control
                type="text"
                className="form-control-sm"
                style={{
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
                as="select"
                required
                name="action"
                onChange={actionChangeHandler}
                value={action}
              >
                <option value="" className="text-secondary">
                  -----------
                </option>
                <option value="delete">Delete items</option>
              </Form.Control>

              <div className="input-group-append">
                <Button
                  className="bg-secondary border-secondary sre-hover btn-sm"
                  id="basic-addon2"
                  as="input"
                  type="submit"
                  value="Go"
                />
              </div>
            </div>
          </Form>
        </CCol>
        <CCol className="col-12 col-md-4 ">
          <div className="input-group mb-2">
            <div className="input-group-prepend pr-2">
              <span className="align-self-center">Show</span>
            </div>
            <Form.Control
              type="text"
              className="form-control-sm col-5"
              style={{
                borderRadius: "5px",
              }}
              as="select"
              required
              name="action"
              onChange={props.changeNumberOfRowsHandler}
              value={props.defaultNumberOfRowsToShow}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="225">225</option>
              <option value="500">500</option>
              <option value="750">750</option>
              <option value="1000">1000</option>
            </Form.Control>
            <div className="input-group-append pl-2">
              <span className="align-self-center">entries</span>
            </div>
          </div>
        </CCol>
        <CCol className="col-12 col-md-4">
          <Form.Control
            className="form-control-sm"
            type="search"
            placeholder="Search.."
            onChange={props.searchQueryHandler}
          />
        </CCol>
      </CRow>
    </>
  );
}

export const DeletingItemsModal = (props) => {
  const {
    showItemDeletingModal,
    setShowItemDeletingModal,
    deleteItems,
    loading,
  } = useContext(DeletingItemsContext);

  const deletingItems = useSelector(
    (state) => state.rootApp.dataTableSelectRows.selectedRows
  );

  return (
    <>
      <CModal
        show={showItemDeletingModal}
        onClose={() => setShowItemDeletingModal(false)}
      >
        <CModalHeader closeButton>
          <CModalTitle>Deleting Items</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {Object.keys(deletingItems).length > 0 ? (
            <>
              <h6>Are you sure you want to delete the following items?</h6>
              <ul type="square" className="pl-4 pr-3">
                {deletingItems.map((item) => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
            </>
          ) : (
            <>
              <BsFillExclamationTriangleFill
                size={15}
                className="text-warning"
                style={{ marginTop: "-5px" }}
              />
              <span className="pl-1">
                Items must be selected in order to delete.
              </span>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          {Object.keys(deletingItems).length > 0 && (
            <>
              <SpinningButton
                text="Delete"
                onClick={() => deleteItems(deletingItems)}
                loading={loading}
              />{" "}
            </>
          )}
          <Button
            className="btn-secondary"
            onClick={() => setShowItemDeletingModal(false)}
          >
            Cancel
          </Button>
        </CModalFooter>
      </CModal>
    </>
  );
};
