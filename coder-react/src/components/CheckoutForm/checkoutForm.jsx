import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import { CarritoContext } from '../../context/carritoCart'
import { LoginContext } from '../../context/loginContext'
import { db } from '../../services/firebase/config'
import { collection, addDoc, doc, updateDoc, query, onSnapshot, getDocs } from 'firebase/firestore'
import { OrderContext } from '../../context/orderContext'
import CartItem from '../CartItem/cartItem'
import { Link } from 'react-router-dom'
import './checkoutForm.css'

const CheckoutForm = () => {

    const { carrito, emptyCart } = useContext(CarritoContext)

    const { loged } = useContext(LoginContext)

    const { placeOrder } = useContext(OrderContext)

    const [error, setError] = useState("")

    const [products, setProducts] = useState([])

    const [color, setColor] = useState("")

    const [user, setUser] = useState([])

    const style = color

    const pForm = useRef(null)

    const [input, setInput] = useState({ name: "", lastname: "", pass: "", passTwo: "", dni: "", cellphone: "", email: "", adress: "" })

    useEffect(() => {
        const myUsers = collection(db, "users")

        getDocs(myUsers)
            .then((user) => {
                const newUser = user.docs.map((client) => {
                    const data = client.data()
                    return { ...data }
                })
                setUser(newUser)
            })
            .catch(error => console.log(error))
    }, [])

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleConfirmClick = (event) => {
        event.preventDefault();
        handleSubmit();
    };


    const handlerSubmitform = (e) => {
        e.preventDefault();

        if (input.pass.valueOf() === input.passTwo.valueOf()) {
            addDoc(collection(db, "users"), {
                name: input.name,
                lastname: input.lastname,
                dni: input.dni,
                pass: input.pass,
                passTwo: input.passTwo,
                cellphone: input.cellphone,
                email: input.email,
                adress: input.adress,
            });

            setInput({
                name: "",
                lastname: "",
                dni: "",
                pass: "",
                passTwo: "",
                cellphone: "",
                email: "",
                adress: "",
            });

            const buttonElement = document.createElement("button");
            buttonElement.textContent = "Confirmar compra";
            buttonElement.onclick = handleConfirmClick;

            const linkElement = document.createElement("a");
            linkElement.href = "#";
            linkElement.addEventListener("click", handleSubmit);
            linkElement.appendChild(buttonElement);

            pForm.current.innerHTML = "";
            pForm.current.appendChild(linkElement);
        } else {
            pForm.current.textContent = "❌ Las contraseñas no coinciden.";
            setInput({ pass: "", passTwo: "" });
            setColor("p--negative");
        }
    };



    useEffect(() => {
        const q = query(collection(db, "products"))

        const modify = onSnapshot(q, function (querySnapshot) {
            const docs = []
            querySnapshot.forEach(function (doc) {
                docs.push({ id: doc.id, ...doc.data() })
            })
            setProducts(docs)
        })
        return () => {
            modify()
        }
    }, [])

    const changeStock = (id, quantity) => {
        const productRef = doc(db, "products", id)
        const product = products.find(prod => prod.id === id)
        if (product) {
            updateDoc(productRef, { stock: product.stock - quantity })
                .then(() => console.log(`Se compro ${productRef}`))
                .catch((error) => console.error(error))

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const date = new Date()

        const day = date.getDay()
        const month = date.getMonth()
        const year = date.getFullYear()

        const order = {
            items: carrito.map((prod) => ({
                id: prod.item.id,
                name: prod.item.nombre,
                quantity: prod.quantity
            })),
            totalAmount: carrito.reduce((total, prod) => total + prod.item.price * prod.quantity, 0),
        }

        order.items.map(prod => (changeStock(prod.id, prod.quantity)))

        addDoc(collection(db, "orders"), order)
            .then((docRef) => {
                placeOrder(docRef.id)
                emptyCart()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            <h2 className='title--checkout'>Orden de compra:</h2>

            <div className="carrito">
                <div className="cart-product">
                    {carrito.map(producto => <CartItem key={producto.id} {...producto} />)}
                </div>
            </div>

            <div className='form--box'>

                <fieldset className='fieldset--register'>

                    <form className='form' onSubmit={handlerSubmitform}>

                        <legend>Registra tu cuenta</legend>

                        <input type="text" className='input--form' required name='name' placeholder='Ingresa tu nombre' value={input.name} onChange={handleInput} />

                        <input type="text" className='input--form' required name='lastname' placeholder='Ingresa tu apellido' value={input.lastname} onChange={handleInput} />

                        <input type="number" className='input--form' required name='dni' placeholder='Ingresa tu DNI' value={input.dni} onChange={handleInput} />

                        <input type='password' className='input--form' required name='pass' placeholder='Ingresa tu contraseña' value={input.pass} onChange={handleInput} />

                        <input type="password" className='input--form' required name='passTwo' placeholder='Repeti tu contraseña' value={input.passTwo} onChange={handleInput} />

                        <input type="number" className='input--form' required name='cellphone' placeholder='Ingresa tu celular' value={input.cellphone} onChange={handleInput} />

                        <input type="text" className='input--form' required name='adress' placeholder='Ingresa tu dirección' value={input.adress} onChange={handleInput} />

                        <input type="email" className='input--form' required name='email' placeholder='Ingresa tu mail' value={input.email} onChange={handleInput} />

                        <button type='submit' className='form--btn'>Registrarse</button>

                        <p ref={pForm} className={style}></p>

                    </form>

                </fieldset>

            </div>


        </>
    )
}

export default CheckoutForm