import React, { useEffect,useState } from "react";
import {
  faHome,
  faHollyBerry,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const NavBar = () => {
const [isNavOpen, setisNavOpen] = useState(false)
  return (
    <>
      <div className="navbar  w-full flex flex-col lg:flex-row mb-2 justify-between  left-0 top-0 backdrop-blur-md backdrop-brightness-150	fixed  text-white font-semibold z-50 ">
      <div className="mt-2 h-10 block right-0 relative lg:hidden " onClick={()=>{ setisNavOpen(prev => !prev)}} >
  <span className="block my-2 relative w-8 h-1 bg-gray-600 " style={isNavOpen? {transform: 'rotate(45deg)',position: "absolute",bottom: 0}: null}></span>
  <span className="block my-2 w-8 h-1 bg-gray-600" style={isNavOpen? {display: "none"}: null}></span>
  <span className="block my-2 w-8 h-1 bg-gray-600" style={isNavOpen? {transform: 'rotate(-45deg)',position: 'absolute',bottom: 0}: null}></span>
</div>       
        <div className="navbar__logo bg-transparent hidden lg:block ">logo</div>
        <div className="navbar__menu list-none justify-center lg:flex" style={{display : isNavOpen? "flex" : "none"}}>
          <ul className="flex flex-col lg:flex-row justify-end text-center gap-10">
            <li>
              <Link to="/">
                <FontAwesomeIcon
                  icon={faHome}
                  className="text-blue-200 hover:text-violet-500 text-4xl"
                />
              </Link>
            </li>
            <li>
              <Link to="/moves">
                <FontAwesomeIcon
                  icon={faHollyBerry}
                  className="text-blue-200 hover:text-violet-500 text-4xl"
                />
                moves
              </Link>
            </li>
            <li>
              <Link to="/abilities">
                <FontAwesomeIcon
                  icon={faHollyBerry}
                  className="text-blue-200 hover:text-violet-500 text-4xl"
                />
                Abilities
              </Link>
            </li>
            <li>
              <Link to="/items">
                <FontAwesomeIcon
                  icon={faHollyBerry}
                  className="text-blue-200 hover:text-violet-500 text-4xl"
                />
                items
              </Link>
            </li>
            <li>
              <Link to="/moves">
                <FontAwesomeIcon
                  icon={faHollyBerry}
                  className="text-blue-200 hover:text-violet-500 text-4xl"
                />
                Moves
              </Link>
            </li>
            <li>
              <Link to="/locations">
                <FontAwesomeIcon
                  icon={faMapLocationDot}
                  className="text-blue-200 hover:text-violet-500 text-4xl"
                />
              </Link>
            </li>
            <li>
              <Link  to="/berries">
                <FontAwesomeIcon
                  icon={faHollyBerry}
                  className="text-blue-200 hover:text-violet-500 text-4xl"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
