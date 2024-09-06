import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeveloperId() {
  const router = useRouter();
  const {devId} = router.query;
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (devId === "1") {
      setDetails([{ id: 1, name: "Yash", role: "Senior Developer " }]);
    } else if (devId === "2") {
      setDetails([{ id: 2, name: "Lokesh ", role: "Frontend Developer" }]);
    } else if (devId === "3") {
      setDetails([{ id: 3, name: "Suresh", role: "Backend Developer" }]);
    } else {
      setDetails([]);
    }
  }, [devId]);

  if (details.length === 0)
    return (
      <>
        <p>NOT FOUND</p>
      </>
    );
  return (
    <>
      {details.map((item) => (
        <div key={item.id}>
          {" "}
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.role}</p>
        </div>
      ))}
    </>
  );
}
