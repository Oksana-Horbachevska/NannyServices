import type { FilterValue } from "../../types/filters";
import css from "./Filters.module.css";

interface FiltersProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function Filters({ value, onChange }: FiltersProps) {
  return (
    <div className={css.filterSection}>
      <span className={css.label}>Filters</span>
      <select
        className={css.select}
        value={value}
        onChange={(e) => onChange(e.target.value as FilterValue)}
      >
        <option className={css.option} value="asc">
          A to Z
        </option>
        <option className={css.option} value="desc">
          Z to A
        </option>

        <option className={css.option} value="less10">
          Less than 10$
        </option>
        <option className={css.option} value="greater10">
          Greater than 10$
        </option>

        <option className={css.option} value="popular">
          Popular
        </option>
        <option className={css.option} value="notPopular">
          Not popular
        </option>

        <option className={css.option} value="all">
          Show all
        </option>
      </select>
    </div>
  );
}
