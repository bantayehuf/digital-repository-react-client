import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { CCol, CPagination, CRow } from "@coreui/react";

import ActionHeader from "../../../../common_components/ActionHeader";
import { ItemCreatedByViewModal } from "../../../../common_components/ItemCreatedByViewModal";
import { API } from "../../../../../root-app/utils/configs";
import { notificationError } from "../../../../../root-app/utils/Nofications";
import {
  SimpleComponentLoading,
  InfiniteBarLoader,
} from "../../../../../root-app/components/LoadingSpinner";

import DataTable, {
  DataTableTotalSelectedRows,
} from "../../../../../root-app/components/DataTable";

let timer;
export default class Collections extends React.Component {
  constructor(props) {
    super(props);
    // renderForTheChange variable has used to control re-render the componet for
    // every state changes.
    this.state = {
      fetchingData: true,
      renderForTheChange: true,
      currentUrl: "",
      collections: {
        results: [],
        pages: 0,
      },
      search: {
        searching: false,
        searchQuery: "",
      },
      currentPage: 1,
      numberOfRows: 10,
      pageSize: 1,
      resultFound: false,
      selectedAction: "",
      errorMessage: "Failed to load",
    };
  }

  componentDidMount() {
    this.fetchData({});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.renderForTheChange) return true;
    else return false;
  }

  fetchData = async (options) => {
    let url = "/repository";
    var urlInitiated = false;

    // If the user is not changing pagenations or refreshing the page,
    // always reset the current page for all requests.
    if (!options.pageNation && !options.refreshThePage) {
      this.setState({ currentPage: 1, renderForTheChange: false });
    }

    // refresh the page in the current states
    if (options.refreshThePage) {
      url = this.state.currentUrl;
      urlInitiated = true;
    }

    // If the the user is the searchig set search query into the state to use for the next
    // request with page nation.
    // And reset searchingQueary state if the user is not initiated searching
    if (!urlInitiated && options.searching) {
      this.setState({
        search: {
          searching: true,
          searchQuery: options.q,
          renderForTheChange: false,
        },
      });
      url = `${url}/collections/search?q=${options.q}&page_size=${this.state.numberOfRows}`;
      urlInitiated = true;
    } else if (
      !this.state.search.searching &&
      !(this.state.search.searchQuery !== "")
    ) {
      this.setState({
        search: {
          searching: false,
          searchQuery: "",
          renderForTheChange: false,
        },
      });
    }

    if (!urlInitiated && options.pageNation) {
      if (this.state.search.searching && this.state.search.searchQuery !== "") {
        url = `${url}/collections/search?q=${this.state.search.searchQuery}&page_size=${this.state.numberOfRows}&page=${options.selectedPage}`;
      } else {
        url = `${url}/collections/list?page_size=${this.state.numberOfRows}&page=${options.selectedPage}`;
      }
      urlInitiated = true;
    } else if (!urlInitiated && options.numberOfRows) {
      if (this.state.search.searching && this.state.search.searchQuery !== "") {
        url = `${url}/collections/search?q=${this.state.search.searchQuery}&page_size=${options.numberOfRowsValue}`;
      } else {
        url = `${url}/collections/list?page_size=${options.numberOfRowsValue}`;
      }
      urlInitiated = true;
    } else if (!urlInitiated) {
      url = `${url}/collections/list?page_size=${this.state.numberOfRows}`;
      urlInitiated = true;
    }

    // Store the current url in the state to use to refresh the page in
    // last state
    this.setState({ currentUrl: url, renderForTheChange: false });

    // If the fething state is false make it true to show fetching progress
    if (this.state.fetchingData === false) {
      this.setState({ fetchingData: true, renderForTheChange: true });
    }

    try {
      const response = await API.get(url);

      if (response.status === 200) {
        const data = response.data.results.map((collection) => {
          const desc = collection.description ? (
            collection.description
          ) : (
            <span key={collection.id} className="text-sr">
              <BsInfoCircleFill size={13} style={{ marginTop: "-3px" }} />
              <span className="pl-1">Not provided</span>
            </span>
          );
          return {
            id: collection.id,
            name: collection.name,
            description: desc,
            created_by: (
              <ItemCreatedByViewModal createdBy={collection.created_by_info} />
            ),
            created_at: collection.date_of_created,
          };
        });

        const pageSize = this.pageSizeHandler(response.data.count);
        this.setState({
          collections: {
            results: data,
            pages: response.data.count,
          },
          pageSize: pageSize,
          resultFound: true,
          fetchingData: false,
          renderForTheChange: true,
        });
      } else {
        throw new Error("Error occured!");
      }
    } catch (error) {
      if (!error.response) {
        notificationError({
          message: "Can't connect to the server, please refresh the page",
        });
        this.setState({ fetchingData: false, renderForTheChange: true });
      } else if (error.response.status === 404) {
        this.setState({
          resultFound: false,
          fetchingData: false,
          errorMessage: "Not Found",
          renderForTheChange: true,
        });
      } else {
        notificationError({
          message: "Failed to load the page, please refresh the page !",
        });
        this.setState({ fetchingData: false, renderForTheChange: true });
      }
    }
  };

  searchQueryHandler = (e) => {
    clearTimeout(timer);
    const globaThis = this;
    timer = setTimeout(function () {
      if (e.target.value) {
        globaThis.fetchData({ searching: true, q: e.target.value });
      } else {
        globaThis.setState({
          search: {
            searching: false,
            searchQuery: "",
            renderForTheChange: false,
          },
        });
        globaThis.fetchData({ searching: false });
      }
    }, 800);
  };

  changePagenationPageHandler = (selectedPage) => {
    this.setState({ currentPage: selectedPage, renderForTheChange: false });
    this.fetchData({
      pageNation: true,
      selectedPage: selectedPage,
    });
  };

  changeNumberOfRowsHandler = (e) => {
    this.setState({ numberOfRows: e.target.value, renderForTheChange: false });
    this.fetchData({
      numberOfRows: true,
      numberOfRowsValue: e.target.value,
    });
  };

  pageSizeHandler = (count) => {
    const pageSize = Number(this.state.numberOfRows);
    var pages = (count + (pageSize - 1)) / pageSize;
    pages = Math.abs(pages);
    pages = pages - (pages % 1);
    return pages;
  };

  // To refresh the page in the last state
  // e.g. after deleted the records from database the page should be refreshed
  // to remove the deleted records from the browser and get the updated data from DB
  refreshThePage = () => {
    this.fetchData({ refreshThePage: true });
  };

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Created by",
        accessor: "created_by",
      },
      {
        Header: "Created at",
        accessor: "created_at",
      },
    ];
    return (
      <>
        <ActionHeader
          defaultNumberOfRowsToShow={this.state.numberOfRows}
          changeNumberOfRowsHandler={this.changeNumberOfRowsHandler}
          searchQueryHandler={this.searchQueryHandler}
          refreshThePage={this.refreshThePage}
          urlForDeleteItems="/repository/collections/delete"
        />
        {
          // If the state is fetching and the page is loading for the first time
          // show spinnig progress bar for data loading
          this.state.fetchingData && !this.state.resultFound ? (
            <div className="mt-5">
              <SimpleComponentLoading />
            </div>
          ) : (
            <>
              {this.state.resultFound ? (
                <>
                  <InfiniteBarLoader
                    style={{
                      visibility: this.state.fetchingData
                        ? "visible"
                        : "hidden",
                    }}
                  />
                  <CRow className="overflow-auto">
                    <DataTable
                      columns={columns}
                      data={this.state.collections.results}
                    />
                  </CRow>

                  <CRow>
                    <CCol className="col-12 col-md-6">
                      <DataTableTotalSelectedRows />
                    </CCol>
                    <CCol className="col-12 col-md-6">
                      <CPagination
                        className="txt-secondary"
                        color="secondary"
                        align="end"
                        size="sm"
                        limit={5}
                        activePage={this.state.currentPage}
                        pages={this.state.pageSize}
                        onActivePageChange={this.changePagenationPageHandler}
                      />
                    </CCol>
                  </CRow>
                </>
              ) : (
                <div className="d-flex justify-content-center mt-5">
                  <span className="d-flex justify-content-center">
                    <BsInfoCircleFill size={27} />
                    <h4 className="pl-1">{this.state.errorMessage}</h4>
                  </span>
                </div>
              )}
            </>
          )
        }
      </>
    );
  }
}
