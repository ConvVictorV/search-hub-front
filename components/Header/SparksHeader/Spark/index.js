import { useEffect, useState } from "react";

export default function Spark(args) {
  args = args.data;
  const [data, setData] = useState(undefined);

  let haveData = false;
  if (args) haveData = true;

  useEffect(() => {
    setData(args);
  }, [haveData]);
  return <></>;
}
