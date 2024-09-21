import React, { useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { useNavigate } from "react-router-dom";

const Addservice = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "services"), {
        name: values.name,
        description: values.description,
        price: values.price,
      });
      console.log("Service added with ID: ", docRef.id);
      form.resetFields(); // Reset form fields after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error adding service: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Form
        form={form}
        name="add_service"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          price: 0,
        }}
      >
        <Form.Item
          name="name"
          label="Service Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the service!",
            },
            {
              min: 2,
              message: "Service name must be at least 2 characters long!",
            },
          ]}
        >
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the service description!",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter service description" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input the price!",
            },
            {
              type: "number",
              min: 0,
              message: "Price must be at least 0!",
            },
            {
              validator: (_, value) => {
                if (value === undefined || value === null) {
                  return Promise.reject(new Error("Price is required!"));
                }
                if (isNaN(value)) {
                  return Promise.reject(new Error("Price must be a number!"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            placeholder="Enter price"
            min={0}
            style={{ width: "100%" }}
            step={0.01}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Service
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Addservice;
