import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
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
            <ul className={css.navAuthList}>
              <li className={`${css.navAuthItem} ${css.navAuthItemLogin}`}>
                <Link className={css.navAuthLink} to="/">
                  Log in
                </Link>
              </li>
              <li className={`${css.navAuthItem} ${css.navAuthItemRegister}`}>
                <Link className={css.navAuthLink} to="/">
                  Registration
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
