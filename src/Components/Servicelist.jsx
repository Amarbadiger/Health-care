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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-1.5 1.5-3.708-3.707L12.146.146zM11.793 3.354 15.646 7.207a.5.5 0 0 1 .146.354v6a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .146-.354l3.853-3.853 1.5 1.5-3.707 3.707a.5.5 0 0 0-.146.354v6a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.146-.354l-3.853-3.853 1.5-1.5z" />
              </svg>
            </Link>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(service.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4.5.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-8-2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1H3v-1zm1.5-1h6a1 1 0 0 1 1 1v1h-9V3a1 1 0 0 1 1-1z" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Servicelist;
