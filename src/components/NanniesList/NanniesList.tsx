import type { Nanny } from "../../types/nanny";
import NannyCard from "../NannyCard/NannyCard";

import css from "./NanniesList.module.css";

interface Props {
  nannies: Nanny[];
}

export default function NanniesList({ nannies }: Props) {
  return (
    <ul className={css.list}>
      {nannies.map((n) => (
        <NannyCard key={n.id} nanny={n} />
      ))}
    </ul>
  );
}
