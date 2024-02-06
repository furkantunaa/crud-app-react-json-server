import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3030/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container ">
      <h2 className="d-flex justify-content-center mt-5 text-body-secondary ">
        {" "}
        Crud App with JSON Server
      </h2>
      <Link to="/create" className="btn btn-success my-3">
        Create +
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <Link
                  className="text-decoration-none btn btn-sm btn-success"
                  to={`/update/${d.id}`}
                >
                  Update
                </Link>
                <button
                  className="text-decoration-none btn btn-sm btn-danger"
                  onClick={(e) => handleDelete(d.id)}
                >
                  Delete
                </button>
                <Link
                  className="text-decoration-none btn btn-sm btn-primary"
                  to={`/read/${d.id}`}
                >
                  Read
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(id) {
    const confirm = window.confirm("Do you like to Delete?");
    if (confirm) {
      const newData = data.filter((item) => item.id !== id);
      console.log(newData);
      axios.delete("http://localhost:3030/users/" + id).then((res) => {
        alert("Record Deleted");
        navigate("/");
        setData(newData);
      });
    }
  }
}

export default Home;
