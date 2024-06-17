import React, { Dispatch, SetStateAction } from "react";
import styles from "./FilterTask.module.scss";
import { TASK_FILTER_STATUS } from "@/const.js";

type FilterTaskProps = {
  taskFilterStatus: string;
  setTaskFilterStatus: Dispatch<SetStateAction<string>>;
};

export default function AddTask({
  setTaskFilterStatus,
  taskFilterStatus,
}: FilterTaskProps) {
  const statusList = [
    TASK_FILTER_STATUS.ALL,
    TASK_FILTER_STATUS.UNCOMPLETED,
    TASK_FILTER_STATUS.COMPLETED,
  ].map((status) => (
    <span
      key={status}
      data-status={status}
      className={taskFilterStatus === status ? styles["is-active"] : ""}
    >
      {status}
    </span>
  ));

  const handleFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const status = target.dataset.status;

    if (status) {
      setTaskFilterStatus(status);
    }
  };

  return (
    <div className={styles["filter-task-wrap"]} onClick={handleFilter}>
      {statusList}
    </div>
  );
}
