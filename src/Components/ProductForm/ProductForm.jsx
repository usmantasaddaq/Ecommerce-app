import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Toolbar, AppBar, CircularProgress } from '@mui/material';
import axios from 'axios';

const ProductForm = ({ onSubmit, initialData, setShowFullDescription }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // If initialData is provided, set the form fields with its values
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData(e)
        setLoading(true);

        try {
            // Make an API call to create the product using the POST method
            const response = await axios.post('http://localhost:3000/products', formData);
            // Handle the successful creation, e.g., show a success message or redirect the user
            console.log('Product created successfully!');
            setLoading(false);
            setFormData({
                title: '',
                description: '',
                price: 0,
                discountPercentage: 0,
                rating: 0,
                stock: 0,
                brand: '',
                category: '',
                thumbnail: '',
            });
        } catch (error) {
            // Handle API errors
            setLoading(false);
            setError('Failed to create product. Please try again.');
            console.error('Error creating product:', error.message);
        }
    };

    return (
        <form>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
                <AppBar>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h5" component="div">
                            Create New Products
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TextField label="Title" id="title" name="title" value={formData.title} onChange={handleChange} />

                <TextField
                    label="Description"
                    id="description"
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                />

                <TextField type="number" label="Price" id="price" name="price" value={formData.price} onChange={handleChange} />

                <TextField
                    type="number"
                    label="Discount Percentage"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                />

                <TextField type="number" label="Rating" id="rating" name="rating" value={formData.rating} onChange={handleChange} />

                <TextField type="number" label="Stock" id="stock" name="stock" value={formData.stock} onChange={handleChange} />

                <TextField label="Brand" id="brand" name="brand" value={formData.brand} onChange={handleChange} />

                <TextField label="Category" id="category" name="category" value={formData.category} onChange={handleChange} />

                <TextField label="Thumbnail URL" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                    <Button variant="contained" onClick={handleSubmit} type="submit" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Create'}
                    </Button>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Box>
        </form>
    );
};

export default ProductForm;


