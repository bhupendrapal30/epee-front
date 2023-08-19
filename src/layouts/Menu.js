import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import classNames from "classnames";


import { findAllParent, findMenuItem } from "../helpers/menu";

const MenuItemWithChildren = ({
  item,
  linkClassName,
  subMenuClassNames,
  activeMenuItems,
  toggleMenu,
}) => {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));
  const { UserDetails } = useSelector((state) => state.User);
  const permissionType = ['dashboard','files','roles','user','permission'];
  

  useEffect(() => {
    setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item]);

  const toggleMenuItem = (e) => {
    e.preventDefault();
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return (
    <li className={classNames("nav-item", { "active": open })}>
      <Link
        to="/#"
        onClick={toggleMenuItem}
        data-menu-key={item.key}
        aria-expanded={open}
        className={classNames("has-arrow", "nav-link", linkClassName, {
          "menuitem-active": activeMenuItems.includes(item.key) ? "active" : "",
        })}
      >
        {item.icon && item.icon}
        {!item.badge ? (
          <span className="menu-arrow"></span>
        ) : (
          <span
            className={classNames(
              "menu-title",
              "bg-" + item.badge.variant,
              "float-end",
              {
                "text-dark": item.badge.variant === "light",
              },
            )}
          >
            {item.badge.text}
          </span>
        )}
        <span> {item.label} </span>
      </Link>
      <Collapse in={open}>
        <ul className={classNames(subMenuClassNames)}>
          {item.children.map((child, i) => {
            return (
              <React.Fragment key={i}>
                {child.children ? (
                  <>
                    {/* parent */}
                    <MenuItemWithChildren
                      item={child}
                      linkClassName={
                        activeMenuItems.includes(child.key) ? "active" : ""
                      }
                      activeMenuItems={activeMenuItems}
                      subMenuClassNames="side-nav-third-level"
                      toggleMenu={toggleMenu}
                    />
                  </>
                ) : (
                  <>
                    {/* child */}
                    <MenuItem
                      item={child}
                      className={
                        activeMenuItems.includes(child.key)
                          ? "menuitem-active"
                          : ""
                      }
                      linkClassName={
                        activeMenuItems.includes(child.key) ? "active" : ""
                      }
                    />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </Collapse>
    </li>
  );
};

const MenuItem = ({ item, className, linkClassName }) => {
  const { UserDetails } = useSelector((state) => state.User);
  return (
    <li className={classNames("side-nav-item", className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

const MenuItemLink = ({ item, className }) => {
  return (
    <Link
      to={{ pathname: item.url }}
      target={item.target}
      className={classNames(
        "nav-link",
        "side-sub-nav-link",
        className,
      )}
      data-menu-key={item.key}
    >
      {item.icon && item.icon}
      {item.badge && (
        <span
          className={classNames(
            "badge",
            "bg-" + item.badge.variant,
            "rounded-pill",
            "font-10",
            "float-end",
            {
              "text-dark": item.badge.variant === "light",
            },
          )}
        >
          {item.badge.text}
        </span>
      )}
      <span> {item.label} </span>
    </Link>
  );
};

/**
 * Renders the application menu
 */

type AppMenuProps = {
  menuItems: Array<any>,
};

const AppMenu = ({
  menuItems,
}: AppMenuProps): React$Element<React$FragmentType> => {
  let location = useLocation();
  const menuRef = useRef(null);
  const { UserDetails } = useSelector((state) => state.User);

  const [activeMenuItems, setActiveMenuItems] = useState([]);

  /*
   * toggle the menus
   */
  const toggleMenu = (menuItem, show) => {
    if (show)
      setActiveMenuItems([
        menuItem["key"],
        ...findAllParent(menuItems, menuItem),
      ]);
  };

  /**
   * activate the menuitems
   */
  const activeMenu = useCallback(() => {
    const div = document.getElementById("main-side-menu");
    let matchingMenuItem = null;

    if (div) {
      let items: any = div.getElementsByClassName("side-nav-link-ref");
      for (let i = 0; i < items.length; ++i) {
        if (location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute("data-menu-key");
        const activeMt = findMenuItem(menuItems, mid);
        if (activeMt) {
          setActiveMenuItems([
            activeMt["key"],
            ...findAllParent(menuItems, activeMt),
          ]);
        }
      }
    }
  }, [location.pathname, menuItems]);
  
  useEffect(() => {
    activeMenu();
  }, [activeMenu]);

  return (
    <>
        <nav className="sidebar sidebar-offcanvas" ref={menuRef}  id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="#" className="nav-link">
              <div className="nav-profile-image">
                <img src="../assets/images/faces/face1.jpg" alt="profile" />
                <span className="login-status online" />
               
              </div>
              <div className="nav-profile-text d-flex flex-column">
                <span className="font-weight-bold mb-2">{UserDetails.fname+" "+UserDetails.lname }</span>
                
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
            </a>
          </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Dashboard</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
         {UserDetails.per?.map((record, index) => { 
          if(record.modulesname == 'user') {
           return (
            
            
             <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <span className="menu-title">Users</span>
              <i className="menu-arrow" />
              <i className="mdi mdi-account-plus" />
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
               {record.addedit==1 ? (
                <li className="nav-item"> <Link to ="/users/users-create-update" className="nav-link" >New User</Link></li>):''}
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >Users Listing</Link></li>
              </ul>
            </div>
          </li>
           
            );
          }

          if(record.modulesname == 'roles') {
               return (
                
                
                      <li className="nav-item">
                <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic1" aria-expanded="false" aria-controls="ui-basic">
                  <span className="menu-title">Roles</span>
                  <i className="menu-arrow" />
                  <i className="mdi mdi-access-point-network" />
                </a>
                <div className="collapse" id="ui-basic1">
                  <ul className="nav flex-column sub-menu">
                   {record.addedit==1 ? (
                    <li className="nav-item"> <Link to ="/roles/roles-create-update" className="nav-link" >New Role</Link></li>):''}
                    <li className="nav-item"> <Link to ="/roles/roles-list" className="nav-link" >Roles Listing</Link></li>
                  </ul>
                </div>
              </li>
                );
              }
              if(record.modulesname == 'permission') {
               return (
                
                
                 <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic2" aria-expanded="false" aria-controls="ui-basic">
                    <span className="menu-title">Permission</span>
                    <i className="menu-arrow" />
                    <i className="mdi mdi-account-key" />
                  </a>
                  <div className="collapse" id="ui-basic2">
                    <ul className="nav flex-column sub-menu">
                     {record.addedit==1 ? ( <li className="nav-item"> <Link to ="/permission/permission-create-update" className="nav-link" >New Permission</Link></li>):''}
                      <li className="nav-item"> <Link  className="nav-link" to="/permission/permission-list">Permission Listing</Link></li>
                    </ul>
                  </div>
                </li>
                );
              }
              
              if(record.modulesname == 'files') {
               return (
                
                
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic3" aria-expanded="false" aria-controls="ui-basic">
                      <span className="menu-title">Policies</span>
                      <i className="menu-arrow" />
                      <i className="mdi mdi-crosshairs-gps menu-icon" />
                    </a>
                    <div className="collapse" id="ui-basic3">
                      <ul className="nav flex-column sub-menu">
                        <li className="nav-item"> <Link to ="/policies/policy-create-update" className="nav-link" >New Policy</Link></li>
                        <li className="nav-item"> <Link className="nav-link" to="/policies/policy-list">Policy Listing</Link></li>
                      </ul>
                    </div>
                  </li>
                );
              }

             })}

          
         
          
          


        </ul>
      </nav>


     
    </>
  );
};

export default AppMenu;
