import React, { useState, useEffect } from "react";
import { CBadge } from "@coreui/react";

import { SimpleComponentLoading } from "../../../../../root-app/components/LoadingSpinner";
import { API } from "../../../../../root-app/utils/configs";
import { SimpleDataTable } from "../../../../../root-app/components/DataTable";
import { ErrorMessages } from "../../../../../root-app/components/ErrorMessages";

function RecentItems() {
  const [fetchingData, setFetchingData] = useState(true);
  const [items, setItems] = useState({ hasError: false });

  useEffect(() => {
    async function fetchData() {
      setFetchingData(true);
      try {
        let url = "/repository/items/list?page_size=10";
        const response = await API.get(url);
        if (response.status === 200) {
          const result = response.data.results.map((item) => {
            let authors = "";
            if (item.author) {
              let authorsR = item.author.split(":::");
              authors = authorsR.map((author, index) => {
                return (
                  <CBadge
                    key={index}
                    className="mr-1 px-2"
                    color="secondary"
                    shape="pill"
                  >
                    {author}
                  </CBadge>
                );
              });
            }

            // item["author"] = authors;

            return {
              title: item.title,
              author: authors,
              issue_date: item.issue_date,
              collection: item.collection_info.name,
            };
          });

          setItems({
            hasError: false,
            result: result,
          });
        } else {
          throw new Error("Error occured!");
        }
      } catch (error) {
        setItems({ hasError: true });
      }
      setFetchingData(false);
    }

    fetchData();
  }, []);

  const columns = [
    {
      Header: "Tile",
      accessor: "title",
    },
    {
      Header: "Author",
      accessor: "author",
    },
    {
      Header: "Issue date",
      accessor: "issue_date",
    },
    {
      Header: "Collection",
      accessor: "collection",
    },
  ];

  return (
    <>
      {fetchingData ? (
        <>
          <SimpleComponentLoading />
        </>
      ) : (
        <>
          {items.hasError ? (
            <>
              <ErrorMessages message="Failed to load" />
            </>
          ) : (
            <SimpleDataTable columns={columns} data={items.result} />
          )}
          {/* <SimpleDataTable columns={columns} data={items.result} /> */}
        </>
      )}
    </>
  );
}

export default RecentItems;
