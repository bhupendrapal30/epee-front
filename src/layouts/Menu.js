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
        <ul className="nav" style={{height:"950px",overflowY:"scroll"}}>
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
              <Link to="/dashboard" className="nav-link" >
                <span className="menu-title">Dashboard</span>
                <i className="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link" >
                <span className="menu-title">SOA</span>
                <i className="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
          {/* <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic1" aria-expanded="false" aria-controls="ui-basic">
              <span className="menu-title">Artifacts</span>
              <i className="menu-arrow" />
              <i className="mdi mdi-account-plus" />
            </a>
            <div className="collapse" id="ui-basic1">
              <ul className="nav flex-column sub-menu">
               
                <li className="nav-item"> <Link to ="/users/users-create-update" className="nav-link" >
      Manual</Link></li>
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >Policy</Link></li>
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >Procedure</Link></li>
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >Work Instruction</Link></li>
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >SOP</Link></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">People</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
           <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Trainings</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Asset Mgmt</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Access Mgmt</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Change Mgmt</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Capacity Mgmt</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Config Mgmt</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Incident Mgmt</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Risk Mgmt</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Vendor</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Vulnerability</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Records</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">WorkFlow Config</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Cloud Integrations</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>

            <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic2" aria-expanded="false" aria-controls="ui-basic">
              <span className="menu-title">Internal Audit</span>
              <i className="menu-arrow" />
              <i className="mdi mdi-account-plus" />
            </a>
            <div className="collapse" id="ui-basic2">
              <ul className="nav flex-column sub-menu">
               
               
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >Audit Repots</Link></li>
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >CAPA</Link></li>
                
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic3" aria-expanded="false" aria-controls="ui-basic">
              <span className="menu-title">External Audit</span>
              <i className="menu-arrow" />
              <i className="mdi mdi-account-plus" />
            </a>
            <div className="collapse" id="ui-basic3">
              <ul className="nav flex-column sub-menu">
               
               
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >Audit Repots</Link></li>
                <li className="nav-item"> <Link to ="/users/users-list" className="nav-link" >CAPA</Link></li>
                
              </ul>
            </div>
          </li>
          <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Management Review</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/dashboard" class="nav-link" >
                <span class="menu-title">Downloads</span>
                <i class="mdi mdi-home menu-icon"></i>
              </Link>
            </li> */}

            
         {UserDetails.per?.map((record, index) => { 
          if(record.modulesname == 'user') {
           return (
            
            
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic4" aria-expanded="false" aria-controls="ui-basic">
              <span className="menu-title">Users</span>
              <i className="menu-arrow" />
              <i className="mdi mdi-account-plus" />
            </a>
            <div className="collapse" id="ui-basic4">
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
                        <li className="nav-item"> <Link to ="/policies/policy-create-update-new" className="nav-link" >New Policy</Link></li>
                        <li className="nav-item"> <Link className="nav-link" to="/policies/policy-list">Policy Listing</Link></li>
                         <li className="nav-item"> <Link className="nav-link" to="/policies/pending-policy">Pending Policies</Link></li> 
                          <li className="nav-item"> <Link className="nav-link" to="/policies/approved-policy">Approved Policies</Link></li>
                           <li className="nav-item"> <Link className="nav-link" to="/policies/rejected-policy">Rejected Policies</Link></li>
                      </ul>
                    </div>
                  </li>
                );
              }

             })}

              <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic7" aria-expanded="false" aria-controls="ui-basic">
                    <span className="menu-title">Framework</span>
                    <i className="menu-arrow" />
                    <i className="mdi mdi-account-key" />
                  </a>
                  <div className="collapse" id="ui-basic7">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <Link to ="/framework/framework-create-update" className="nav-link" >New Framework</Link></li>
                      <li className="nav-item"> <Link  className="nav-link" to="/framework/framework-list">Framework Listing</Link></li>
                      <li className="nav-item"> <Link to ="/clause/clause-create-update" className="nav-link" >New Clause</Link></li>
                      <li className="nav-item"> <Link  className="nav-link" to="/clause/clause-list">Clause Listing</Link></li>
                      <li className="nav-item"> <Link to ="/subclause/subclause-create-update" className="nav-link" >New Sub Clause</Link></li>
                      <li className="nav-item"> <Link  className="nav-link" to="/subclause/subclause-list">Sub Clause Listing</Link></li>
                      <li className="nav-item"> <Link to ="/control/control-create-update" className="nav-link" >New Control</Link></li>
                      <li className="nav-item"> <Link  className="nav-link" to="/control/control-list">Control Listing</Link></li>
                      <li className="nav-item"> <Link to ="/subcontrol/subcontrol-create-update" className="nav-link" >New Control</Link></li>
                      <li className="nav-item"> <Link  className="nav-link" to="/subcontrol/subcontrol-list">Sub Control Listing</Link></li>

                    </ul>

                  </div>
                </li>

             <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic7" aria-expanded="false" aria-controls="ui-basic">
                    <span className="menu-title">Departments</span>
                    <i className="menu-arrow" />
                    <i className="mdi mdi-account-key" />
                  </a>
                  <div className="collapse" id="ui-basic7">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <Link to ="/department/department-create-update" className="nav-link" >New Department</Link></li>
                      <li className="nav-item"> <Link  className="nav-link" to="/department/department-list">Department Listing</Link></li>
                    </ul>
                  </div>
                </li>

             <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic14" aria-expanded="false" aria-controls="ui-basic">
                    <span className="menu-title">Risks</span>
                    <i className="menu-arrow" />
                    <i className="mdi mdi-account-key" />
                  </a>
                  <div className="collapse" id="ui-basic14">
                    <ul className="nav flex-column sub-menu">
                      <li className="nav-item"> <Link to ="/risk/risk-create-update" className="nav-link" >New Risk</Link></li>
                      <li className="nav-item"> <Link  className="nav-link" to="/risk/risk-list">Risk Listing</Link></li>
                    </ul>
                  </div>
            </li>
                
                

             <li class="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#ui-basic2"
              aria-expanded="false"
              aria-controls="ui-basic2"
            >
              <span className="menu-title">TrainingMgmt</span>
              <i className="menu-arrow" />
              <i className="mdi mdi-account-plus" />
            </a>
            <div className="collapse" id="ui-basic2">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link to="/training/quiz" className="nav-link">
                    Add Quiz
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link to="/training/questions" className="nav-link">
                    Add Questions
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link to="/training/trainingmgmt" className="nav-link">
                    Trainings
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link to="/Survey" className="nav-link">
                    Survey
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link to="/SurveyQuestion" className="nav-link">
                    Survey Question
                  </Link>
                </li>
              </ul>
            </div>
            {/* <Link to="/training/trainingmgmt" class="nav-link">
              <span class="menu-title">Trainings Mgmt</span>
              <i class="mdi mdi-home menu-icon"></i>
            </Link> */}
          </li>
         
          
          


        </ul>
      </nav>


     
    </>
  );
};

export default AppMenu;
