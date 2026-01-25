import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";
import css from "./Header.module.css";
import { useAuthStore } from "../../store/authStore";
import { logoutUser } from "../../services/auth";
import { useEffect } from "react";

export default function Header() {
  const { openLogin, openRegister, isMenuOpen, toggleMenu, closeMenu } =
    useUiStore();
  const { user } = useAuthStore();
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeMenu]);

  // Close menu if innerWidth >= 768
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMenu]);

  return (
    <header className={isHome ? css.headerHome : css.headerDefault}>
      <div className="container">
        <div className={css.headerContainer}>
          <div className={css.logoContainer}>
            <Link className={css.logoLink} to="/">
              Nanny.Services
            </Link>
          </div>

          <button className={css.burgerBtn} onClick={toggleMenu}>
            <svg className={css.burgerIcon} width="24" height="24">
              <use href="/sprite.svg#icon-menu"></use>
            </svg>
          </button>

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
      {/* MOBILE MODAL MENU */}
      {isMenuOpen && (
        <div className={css.menuBackdrop} onClick={closeMenu}>
          <div className={css.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <button className={css.closeMenuBtn} onClick={closeMenu}>
              ✕
            </button>

            <nav className={css.mobileNav}>
              <Link className={css.mobileLink} to="/" onClick={closeMenu}>
                Home
              </Link>
              <Link
                className={css.mobileLink}
                to="/nannies"
                onClick={closeMenu}
              >
                Nannies
              </Link>
              {user && (
                <Link
                  className={css.mobileLink}
                  to="/favorites"
                  onClick={closeMenu}
                >
                  Favorites
                </Link>
              )}
            </nav>

            <div className={css.mobileAuth}>
              {user ? (
                <div className={css.mobileUserContainer}>
                  <div className={css.mobileUserInfo}>
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
                    className={css.mobileAuthBtn}
                    onClick={() => {
                      logoutUser();
                      closeMenu();
                    }}
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className={css.mobileAuthBtn}
                    onClick={() => {
                      openLogin();
                      closeMenu();
                    }}
                  >
                    Log in
                  </button>
                  <button
                    className={css.mobileAuthBtn}
                    onClick={() => {
                      openRegister();
                      closeMenu();
                    }}
                  >
                    Registration
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
