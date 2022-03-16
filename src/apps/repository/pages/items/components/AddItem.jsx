import React, { useState } from "react";
import AddItemForm from "./sub-comps/AddItemForm";
import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";
import {
  CollectionsContext,
  CollectionsModalWithSubCollections,
} from "../../../common_components/CollectionsModal";

export default function AddItem() {
  const [rootCollection, setRootCollection] = useState("");
  const [subCollection, setSubCollection] = useState("");

  return (
    <>
      <CRow>
        <CCol className="col-lg-9">
          <CCard accentColor="sre">
            <CCardHeader>
              <h5 className="font-weight-bolder">Add Item</h5>
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
              <CRow>
                <CCol className="col-lg-10 col-xl-8">
                  <AddItemForm
                    rootCollection={rootCollection.split(":::")[0]}
                    subCollection={subCollection.split(":::")[0]}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
