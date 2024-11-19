import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Table } from 'antd';

    const OrderManagement = () => {
      const [orders, setOrders] = useState([]);

      useEffect(() => {
        const fetchOrders = async () => {
          const response = await axios.get('/api/admin/orders');
          setOrders(response.data);
        };
        fetchOrders();
      }, []);

      return (
        <Table dataSource={orders} columns={[{ title: 'Order ID', dataIndex: 'id' }, { title: 'Total Amount', dataIndex: 'totalAmount' }]} />
      );
    };

    export default OrderManagement;
