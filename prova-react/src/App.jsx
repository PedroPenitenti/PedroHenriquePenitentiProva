import { useState, useEffect } from "react";
import StatusBar from "./components/statusbar";
import TaskList from "./components/TaskList";
import Footer from "./components/footer";
import ProductivityImage from "./components/ProductivityImage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    console.log("Aplicação iniciada!");
  }, []);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      description: taskInput,
      status: "pendente",
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status:
              task.status === "pendente" ? "concluída" : "pendente",
          }
        : task
    );

    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <StatusBar />

      <ProductivityImage />

      <input
        type="text"
        placeholder="Digite uma tarefa..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />

      <button onClick={addTask}>Adicionar</button>

      <TaskList tasks={tasks} toggleTask={toggleTask} />

      <Footer />
    </div>
  );
}

export default App;