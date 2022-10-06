import { useState } from "react";
import {
  useTable,
  useSortBy,
  useResizeColumns,
  usePagination,
  useRowSelect,
} from "react-table";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as More } from "../../assets/img/more.svg";
import moment from "moment";

// components
const Table = (props) => {
  const Responsive = useMediaQuery({ minWidth: 768 });

  const [mobileColumn, setMobileColumn] = useState(
    props.columns.length > 3 ? props.columns.slice(0, 2) : props.columns
  );
  const tableInstance = useTable(
    {
      columns: Responsive ? props.columns : mobileColumn,
      data: props.data,
      initialState: props.initialState,
    },

    useSortBy,
    useResizeColumns,
    usePagination,
    useRowSelect
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    tableInstance;

  const [tempFilter, setTempFilter] = useState([]);
  const [modal, setModal] = useState(false);

  const OpenModal = () => {
    setTempFilter(mobileColumn);
    setModal(true);
  };

  const handleChange = (item) => {
    if (tempFilter.includes(item)) {
      setTempFilter(tempFilter.filter((oldItem) => oldItem !== item));
    } else setTempFilter((prevArray) => [...prevArray, item]);
  };

  const updateFilter = () => {
    setMobileColumn(tempFilter);
    setModal(false);
  };

  return (
    <>
      <table {...getTableProps()} className="min-w-full ">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-primary table-row "
            >
              {headerGroup.headers.map((column, i) => (
                <th
                  key={"header" + column}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`py-4 text-md text-white px-6  ${
                    column.center ? "text-center" : "text-left"
                  }`}
                  style={{
                    minWidth: `${
                      column.minWidth ? column.minWidth : "min-content"
                    }`,
                  }}
                >
                  {column.render("Header")}
                  <i
                    className={`fas text-white  ml-2 ${
                      column.isSortedDesc ? "fa-sort-down" : "fa-sort-up"
                    }`}
                  />
                </th>
              ))}
              {!Responsive && (
                <td>
                  <More onClick={() => OpenModal()} />
                </td>
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            if (props.hasBackground) {
              console.log(row.original.background_percent);
            }
            return (
              <tr
                key={"body" + row}
                {...row.getRowProps()}
                className={`${
                  props.noBorder ? "border-0" : "border-b-2"
                }  hover:bg-gray-700  hover:text-white`}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      key={"body" + cell}
                      {...cell.getCellProps()}
                      className={`px-6 py-3 text-sm  ${
                        cell.column.center ? "text-center" : ""
                      }`}
                      style={{
                        minWidth: `${
                          cell.column.minWidth ? cell.column.minWidth : "140px"
                        } `,
                      }}
                    >
                      {cell.column.Header === "Time"
                        ? moment(cell.column.value).format("LTS")
                        : cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {modal && !Responsive && (
        <>
          <div className="justify-center  items-end flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-0 mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 rounded-t-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-8 pt-8">
                  <h3 className="text-m font-bold "> Title</h3>
                </div>
                {/*body*/}
                <div className="relative p-8 flex-auto">
                  {props.columns &&
                    props.columns.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-start justify-between border-b py-4 border-solid border-slate-200"
                        >
                          <p className="text-Light-title  font-semibold">
                            {item.Header}
                          </p>
                          <input
                            id="i"
                            type="checkbox"
                            checked={tempFilter.includes(item)}
                            onChange={() => handleChange(item)}
                            className="form-checkbox border-1 border-coolGray-200 rounded  ml-1 w-5 h-5  ease-linear transition-all  duration-150"
                          />
                        </div>
                      );
                    })}
                </div>
                {/*footer*/}
                <div className="flex items-center gap-5  justify-between w-full p-8  ">
                  <button
                    className="text-Light-title  bg-[#F8F9FE] font-semibold w-6/12 uppercase px-6  py-5 rounded-lg text-sm outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary text-white   active:bg-primary w-6/12  uppercase text-sm px-6 py-5 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      updateFilter();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25  fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default Table;
