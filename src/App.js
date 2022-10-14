import "./App.css";
import AddTask from "./components/addTask";
import TopBAr from "./components/appBar";
import TaskList from "./components/TaskList";
import { useEffect, useReducer } from "react";
import { tasksReducer } from "./reducer/tasksReducer";
import { getTasks } from "./services/api";

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, {});
  const asyncDispatch = () => {
    dispatch({ type: "loading" });
    getTasks().then((data) => {
      dispatch({ type: "finished", payload: data });
    });
  };

  useEffect(() => {
    asyncDispatch();
  }, []);
  function handleAddTask(task) {
    dispatch({
      type: "add",
      payload: task,
    });
  }
  function handleChangeTask(task) {
    dispatch({
      type: "toggleDone",
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "delete",
      id: taskId,
    });
  }

  return (
    <div className="App">
      <TopBAr />
      <br /> <br />
      <AddTask onAddTask={handleAddTask} />
      <br /> <br />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default App;
