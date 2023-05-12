import './Item.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'




const Item = ({ id, nombre, precio, img }) => {
    return (
        <div className="cardProducto">
                <div className="card-img"><img src={img} alt={nombre} /></div>
                <div className="card-info">
                    <h2 className='text-title'>Nombre: {nombre}</h2>
                    <h3 className='text-title'> ID: {id} </h3>
                    <p class="text-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam iste reiciendis tempora unde! Quam commodi esse dicta odit nobis, enim.</p>
                </div>
                <div className="card-footer">
                    <h3 className='text-title'>Precio: ${precio} </h3>
                <Link to={`/item/${id}`} className="card-button"> Ver Detalles </Link>
            </div>
        </div>
    )
}

export default Item