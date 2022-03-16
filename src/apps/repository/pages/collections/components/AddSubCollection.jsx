import React from "react";
import AddSubCollectionForm from "./sub-comps/AddSubCollectionForm";
import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";

export default function AddSubCollection() {
  return (
    <>
      <CRow>
        <CCol className="col-lg-9">
          <CCard accentColor="sre">
            <CCardHeader>
              <h5 className="font-weight-bolder">Add Sub Collection</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol className="col-lg-10 col-xl-8">
                  <AddSubCollectionForm />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
