//React imports
import { ReactDOM } from "react";
import React, { useState, useEffect, createContext } from "react";
// Axios import
import axios from "axios";
// css import
import "bootstrap/dist/css/bootstrap.css";

// const for API url + key start
const API_KEY = "api_key=97ce8af631b47d3c6e4e0e2c6d81d3aa";
const URL = "https://www.skiddle.com/api/v1/events/search/?";
let filterURL = `${URL}${API_KEY}`;
// const for API url + key end

export const APIContext = createContext();

const FetchAPI = ({ children }) => {
  const [info, setInfo] = useState({});
  const [filtered, setFiltered] = useState({}); // for later use in country search terms
  const [dropFilters, setDropFilters] = useState({});

  useEffect(() => {
    // get trending information from api
    function importAPI(e = `${URL}${API_KEY}&trending`) {
      axios
        .get(e)
        .then((response) => {
          try {
            if (response.status == 200) {
              // console.log(response.data);
              return response.data;
            }
          } catch (error) {
            console.error(error);
          }
        })
        .then((data) => {
          return setInfo(data);
        });
    }
    importAPI();
  }, []);

  const SearchFilter = (event) => {
    filterURL = filterURL + event;
    console.log(filterURL);
    console.log(filtered);
    console.log(dropFilters);

    axios
      .get(filterURL)
      .then((response) => {
        try {
          if (response.status == 200) {
            // console.log(response.data);
            return response.data;
          }
        } catch (error) {
          console.error(error);
        }
      })
      .then((data) => {
        // console.log(data);
        return setFiltered(data);
      });
  };

  return (
    <APIContext.Provider
      value={{
        info: { ...info },
        filtered: { ...filtered },
        dropFilters: { ...dropFilters },
        setDropFilters: setDropFilters,
        setFiltered: setFiltered,
        SearchFilter: SearchFilter,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
export default FetchAPI;
