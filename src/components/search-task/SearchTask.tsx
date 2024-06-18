import React, { Dispatch, SetStateAction } from "react";
import styles from "./SearchTask.module.scss";

type SearchTaskProps = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  setIsSortByCreatedAt: Dispatch<SetStateAction<boolean>>;
};

export default function SearchTask({
  searchText,
  setSearchText,
  setIsSortByCreatedAt,
}: SearchTaskProps) {
  return (
    <div className={styles["search-task-wrap"]}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search tasks"
        className={styles["search-task-input"]}
      />
      <div className={styles["checkbox-wrap"]}>
        <input
          id="sort-by-created-date"
          type="checkbox"
          onChange={(e) => setIsSortByCreatedAt(e.target.checked)}
          name="sort-by-created-date"
          className={styles["checkbox-input"]}
        />
        <label
          htmlFor="sort-by-created-date"
          className={styles["checkbox-label"]}
        >
          Sort by created date
        </label>
      </div>
    </div>
  );
}
