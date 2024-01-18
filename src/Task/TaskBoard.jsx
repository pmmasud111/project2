import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchBox from "./SearchBox";
import { default as TaskAction } from "./TaskAction";
import TaskList from "./TaskList";
import NoTaskFound from "./noTaskFound";
TaskAction;

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn React such then I can treat it like my slave and make it do whatever I want to do",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: false,
  };
  const [tasks, setTask] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTask([...tasks, newTask]);
    } else {
      setTask(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowModal(true);
  }

  function onCloseClick() {
    setShowModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id === !taskId);
    setTask(taskAfterDelete);
  }

  function handleDeleteAllClick() {
    tasks.length = 0;
    setTask([...tasks]);
  }

  function handleFavorite(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTask(newTasks);
  }
  function handleSearch(searchTerm) {
    console.log(searchTerm);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTask([...filtered]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={onCloseClick}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchBox onSearch={handleSearch} />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddTask={() => setShowModal(true)}
            onDeleteAll={handleDeleteAllClick}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFev={handleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
