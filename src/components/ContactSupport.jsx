import React, { useState } from 'react';
    import { Form, Input, Button } from 'antd';
    import axios from 'axios';

    const ContactSupport = () => {
      const [form] = Form.useForm();

      const handleSubmit = async (values) => {
        await axios.post('/api/support', values);
        alert('Your message has been sent!');
      };

      return (
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Send Message</Button>
          </Form.Item>
        </Form>
      );
    };

    export default ContactSupport;
