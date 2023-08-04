import React, { useEffect, useState } from 'react'
import Card from './Card.jsx/Card.jsx';
import './ProductsStyle.css';
import axios from 'axios';
import ProductForm from '../ProductForm/ProductForm.jsx';
import { Button } from '@mui/material';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [crateProduct, setCreateProduct] = useState(false);
    const getProducts = async () => {
        const data = await axios.get('http://localhost:3000/products');
        setProducts(data.data);
    }

    useEffect(() => {
        getProducts();
    }, [])
    console.log('dddd', products)
    return (
        <>
            <div className='productWrapper'>
                {
                    !crateProduct &&
                    (<div style={{ padding: '20px', justifyContent: 'flex-end' }}><Button variant="contained" onClick={() => setCreateProduct(true)} color="primary">
                        Create Product
                    </Button></div>)
                }
                {

                    !crateProduct && (products.map((products) => (
                        <Card products={products} />
                    )))
                }
            </div>
            {crateProduct && <div className='ProductForm'><ProductForm /></div>}
        </>
    )
}

export default Products;