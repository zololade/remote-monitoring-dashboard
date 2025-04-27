import { useState, useEffect, useRef } from "react";
import "../index.css";
import SideBar from "./sidebar";
import CenterPage from "./centerpage";
import Hamburger from "./hamburger";

function WebSocketChat() {
  const connetion = useRef(null);
  const [returnData, setReturnData] = useState("");
  const [open, setOpen] = useState(true);
  const user = returnData?.user;
  const user_capitalized = user?.charAt(0).toUpperCase() + user?.slice(1);

  useEffect(() => {
    connetion.current = new WebSocket("ws://127.0.0.1:8000/ws");
    const socket = connetion.current;

    socket.addEventListener("open", () => console.log("Connected!"));
    socket.addEventListener("message", (e) => {
      setReturnData(JSON.parse(e.data));
    });
    socket.addEventListener("error", (e) => console.error("Oops:", e));
    connetion.current.addEventListener("close", (e) =>
      console.log("Closed:", e.code)
    );

    return () => {
      socket.close(1000, "Bye!");
    };
  }, []);
  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div className="min-h-screen pt-5 pb-5 flex flex-col">
      <div className="flex flex-row justify-between p-4 max-w-full mx-3 border rounded shadow shadow-gray-600 relative">
        <span className="absolute -top-3 left-3 bg-white text-sm font-medium text-gray-600">
          Computer Dashboard
        </span>
        <h1 className="truncate">
          {user_capitalized || `Loading...`}'s Computer
        </h1>
        <Hamburger passClick={{ handleClick, open }} />
      </div>
      <section
        className={`overflow-hidden grid grid-cols-1 min-w-full min-h-full transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr_0px]" : "grid-rows-[0px_1fr]"
        }
    lg:grid-rows-1    
    ${open ? "lg:grid-cols-[25rem_1fr]" : "lg:grid-cols-[0px_1fr]"}`}
      >
        <SideBar info={returnData} visiblity={open} />
        <CenterPage info={returnData} visiblity={open} />
      </section>
    </div>
  );
}

export default WebSocketChat;
