import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const sortOptions = [
    "Make",
    "BikeID",
    "Model",
    "Year",
    "Displacement",
    "Price",
    "Terrain",
    "Description",
  ];

  useEffect(() => {
    loadUsersData();
  }, []);

  const loadUsersData = async () => {
    return await axios
      .get("http://localhost:5000/users")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  console.log("data", data);

  const handleReset = () => {
    loadUsersData();
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:5000/users?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios
      .get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <MDBContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "300px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
          }}
          className="d-flex input-group w-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Make..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </form>
        <div style={{ marginRight: "10px", marginTop: "10px" }}>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <h2 className="text-center"> Search, Filter Json using Rest Api</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">BikeID</th>
                  <th scope="col">Make</th>
                  <th scope="col">Model</th>
                  <th scope="col">Year</th>
                  <th scope="col">Displacement</th>
                  <th scope="col">Price</th>
                  <th scope="col">Terrain</th>
                  <th scope="col">Description</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      No Data Found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row"> {index + 1} </th>
                      <td>{item.BikeID}</td>
                      <td>{item.Name}</td>
                      <td>{item.Model}</td>
                      <td>{item.Year}</td>
                      <td>{item.Displacement}</td>
                      <td>{item.Price}</td>
                      <td>{item.Terrain}</td>
                      <td>{item.Description}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
      <MDBRow>
        <MDBCol size="8">
          <h5>Sort By:</h5>
          <select
            style={{ width: "50%", borderRadius: "2px", height: "35px" }}
            onChange={handleSort}
            value={sortValue}
          >
            <option>Please Select Value</option>
            {sortOptions.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
