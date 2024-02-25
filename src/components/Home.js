import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.jpg";

const Home = () => {
  return (
    <>
      <div>
        <nav className="navbar bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                alt="Logo"
                width="95"
                height="90"
                className="d-inline-block align-text-center "
              />
              <span
                style={{ color: "red", marginLeft: "40%", fontSize: "30px" }}
              >
                Welcome to React Face Position Validator
              </span>
            </Link>
          </div>
        </nav>
      </div>
      <div
        className="card"
        style={{
          width: "40rem",
          marginLeft: "25%",
          marginTop: "5px",
          height: "250px",
          border: "inset",
          borderColor: "red",
          borderBlockWidth: "5px",
          boxShadow: "initial",
        }}
      >
        <div className="card-body">
          <h5
            className="card-title"
            style={{ textAlign: "center", fontSize: "35px" }}
          >
            Welcome
          </h5>
          <h6
            className="card-subtitle mb-2 text-body-secondary"
            style={{ textAlign: "center" }}
          >
            React Face Position Validator
          </h6>
          <p
            className="card-text"
            style={{ textAlign: "center", marginTop: "25px" }}
          >
            We're thrilled to have you on board, ready to explore and fine-tune
            the precision of facial detection. Our platform is designed to
            empower users like you with a seamless and interactive experience,
            ensuring that the detected face position is not just accurate but
            tailored to your preferences.
          </p>
        </div>
      </div>
      {/* card - 1 */}
      <div
        className="d-flex justify-content-evenly my-5"
        id="cards side-by-side"
        style={{}}
      >
        <div className="card" style={{ width: "18rem", border: "solid" }}>
          <div className="card-body">
            <h5 className="card-title" style={{textDecoration:"underline"}}>Real-Time Validation</h5>
            <p className="card-text">
              Witness the magic of real-time validation as you interactively
              adjust the markers to align with your facial features. Our
              platform is all about precision and personalization.
            </p>
          </div>
        </div>
        {/* card - 2 */}
        <div className="card" style={{ width: "18rem", border: "solid" }}>
          <div className="card-body">
            <h5 className="card-title" style={{textDecoration:"underline"}}>User-Friendly Interface</h5>

            <p className="card-text">
              Navigating through the React Face Position Validator is a breeze.
              The intuitive interface allows you to effortlessly manipulate
              markers, providing a user-friendly experience for users of all
              technical backgrounds.
            </p>
          </div>
        </div>
        {/* card - 3 */}
        <div className="card" style={{ width: "18rem", border: "solid" }}>
          <div className="card-body">
            <h5 className="card-title" style={{textDecoration:"underline"}}>Optimized Face Detection</h5>

            <p className="card-text">
              Once you've fine-tuned the face position to your satisfaction, our
              platform ensures a seamless integration back to your original
              application. Say goodbye to misalignments and hello to an
              optimized face detection experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
