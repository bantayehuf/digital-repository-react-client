import React from "react";
import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";

import Collections from "./sub-comps/Collections";

export default function EditCollection() {
  return (
    <>
      <CRow className="h-100">
        <CCol className="pb-4">
          <CCard accentColor="sre h-100">
            <CCardHeader>
              <h5 className="font-weight-bolder">Collections</h5>
            </CCardHeader>
            <CCardBody>
              <Collections />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
