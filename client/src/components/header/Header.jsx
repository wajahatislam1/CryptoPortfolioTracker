import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Header.module.css";
import useAuth from "../../hooks/useAuth";
import { userSignOut } from "../../redux/slices/user.slice";

const Header = () => {
  const { loggedIn } = useAuth();
  const dispatch = useDispatch();

  const onSignOutClick = (event) => {
    event.preventDefault();
    dispatch(userSignOut());
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Portfolio Manager</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/portfolios">Portfolios</Link>
          </li>
          {loggedIn ? (
            <>
              <li onClick={onSignOutClick}> Sign Out</li>
            </>
          ) : (
            <li>
              <Link to="/users/auth/">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
