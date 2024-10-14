import { useUser } from "@clerk/clerk-react";
import app from "../firebaseSetup/firebaseConfig";
import { ref, get, getDatabase } from "firebase/database";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { isLoaded, user } = useUser();
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, "data / users /" + `${user.id}`);
    const snapshot = await get(dataRef);
    console.log(snapshot);
    if (snapshot.exists()) {
      setData(Object.values(snapshot.val()));
    } else {
      alert("data is not found");
    }
  };
  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2 className="p-2 m-2 text-3xl bold text-gray-700 border-l-4 border-green-500">
        Dashboard
      </h2>

      <div>
        {filteredItems ? (
          <>
            <div>
              <div className="shadow-lg ml-10 w-[300px] rounded-md font-mono text-md h-[90px] p-2">
                <div>
                  {/* <label htmlFor="names">Name</label> */}
                  <label htmlFor="names">Enter Recipe Name</label>
                  <input
                    className="border w-[100%] shadow-sm rounded-sm pl-1"
                    id="names"
                    type="text"
                    placeholder="enter recipe name"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                  />
                  <div className="text-green-500"> Search</div>
                </div>
              </div>
            </div>
            <div>
              {filteredItems &&
                filteredItems.reverse().map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="rounded-lg shadow-lg p-3 grid md:grid-cols-10 lg:grid-cols-10 border m-10"
                      >
                        <div className="col-span-9">
                          <div>
                            <div>
                              <div>
                                <div className="text-sm text-gray-500">
                                  Date :- {item.date}
                                </div>
                                <span className="text-3xl font-bold text-stone-700">
                                  {item.name}{" "}
                                </span>
                                <span className="text-2xl text-gray-400 pl-1 pr-1">
                                  /
                                </span>{" "}
                                <span className="text-sm text-gray-500">
                                  {item.cuisine}
                                </span>
                                <span className="text-2xl text-gray-400  pl-1 pr-1">
                                  /
                                </span>{" "}
                                <span className="text-sm text-gray-500">
                                  {item.servings} Servings
                                </span>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">
                                  Cooking Time :{" "}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {item.cookingTime}
                                </span>
                                <span className="text-2xl text-gray-400 pl-1 pr-1">
                                  |{" "}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Preparation Time :{" "}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {item.preparationTime}
                                </span>
                              </div>
                              <div>
                                <div>
                                  <div className="text-2xl font-bold text-stone-700">
                                    Ingredients
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.ingredients}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <div className="text-2xl font-bold text-stone-700">
                                    Instruction
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {item.instructions}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div>
                                  <label
                                    className="text-2xl font-bold text-stone-700"
                                    htmlFor="notes"
                                  >
                                    Note:
                                  </label>
                                  <div className="text-sm text-gray-500">
                                    {item.notes}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button>Edit</button>
                          <br />
                          <button>Delete</button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            <div>First Add the Recipe</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
