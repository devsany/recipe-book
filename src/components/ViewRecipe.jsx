// import { useEffect, useState } from "react";
// import app from "../firebaseSetup/firebaseConfig";
// import { ref, get, getDatabase } from "firebase/database";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // State to manage errors

//   const fetchUsers = async () => {
//     try {
//       const db = getDatabase(app);
//       const usersRef = ref(db, "data / users /"); // Reference to users path
//       const snapshot = await get(usersRef); // Fetch data

//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const fetchedUsers = Object.entries(data).map(([id, user]) => ({
//           id,
//           ...user,
//         }));

//         setUsers(fetchedUsers); // Update state with fetched users
//       }
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError(err.message); // Capture any errors
//     } finally {
//       setLoading(false); // Set loading to false after fetching
//     }
//   };
//   console.log(users.map((item) => item.id));
//   console.log(users);

//   useEffect(() => {
//     fetchUsers(); // Call the fetch function on mount
//   }, []);

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p>Error: {error}</p>; // Display error if any

//   return (
//     <div>
//       <h1>User List</h1>
//       <ul>
//         {users.map((recipe) => (
//           <li key={recipe.id}>
//             <h2>{recipe.name}</h2>
//             <p>
//               <strong>Cooking Time:</strong> {recipe.cookingTime}
//             </p>
//             <p>
//               <strong>Cuisine:</strong> {recipe.cuisine}
//             </p>
//             <p>
//               <strong>Ingredients:</strong> {recipe.ingredients}
//             </p>
//             <p>
//               <strong>Instructions:</strong> {recipe.instructions}
//             </p>
//             <p>
//               <strong>Notes:</strong> {recipe.notes}
//             </p>
//             <p>
//               <strong>Preparation Time:</strong> {recipe.preparationTime}
//             </p>
//             <p>
//               <strong>Servings:</strong> {recipe.servings}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

// import React from 'react'

// const ViewRecipe = () => {
//   return (
//     <div>ViewRecipe</div>
//   )
// }

// export default ViewRecipe

import { useEffect, useState } from "react";
import app from "../firebaseSetup/firebaseConfig";

import { ref, get, getDatabase } from "firebase/database";

const ViewRecipe = () => {
  const [recipes, setRecipes] = useState([]); // State to hold recipe data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchRecipes = async () => {
    try {
      const db = getDatabase(app);
      const usersRef = ref(db, "data / users /"); // Reference to users path
      //   const usersRef = ref(db, "users"); // Reference to the users path
      const snapshot = await get(usersRef); // Fetch data

      //       const snapshot = await get(usersRef); // Fetch data

      //       if (snapshot.exists()) {
      //         const data = snapshot.val();
      //         const fetchedUsers = Object.entries(data).map(([id, user]) => ({
      //           id,
      //           ...user,
      //         }));

      //         setUsers(fetchedUsers); // Update state with fetched users
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const allRecipes = []; // To hold all recipes across users

        // Iterate through users and their recipes
        Object.entries(usersData).forEach(([userId, userRecipes]) => {
          Object.entries(userRecipes).forEach(([recipeId, recipe]) => {
            allRecipes.push({
              name: recipe.name,
              servings: recipe.servings,
              cookingTime: recipe.cookingTime,
              cuisine: recipe.cuisine,
              ingredients: recipe.ingredients,
              instructions: recipe.instructions,
              notes: recipe.notes,
              preparationTime: recipe.preparationTime,
            });
          });
        });

        setRecipes(allRecipes); // Update state with fetched recipes
      } else {
        console.log("No users found");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError(err.message); // Capture any errors
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchRecipes(); // Call the fetch function on mount
  }, []);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>; // Display error if any

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((item, index) => {
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
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default ViewRecipe;
