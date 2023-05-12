import React, { useContext } from 'react'
import { OrderContext } from '../../context/orderContext'
import CheckoutForm from '../CheckoutForm/checkoutForm'

const Checkout = () => {

    const { order } = useContext(OrderContext)

    return (
        <div className='box--checkout'>

            {order ? (<h2 className='title--checkout'>Tu numero de orden es: {order}. Gracias por tu compra!</h2>) : <CheckoutForm />}
        </div>
    )
}

export default Checkout