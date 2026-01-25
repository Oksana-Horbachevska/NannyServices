import { useMemo, useState } from "react";
import css from "./Favorites.module.css";
import NannyCard from "../../components/NannyCard/NannyCard";
import Filters from "../../components/Filters/Filters";
import type { FilterValue } from "../../types/filters";
import { useFavoritesStore } from "../../store/favoritesStore";

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites);

  const [filter, setFilter] = useState<FilterValue>("all");
  const [limit, setLimit] = useState(3);

  const filteredNannies = useMemo(() => {
    let result = [...favorites];

    switch (filter) {
      case "asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "less10":
        result = result.filter((n) => n.price_per_hour < 10);
        break;
      case "greater10":
        result = result.filter((n) => n.price_per_hour >= 10);
        break;
      case "popular":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "notPopular":
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    return result;
  }, [filter, favorites]);

  const visibleNannies = filteredNannies.slice(0, limit);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 3);
  };
  return (
    <section className={css.section}>
      <div className="container">
        {favorites.length > 0 ? (
          <>
            <Filters
              value={filter}
              onChange={(val) => {
                setFilter(val);
                setLimit(3);
              }}
            />

            <ul className={css.list}>
              {visibleNannies.map((nanny) => (
                <NannyCard key={nanny.id} nanny={nanny} />
              ))}
            </ul>

            {visibleNannies.length < filteredNannies.length && (
              <button className={css.loadMoreBtn} onClick={handleLoadMore}>
                Load more
              </button>
            )}
          </>
        ) : (
          <div className={css.emptyWrapper}>
            <p className={css.emptyText}>
              You haven't added any nannies to your favorites yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
