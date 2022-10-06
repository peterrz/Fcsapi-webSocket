import CardTable from "../../components/card/index";
import { useSelector } from "react-redux";
import {
  selectForexTable,
  selectExchange2Table,
  selectExchange1Table,
} from "../../features/websocket/socketSlice";

export default function Index(props) {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex-col w-10/12  justify-between items-center">
          <CardTable title={"Forex"} data={useSelector(selectForexTable)} />
          <CardTable
            title={"Crypto Currency Exchange 1"}
            data={useSelector(selectExchange1Table)}
          />
          <CardTable
            title={"Crypto Exchange 2"}
            data={useSelector(selectExchange2Table)}
          />
        </div>
      </div>
    </>
  );
}
