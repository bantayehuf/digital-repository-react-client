import React from "react";
import AddCollectionForm from "./sub-comps/AddCollectionForm";

import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";

export default function AddCollection() {
  return (
    <>
      <CRow>
        <CCol className="col-lg-9">
          <CCard accentColor="sre">
            <CCardHeader>
              <h5 className="font-weight-bolder">Add Collection</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol className="col-lg-10 col-xl-8">
                  <AddCollectionForm />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
