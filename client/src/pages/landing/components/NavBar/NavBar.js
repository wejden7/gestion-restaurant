import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginPath, registerPath } from "utils/router/path.utils";
import { getUser } from "state/AuthSlice";
import { AvatarUser } from "components";
import "./NavBar.style.scss";

function NavBar() {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const signIn = () => {
    navigate(loginPath);
  };
  const signUp = () => {
    navigate(registerPath);
  };

  return (
    <div className="nav-bar">
      <div className="logo" data-text="TecPro">
        TecPro
      </div>

      <div className="nav-auth">
        {user ? (
          <AvatarUser user={user} />
        ) : (
          <>
            <button onClick={signIn} className="button-in">
              Sign In
            </button>
            <button onClick={signUp} className="button-up">
              Sign Up For Free
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
