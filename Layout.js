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