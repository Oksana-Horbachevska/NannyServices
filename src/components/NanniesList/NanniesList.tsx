import { useEffect, useState } from "react";
import { fetchNannies } from "../../services/nanniesApi";
import type { Nanny } from "../../types/nanny";
import css from "./NanniesList.module.css";
import NannyCard from "../NannyCard/NannyCard";

export default function NanniesList() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadNannies = async () => {
    setLoading(true);
    const { items, lastKey: newKey } = await fetchNannies(lastKey);

    setNannies((prev) => [...prev, ...items]);
    setLastKey(newKey);
    setLoading(false);
  };

  console.log(nannies);

  useEffect(() => {
    loadNannies();
  }, []);

  return (
    <div className={css.section}>
      <ul className={css.list}>
        {nannies.map((n) => (
          <NannyCard key={n.id} nanny={n} />
        ))}
      </ul>
      {lastKey && (
        <button className={css.loadMoreBtn} onClick={loadNannies}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
