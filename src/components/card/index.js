import { If, Then } from "react-if";
import Table from "../Table/Table";
import { ReactComponent as EmptyBox } from "../../assets/img/empty-box.svg";

export default function Index(props) {
  return (
    <>
      <div className="w-full  py-6">
        <div className="w-full px-1  mx-auto">
          <div className="w-full px-6 py-4   flex justify-center items-center">
            <h2 className="text-lg font-semibold">{props.title}</h2>
          </div>
          <div className="w-full flex flex-wrap  shadow-lg rounded-lg overflow-x-auto">
            <Table
              loading={true}
              data={props.data || []}
              columns={[
                {
                  Header: "Name",
                  accessor: "s",
                },

                {
                  Header: "Last Close",
                  accessor: "lc",
                },
                {
                  Header: "Current",
                  accessor: "c",
                },
                {
                  Header: "Ask",
                  accessor: "a",
                },
                {
                  Header: "Bid",
                  accessor: "b",
                },
                {
                  Header: "High",
                  accessor: "h",
                },
                {
                  Header: "Low",
                  accessor: "l",
                },
                {
                  Header: "Change",
                  accessor: "ch",
                },
                {
                  Header: "Change%",
                  accessor: "cp",
                },
                {
                  Header: "Volume",
                  accessor: "v",
                },
                {
                  Header: "Time",
                  accessor: "t",
                },
              ]}
            />
            <If condition={!props.data.length}>
              <Then>
                <div
                  className="flex justify-center items-center flex-col text-gray-500 grow"
                  style={{ height: "30vh" }}
                >
                  <EmptyBox />
                  <h1>Nothing to show</h1>
                </div>
              </Then>
            </If>
          </div>
        </div>
      </div>
    </>
  );
}
