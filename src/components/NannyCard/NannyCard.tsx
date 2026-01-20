import type { Nanny } from "../../types/nanny";
import css from "./NannyCard.module.css";
import Separator from "../Separator/Separator";
import { calculateAge } from "../../utils/calculateAge";
import { useEffect, useState } from "react";
import { formatRating } from "../../utils/formatRating";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";
import toast from "react-hot-toast";

interface Props {
  nanny: Nanny;
  onToggleFavorite?: () => void;
}

export default function NannyCard({ nanny, onToggleFavorite }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const user = useAuthStore((state) => state.user);
  const openRegister = useUiStore((state) => state.openRegister);

  useEffect(() => {
    const favorites: Nanny[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );

    setIsFavorite(favorites.some((fav) => fav.id === nanny.id));
  }, [nanny.id]);

  const handleFavoriteClick = () => {
    // ПУНКТ 6: Якщо не авторизований
    if (!user) {
      toast.error("This functionality is available only for authorized users!");
      openRegister(); // відкриваємо модалку реєстрації
      return;
    }

    // ПУНКТ 6/7/8: Логіка для авторизованого
    const favorites: Nanny[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );

    if (isFavorite) {
      const filtered = favorites.filter((fav) => fav.id !== nanny.id);
      localStorage.setItem("favorites", JSON.stringify(filtered));
      setIsFavorite(false);
      if (onToggleFavorite) onToggleFavorite();
    } else {
      favorites.push(nanny);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      if (onToggleFavorite) onToggleFavorite();
    }
  };

  const handleReadMore = () => {
    setExpanded(true);
  };

  const age = calculateAge(nanny.birthday);

  const getInitial = (name: string) => name.trim()[0].toUpperCase();
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
              <svg
                className={css.locationIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <use href="/sprite.svg#icon-map-pin" />
              </svg>{" "}
              {nanny.location} <Separator />{" "}
              <svg
                className={css.starIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <use href="/sprite.svg#icon-Star-2" />
              </svg>{" "}
              Rating: {nanny.rating}
              <Separator />
              Price / 1 hour:{" "}
              <span className={css.priceSpan}> {nanny.price_per_hour}$</span>
            </p>
            <button
              type="button"
              className={css.favoriteButton}
              onClick={handleFavoriteClick}
            >
              <svg
                className={`${css.favoriteIcon} ${
                  isFavorite ? css.isFavorite : ""
                }`}
                viewBox="0 0 26 26"
              >
                <use href="/sprite.svg#icon-Property-1Normal"></use>
              </svg>
            </button>
          </div>
        </div>
        <div className={css.infoBlock_2}>
          <p className={css.text2}>
            Age: <span className={css.spanAge}>{age}</span>
          </p>
          <p className={css.text2}>
            Experience: <span className={css.span2}>{nanny.experience}</span>
          </p>
          <p className={css.text2}>
            Kids Age: <span className={css.span2}>{nanny.kids_age}</span>
          </p>
          <p className={css.text2}>
            Characters:{" "}
            <span className={css.span2}>
              {nanny.characters
                .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
                .join(", ")}
            </span>
          </p>
          <p className={css.text2}>
            Education: <span className={css.span2}>{nanny.education}</span>
          </p>
        </div>
        <p className={css.textAbout}>{nanny.about}</p>
        {!expanded && (
          <button
            type="button"
            className={css.readMore}
            onClick={handleReadMore}
          >
            Read more
          </button>
        )}

        {expanded && (
          <>
            <ul className={css.reviewerList}>
              {nanny.reviews.map((r) => (
                <li className={css.reviewerItem} key={nanny.reviews.indexOf(r)}>
                  <div className={css.reviewerWrapper}>
                    <div className={css.reviewerAvatar}>
                      {getInitial(r.reviewer)}
                    </div>
                    <div className={css.reviewerNameWrapper}>
                      <h3 className={css.reviewerName}>{r.reviewer}</h3>
                      <p className={css.reviewerRating}>
                        <svg
                          className={css.starIcon}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <use href="/sprite.svg#icon-Star-2" />
                        </svg>
                        {formatRating(r.rating)}
                      </p>
                    </div>
                  </div>
                  <p className={css.reviewComment}>{r.comment}</p>
                </li>
              ))}
            </ul>
            <button className={css.orderBtn}>Make an appointment</button>
          </>
        )}
      </div>
    </li>
  );
}
