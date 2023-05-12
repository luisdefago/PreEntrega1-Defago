import React from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CarritoContext } from "../../context/carritoCart";


const CartWidget = () => {
    const { carrito } = useContext(CarritoContext);

    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);


    return (
        <Link to='/cart' className="nav__link">
        <div className="cart-widget">
            <ion-icon name="cart-outline"></ion-icon>
            <span>{totalCantidad}</span>
        </div>
        </Link>
    );
};

export default CartWidget;
