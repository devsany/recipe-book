import { useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { useUser } from "@clerk/clerk-react";
import Home from "./components/Home";
import WriteRecipe from "./components/WriteRecipe";
import ViewRecipe from "./components/ViewRecipe";
import Dashboard from "./components/Dashboard";

function App() {
  const [toggleNav, setToggleNav] = useState(false);
  const handleToggle = () => {
    setToggleNav(!toggleNav);
  };
  const handleNavDis = () => {
    setToggleNav(false);
  };
  const { user } = useUser();
  return (
    <>
      <div>
        <BrowserRouter>
          <div className={`md:border  md:h-[80px] grid md:grid-cols-2 gap-8`}>
            <div>
              <div className="grid grid-cols-2 ">
                <div className="p-2">
                  <img
                    className="w-[90px] shadow-sm md:w-[100px]"
                    src="recbook_logo_main.png"
                    alt="logo"
                  />
                </div>
                <div className="md:hidden m-6 flex justify-end block float-end">
                  {toggleNav ? (
                    <img
                      onClick={handleToggle}
                      className="h-[20px] "
                      src="close.png"
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={handleToggle}
                      className="h-[20px] "
                      src="burger-bar (1).png"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div>
                {toggleNav ? (
                  <div className="grid   first-line: bg-slate-500  m-4 rounded-lg md:hidden md:grid-cols-4 md:gap-2 border">
                    <NavLink onClick={handleNavDis} className=" " to="/">
                      <div className=" w-[100%] text-center  text-white   p-[1.2em]">
                        Home
                      </div>
                    </NavLink>
                    <div>
                      <NavLink onClick={handleNavDis} to="View_recipe_book">
                        <div className=" w-[100%] text-center text-white    p-[1.2em]">
                          View Recipe
                        </div>
                      </NavLink>
                    </div>
                    <div>
                      {/* <NavLink onClick={handleNavDis} to="product_page">
                        <div className=" w-[100%] text-center  text-white  p-[1.2em]">
                          Product Page
                        </div>
                      </NavLink> */}
                    </div>
                    <div className=" ">
                      <NavLink onClick={handleNavDis} to="/write_recipe_book">
                        <div className=" w-[100%] text-center  text-white  p-[1.2em]">
                          Add Recipe
                        </div>
                      </NavLink>
                    </div>
                    {user ? (
                      <div>
                        <NavLink className="text-slate-900" to="/dashboard">
                          <div className=" w-[100%] text-center  text-white  p-[1.2em]">
                            Dashboard
                          </div>
                        </NavLink>
                      </div>
                    ) : null}
                    <div className="flex justify-center">
                      <SignedOut>
                        <SignInButton className="" />
                      </SignedOut>
                      <SignedIn>
                        <UserButton className="pb-4" />
                      </SignedIn>
                    </div>
                    <div>
                      <div className="text-sm text-center pr-2 text-slate-900">
                        {" "}
                        {user ? (
                          <h2>
                            Welcome, {user.firstName} {user.lastName}
                          </h2>
                        ) : (
                          <span className="text-sm text-center pr-2 text-slate-900">
                            Hii,
                            <br /> Guest
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className=" text-black h-[50px ] text-center items-center  hidden md:grid md:grid-cols-6 md:gap-2  ">
              <div className="  text-center ">
                <NavLink className="text-slate-900" to="/">
                  Home
                </NavLink>
              </div>
              <div>
                <NavLink className="text-slate-900" to="View_recipe_book">
                  View Recipe
                </NavLink>
              </div>
              {/* <div>
                <NavLink className="text-slate-900" to="product_page">
                  Product
                </NavLink>
              </div> */}
              <div>
                <NavLink className="text-slate-900" to="/write_recipe_book">
                  Add Recipe
                </NavLink>
              </div>
              {user ? (
                <div>
                  <NavLink className="text-slate-900" to="/dashboard">
                    Dashboard
                  </NavLink>
                </div>
              ) : null}
              <div className="pt-1 float-end">
                <SignedOut>
                  <SignInButton className="pl-2 pr-2 pt-1 pb-1" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
              <div>
                <div className="text-sm pr-2 text-slate-500">
                  {" "}
                  {user ? (
                    <h2>
                      Welcome, {user.firstName} {user.lastName}
                    </h2>
                  ) : (
                    <span className="text-sm text-center pr-2 text-slate-900">
                      Hii,
                      <br /> Guest
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* nav route */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write_recipe_book" element={<WriteRecipe />} />
            <Route path="/View_recipe_book" element={<ViewRecipe />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
