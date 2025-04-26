import "../index.css";
import PropTypes from "prop-types";
export default function Hamburger(props) {
  const { handleClick, open } = props.passClick;

  return (
    <button
      className="group flex flex-col items-center justify-center w-7 h-7 space-y-1 border rounded shadow shadow-gray-600"
      onClick={handleClick}
    >
      <span
        className={`w-4 h-0.5 bg-black transition-transform duration-300 ${
          open ? " translate-y-[0.378rem] rotate-45" : "translate-y-0.5"
        }`}
      />
      <span
        className={`w-3 h-0.5 bg-black transition-opacity duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`w-4 h-0.5 bg-black transition-transform duration-300 ${
          open ? " -translate-y-[0.378rem] -rotate-45" : "-translate-y-0.5"
        }`}
      />
    </button>
  );
}

Hamburger.propTypes = {
  passClick: PropTypes.shape({
    handleClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }).isRequired,
};
