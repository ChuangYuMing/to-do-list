import { useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/TodoList.module.scss";
import AddTask from "@/components/add-task/AddTask";
import SearchTask from "@/components/search-task/SearchTask";
import FilterTask from "@/components/filter-task/FilterTask";
import TaskList from "@/components/task-list/TaskList";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { LOCAL_STORAGE_KEY, TASK_FILTER_STATUS } from "@/const.js";

const inter = Inter({ subsets: ["latin"] });

export default function TodoList() {
  const defaultTasks = [
    {
      id: 1,
      description: "Test Todo 1",
      completed: false,
      createdAt: 1718937031494,
    },
    {
      id: 2,
      description: "Test Todo 2",
      completed: false,
      createdAt: 1718237031494,
    },
  ];
  const [tasks, setTasks] = useLocalStorage(LOCAL_STORAGE_KEY, defaultTasks);
  const [searchText, setSearchText] = useState<string>("");
  const [isSortByCreatedAt, setIsSortByCreatedAt] = useState<boolean>(false);
  const [taskFilterStatus, setTaskFilterStatus] = useState<string>(
    TASK_FILTER_STATUS.ALL
  );

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (taskId: number, payload: Partial<Task>) => {
    const updatedTasks = tasks.map((task: Task) => {
      if (task.id === taskId) {
        return { ...task, ...payload };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filterTasks = tasks
    .filter(
      (task: Task) =>
        taskFilterStatus === TASK_FILTER_STATUS.ALL ||
        (taskFilterStatus === TASK_FILTER_STATUS.COMPLETED && task.completed) ||
        (taskFilterStatus === TASK_FILTER_STATUS.UNCOMPLETED && !task.completed)
    )
    .filter((task: Task) => task.description.includes(searchText))
    .sort((a: Task, b: Task) => {
      if (isSortByCreatedAt) {
        return b.createdAt - a.createdAt;
      } else {
        return 0;
      }
    });

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>To-Do List</h1>
        <AddTask addTask={addTask} />
        <SearchTask
          searchText={searchText}
          setSearchText={setSearchText}
          setIsSortByCreatedAt={setIsSortByCreatedAt}
        />
        <FilterTask
          taskFilterStatus={taskFilterStatus}
          setTaskFilterStatus={setTaskFilterStatus}
        />
        <TaskList
          filterTasks={filterTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </main>
    </>
  );
}
