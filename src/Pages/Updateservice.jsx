import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { message, Form, Input, Button } from "antd";

const Updateservice = () => {
  const [singledata, setsingledata] = useState(null);
  const [loading, setLoading] = useState(false); // For form submission loading state
  const params = useParams();
  const navigate = useNavigate();

  // Fetch the single service data by ID
  const fetchSingleData = async () => {
    const serviceDocref = doc(db, "services", params.id);
    const data = await getDoc(serviceDocref);

    if (data.exists()) {
      setsingledata({
        id: data.id,
        ...data.data(),
      });
      message.success("Data Fetched");
    } else {
      message.error("Service Not Found");
    }
  };

  useEffect(() => {
    fetchSingleData();
  }, []);

  // Handle form submission to update the service in Firestore
  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const serviceDocref = doc(db, "services", params.id);
      await updateDoc(serviceDocref, values);
      message.success("Service Updated Successfully");
      navigate("/"); // Navigate back to the service list after update
    } catch (error) {
      message.error("Failed to Update Service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Update Service</h2>
      {singledata && (
        <Form
          initialValues={singledata} // Pre-fill the form with the fetched service data
          onFinish={handleUpdate}
          layout="vertical"
        >
          <Form.Item
            label="Service Name"
            name="name"
            rules={[
              { required: true, message: "Please input the service name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Service
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Updateservice;
