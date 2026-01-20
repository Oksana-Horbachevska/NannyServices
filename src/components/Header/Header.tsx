import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";
import css from "./Header.module.css";
import { useAuthStore } from "../../store/authStore";
import { logoutUser } from "../../services/auth";

export default function Header() {
  const { openLogin, openRegister } = useUiStore();
  const { user } = useAuthStore(); // Дістаємо юзера
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

                {user && (
                  <li className={css.navItem}>
                    <Link className={css.navLink} to="/favorites">
                      Favorites
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            <div className={css.navAuthList}>
              {user ? (
                <div className={css.userContainer}>
                  <div className={css.userInfo}>
                    <div className={css.userIconWrapper}>
                      <svg width="24" height="24" className={css.userIcon}>
                        <use href="/sprite.svg#icon-mdi_user" />
                      </svg>
                    </div>
                    <span className={css.userName}>
                      {user.displayName || "User"}
                    </span>
                  </div>
                  <button
                    onClick={() => logoutUser()}
                    className={`${css.navAuthItem} ${css.navAuthItemTrasparent}`}
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={openLogin}
                    className={`${css.navAuthItem} ${css.navAuthItemTrasparent}`}
                  >
                    Log in
                  </button>
                  <button
                    onClick={openRegister}
                    className={`${css.navAuthItem} ${css.navAuthItemRegister}`}
                  >
                    Registration
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
