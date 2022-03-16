import React from "react";
import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";

import AddItemTypeForm from "./sub-comps/AddItemTypeForm";

export default function AddItemType() {
  return (
    <>
      <CRow>
        <CCol className="col-lg-9">
          <CCard accentColor="sre">
            <CCardHeader>
              <h5 className="font-weight-bolder">Add Item Type</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol className="col-lg-10 col-xl-8">
                  <AddItemTypeForm />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
