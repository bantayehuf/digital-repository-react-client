import React, { useState } from "react";
import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";
import { ErrorMessages } from "../../../../root-app/components/ErrorMessages";
import {
  CollectionsContext,
  CollectionsModalWithSubCollections,
} from "../../../common_components/CollectionsModal";

import Items from "./sub-comps/Items";

export default function ManageItem() {
  const [rootCollection, setRootCollection] = useState("");
  const [subCollection, setSubCollection] = useState("");

  return (
    <>
      <CRow className="h-100">
        <CCol className="pb-4">
          <CCard accentColor="sre h-100">
            <CCardHeader>
              <h5 className="font-weight-bolder">Items</h5>
              <CollectionsContext.Provider
                value={{
                  rootCollection,
                  setRootCollection,
                  subCollection,
                  setSubCollection,
                }}
              >
                <CollectionsModalWithSubCollections />
              </CollectionsContext.Provider>
            </CCardHeader>
            <CCardBody>
              {rootCollection ? (
                <Items
                  rootCollection={rootCollection.split(":::")[0]}
                  subCollection={subCollection.split(":::")[0]}
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
