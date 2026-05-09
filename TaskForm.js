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