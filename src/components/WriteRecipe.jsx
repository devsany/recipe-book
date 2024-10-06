import { Button } from "../../components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { ShoppingBag, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import app from "../firebaseSetup/firebaseConfig";

import { ref, set, push, getDatabase } from "firebase/database";

const WriteRecipe = () => {
  const { isLoaded, user } = useUser();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    preparationTime: "",
    servings: "",
    cuisine: "",
    notes: "",
  });
  const [error, setError] = useState({});
  //
  if (!isLoaded) {
    return (
      <div>
        <div className="flex h-[100vh] justify-center items-center">
          <h2 className="text-4xl pb-2  font-bold bg-gradient-to-r from-pink-500 to-yellow-600 bg-clip-text text-transparent scroll-m-30 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = {};
    if (!recipe.name) {
      error.name = "require";
    } else if (!recipe.ingredients) {
      error.ingredients = "require";
    } else if (!recipe.instructions) {
      error.instructions = "require";
    } else {
      const db = getDatabase(app);
      const newDocRecipe = push(ref(db, `${user.firstName}` + "/recipe"));
      set(newDocRecipe, {
        descriptionOfRecipe: input2,
      })
        .then(() => {
          alert("data saved successfully");
        })
        .catch((err) => {
          alert("error", err.message);
        });
    }
    setError(error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Submit logic here
  //     console.log(recipe);
  //   };
  return (
    <div>
      <div>
        {user ? (
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-8 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  <div className="border">
                    <div>
                      <label htmlFor="name"></label>
                      {error ? (
                        <div className="text-black">Name of Recipe</div>
                      ) : (
                        <div className="text-red-500">Name of Recipe</div>
                      )}

                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Recipe Name *"
                        value={recipe.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-red-500">
                      {" "}
                      {error && <div>{error.name}</div>}
                    </div>
                  </div>

                  <div>
                    <div>
                      <label htmlFor="cookingTime">Cooking Time</label>
                    </div>
                    <div>
                      {" "}
                      <input
                        id="cookingTime"
                        type="text"
                        name="cookingTime"
                        placeholder="Cooking Time"
                        onChange={handleChange}
                        value={recipe.cookingTime}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="preparationTime">Preparation Time</label>
                    </div>
                    <div>
                      <input
                        id="preparationTime"
                        type="text"
                        name="preparationTime"
                        placeholder="Preparation Time"
                        onChange={handleChange}
                        value={recipe.preparationTime}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="servings">Servings</label>
                    </div>
                    <div>
                      {" "}
                      <input
                        type="number"
                        name="servings"
                        placeholder="Number of Servings"
                        onChange={handleChange}
                        value={recipe.servings}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="cuisine">Cuisine</label>
                    </div>
                    <div>
                      {" "}
                      <select
                        name="cuisine"
                        value={recipe.cuisine}
                        onChange={handleChange}
                      >
                        <option value="">Select Cuisine</option>
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        {/* Add more options */}
                      </select>
                    </div>
                  </div>

                  {/* Checkbox for dietary preferences, file input for image, etc. */}
                </div>
                <div className="grid grid-cols-1 gap-8 pl-10 pr-10 pb-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  <div>
                    <div>
                      <label htmlFor="ingredients">Ingredients</label>
                    </div>
                    <div>
                      {" "}
                      <textarea
                        id="ingredients"
                        name="ingredients"
                        placeholder="Ingredients *"
                        rows={10}
                        cols={50}
                        onChange={handleChange}
                        value={recipe.ingredients}
                      />
                    </div>
                    <div>{error && <div>{error.ingredients}</div>}</div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="instructions">Instructions</label>
                    </div>
                    <div>
                      {" "}
                      <textarea
                        id="instructions"
                        name="instructions"
                        placeholder="Instructions *"
                        rows={10}
                        cols={50}
                        onChange={handleChange}
                      />
                    </div>
                    <div> {error && <div>{error.instructions}</div>}</div>
                  </div>
                  <div className=" sm:col-span-1 ">
                    <div>
                      <label htmlFor="notes">Notes</label>
                    </div>
                    <div>
                      <textarea
                        name="notes"
                        placeholder="Additional Notes"
                        rows={10}
                        cols={50}
                        onChange={handleChange}
                        value={recipe.notes}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Add Recipe</Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="h-[100vh] bg-gradient-to-t from-green-50 to-pink-100  ">
            <div className="md:grid h-[200px] md:pt-[120px]  md:grid-cols-2 ">
              <div className="p-[50px]  md:ml-[70px]   flex items-center ">
                <div>
                  <h2 className="text-4xl  p-1 font-bold bg-gradient-to-r from-pink-500 to-yellow-600 bg-clip-text text-transparent scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Gather Around Good Food!
                  </h2>

                  <Button
                    variant="secondary"
                    className="border mt-4 md:mt-5 hover:border-yellow-500 border-pink-300 shadow-md shadow-yellow-100"
                  >
                    <NavLink to="https://leading-wallaby-6.accounts.dev/sign-in#/?redirect_url=http%3A%2F%2Flocalhost%3A5174%2F">
                      <div className="flex">
                        <div className="text-pink-500">Get Started </div>
                        <div className="pt-[2px]">
                          <ShoppingBasket className="ml-2 text-pink-500 border-none h-4 w-4" />
                        </div>
                      </div>
                    </NavLink>
                  </Button>
                </div>
              </div>
              <div>
                <img src="write_logo.png" alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Your cart components go here */}
    </div>
  );
};

export default WriteRecipe;
