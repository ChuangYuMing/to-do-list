import { Inter } from "next/font/google";
import styles from "@/styles/TodoList.module.scss";
import AddTask from "@/components/add-task/AddTask";
import SearchTask from "@/components/search-task/SearchTask";
import FilterTask from "@/components/filter-task/FilterTask";
import TaskList from "@/components/task-list/TaskList";

const inter = Inter({ subsets: ["latin"] });

export default function TodoList() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>To-Do List</h1>
        <AddTask />
        <SearchTask />
        <FilterTask />
        <TaskList />
      </main>
    </>
  );
}
