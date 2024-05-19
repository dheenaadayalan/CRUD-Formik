
import SideBare from "../Compontes/SideBare";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function EditHome({ setId, setlength }) {
  const [data, sedivata] = useState([]);
  const [deleteData, sediveleteData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [deleteData]);

  const fetchData = async () => {
    await axios
      .get("https://66484b172bb946cf2fa01996.mockapi.io/api/Books")
      .then((res) => sedivata(res.data))
      .catch((error) => console.log(error));
  };

  const handelDelect = async (id) => {
    if (confirm("Are you sure to delete the contact") == true) {
      console.log(id);
      await axios
        .delete(`https://66484b172bb946cf2fa01996.mockapi.io/api/Books/${id}`)
        .then((res) => sediveleteData(res.data))
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  const handelEdit = (id) => {
    setId(id);
    console.log(id);
    navigate(`/edit/${id}`);
  };

  setlength(data.length);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBare />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="card card-title mt-5">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h6>Book Image</h6>
                </div>
                <div className="col">
                  <h6>Book Name</h6>
                </div>

                <div className="col">
                  <h6>Author Name</h6>
                </div>
                <div className="col">
                  <h6>ISBN number</h6>
                </div>
                <div className="col">
                  <h6>Publish Date</h6>
                </div>
                <div className="col">
                  <h6>Edit/Delete</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-main mt-3">
            <div className="card-body">
              <div className="content">
                <div className="row">
                  {data.map((element, index) => {
                    return (
                      <div className="container p-2">
                        <div className="row" key={index}>
                          <div className="col">
                            <img
                              src={element.book_image}
                              className="img-fluid p-4"
                              alt="Avatar"
                            />
                          </div>
                          <div className="col">
                            <h4>{element.book_name}</h4>
                          </div>
                          <div className="col">
                            <h6>{element.book_author}</h6>
                          </div>
                          <div className="col">
                            <h6>{element.book_isbn}</h6>
                          </div>
                          <div className="col">
                            <h6>{element.book_publish_date}</h6>
                          </div>
                          <div className="col">
                            <div className="d-grid gap-2">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  handelEdit(element.id);
                                }}
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  handelDelect(element.id);
                                }}
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default EditHome;
