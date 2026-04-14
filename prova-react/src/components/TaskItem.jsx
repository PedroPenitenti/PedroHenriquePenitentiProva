function TaskItem({ task, toggleTask }) {
    return (
      <li
        onClick={() => toggleTask(task.id)}
        style={{
          cursor: "pointer",
          textDecoration:
            task.status === "concluída" ? "line-through" : "none",
        }}
      >
        {task.description} - {task.status}
      </li>
    );
  }
  
  export default TaskItem;