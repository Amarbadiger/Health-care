import React, { useState } from "react";
import styles from "../Pages/Home.module.css";
import Servicelist from "../Components/Servicelist";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <header>
        <nav className="border border-dark-subtle d-flex justify-content-around align-items-center">
          <h1 className={`${styles.title}`}>JARURAT CARE</h1>
          <Link className={`btn btn-primary ${styles.btn}`} to="/add">
            Add Service
          </Link>
        </nav>
        <div>
          <h2 className="text-center">Service List of Health Care</h2>
          <Servicelist />
        </div>
      </header>
    </>
  );
};

export default Home;
