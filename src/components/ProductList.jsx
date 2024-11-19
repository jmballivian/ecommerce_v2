import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('Fetching products...');
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);

                // Log each product fetched
                console.log('Products fetched:', response.data);
                response.data.forEach(product => {
                    console.log('Image URL:', product.imageURL); // Log image URLs
                });
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
            }
        };
        fetchProducts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Row gutter={16}>
            {products.length > 0 ? (
                products.map(product => (
                    <Col span={8} key={product.id}>
                        <Card
                            title={product.name}
                            cover={
                                product.imageURL ? (
                                    <img
                                        alt={product.name}
                                        src={product.imageURL} // Use imageURL directly
                                        onError={(e) => {
                                            console.error('Error loading image:', e.target.src);
                                            e.target.onerror = null; // Prevents looping
                                            e.target.src = 'https://via.placeholder.com/400x300'; // Fallback image
                                        }}
                                    />
                                ) : (
                                    <div>No image available</div>
                                )
                            }
                        >
                            <p>Price: ${product.price}</p>
                            <p>{product.description}</p>
                        </Card>
                    </Col>
                ))
            ) : (
                <p>No products available.</p>
            )}
        </Row>
    );
};

export default ProductList;
