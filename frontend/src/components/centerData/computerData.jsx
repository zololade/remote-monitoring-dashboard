import PropTypes from "prop-types";
import {
  RamSwapAreaChart,
  BatteryGauge,
  DiskDonutChart,
  SwapProgress,
} from "./chart";
import { useState } from "react";

export default function CenterTemp(props) {
  const [stats, setStats] = useState({
    memUsed: 10,
    memFree: 30,
    swapUsed: 500,
  });
  if (
    !props?.props?.battery ||
    !props?.props?.memory ||
    !props?.props?.disk ||
    !props?.props?.user ||
    !props?.props?.memory_history
  )
    return <div>Loading...</div>;

  const { battery, memory, disk, memory_history } = props.props;
  const { percent } = battery;
  const { Swap } = memory;

  return (
    <div className="grid">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <BatteryGauge value={parseInt(percent)} />
        <DiskDonutChart used={disk.used} total={disk.total} />
        <RamSwapAreaChart
          ramHistory={memory_history.ramHistory}
          swapHistory={memory_history.swapHistory}
          labels={memory_history.timeLabels}
        />
        <SwapProgress percent={Swap.percent} />
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
    memory_history: PropTypes.object.isRequired,
  }).isRequired,
};
