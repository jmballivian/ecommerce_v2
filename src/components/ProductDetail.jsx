import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import axios from 'axios';
    import { Card } from 'antd';

    const ProductDetail = () => {
      const { id } = useParams();
      const [product, setProduct] = useState(null);

      useEffect(() => {
        const fetchProduct = async () => {
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data);
        };
        fetchProduct();
      }, [id]);

      if (!product) return <p>Loading...</p>;

      return (
        <Card title={product.name} cover={<img alt={product.name} src={product.imageURL} />}>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
        </Card>
      );
    };

    export default ProductDetail;
