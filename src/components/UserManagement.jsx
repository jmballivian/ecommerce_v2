import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Table } from 'antd';

    const UserManagement = () => {
      const [users, setUsers] = useState([]);

      useEffect(() => {
        const fetchUsers = async () => {
          const response = await axios.get('/api/admin/users');
          setUsers(response.data);
        };
        fetchUsers();
      }, []);

      return (
        <Table dataSource={users} columns={[{ title: 'User ID', dataIndex: 'id' }, { title: 'Email', dataIndex: 'email' }]} />
      );
    };

    export default UserManagement;
