import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Table } from 'antd';

    const ReviewManagement = () => {
      const [reviews, setReviews] = useState([]);

      useEffect(() => {
        const fetchReviews = async () => {
          const response = await axios.get('/api/admin/reviews');
          setReviews(response.data);
        };
        fetchReviews();
      }, []);

      return (
        <Table dataSource={reviews} columns={[{ title: 'Review ID', dataIndex: 'id' }, { title: 'Product ID', dataIndex: 'productId' }, { title: 'Rating', dataIndex: 'rating' }]} />
      );
    };

    export default ReviewManagement;
