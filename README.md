# Gestion-De_Tareas
Page.js
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";

export default function Home() {
  return (
    <main>
      <h1>Lista de Tareas</h1>

      <TaskForm />
      <TaskTable />
    </main>
  );
}

Layout.js
import "./globals.css";
import { TaskProvider } from "../context/TaskContext";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}

Global.css
body {
  font-family: Arial;
  padding: 20px;
}

table {
  width: 100%;
  margin-top: 20px;
}

input,
textarea,
select,
button {
  margin: 5px;
  padding: 8px;
}

TaskForm.js
"use client";

import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      title,
      description,
      status: "Pendiente",
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Agregar</button>
    </form>
  );
}

TaskTable.js
"use client";

import { useTasks } from "../context/TaskContext";

export default function TaskTable() {
  const { tasks, updateStatus, deleteTask } = useTasks();

  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>

            <td>
              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(task.id, e.target.value)
                }
              >
                <option>Pendiente</option>
                <option>En Proceso</option>
                <option>Completada</option>
              </select>
            </td>

            <td>
              <button onClick={() => deleteTask(task.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TaskContext.js
"use client";

import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...task,
      },
    ]);
  };

  const updateStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateStatus, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

Package.json
{
  "name": "gestion-tareas",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  }
}
