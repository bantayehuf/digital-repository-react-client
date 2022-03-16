import React from "react";
import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";
import ItemTypes from "./sub-comps/ItemTypes";

export default function EditItemType() {
  return (
    <>
      <CRow className="h-100">
        <CCol className="pb-4">
          <CCard accentColor="sre h-100">
            <CCardHeader>
              <h5 className="font-weight-bolder">Item types</h5>
            </CCardHeader>
            <CCardBody>
              <ItemTypes />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
