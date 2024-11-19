import React, { useState } from 'react';
    import { Form, Input, Button } from 'antd';

    const ReviewForm = ({ productId }) => {
      const [form] = Form.useForm();

      const handleSubmit = async (values) => {
        await axios.post('/api/reviews', { ...values, productId });
        alert('Review submitted successfully!');
      };

      return (
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Please input your rating!' }]}>
            <Input type="number" min={1} max={5} />
          </Form.Item>
          <Form.Item name="comment" label="Comment">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit Review</Button>
          </Form.Item>
        </Form>
      );
    };

    export default ReviewForm;
