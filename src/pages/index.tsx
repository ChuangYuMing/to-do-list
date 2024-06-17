import { useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/TodoList.module.scss";
import AddTask from "@/components/add-task/AddTask";
import SearchTask from "@/components/search-task/SearchTask";
import FilterTask from "@/components/filter-task/FilterTask";
import TaskList from "@/components/task-list/TaskList";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Task } from "@/types";

const inter = Inter({ subsets: ["latin"] });
const LOCAL_STORAGE_KEY = "tasks";

export default function TodoList() {
  const [tasks, setTasks] = useLocalStorage(LOCAL_STORAGE_KEY, []);
  const [searchText, setSearchText] = useState<string>("");
  const [isSortByCreatedAt, setIsSortByCreatedAt] = useState<boolean>(false);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>To-Do List</h1>
        <AddTask addTask={addTask} />
        <SearchTask
          setSearchText={setSearchText}
          setIsSortByCreatedAt={setIsSortByCreatedAt}
        />
        <FilterTask />
        <TaskList />
      </main>
    </>
  );
}
