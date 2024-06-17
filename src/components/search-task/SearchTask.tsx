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
        className="add-task-input"
      />
      <div className="checkbox-wrap">
        <input
          type="checkbox"
          onChange={(e) => setIsSortByCreatedAt(e.target.checked)}
          name="sort-by-created-date"
        />
        <label htmlFor="sort-by-created-date">Sort by created date</label>
      </div>
    </div>
  );
}
