export function tasksReducer(tasks, action) {
  switch (action.type) {
    case "loading": {
      return true;
    }
    case "finished": {
      return action.payload;
    }
    case "add": {
      return [...tasks, action.payload];
    }
    case "toggleDone": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "delete": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
