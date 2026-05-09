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
