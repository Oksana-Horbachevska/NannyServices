import { Link } from "react-router-dom";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <div className={css.hero}>
        <div className={css.inner}>
          <div className={css.left}>
            <div className={css.titleWrapper}>
              <h1 className={css.heroTitle}>
                Make Life Easier for the Family:
              </h1>
              <p className={css.heroText}>
                Find Babysitters Online for All Occasions
              </p>
              <Link to="/nannies" className={css.btn}>
                Get started →
              </Link>
            </div>
          </div>
          <div className={css.right}>
            <div className={css.popup}>
              <svg
                className={css.popupSvg}
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <use href="/sprite.svg#icon-fe_check" />
              </svg>
              <div className={css.popupContent}>
                <p className={css.popupText}>Experienced nannies</p>
                <p className={css.popupPrice}>15,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
