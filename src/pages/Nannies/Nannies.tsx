import { useEffect, useState } from "react";
import Filters from "../../components/Filters/Filters";
import NanniesList from "../../components/NanniesList/NanniesList";
import type { FilterValue } from "../../types/filters";
import type { Nanny } from "../../types/nanny";
import { fetchNannies } from "../../services/nanniesApi";
import css from "./Nannies.module.css";

export default function Nannies() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [raw, setRaw] = useState<Nanny[]>([]);
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadNannies = async () => {
    if (loading) return;
    setLoading(true);
    const { items, lastKey: newKey } = await fetchNannies(lastKey);

    setRaw((prev) => {
      const newItems = items.filter(
        (newItem) => !prev.some((prevItem) => prevItem.id === newItem.id),
      );
      return [...prev, ...newItems];
    });
    setLastKey(newKey);
    setLoading(false);
  };

  // initial load
  useEffect(() => {
    loadNannies();
  }, []);

  // фільтруємо raw → у nannies
  useEffect(() => {
    let result = [...raw];

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

    setNannies(result);
  }, [filter, raw]);
  return (
    <div className="container">
      <Filters value={filter} onChange={setFilter} />
      <NanniesList nannies={nannies} />
      {lastKey && (
        <button className={css.loadMoreBtn} onClick={loadNannies}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
