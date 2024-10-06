import { useUser } from "@clerk/clerk-react";
import app from "../firebaseSetup/firebaseConfig";
import { ref, get, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { isLoaded, user } = useUser();

  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, `${user.firstName}` + "/recipe");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));
    } else {
      alert("data is not found");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      Dashboard
      <div>
        {data &&
          data.map((item,index) => {
            return (
              <>
                <div></div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
