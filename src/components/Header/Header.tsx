import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";
import css from "./Header.module.css";

export default function Header() {
  const { openLogin, openRegister } = useUiStore();
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  return (
    <header className={isHome ? css.headerHome : css.headerDefault}>
      <div className="container">
        <div className={css.headerContainer}>
          <div className={css.logoContainer}>
            <Link className={css.logoLink} to="/">
              Nanny.Services
            </Link>
          </div>
          <div className={css.navWrapper}>
            <nav className={css.navContainer}>
              <ul className={css.navList}>
                <li className={css.navItem}>
                  <Link className={css.navLink} to="/">
                    Home
                  </Link>
                </li>
                <li className={css.navItem}>
                  <Link className={css.navLink} to="/nannies">
                    Nannies
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={css.navAuthList}>
              <button
                onClick={openLogin}
                className={`${css.navAuthItem} ${css.navAuthItemLogin}`}
              >
                Log in
              </button>
              <button
                onClick={openRegister}
                className={`${css.navAuthItem} ${css.navAuthItemRegister}`}
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
