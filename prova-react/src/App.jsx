import { useState, useEffect } from "react";
import StatusBar from "./components/statusbar";
import TaskList from "./components/TaskList";
import Footer from "./components/footer";
import ProductivityImage from "./components/ProductivityImage";


import { auth, db } from "./Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

function App() {

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isCadastro, setIsCadastro] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const handleAuth = async () => {
    try {
      if (isCadastro) {
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Conta criada!");
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, senha);
        setUser(userCred.user);
      }
    } catch (e) {
      alert(e.message);
    }
  };


  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };


  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, "materia"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(lista);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async () => {
    if (taskInput.trim() === "") return;

    await addDoc(collection(db, "materia"), {
      description: taskInput,
      status: "pendente",
    });

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


  if (!user) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>{isCadastro ? "Cadastro" : "Login"}</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />

        <br /><br />

        <button onClick={handleAuth}>
          {isCadastro ? "Cadastrar" : "Entrar"}
        </button>

        <br /><br />

        <button onClick={() => setIsCadastro(!isCadastro)}>
          {isCadastro ? "Ir para Login" : "Ir para Cadastro"}
        </button>
      </div>
    );
  }


  return (
    <div style={{ textAlign: "center" }}>
      <StatusBar />

      <button onClick={logout}>Logout</button>

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