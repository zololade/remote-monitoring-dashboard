import "../index.css";
import PropTypes from "prop-types";
export default function Hamburger(props) {
  const { handleClick, open } = props.passClick;

  return (
    <button
      className="group flex flex-col items-center justify-center w-10 h-10 space-y-1 border rounded shadow shadow-gray-600"
      onClick={handleClick}
    >
      <span
        className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
          open ? "-rotate-45 -translate-y-2" : ""
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
