import React from "react";

const ItemListContainer = ({ greeting }) => {
    return (
        <div className="item-list-container">
            <h2>{greeting}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    );
};

export default ItemListContainer;
