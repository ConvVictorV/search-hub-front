import { useEffect, useState } from "react";
import styles from "../../../styles/SparkHeader.module.css";
import Spark from "./Spark";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};
export default function SparkHeader() {
  const [errorSpark, setErrorSpark] = useState({});
  const [warningSpark, setWarningSpark] = useState({});
  const [adviceSpark, setAdviceSpark] = useState({});

  useEffect(() => {
    setErrorSpark(data);
    setWarningSpark(data);
    setAdviceSpark(data);
  });

  return (
    <div className={styles.sparkHeader}>
      <Spark data={errorSpark} />
      <Spark data={warningSpark} />
      <Spark data={adviceSpark} />
    </div>
  );
}
