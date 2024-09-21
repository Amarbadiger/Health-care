import React, { useEffect, useState } from "react";
import styles from "../Components/Servicelist.module.css";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { Link } from "react-router-dom";

const Servicelist = () => {
  const [services, Setservices] = useState([]);

  // Fetch services from Firestore
  const FetchServices = async () => {
    const serviceCollection = collection(db, "services");
    const query = await getDocs(serviceCollection);
    const serviceData = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    Setservices(serviceData);
  };

  // Delete a service
  const handleDelete = async (id) => {
    const serviceDoc = doc(db, "services", id);
    await deleteDoc(serviceDoc);
    FetchServices(); // Fetch updated service list after deletion
  };

  useEffect(() => {
    FetchServices();
  }, []);

  return (
    <div className={styles.box}>
      {services.map((service) => (
        <div key={service.id} className={`${styles.card} card`}>
          <div className="card-body">
            <h5 className="card-title">{service.name}</h5>
            <p className="card-text">{service.description}</p>
            <p>Price: ₹{service.price}</p>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Link
              className="btn btn-primary btn-sm"
              to={`/updateservice/${service.id}`}
            >
              Update
            </Link>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(service.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Servicelist;
