import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CWidgetBrand,
} from "@coreui/react";
import RecentItems from "./sub-comps/RecentItems";
import { API } from "../../../../root-app/utils/configs";
import { ComponentLoading } from "../../../../root-app/components/LoadingSpinner";
import { notificationError } from "../../../../root-app/utils/Nofications";
import { ErrorMessages } from "../../../../root-app/components/ErrorMessages";


export default function Dashboard() {
  // const [fetchingData, setFetchingData] = useState(true);
  const [dashboardReports, setDashboardReports] = useState({
    collections: {},
    sub_collections: {},
    items: {},
    fetchingData: true,
    hasError: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        let url = "/repository/dashboard-report";
        const response = await API.get(url);
        if (response.status === 200) {
          setDashboardReports({
            collections: response.data.collections,
            sub_collections: response.data.sub_collections,
            items: response.data.items,
            fetchData: false,
            hasError: false,
          });
        } else {
          throw new Error("Error occured!");
        }
      } catch (error) {
        if (!error.response) {
          notificationError({
            message: "Can't connect to the server",
          });
        } else {
          notificationError({
            message: "Failed to load, please refresh the page !",
          });
        }

        setDashboardReports({
          fetchData: false,
          hasError: true,
        });
      }
      // setDashboardReports({ fetchingData: false });
    }

    fetchData();
  }, []);
  
  return (
    <>
      {dashboardReports.fetchingData ? (
        <>
          <ComponentLoading />
        </>
      ) : (
        <>
          {dashboardReports.hasError ? (
            <>
              <ErrorMessages message="Failed to load" />
            </>
          ) : (
            <CRow>
              <CCol sm="12" md="6" lg="4">
                <CWidgetBrand
                  color="sre"
                  rightHeader={dashboardReports.collections.total.toString()}
                  rightFooter="Total"
                  leftHeader={dashboardReports.collections.in_30days.toString()}
                  leftFooter="Recent"
                >
                  <span className="my-4">Collections</span>
                </CWidgetBrand>
              </CCol>

              <CCol sm="12" md="6" lg="4">
                <CWidgetBrand
                  color="sre"
                  rightHeader={dashboardReports.sub_collections.total.toString()}
                  rightFooter="Total"
                  leftHeader={dashboardReports.sub_collections.in_30days.toString()}
                  leftFooter="Recent"
                >
                  <span className="my-4">Sub collections</span>
                </CWidgetBrand>
              </CCol>

              <CCol sm="12" md="6" lg="4">
                <CWidgetBrand
                  color="sre"
                  rightHeader={dashboardReports.items.total.toString()}
                  rightFooter="Total"
                  leftHeader={dashboardReports.items.in_30days.toString()}
                  leftFooter="Recent"
                >
                  <span className="my-4">Items</span>
                </CWidgetBrand>
              </CCol>

              <CCol className="">
                <CCard>
                  <CCardHeader>
                    <h6 className="font-weight-bolder">Recently added items</h6>
                  </CCardHeader>
                  <CCardBody>
                    <RecentItems />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}
        </>
      )}
    </>
  );
}
export { Dashboard };
