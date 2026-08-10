import { useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "../../images/logo.svg";
import menuIcon from "../../images/menu.svg";
import menuCloseIcon from "../../images/menu-close.svg";

function Header(props) {
  const { loggedIn, email, onSignOut } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSignOutClick() {
    setIsMenuOpen(false);
    onSignOut();
  }

  const guestLink =
    location.pathname === "/signup"
      ? { path: "/signin", text: "Iniciar sesión" }
      : { path: "/signup", text: "Regístrate" };

  return (
    <>
      {loggedIn && isMenuOpen && (
        <div className="header__menu page__section">
          <p className="header__email">{email}</p>
          <button
            className="header__signout"
            type="button"
            onClick={handleSignOutClick}
          >
            Cerrar sesión
          </button>
        </div>
      )}
      <header
        className={`header page__section${
          loggedIn && isMenuOpen ? " header_menu_opened" : ""
        }`}
      >
        <img
          alt="Logotipo Around The U.S."
          className="logo header__logo"
          src={logo}
        />
        {loggedIn ? (
          <>
            <div className="header__account">
              <p className="header__email">{email}</p>
              <button
                className="header__signout"
                type="button"
                onClick={onSignOut}
              >
                Cerrar sesión
              </button>
            </div>
            <button
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="header__menu-button"
              type="button"
              onClick={handleMenuToggle}
            >
              <img
                alt=""
                className="header__menu-icon"
                src={isMenuOpen ? menuCloseIcon : menuIcon}
              />
            </button>
          </>
        ) : (
          <Link className="header__link" to={guestLink.path}>
            {guestLink.text}
          </Link>
        )}
      </header>
    </>
  );
}

export default Header;
