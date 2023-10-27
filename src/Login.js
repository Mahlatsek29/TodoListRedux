import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [username, updateusername] = useState("");
  const [password, updatepassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.get("http://localhost:8000/user/");
        const userData = response.data;
        const user1 = userData.some((item) => item.id == username);
        console.log(user1);
        if (user1) {
          toast.success("Success");
          navigate("/todo");
        } else {
          alert("Please enter valid credentials");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please enter a username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please enter a password");
    }
    return result;
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <div className="card">
          <div className="card-header">
            <h2>User Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={proceedLogin} className="container">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => updateusername(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => updatepassword(e.target.value)}
                  type="password"
                  className="form-control"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary" onClick={proceedLogin}>
              Login
            </button>
            <Link to="/register" className="btn btn-success">
              New User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
