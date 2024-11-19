import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, List } from 'antd';
import { useHistory } from 'react-router-dom'; // Import useHistory

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const history = useHistory(); // Initialize useHistory
    const token = localStorage.getItem('token'); // Get the token from local storage

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!token) {
                // Redirect to the login page if the user is not logged in
                alert('You need to log in to view your cart.');
                history.push('/login'); // Change '/login' to your login route
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems(response.data); // Update state with cart items
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError(error.message); // Update state with error message
            }
        };

        fetchCartItems(); // Call the function to fetch cart items
    }, [token, history]); // Add history to the dependency array

    const handleRemove = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(cartItems.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>; // Display error if any
    }

    return (
        <Card title="Shopping Cart">
            <List
                dataSource={cartItems}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button onClick={() => handleRemove(item.productId)}>Remove</Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.product.name}
                            description={`Price: $${item.product.price} - Quantity: ${item.quantity}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default Cart;
