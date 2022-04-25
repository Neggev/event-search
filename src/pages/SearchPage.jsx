import React, { useContext, useState } from "react";
import { APIContext } from "../components/api/Axios";
import { CountriesContext } from "../components/countriesInfo/Countries";
import Select from "react-select";

import "bootstrap/dist/css/bootstrap.css";
import {
  FormControl,
  InputGroup,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";

function SearchPage() {
  const APIData = useContext(APIContext);
  const { info, filtered, SearchFilter } = APIData;

  const countryData = useContext(CountriesContext);
  const { countries } = countryData;

  const [checked, setChecked] = useState(false);

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log(event);
    SearchFilter("&country=" + event);
  };

  const eventTypeFilters = (event) => {
    console.log(`&${event}`);
    SearchFilter(`&${event}`);
  };
  const venueTypeFilters = (event) => {
    console.log(`&${event}`);
    SearchFilter(`&${event}`);
  };
  const minDateFilter = (event) => {
    const minDate = event.target.value;
    console.log(`&minDate=${minDate}`);
    SearchFilter(`&minDate=${minDate}`);
  };
  const maxDateFilter = (event) => {
    const maxDate = event.target.value;
    console.log(`&maxDate=${maxDate}`);
    SearchFilter(`&maxDate=${maxDate}`);
  };

  const ticketChecker = () => {
    setChecked(!checked);
    console.log(checked);
    if (checked) {
      SearchFilter("");
    }
  };

  return (
    <div className="search-main-container w-100 d-flex justify-content-center">
      {/* title, search and filter container. HTML element is fixed  START */}

      <div
        className="Search-container d-flex align-items-center my-5 fixed-top flex-column"
        // style={{ position: "relative", right: "13vh" }}
      >
        <div className="title-container">
          <h1>Search Page</h1>
        </div>
        {/* <div className="row h-100 justify-content-center align-items-center"></div> */}
        <form
          className="col-6 w-25 mt-5"
          // style={{ marginLeft: "10vh" }}
          autoComplete="countries"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Select
            options={countries}
            placeholder="Search by Country"
            onChange={(e) => handleSubmit(e.value)}
          />
        </form>
        <div className="filters-container d-flex justify-content-start mt-3 w-25">
          {/* Event Filters */}
          <form className="d-flex">
            <Dropdown className="" onSelect={eventTypeFilters}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Event Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="eventcode=FEST">
                  Festivals
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=LIVE">
                  Live music
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=CLUB">
                  Clubbing/Dance music
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=DATE">
                  Dating event
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=THEATRE">
                  Theatre/Dance
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=COMEDY">
                  Comedy
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=EXHIB">
                  Exhibitions and Attractions
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=KIDS">
                  Kids/Family Event
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=BARPUB">
                  Bar/Pub event
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=LGB">
                  Gay/Lesbian event
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=SPORT">
                  Sporting event
                </Dropdown.Item>
                <Dropdown.Item eventKey="eventcode=ARTS">
                  The Arts
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* Venue filters */}
            <Dropdown
              className=""
              onSelect={venueTypeFilters}
              style={{ marginLeft: "5vh" }}
            >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Venue Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="type=B">Bar/Pub</Dropdown.Item>
                <Dropdown.Item eventKey="type=N">Nightclub music</Dropdown.Item>
                <Dropdown.Item eventKey="type=L">Live Music</Dropdown.Item>
                <Dropdown.Item eventKey="type=O">Outdoor venue</Dropdown.Item>
                <Dropdown.Item eventKey="type=T">Theatre</Dropdown.Item>
                <Dropdown.Item eventKey="type=S">Sports ground</Dropdown.Item>
                <Dropdown.Item eventKey="type=G">Gallery</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Button type="submit">Apply Filters</Button> */}
          </form>
          <Form
            className="d-flex mx-3"
            onChange={(e) => ticketChecker(e.currentTarget.value)}
          >
            <div className="mb-3 mx-3">
              <Form.Check id="checkbox" label="checkbox" />
            </div>
          </Form>
        </div>

        <div className="dates mt-3 d-flex">
          <form className="d-flex" onChange={(e) => minDateFilter(e)}>
            <div className="d-flex">
              <Form.Label className="w-100 mx-2">Start Date: </Form.Label>
              <InputGroup>
                <FormControl
                  type="date"
                  aria-label="date"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </div>
          </form>
          <form onChange={(e) => maxDateFilter(e)}>
            <div className="d-flex">
              <Form.Label className="w-100 mx-2">End Date: </Form.Label>
              <InputGroup>
                <FormControl
                  type="date"
                  aria-label="date"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </div>
          </form>
        </div>
        {/* title, search and filter container. HTML element is fixed END */}
        {/* results container START */}

        {!filtered.results ? (
          <div className="mt-5 mx-5">
            <h1>Please Enter A Search</h1>
          </div>
        ) : (
          <div
            className="results-container"
            style={{
              marginTop: "10vh",
              width: "120vh",
              height: "64vh",
              // position: "absolute",
              // left: "5vh",
              overflowY: "scroll",
              overflowX: "hidden",
              scrollbarWidth: "none",
            }}
          >
            <div className="events-main-container" style={{ marginTop: "5vh" }}>
              {!info.results ? (
                <div>
                  <h1>Loading....</h1>
                </div>
              ) : (
                Object.entries(filtered.results).map(([key, i]) => {
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
                            <h3 className="card-title text-center">
                              {i.eventname}
                            </h3>
                            <p className="text-center">{i.description}</p>
                            <div className="d-flex p-0">
                              <div className="time-date mx-3">
                                <p className="card-text">
                                  Venue: {i.venue.name}
                                </p>
                                <div className="date-container">
                                  <p className="">Event Date: {i.date}</p>
                                </div>
                                <div className="door-times">
                                  <p>Doors Open: {i.openingtimes.doorsopen}</p>
                                  <p>
                                    Doors Close: {i.openingtimes.doorsclose}
                                  </p>
                                </div>
                              </div>
                              <div className="links-container d-flex flex-column">
                                <div className="website-links-container">
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary mx-2"
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
                                    className="btn btn-outline-primary mx-2"
                                  >
                                    <a
                                      href={`https://www.google.com/maps/search/?api=1&query=${i.venue.latitude}%2C${i.venue.longitude}`}
                                      target="_blank"
                                      style={{ textDecoration: "none" }}
                                    >
                                      Google Maps Link
                                    </a>
                                  </button>
                                  <div className="share-links-container mt-2">
                                    <Button className="mx-2">
                                      <i
                                        className="bi bi-whatsapp"
                                        onClick={() =>
                                          (window.location.href = `whatsapp://send?text=Check out: ${i.link}`)
                                        }
                                      />
                                    </Button>
                                    {/* google cal does not work info gets blocked by google */}
                                    <Button className="mx-2">
                                      <i
                                        className="bi bi-calendar-event"
                                        onClick={() =>
                                          (window.location.href = `https://www.google.com/calendar/render?text=${i.eventname}&dates=${i.date}`)
                                        }
                                      />
                                    </Button>
                                    <Button className="mx-2">
                                      <i
                                        className="bi bi-envelope"
                                        onClick={() =>
                                          (window.location.href = `mailto:?subject=${i.eventname}&body=Check out event ${i.link}`)
                                        }
                                      />
                                    </Button>
                                  </div>
                                </div>
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
        )}
        {/* results containerEND */}
      </div>
    </div>
  );
}

export default SearchPage;
