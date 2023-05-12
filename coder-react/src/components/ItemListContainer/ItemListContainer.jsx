import ItemList from '../ItemList/ItemList';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../../services/firebase/config';


const ItemListContainer = ({ greeting }) => {
    const [productos, setProductos] = useState([]);

    const { idCategoria } = useParams();

    useEffect(() => {
        const myProducts = idCategoria ? query(collection(db, "productos"), where("categoria", "==", idCategoria)) : collection(db, "productos")

        getDocs(myProducts)
            .then(res => {
                const newProduct = res.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setProductos(newProduct)
            })
            .catch(error => console.log(error))
    }, [idCategoria])


    return (
        <div>
            <ItemList productos={productos} />
        </div>
    )
}

export default ItemListContainer;