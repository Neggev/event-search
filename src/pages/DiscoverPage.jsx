import React, { useContext } from "react";
import { APIContext } from "../components/api/Axios";
import "bootstrap/dist/css/bootstrap.css";

function DiscoverPage() {
  const APIData = useContext(APIContext);
  const { info } = APIData;

  // console.log(info);

  return (
    <div
      className="main-home-container d-flex justify-content-center w-100"
      style={{ height: "100vh" }}
    >
      {/* discover page title container start*/}
      <div
        className="title-container my-5"
        style={{
          width: "100%",
          height: "13vh",
          position: "absolute",
          left: "20vh",
        }}
      >
        <div className="title">
          <h1 className="text-center">Discover</h1>
        </div>
        <div className="sub-title text-center">
          <h6>Discover trending events coming in the coming week!</h6>
        </div>
      </div>
      <div
        className="events-main-container"
        style={{
          marginTop: "20vh",
          width: "120vh",
          height: "80vh",
          position: "absolute",
          left: "30vh",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        {!info.results ? (
          <div>
            <h1>Loading....</h1>
          </div>
        ) : (
          Object.entries(info.results).map(([key, i]) => {
            return (
              <div
                key={key}
                className="card d-flex"
                style={{
                  width: "110vh",
                  height: "25vh",
                  marginTop: "5vh",
                }}
              >
                <div className="row g-0">
                  <div className="col-3">
                    <img
                      src={i.largeimageurl}
                      className="img-fluid"
                      style={{ height: "25vh" }}
                      alt="card-horizontal-image"
                    />
                  </div>

                  <div className="col-9" style={{ height: "25vh" }}>
                    <div className="card-body p-0">
                      <h3 className="card-title text-center">{i.eventname}</h3>
                      <p className="text-center">{i.description}</p>
                      <div className="d-flex p-0 text-start">
                        <div className="time-date mx-3">
                          <p className="card-text">Venue: {i.venue.name}</p>
                          <div className="date-container">
                            <p className="">Event Date: {i.date}</p>
                          </div>
                          <div className="door-times">
                            <p>Doors Open: {i.openingtimes.doorsopen}</p>
                            <p>Doors Close: {i.openingtimes.doorsclose}</p>
                          </div>
                        </div>
                        <div className="links-container">
                          <p className="website-container">
                            <button
                              type="button"
                              className="btn btn-outline-primary m-5"
                            >
                              <a
                                href={i.link}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                              >
                                Website Link
                              </a>
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                            >
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${i.venue.latitude}%2C${i.venue.longitude}`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                              >
                                Google Maps Link
                              </a>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
    // </div>
  );
}

export default DiscoverPage;
