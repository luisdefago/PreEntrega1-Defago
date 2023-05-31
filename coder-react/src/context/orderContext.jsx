import React, { createContext, useState } from 'react';

export const OrderContext = createContext({
    order: null,
    setOrder: () => { },
    placeOrder: () => { },
});

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState(null);

    const placeOrder = (orderId) => {
        setOrder(orderId);
    };

    return (
        <OrderContext.Provider value={{ order, setOrder, placeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
