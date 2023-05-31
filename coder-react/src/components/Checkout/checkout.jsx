import React, { useState, useContext } from 'react';
import CheckoutForm from '../CheckoutForm/checkoutForm';
import { CarritoContext } from '../../context/carritoCart';

const Checkout = () => {
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const { carrito, vaciarCarrito } = useContext(CarritoContext);

    const handleOrderConfirmation = () => {
        setOrderConfirmed(true);
        vaciarCarrito()
    };

    return (
        <div className="checkout">
            {orderConfirmed ? (
                <div>
                    <h2>Tu orden ha sido confirmada.</h2>
                    <p>Gracias por tu compra.</p>
                </div>
            ) : (
                <CheckoutForm onOrderConfirmation={handleOrderConfirmation} />
            )}
        </div>
    );
};

export default Checkout;
