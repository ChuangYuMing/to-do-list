import { Task } from "@/types";
import TaskItem from "../task-item/TaskItem";
import styles from "./TaskList.module.scss";

type TaskListProps = {
  filterTasks: Task[];
  updateTask: (taskId: number, payload: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
};

export default function TaskList({
  filterTasks,
  updateTask,
  deleteTask,
}: TaskListProps) {
  const taskList = filterTasks.map((task) => (
    <TaskItem
      key={task.createdAt}
      task={task}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
  ));

  return <div className={styles["task-list-wrap"]}>{taskList}</div>;
}
