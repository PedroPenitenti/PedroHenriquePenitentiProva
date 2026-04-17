import TaskItem from "./TaskItem";


function TaskList({ tasks, toggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;