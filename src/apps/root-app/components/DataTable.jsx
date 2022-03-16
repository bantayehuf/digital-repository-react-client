import React from "react";
import Table from "react-bootstrap/Table";
import { useTable, useRowSelect } from "react-table";
import { useSelector, useDispatch } from "react-redux";

import { selectedRowsChangeHandler } from "../redux_slice/dataTableSelectedRowsSlice";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export default function DataTable(props) {
  const columns = React.useMemo(() => [...props.columns], [props.columns]);
  const data = props.data;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      selectedRowsChangeHandler({
        totalSelectedRows: Object.keys(selectedRowIds).length,
        selectedRows: selectedFlatRows.map((row) => {
          return {
            id: row.original.id,
            name: row.original.name ? row.original.name : row.original.title,
          };
        }),
      })
    );
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  return (
    <>
      <Table
        className={props.className}
        style={props.style}
        {...getTableProps}
        striped
        bordered
        hover
        size="sm"
      >
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    ))
                  }
                </tr>
              );
            })
          }
        </tbody>
      </Table>

      {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p> */}
    </>
  );
}

export const DataTableTotalSelectedRows = () => {
  const totalSelectedRows = useSelector(
    (state) => state.rootApp.dataTableSelectRows.totalSelectedRows
  );
  return (
    <div>
      <span>
        Selected rows: <strong>{totalSelectedRows}</strong>
      </span>
    </div>
  );
};

export const SimpleDataTable = (props) => {
  const columns = React.useMemo(() => [...props.columns], [props.columns]);
  const data = props.data;

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <Table
      className={props.className}
      style={props.style}
      {...getTableProps}
      striped
      bordered
      hover
      size="sm"
    >
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {
                        // Render the cell contents
                        cell.render("Cell")
                      }
                    </td>
                  ))
                }
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};
