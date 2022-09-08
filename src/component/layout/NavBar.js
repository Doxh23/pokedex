import React from 'react'

const NavBar = () => {
  return (
    <>
    <div className="navbar">
        <div className="navbar__logo">
            <h1>Pokedex</h1>
        </div>
        <div className="navbar__menu">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">moves</a></li>
                <li><a href="#">talents</a></li>
                <li><a href="#">items</a></li>
                <li><a href="#">abilities</a></li>
                <li><a href="#">locations</a></li>
                <li><a href="#">berries</a></li>
                
            </ul>
        </div>
    </div>
    </>

  )
}

export default NavBar