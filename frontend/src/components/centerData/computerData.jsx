import PropTypes from "prop-types";

export default function CenterTemp(props) {
  if (
    !props?.props?.battery ||
    !props?.props?.memory ||
    !props?.props?.disk ||
    !props?.props?.user
  )
    return <div>Loading...</div>;

  const { battery, memory } = props.props;
  const { percent, plugged_in, time_left } = battery;

  const { RAM, Swap } = memory;

  return (
    <div className="">
      <div>
        <span>{`Battery percentage:${parseInt(percent)}  ${
          plugged_in ? "plugged in" : "discharging"
        } ${plugged_in ? "" : "Time left:" + time_left}`}</span>
        <br />
        <span>{`${RAM.total}, ${RAM.used}, ${parseInt(RAM.percent)}`}</span>
        <br />
        <span>{`${Swap.total}, ${Swap.used}, ${parseInt(Swap.percent)}`}</span>
        <br />
        <span></span>
      </div>
    </div>
  );
}

CenterTemp.propTypes = {
  props: PropTypes.shape({
    battery: PropTypes.object.isRequired,
    memory: PropTypes.object.isRequired,
    disk: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
};
