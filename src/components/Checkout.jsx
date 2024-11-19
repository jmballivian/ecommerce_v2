import React, { useState } from 'react';
    import { Form, Input, Button } from 'antd';

    const Checkout = () => {
      const [form] = Form.useForm();

      const handleSubmit = async (values) => {
        // Simulate order processing
        console.log('Order submitted:', values);
        alert('Order placed successfully!');
      };

      return (
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="address" label="Shipping Address" rules={[{ required: true, message: 'Please input your address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="payment" label="Payment Information" rules={[{ required: true, message: 'Please input your payment information!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Place Order</Button>
          </Form.Item>
        </Form>
      );
    };

    export default Checkout;
