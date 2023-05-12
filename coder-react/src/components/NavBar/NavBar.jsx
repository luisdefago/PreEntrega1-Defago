import React, { useContext, useEffect, useState } from 'react';
import CartWidget from "../CartWidget/CartWidget";
import './NavBar.css'
import { NavLink, Link } from "react-router-dom";




const NavBar = () => {

    return (
        <header className="header">
            <Link to={"/"} className="header__titulo">
                <h1>
                    Perifericos.com
                </h1>
            </Link>
            <nav>
                <ul className="nav">
                    <li className='nav__art'>
                        <NavLink to={"/categoria/mouse"} className={'nav__link'}>
                            Mouse
                        </NavLink>
                    </li>
                    <li className='nav__art'>
                        <NavLink to={"/categoria/teclado"} className={'nav__link'}>
                            Teclado
                        </NavLink></li>
                    <li className='nav__art'>
                        <NavLink to={"/categoria/auriculares"} className={'nav__link'}>
                            Auriculares
                        </NavLink></li>
                    <li className='nav__art'>
                        <CartWidget />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
