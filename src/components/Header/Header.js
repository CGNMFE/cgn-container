import React from "react";
import { Auth } from "aws-amplify";
import { HeaderWrapper } from "../../styledcomponents";

function Header(props) {
  const [dropdownToggled, toggleDropdown] = React.useState(false);
  const { user } = props;
  if (user) console.log(user);

  function toggleMenu() {
    toggleDropdown(!dropdownToggled);
  }

  function logoutUser() {
    Auth.signOut();
    props.logout();
  }
  return (
    <HeaderWrapper>
      <div
        className={"dropdown " + (dropdownToggled ? "is-active" : "")}
        onClick={toggleMenu}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu6"
            style={{ borderRadius: "50px" }}
          >
            <span>{user.username}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu6" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <a href="/admin/createuser">Create User</a>
            </div>
            <div className="dropdown-item" onClick={logoutUser}>
              <a href="/">Logout</a>
            </div>
          </div>
        </div>
      </div>
      <img
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          border: "1px solid yellowgreen",
          margin: "0px 10px"
        }}
        src={user.attributes.profilePic}
        alt="profile art"
      />
    </HeaderWrapper>
  );
}

export default Header;
