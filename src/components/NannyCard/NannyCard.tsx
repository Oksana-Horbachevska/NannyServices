import type { Nanny } from "../../types/nanny";
import css from "./NannyCard.module.css";
import Separator from "../Separator/Separator";

interface Props {
  nanny: Nanny;
}

export default function NannyCard({ nanny }: Props) {
  return (
    <li className={css.card}>
      <img className={css.avatar} src={nanny.avatar_url} alt={nanny.name} />
      <div className={css.cardInfo}>
        <div className={css.infoBlock_1}>
          <div className={css.titleInfo}>
            <p className={css.subtitle}>Nanny</p>
            <h2 className={css.titleName}>{nanny.name}</h2>
          </div>

          <div className={css.ratingInfo}>
            <p className={css.text1}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <use href="/sprite.svg#icon-map-pin" />
              </svg>{" "}
              {nanny.location} <Separator />{" "}
              <svg width="16" height="16" viewBox="0 0 16 16">
                <use href="/sprite.svg#icon-Star-2" />
              </svg>{" "}
              Rating: {nanny.rating} <Separator /> Price / 1 hour:{" "}
              <span className={css.priceSpan}> {nanny.price_per_hour}$</span>
            </p>
            <button type="button" className={css.favoriteButton}>
              <svg className={css.favoriteIcon} viewBox="0 0 26 26">
                <use href="/sprite.svg#icon-Property-1Normal"></use>
              </svg>
            </button>
          </div>
        </div>
        <div className={css.infoBlock_2}>
          <p className={css.text2}>
            Age: {nanny.birthday} <Separator />
          </p>
          <p className={css.text2}>Experience: {nanny.experience}</p>
          <p className={css.text2}>Kids Age: {nanny.kids_age}</p>
          <p className={css.text2}>Characters: {nanny.characters}</p>
          <p className={css.text2}>Education: {nanny.education}</p>
        </div>
        <p className={css.textAbout}>{nanny.about}</p>
        <button type="button" className={css.readMore}>
          Read more
        </button>
      </div>
    </li>
  );
}
