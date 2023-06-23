import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [displayUsername, setDisplayUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowMenu(false);
    } else {
      setShowMenu(true);
      let username = sessionStorage.getItem("username");
      if (username === "" || username === null) {
        navigate("/login");
      } else {
        setDisplayUsername(username);
      }
    }
  }, [location, navigate]);

  return (
    <div>
      {showMenu && (
        <div className="home">
          <Link to={"/todo"}>TodoList</Link>
          <span style={{ marginLeft: "70%" }}>
            Welcome <b>{displayUsername}</b>
          </span>
          <Link style={{ float: "right" }} to={"/login"}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;