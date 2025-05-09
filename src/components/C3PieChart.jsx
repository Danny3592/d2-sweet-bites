import PropTypes from 'prop-types';
import * as c3 from "c3";
import "c3/c3.css";
import { useEffect, useRef, memo } from "react"

function C3PieChart({ data }) {
  const chartRef = useRef(null);
  useEffect(() => {
    c3.generate({
      bindto: chartRef.current,
      data: {
        columns: data,
        type: "pie",
      },
    });
  }, [data])
  return (
    <div ref={chartRef} className="w-100"></div>
  )
}

export default memo(C3PieChart);
C3PieChart.propTypes = {
  data: PropTypes.array
}