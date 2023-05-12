import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CarritoContext } from '../../context/carritoCart';
import { useContext } from 'react'



const ItemDetail = ({ id, nombre, precio, img }) => {
    const [agregarCantidad, setAgregarCantidad] = useState(0);

    const { agregarProducto } = useContext(CarritoContext);

    const manejadorCantidad = (cantidad) => {

        setAgregarCantidad(cantidad);
        console.log("Productos agregados: " + cantidad);

        const item = { id, nombre, precio };
        agregarProducto(item, cantidad);
    }

    return (
        <div className='contenedorItem'>
            <div className="card">
                <div className="card-img"><img src={img} alt={nombre} /></div>
                <div className="card-info">
                    <h2 className='text-title'>Nombre: {nombre}</h2>
                    <h3 className='text-title'> ID: {id} </h3>
                    <p class="text-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iste reiciendis tempora unde! Quam commodi esse dicta odit nobis, enim.</p>
                </div>
                <div className="card-footer">
                    <h3 className='text-title'>Precio: ${precio} </h3>
                    <div>
                        {
                            agregarCantidad > 0 ? (<div className='seguir-terminar'> <Link to="/" className='card-button'>Seguir comprando</Link>
                                <Link to="/cart" className='card-button'> Terminar compra</Link>
                        </div>) : (<ItemCount inicial={1} stock={10} funcionAgregar={manejadorCantidad} />)
                        }
                    </div>
                </div></div>
        </div>
    )
}

export default ItemDetail