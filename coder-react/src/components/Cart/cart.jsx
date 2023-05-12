import { Link } from "react-router-dom"
import { useContext } from "react"
import { CarritoContext } from "../../context/carritoCart"
import CartItem from "../CartItem/cartItem"
import "./cart.css"

const Cart = () => {
    const { carrito, vaciarCarrito } = useContext(CarritoContext);

    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    const total = carrito.reduce((total, producto) => total + (producto.item.precio * producto.cantidad), 0);

    if (totalCantidad === 0) {
        return (
            <div className="carrito sin-product">
                <h2>No hay productos en el carrito </h2>
                <Link to='/' className="button --sin"> Productos </Link>

            </div>
        )
    }

    return (
        <div className="carrito">
            <div className="cart-product">
                {carrito.map(producto => <CartItem key={producto.id} {...producto} />)}
            </div>
            <div className="cart-fin">
                <h3 className="text-title">Total: ${total} </h3>
                <div>
                    <a onClick={() => vaciarCarrito()} className="button"> Vaciar Carrito </a>
                    <Link to='/checkout' className="button"> Finalizar Compra </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart