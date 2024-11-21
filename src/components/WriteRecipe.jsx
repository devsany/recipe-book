import { Button } from "../../components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import app from "../firebaseSetup/firebaseConfig";

import { ref, set, push, getDatabase } from "firebase/database";

// akdfhakdf

// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

const WriteRecipe = () => {
  const { isLoaded, user } = useUser();
  //   console.log(user.firstName);
  //   console.log(user.lastName);
  //   console.log(user.emailAddresses[0].emailAddress);
  const [fname] = useState(user?.firstName);
  const [lname] = useState(user?.lastName);
  const [email] = useState(user?.emailAddresses[0].emailAddress);
  const currentDate = new Date();

  const [recipe, setRecipe] = useState({
    names: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    preparationTime: "",
    servings: "",
    cuisine: "",
    notes: "",
    fname: fname,
    lname: lname,
    email: email,
    date: currentDate.toLocaleDateString(),
  });
  const [error, setError] = useState({});
  // const [open, setOpen] = useState(false);
  //   const isDesktop = useMediaQuery("(min-width: 768px)");
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
    if (!recipe.names) {
      error.names = "require";
    } else if (!recipe.ingredients) {
      error.ingredients = "require";
    } else if (!recipe.instructions) {
      error.instructions = "require";
    } else {
      const db = getDatabase(app);
      const newDocRecipe = push(ref(db, "data / users /" + `${user.id}`));
      set(newDocRecipe, {
        name: recipe.names,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        cookingTime: recipe.cookingTime,
        preparationTime: recipe.preparationTime,
        servings: recipe.servings,
        cuisine: recipe.cuisine,
        notes: recipe.notes,
        fname: recipe.fname,
        lname: recipe.lname,
        email: recipe.email,
        date: recipe.date,
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
        <h2 className="p-2 m-2 text-3xl bold text-gray-700 border-l-4 border-green-500">
          Add Recipe
        </h2>
      </div>
      <div>
        {user ? (
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-8 lg:p-10 sm:p-8 p-6 md:p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  <div className="shadow-lg rounded-md font-mono text-md h-[90px] p-2">
                    <div>
                      {/* <label htmlFor="names">Name</label> */}
                      <label htmlFor="names">Name of Recipe</label>
                      <input
                        className="border w-[100%] shadow-sm rounded-sm pl-1"
                        id="names"
                        type="text"
                        name="names"
                        placeholder="Recipe Name *"
                        value={recipe.names}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-red-500">
                      {" "}
                      {error && <div>{error.names}</div>}
                    </div>
                  </div>

                  <div className="shadow-lg rounded-md font-mono text-md h-[90px] p-2">
                    <div>
                      <label htmlFor="cookingTime">Cooking Time</label>
                    </div>
                    <div>
                      {" "}
                      <input
                        className="border w-[100%] shadow-sm rounded-sm pl-1"
                        id="cookingTime"
                        type="text"
                        name="cookingTime"
                        placeholder="Cooking Time"
                        onChange={handleChange}
                        value={recipe.cookingTime}
                      />
                    </div>
                  </div>
                  <div className="shadow-lg rounded-md font-mono text-md h-[90px] p-2">
                    <div>
                      <label htmlFor="preparationTime">Preparation Time</label>
                    </div>
                    <div>
                      <input
                        className="border w-[100%] shadow-sm rounded-sm pl-1"
                        id="preparationTime"
                        type="text"
                        name="preparationTime"
                        placeholder="Preparation Time"
                        onChange={handleChange}
                        value={recipe.preparationTime}
                      />
                    </div>
                  </div>
                  <div className="shadow-lg rounded-md font-mono text-md h-[90px] p-2">
                    <div>
                      <label htmlFor="servings">Servings</label>
                    </div>
                    <div>
                      {" "}
                      <input
                        className="border w-[100%] shadow-sm rounded-sm pl-1"
                        type="number"
                        name="servings"
                        placeholder="Number of Servings"
                        onChange={handleChange}
                        value={recipe.servings}
                      />
                    </div>
                  </div>
                  <div className="shadow-lg rounded-md font-mono text-md h-[90px] p-2">
                    <div>
                      <label htmlFor="cuisine">Cuisine</label>
                    </div>
                    <div>
                      {" "}
                      <select
                        className="border w-[100%] shadow-sm rounded-sm pl-1"
                        name="cuisine"
                        value={recipe.cuisine}
                        onChange={handleChange}
                      >
                        <option value="">Select Cuisine</option>
                        <option value="Indian">India</option>
                        <option value="Japanise">Japanise</option>
                        <option value="USA">USA</option>
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        {/* Add more options */}
                      </select>
                    </div>
                  </div>

                  {/* Checkbox for dietary preferences, file input for image, etc. */}
                </div>
                <div className="grid grid-cols-1 gap-8 pl-6 sm:pl-6 md:pl-10 pr-10 pb-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  <div className="rounded-md font-mono text-md  ">
                    <div>
                      <label htmlFor="ingredients">Ingredients</label>
                    </div>
                    <div>
                      {" "}
                      <textarea
                        className="shadow-lg border  rounded-md"
                        id="ingredients"
                        name="ingredients"
                        placeholder="Ingredients *"
                        rows={8}
                        cols={45}
                        onChange={handleChange}
                        value={recipe.ingredients}
                      />
                    </div>
                    <div>
                      {error && (
                        <div className="text-red-500">{error.ingredients}</div>
                      )}
                    </div>
                  </div>
                  <div className=" rounded-md font-mono text-md  ">
                    <div>
                      <label htmlFor="instructions">Instructions</label>
                    </div>
                    <div>
                      {" "}
                      <textarea
                        className="shadow-lg border rounded-md"
                        id="instructions"
                        name="instructions"
                        placeholder="Instructions *"
                        rows={8}
                        cols={45}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      {" "}
                      {error && (
                        <div className="text-red-500">{error.instructions}</div>
                      )}
                    </div>
                  </div>
                  <div className="rounded-md font-mono text-md   sm:col-span-1 ">
                    <div>
                      <label htmlFor="notes">Notes</label>
                    </div>
                    <div>
                      <textarea
                        className="shadow-lg border rounded-md"
                        name="notes"
                        placeholder="Additional Notes"
                        rows={8}
                        cols={40}
                        onChange={handleChange}
                        value={recipe.notes}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {/* <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you
                          done.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog> */}
                </div>
                <div className="flex justify-end">
                  <Button className="mr-8 bg-green-200 border " type="submit">
                    Add Recipe
                  </Button>
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
                    className="border   mt-4 md:mt-5 hover:border-yellow-500 border-pink-300 shadow-md shadow-yellow-100"
                  >
                    <NavLink to="https://loyal-weevil-7.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A5174%2F">
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
