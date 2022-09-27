import React, { useEffect, useState } from "react";
import {
  faHome,
  faHollyBerry,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Location, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isNavOpen, setisNavOpen] = useState(false);
  const [handleScroll, sethandleScroll] = useState<boolean>(true);
  const [widthScreen, setwidthScreen] = useState<number>(window.screen.width);
  const location: Location = useLocation();

  useEffect(() => {
    setisNavOpen(false);
  }, [location]);

  var oldScrollY: number = window.scrollY;
  window.onscroll = function (e: any) {
    if (window.scrollY < oldScrollY) {
      sethandleScroll(true);
      console.log("up");
    } else if (window.scrollY === 0) {
      sethandleScroll(true);
    } else {
      sethandleScroll(false);
      setisNavOpen(false);
      console.log("down");
    }

    oldScrollY = window.scrollY;
  };
  window.onresize = function (e) {
    setwidthScreen(window.screen.width);
  };
  if (widthScreen > 1024) {
    return (
      <>
        <div
          className="navbar  w-full flex flex-col lg:flex-row mb-2 justify-between  left-0 top-0 backdrop-blur-md backdrop-brightness-150	fixed  text-white font-semibold z-50 "
          style={{ transform: handleScroll ? "scaley(1)" : "scaley(0)" }}
        >
          <div className="navbar__logo bg-transparent  lg:block ">
            <img src={require("../../assets/logo.png")} alt="" className="w-[13%]"/>
          </div>
          <div className="navbar__menu list-none justify-center flex">
            <ul className="flex flex-col lg:flex-row justify-end text-center items-center gap-10">
              <li>
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                </Link>
              </li>
              <li>
                <Link to="/moves">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                  moves
                </Link>
              </li>
              <li>
                <Link to="/abilities">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                  Abilities
                </Link>
              </li>
              <li>
                <Link to="/items">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                  items
                </Link>
              </li>
              <li>
                <Link to="/moves">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                  Moves
                </Link>
              </li>
              <li>
                <Link to="/locations">
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                </Link>
              </li>
              <li>
                <Link to="/berries">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="navbar  w-full flex flex-col lg:flex-row mb-2 justify-between  left-0 top-0 backdrop-blur-md backdrop-brightness-150	fixed  text-white font-semibold z-50 "
          style={{ transform: handleScroll ? "scaley(1)" : "scaley(0)" }}
        >
          <div
            className="mt-2 h-10 block right-0 relative  w-8  lg:hidden "
            onClick={() => {
              setisNavOpen((prev) => !prev);
            }}
          >
            <span
              className="block my-2 relative w-8 h-1 bg-gray-600 transition-[transform] duration-700 delay-500"
              style={
                isNavOpen
                  ? {
                      transform: "rotate(45deg)",
                      position: "absolute",
                      bottom: 0,
                    }
                  : {}
              }
            ></span>
            <span
              className="block my-2 w-8 h-1 bg-gray-600 transition-[transform]"
              style={isNavOpen ? { display: "none" } : { display: "block" }}
            ></span>
            <span
              className="block my-2 w-8 h-1 bg-gray-600 transition-[transform,position] duration-700 delay-500"
              style={
                isNavOpen
                  ? {
                      transform: "rotate(-45deg)",
                      position: "absolute",
                      bottom: 0,
                    }
                  : {}
              }
            ></span>
          </div>
          <div className="navbar__logo bg-transparent hidden lg:block ">
            logo
          </div>
          <div
            className="navbar__menu list-none justify-center lg:flex"
            style={{ display: isNavOpen ? "flex" : "none" }}
          >
            <ul className="flex flex-col lg:flex-row justify-end text-center gap-10">
              <li>
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                </Link>
              </li>
              <li>
                <Link to="/moves">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                  moves
                </Link>
              </li>
              <li>
                <Link to="/abilities">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                  Abilities
                </Link>
              </li>
              <li>
                <Link to="/items">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                  items
                </Link>
              </li>
              <li>
                <Link to="/moves">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                  Moves
                </Link>
              </li>
              <li>
                <Link to="/locations">
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                </Link>
              </li>
              <li>
                <Link to="/berries">
                  <FontAwesomeIcon
                    icon={faHollyBerry}
                    className="text-blue-200 hover:text-violet-500 text-4xl"
                    onClick={() => setisNavOpen(false)}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
};

export default NavBar;
