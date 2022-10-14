import { v4 as uuidv4 } from "uuid";
const baseURL = "http://localhost:5000/tasks";

export async function getTasks() {
  return await fetch(`${baseURL}`)
    .then((res) => res.json())
    .catch(console.log);
}

export async function addTask(task, deadline) {
  return await fetch(`${baseURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: uuidv4(),
      title: task,
      deadline: deadline,
      done: false,
    }),
  });
}

export async function deleteTask(id) {
  return await fetch(`${baseURL}/${id}`, { method: "DELETE" });
}

export async function markAsDone(task) {
  return await fetch(`${baseURL}/${task.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...task, done: true }),
  });
}
