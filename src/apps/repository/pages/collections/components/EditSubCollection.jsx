import React, { useState } from "react";
import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";

import { ErrorMessages } from "../../../../root-app/components/ErrorMessages";
import {
  CollectionsContext,
  CollectionsModal,
} from "../../../common_components/CollectionsModal";

import SubCollections from "./sub-comps/SubCollections";

export default function EditSubCollection() {
  const [rootCollection, setRootCollection] = useState("");

  return (
    <>
      <CRow className="h-100">
        <CCol className="pb-4">
          <CCard accentColor="sre h-100">
            <CCardHeader>
              <h5 className="font-weight-bolder">Sub Collections</h5>
              <CollectionsContext.Provider
                value={{
                  rootCollection,
                  setRootCollection,
                }}
              >
                <CollectionsModal />
              </CollectionsContext.Provider>
            </CCardHeader>
            <CCardBody>
              {rootCollection ? (
                <SubCollections
                  rootCollection={rootCollection.split(":::")[0]}
                />
              ) : (
                <>
                  <ErrorMessages message="Collection has not been sellected" />
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
