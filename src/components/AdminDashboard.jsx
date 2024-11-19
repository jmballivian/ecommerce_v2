import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Card, Col, Row } from 'antd';

    const AdminDashboard = () => {
      const [dashboardData, setDashboardData] = useState({});

      useEffect(() => {
        const fetchDashboardData = async () => {
          const response = await axios.get('/api/admin/dashboard');
          setDashboardData(response.data);
        };
        fetchDashboardData();
      }, []);

      return (
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Total Sales">${dashboardData.totalSales}</Card>
          </Col>
          <Col span={6}>
            <Card title="Pending Orders">{dashboardData.pendingOrders}</Card>
          </Col>
          <Col span={6}>
            <Card title="Low Stock Products">{dashboardData.lowStockProducts}</Card>
          </Col>
          <Col span={6}>
            <Card title="User Registrations">{dashboardData.userRegistrations}</Card>
          </Col>
        </Row>
      );
    };

    export default AdminDashboard;
