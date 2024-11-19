import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Table, Button, Form, Input } from 'antd';

    const ProductManagement = () => {
      const [products, setProducts] = useState([]);
      const [form] = Form.useForm();

      useEffect(() => {
        const fetchProducts = async () => {
          const response = await axios.get('/api/admin/products');
          setProducts(response.data);
        };
        fetchProducts();
      }, []);

      const handleCreate = async (values) => {
        await axios.post('/api/admin/products', values);
        form.resetFields();
        // Refresh product list
      };

      return (
        <div>
          <Form form={form} onFinish={handleCreate}>
            <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Input />
            </Form.Item>
            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="imageURL" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Create Product</Button>
            </Form.Item>
          </Form>
          <Table dataSource={products} columns={[{ title: 'Name', dataIndex: 'name' }, { title: 'Price', dataIndex: 'price' }]} />
        </div>
      );
    };

    export default ProductManagement;
