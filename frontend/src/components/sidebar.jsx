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

  return (
    <div
      className={`
  transition-all duration-300 ease-out
  p-4 mx-3 relative mt-5 rounded shadow border shadow-gray-600
  ${
    visiblity
      ? "opacity-100 translate-x-0 scale-100 "
      : "opacity-0 h-0 p-0 m-0 w-auto border-0 pointer-events-none overflow-hidden -translate-x-full"
  }
`}
    >
      <span
        className={`absolute -top-3 left-1 bg-white text-sm font-medium text-gray-600`}
      >
        Overview
      </span>
      <div className={`pb-3 border-b border-gray-200 lg:transform `}>
        <img
          src={computer}
          alt="computer"
          className={`w-full h-24 object-contain opacity-80 rounded-lg border border-gray-200 shadow-sm `}
        />
      </div>
      <div className={`mt-6 flex flex-col space-y-4 text-sm text-gray-700`}>
        {/* Battery usage with meter */}
        <div className={`flex flex-col `}>
          <label htmlFor="battery" className="flex items-center space-x-2">
            <span>🔋</span>
            <span className="font-medium">Battery</span>
          </label>
          <meter
            id="battery"
            className="w-full h-4"
            value={parseInt(battery?.percent) ?? 0}
            min="0"
            max="100"
          >
            {parseInt(battery?.percent) ?? 0} out of {100}
          </meter>
          <span className="text-xs text-gray-500 ">
            {battery?.plugged_in ? "charging" : batteryLife}
          </span>
        </div>
        {/* meter for memories */}
        <div className={`flex flex-col space-y-4 text-sm text-gray-700 `}>
          <label htmlFor="memory" className="flex items-center space-x-2 ">
            <span>🧠</span>
            <span className="font-medium">Memory Usage</span>
          </label>
          <meter
            id="memory"
            className="meter-base"
            value={parseInt(memory?.RAM?.percent) ?? 0}
            min="0"
            max="100"
          >
            {parseInt(memory?.RAM?.percent) ?? 0}%
          </meter>
          <span className="text-xs text-gray-500">
            {parseInt(memory?.RAM?.percent) ?? 0}%
          </span>
        </div>
        <div
          className={`flex flex-col space-y-4 text-sm text-gray-700 lg:transform`}
        >
          <label htmlFor="memory" className="flex items-center space-x-2">
            <span>♻️</span>
            <span className="font-medium">Swap</span>
          </label>
          <meter
            id="memory"
            className="meter-base"
            value={parseInt(memory?.Swap?.percent) ?? 0}
            min="0"
            max="100"
          >
            {parseInt(memory?.Swap?.percent) ?? 0}%
          </meter>
          <span className="text-xs text-gray-500">
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
