import React from "react";
import ChangePasswordForm from "./sub-comps/ChangePasswordForm";

import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";

export default function ChangePassword() {
  return (
    <>
      <CRow>
        <CCol className="col-lg-9">
          <CCard accentColor="sre">
            <CCardHeader>
              <h5 className="font-weight-bolder">Change Password</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol className="col-lg-10 col-xl-8">
                  <ChangePasswordForm />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
