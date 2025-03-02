import { useEffect, useRef, memo } from "react"
import * as c3 from "c3";
import "c3/c3.css";

export default memo(function C3PieChart({ data }) {
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
});
