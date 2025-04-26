import "../index.css";
import CenterTemp from "./centerData/computerData";
import PropTypes from "prop-types";

export default function CenterPage({ info, visiblity }) {
  return (
    <div
      className={`lg:opacity-100 p-4 mt-5 overflow-auto transition-all duration-300 ease-in ${
        visiblity ? "opacity-0 " : "opacity-100"
      }`}
    >
      <CenterTemp props={info} />
    </div>
  );
}

CenterPage.propTypes = {
  info: PropTypes.object.isRequired,
  visiblity: PropTypes.bool.isRequired,
};
