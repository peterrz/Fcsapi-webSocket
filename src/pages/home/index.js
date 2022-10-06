import { useState } from "react";
import CardTable from "../../components/card/index";
import { useSelector, useDispatch } from "react-redux";
import {
  selectForexTable,
  selectExchange2Table,
  selectExchange1Table,
  Updated,
} from "../../features/websocket/socketSlice";
import useSocket from "use-socket.io-client";
const api_key = "API_KEY"; // Enter Your API KEY
const currency_ids = "1,1984,80,81,7774,7778"; // Your FX currency multiple IDs

export default function Index(props) {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const [socket] = useSocket("wss://fcsapi.com", {
    withCredentials: true,
    extraHeaders: {
      "Access-Control-Allow-Credentials": "*",
    },
    transports: ["websocket"],
    path: "/v3/",
  });

  const SendRequest = () => {
    setDisable(true);
    socket.connect();
    socket.on("message", (text) => {
      console.log(text);
    });

    //emit
    socket.emit("message", "this is demo..");

    // Verify Your API key on server
    socket.emit("heartbeat", api_key);

    // Connect Ids on server
    socket.emit("real_time_join", currency_ids);

    socket.on("data_received", function (data) {
      // always receive latest price here in "data" variable
      // data contain : Price, ASK price, BID price
      dispatch(Updated(data));
    });
    socket.on("message", (message) => {
      console.log(message);
    });
    socket.on("connect_error", (message) => {
      console.log(message);
      setDisable(false);
    });
  };

  function Disconnect() {
    if (socket !== undefined && !socket.disconnected) {
      socket.disconnect();
      socket.destroy();
      setDisable(false);
    }
  }

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex-col w-10/12  justify-between items-center">
          <div className="flex justify-center gap-10 items-center mt-10">
            <button
              className="btn bg-primary p-5 text-white rounded"
              disabled={disable}
              onClick={() => SendRequest()}
            >
              Start the connection
            </button>
            <button
              className="btn bg-primary p-5 text-white rounded"
              onClick={() => Disconnect()}
            >
              close the connection
            </button>
          </div>
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
