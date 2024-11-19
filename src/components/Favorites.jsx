import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Card, Button, List } from 'antd';

    const Favorites = ({ userId }) => {
      const [favorites, setFavorites] = useState([]);

      useEffect(() => {
        const fetchFavorites = async () => {
          const response = await axios.get(`/api/favorites/${userId}`);
          setFavorites(response.data);
        };
        fetchFavorites();
      }, [userId]);

      const handleRemove = async (id) => {
        await axios.delete(`/api/favorites/${id}`);
        setFavorites(favorites.filter(item => item.id !== id));
      };

      return (
        <Card title="Favorites">
          <List
            dataSource={favorites}
            renderItem={item => (
              <List.Item
                actions={[<Button onClick={() => handleRemove(item.id)}>Remove</Button>]}
              >
                <List.Item.Meta
                  title={item.product.name}
                  description={`Product ID: ${item.productId}`}
                />
              </List.Item>
            )}
          />
        </Card>
      );
    };

    export default Favorites;
