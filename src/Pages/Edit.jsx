import React, { useEffect, useState } from "react";
import SideBare from "../Compontes/SideBare";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

function Edit({id}) {
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
      book_name: "",
      book_image: "",
      book_author: "",
      book_isbn: "",
      book_publish_date: "",
      id: 0,
  })
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`https://66484b172bb946cf2fa01996.mockapi.io/api/Books/${id}`)
      .then((res) => setEditData(res.data))
      .catch((error) => console.log(error));
    
  };

  useEffect(()=>{
    formik.setValues(editData)
  },[editData])

  const validationSchema = Yup.object().shape({
    book_name:Yup.string().required('Name is requried'),
    book_author:Yup.string().required('Author name is requried'),
    book_image:Yup.string().required('URL is requried'),
    book_isbn:Yup.number().required('ISBN is requried'),
    book_publish_date:Yup.date().required('Date is requried'),
  });

  const formik = useFormik({
    initialValues: {
      book_name: editData.book_name,
      book_image: editData.book_image,
      book_author: editData.book_author,
      book_isbn: editData.book_isbn,
      book_publish_date: editData.book_publish_date,
      id: id,
    },
    validationSchema,
    onSubmit: async (values) =>  {
      await axios
        .put(
          `https://66484b172bb946cf2fa01996.mockapi.io/api/Books/${id}`,
          values
        )
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
  
      navigate("/");
    },
  });

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBare />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="container mt-5">
            <div className="row">
              <div className="col align-self-end card">
                <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                    <div class="mb-3">
                      <label for="id" class="form-label">
                        Id
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="id"
                        value={length + 1}
                        onChange={formik.handleChange}
                        disabled
                      />
                    </div>
                    <div class="mb-3">
                      <label for="name" class="form-label">
                        Books Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="book_name"
                        value={formik.values.book_name}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="text-danger"><p>{formik.errors.book_name}</p></div>
                    <div class="mb-3">
                      <label for="phone" class="form-label">
                        ISBN Number
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="book_isbn"
                        value={formik.values.book_isbn}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="text-danger"><p>{formik.errors.book_isbn}</p></div>
                    <div class="mb-3">
                      <label for="email" class="form-label">
                        Book Author
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="book_author"
                        aria-describedby="emailHelp"
                        value={formik.values.book_author}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="text-danger"><p>{formik.errors.book_author}</p></div>
                    <div class="mb-3">
                      <label for="username" class="form-label">
                        Book Image
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="book_image"
                        value={formik.values.book_image}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="text-danger"><p>{formik.errors.book_image}</p></div>
                    <div class="mb-3">
                      <label for="street" class="form-label">
                        Publish date
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        name="book_publish_date"
                        value={formik.values.book_publish_date}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="text-danger"><p>{formik.errors.book_publish_date}</p></div>
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Edit;