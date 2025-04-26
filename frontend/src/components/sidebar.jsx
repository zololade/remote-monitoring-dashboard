import "../index.css";
import PropTypes from "prop-types";
import computer from "../assets/desktop/7922058.jpg";

export default function SideBar({ visiblity, info }) {
  const { battery, memory } = info;

  function convertSeconds(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours} h ${minutes} min ${seconds} sec`;
  }

  const batteryLife = convertSeconds(parseInt(battery?.time_left) || 0);
  const ram = `${parseInt(memory?.RAM?.percent)}%`;
  const swap = `${parseInt(memory?.Swap?.percent)}%`;

  return (
    <div
      className={`
  transition-all duration-300 ease-out
  p-4 mx-3 relative mt-5 rounded shadow border shadow-gray-600
  ${
    visiblity
      ? "opacity-100 translate-x-0 scale-100"
      : "opacity-0 scale-95 pointer-events-none overflow-x-scroll scrollbar-none -translate-x-full"
  }
`}
    >
      <span
        className={`absolute -top-3 left-1 bg-white text-sm font-medium text-gray-600 transition-all duration-300 ease-out`}
      >
        Overview
      </span>
      <div
        className={`pb-3 border-b border-gray-200 transition-all duration-300 ease-out`}
      >
        <img
          src={computer}
          alt="computer"
          className={`w-full h-24 object-contain opacity-80 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 ease-out`}
        />
      </div>
      <div
        className={`mt-6 flex flex-col text-sm text-gray-700 transition-all duration-300 ease-out`}
      >
        {/* Battery usage with meter */}
        <div
          className={`flex flex-col mb-2 transition-all duration-300 ease-out`}
        >
          <label
            htmlFor="battery"
            className="flex items-center space-x-2 transition-all duration-300 ease-out"
          >
            <span>🔋</span>
            <span className="font-medium transition-all duration-300 ease-out truncate">
              Battery
            </span>
          </label>
          <div
            id="battery"
            className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-2 transition-all duration-300 ease-out"
          >
            <div
              className="bg-black/80 h-2 rounded-full"
              style={{ width: battery?.percent || "0" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 transition-all duration-300 ease-out truncate">
            {battery?.plugged_in ? "charging" : batteryLife}
          </span>
        </div>
        {/* meter for memories */}
        <div
          className={`flex flex-col text-sm mb-2 text-gray-700 transition-all duration-300 ease-out`}
        >
          <label
            htmlFor="memory"
            className="flex items-center space-x-2 transition-all duration-300 ease-out"
          >
            <span>🧠</span>
            <span className="font-medium transition-all duration-300 ease-out truncate">
              Memory Usage
            </span>
          </label>
          <div
            id="memory"
            className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-2 transition-all duration-300 ease-out"
          >
            <div
              className="bg-black/80 h-2 rounded-full"
              style={{ width: ram || "0" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 transition-all duration-300 ease-out truncate">
            {parseInt(memory?.RAM?.percent) ?? 0}%
          </span>
        </div>
        <div
          className={`flex flex-col text-sm mb-2 text-gray-700 transition-all duration-300 ease-out`}
        >
          <label
            htmlFor="memory"
            className="flex items-center space-x-2 transition-all duration-300 ease-out"
          >
            <span>♻️</span>
            <span className="font-medium transition-all duration-300 ease-out truncate">
              Swap
            </span>
          </label>
          <div
            id="memory"
            className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-2 transition-all duration-300 ease-out"
          >
            <div
              className="bg-black/80 h-2 rounded-full"
              style={{ width: swap || "0" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 transition-all duration-300 ease-out truncate">
            {parseInt(memory?.Swap?.percent) ?? 0}%
          </span>
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  visiblity: PropTypes.bool.isRequired,
  info: PropTypes.object.isRequired,
};
