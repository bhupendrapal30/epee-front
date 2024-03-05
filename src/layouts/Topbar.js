// @flow
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

// actions
import { ChangeLeftSideBarType, SetTheme } from "../redux/slices/SettingSlice";

// components
import LanguageDropdown from "../components/LanguageDropdown";
import NotificationDropdown from "../components/Ui/NotificationDropdown";
import ProfileDropdown from "../components/Ui/ProfileDropdown";
import SearchDropdown from "../components/Ui/SearchDropdown";
import TopbarSearch from "../components/Ui/TopbarSearch";
import AppsDropdown from "../components/AppsDropdown/";

// images
import avatar1 from "../assets/images/users/avatar-2.jpg";
import avatar2 from "../assets/images/users/avatar-4.jpg";
import logoSmDark from "../assets/images/logo_sm_dark.png";
import logoSmLight from "../assets/images/logo_sm.png";
import logo from "../assets/images/logo.png";

//constants
import * as layoutConstants from "../redux/slices/SettingSlice";

// get the notifications
const Notifications = [
  {
    day: "Today",
    messages: [
      {
        id: 1,
        title: "Datacorp",
        subText: "Caleb Flakelar commented on Admin",
        time: "1 min ago",
        icon: "mdi mdi-comment-account-outline",
        variant: "primary",
        isRead: false,
      },
      {
        id: 2,
        title: "Admin",
        subText: "New user registered.",
        time: "1 hours ago",
        icon: "mdi mdi-account-plus",
        variant: "info",
        isRead: true,
      },
    ],
  },
  {
    day: "Yesterday",
    messages: [
      {
        id: 1,
        title: "Cristina Pride",
        subText: "Hi, How are you? What about our next meeting",
        time: "1 day ago",
        avatar: avatar1,
        isRead: true,
      },
    ],
  },
  {
    day: "30 Dec 2021",
    messages: [
      {
        id: 1,
        title: "Datacorp",
        subText: "Caleb Flakelar commented on Admin",
        icon: "mdi mdi-comment-account-outline",
        variant: "primary",
        isRead: true,
      },
      {
        id: 2,
        title: "Karen Robinson",
        subText: "Wow ! this admin looks good and awesome design",
        avatar: avatar2,
        isRead: true,
      },
    ],
  },
];

// get the profilemenu
const ProfileMenus = [
  {
    label: "My Account",
    icon: "mdi mdi-account-circle",
    redirectTo: "/account/profile",
  },
  {
    label: "Settings",
    icon: "mdi mdi-account-edit",
    redirectTo: "/account/setting",
  },
  {
    label: "Logout",
    icon: "mdi mdi-logout",
    redirectTo: "/account/logout",
  },
];

const Topbar = ({
  hideLogo,
  navCssClasses,
  openLeftMenuCallBack,
  topbarDark,
}) => {
  const dispatch = useDispatch();

  const [isopen, setIsopen] = useState(false);
  const { UserDetails } = useSelector((state) => state.User);

  const navbarCssClasses = navCssClasses || "";
  const containerCssClasses = !hideLogo ? "container-fluid" : "";

  const { LayoutType, LeftSideBarType, LayoutColor } = useSelector(
    (state) => state.Setting,
  );

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen((prevState) => !prevState);
    if (openLeftMenuCallBack) openLeftMenuCallBack();

    switch (LayoutType) {
      case layoutConstants.LAYOUT_VERTICAL:
        // condition added
        if (window.innerWidth >= 768) {
          if (LeftSideBarType === "fixed" || LeftSideBarType === "scrollable")
            dispatch(
              ChangeLeftSideBarType(
                layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED,
              ),
            );
          if (LeftSideBarType === "condensed")
            dispatch(
              ChangeLeftSideBarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED),
            );
        }
        break;

      case layoutConstants.LAYOUT_FULL:
        if (document.body) {
          document.body.classList.toggle("hide-menu");
        }
        break;
      default:
        break;
    }
  };

  return (
    <> 

      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" ><img src="../assets/images/logo.jpg" alt="logo" style={{width: "100%",height:"53px"}} /></a>
          <a className="navbar-brand brand-logo-mini" ><img src="../assets/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-menu" />
          </button>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify" />
                </div>
                <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <ProfileDropdown
                
                menuItems={ProfileMenus}
                username={UserDetails?.fname + " " + UserDetails?.lname}
                userTitle={UserDetails?.usertype==1?"Admin":"--"}
              />
              
            </li>
            <li className="nav-item d-none d-lg-block full-screen-link">
              <a className="nav-link">
                <i className="mdi mdi-fullscreen" id="fullscreen-button" />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown"  data-bs-toggle="dropdown" aria-expanded="false">
                <i className="mdi mdi-email-outline" />
                <span className="count-symbol bg-warning" />
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                <h6 className="p-3 mb-0">Messages</h6>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="../assets/images/faces/face4.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                    <p className="text-gray mb-0"> 1 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="assets/images/faces/face2.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                    <p className="text-gray mb-0"> 15 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="assets/images/faces/face3.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                    <p className="text-gray mb-0"> 18 Minutes ago </p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <h6 className="p-3 mb-0 text-center">4 new messages</h6>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                <i className="mdi mdi-bell-outline" />
                <span className="count-symbol bg-danger" />
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <h6 className="p-3 mb-0">Notifications</h6>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="mdi mdi-calendar" />
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Event today</h6>
                    <p className="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="mdi mdi-settings" />
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Settings</h6>
                    <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="mdi mdi-link-variant" />
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                    <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <h6 className="p-3 mb-0 text-center">See all notifications</h6>
              </div>
            </li>
            <li className="nav-item nav-logout d-none d-lg-block">
              <a className="nav-link" href="#">
                <i className="mdi mdi-power" />
              </a>
            </li>
            <li className="nav-item nav-settings d-none d-lg-block">
              <a className="nav-link" href="#">
                <i className="mdi mdi-format-line-spacing" />
              </a>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu" />
          </button>
        </div>
      </nav>
      

    
    </>
  );
};

export default Topbar;
