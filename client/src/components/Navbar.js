import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleNavbar = () => {
    setToggle((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary p-2">
      <Link className="navbar-brand" to="/">
        Book An Appointment
      </Link>
      <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${toggle && "show"}`}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/add_event">
              Add An Event
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/events">
              All The Events
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
