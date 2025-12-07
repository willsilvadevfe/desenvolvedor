import { ChevronRightIcon } from "lucide-react";
import "./Task.css";

function Tasks(props) {
  return (
    <ul className="ulTasks">
      {props.tasks.map((task) => (
        <li key={task.id} className="liTasks">
          <button onClick={() => props.onTaskClick(task.id)} className="btn">
            {task.title}
            
          </button>
          <button className="btn1">
            <ChevronRightIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
