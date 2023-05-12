import "./cartItem.css"

const CartItem = ({ item, cantidad }) => {
    return (
        <div>
            <h4 className="cart-titulo"> {item.nombre} </h4>
            <p>Cantidad: {cantidad} </p>
            <p>Precio: $ {item.precio} </p>
        </div>
    )
}

export default CartItem