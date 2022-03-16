import React from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTooltip,
  CLink,
} from "@coreui/react";

export const ItemCreatedByViewModal = ({ createdBy }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <CTooltip content="Show who created the item" placement="left">
        <CLink className="text-sre" onClick={() => setShowModal(true)}>
          {createdBy.employee_id}
        </CLink>
      </CTooltip>

      <CModal show={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Created by Info</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>Item created by:</h6>
          <div className="pl-4 pr-3">
            <div>
              <span className="font-weight-bold">Full name:</span>{" "}
              <span>{`${createdBy.first_name} ${createdBy.middle_name} ${createdBy.last_name}`}</span>
            </div>
            <div>
              <span className="font-weight-bold">Employee ID:</span>{" "}
              <span>{createdBy.employee_id}</span>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};
