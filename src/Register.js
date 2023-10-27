import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [password, passwordchange] = useState("");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("male");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter valid value";
    if (id === "" || id === null) {
      isproceed = false;
      errormessage += " Username";
    }
    if (name === "" || name === null) {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (email === "" || email === null) {
      isproceed = false;
      errormessage += " Email";
    }
    if (password === "" || password === null) {
      isproceed = false;
      errormessage += " Password";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        isproceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isproceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let regobj = { id, name, password, email, phone, address, gender };
    if (IsValidate()) {
      try {
        await axios.post("http://localhost:8000/user", regobj);
        toast.success("Success");
        navigate("/login");
      } catch (error) {
        alert("User already registered!!!");
      }
    }
  };

  return (
    <div className="container">
      <div className="card mt-5">
        <div className="card-header">
          <h1 className="text-center">User Registration</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    User Name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={id}
                    onChange={(e) => idchange(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Password <span className="errmsg">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                    type="password"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Full Name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Email <span className="errmsg">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    type="email"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Phone <span className="errmsg">*</span>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => phonechange(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    Address <span className="errmsg">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => addresschange(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Gender <span className="errmsg">*</span>
                  </label>
                  <br />
                  <input
                    type="radio"
                    checked={gender === "male"}
                    onChange={() => genderchange("male")}
                    name="gender"
                    value="male"
                    className="app-check"
                  />
                  <label>Male</label>
                  <input
                    type="radio"
                    checked={gender === "female"}
                    onChange={() => genderchange("female")}
                    name="gender"
                    value="female"
                    className="app-check"
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer text-center">
          <button type="submit" className="btn btn-primary">
            Register
          </button>{" "}
          |
          <Link to="/login" className="btn btn-danger">
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
