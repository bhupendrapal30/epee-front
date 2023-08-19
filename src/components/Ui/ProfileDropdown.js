// @flow
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { SetLogout } from "../../redux/slices/AuthSlice";


const ProfileDropdown = (props) => {
  const profilePic = props.profilePic || null;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 
  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>

     <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="nav-profile-img">
                  <img src="../assets/images/faces/face1.jpg" alt="image"/>
                  <span className="availability-status online"></span>
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">{props.username}</p>
                  <p className="mb-1 text-black"><b>{props.userTitle}</b></p>
                </div>
              </a>

              <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                <Link className="dropdown-item" href="#">
                  <i className="mdi mdi-cached me-2 text-success"></i> Activity Log </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" href="#" onClick={() => dispatch(SetLogout())}   >
                  <i className="mdi mdi-logout me-2 text-primary"></i> Signout </Link>
              </div>
 
    
      
    </Dropdown>
  );
};

export default ProfileDropdown;
