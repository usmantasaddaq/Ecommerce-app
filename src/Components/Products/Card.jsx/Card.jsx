
import React, { useState } from 'react';
import './CardStyle.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ProductForm from '../../ProductForm/ProductForm';
import axios from 'axios';

const Card = (props) => {
    const { products } = props;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [updateProduct, setUpdateProduct] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleEditProduct = () => {
        setUpdateProduct(true);
    };

    const handleFormSubmit = async (updatedData) => {
        try {
            // Make an API call to update the product using the PUT method
            await axios.put(`http://localhost:3000/products/64ca8147b2c95efb05935f75`, updatedData);
            // Handle the successful update, e.g., show a success message, close the form, etc.
            console.log('Product updated successfully!');
            setUpdateProduct(false); // Close the form after the update is completed
        } catch (error) {
            // Handle any error that occurred during the API call
            console.error('Error updating product:', error.message);
            // You can show an error message to the user if needed.
        }
    };

    return (
        <>
            <div className="card">
                <div>
                    <EditOutlinedIcon onClick={handleEditProduct} />
                </div>
                <img src={products.thumbnail} alt="Thumbnail" className="thumbnail" />
                <div className="title">Title:{products.title}</div>
                <div className={`${showFullDescription ? 'completeDescription' : 'description'}`}>Description:{products.description}</div>
                {!showFullDescription && (
                    <a href="#" className="read-more" onClick={toggleDescription}>
                        Read More
                    </a>
                )}
                <div className="price">Price:- {products.price}$</div>
                <div className="discount">discountPercentage:-{products.discountPercentage}% </div>
                <div className="rating">Rating:-{products.rating} </div>
                <div className="brand">Brand:-{products.brand} </div>
                <div className="stock">Stock:- {products.stock}</div>
                <div className="brand-category">Category:-{products.category}</div>
            </div>
            {updateProduct && <ProductForm onSubmit={handleFormSubmit} initialData={products} setShowFullDescription= {setShowFullDescription} />}
        </>
    );
};

export default Card;
