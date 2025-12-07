import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import "./App.css";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar programação",
      description:
        "Estudar programação para se tornar um desenvolvedor full stack.",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Estudar inglês",
      description: "Estudar inglês para se tornar fluente.",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Estudar matemática",
      description:
        "Estudar matemática para se desenvolver melhor em programação.",
      isCompleted: false,
    },
  ]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((tasks) => {
      if (taskId.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <div className="containerApp">
      <h1 className="title">Gerenciador de tarefas</h1>
      <AddTask />
      <Tasks tasks={tasks} onTaskClick={onTaskClick} />
    </div>
  );
}

export default App;
