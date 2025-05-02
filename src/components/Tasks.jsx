import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import SubTasks from "./SubTasks";

const Tasks = ({
  taskName,
  taskDate,
  taskCategory,
  taskId,
  todos,
  setTodos,
  onReset,
}) => {
  const [showSubInput, setShowSubInput] = useState(false);
  const [subInput, setSubInput] = useState("");

  const currentTask = todos.find((todo) => todo.id === taskId);
  const subtasks = currentTask?.subtasks || [];
  const isTaskCompleted = currentTask?.completed || false;

  const total = subtasks.length;
  const completed = subtasks.filter((s) => s.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  function deleteTask(id) {
    // Save deleted task to history
    const deletedTask = todos.find((todo) => todo.id === id);
    if (deletedTask) {
      const history = JSON.parse(localStorage.getItem("todo-history") || "[]");
      history.push({
        ...deletedTask,
        deletedAt: new Date().toISOString(),
        type: "deleted",
      });
      localStorage.setItem("todo-history", JSON.stringify(history));
    }
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function handleAddSubtask() {
    if (!subInput.trim()) return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === taskId
          ? {
              ...todo,
              subtasks: [
                ...(todo.subtasks || []),
                { name: subInput.trim(), completed: false },
              ],
            }
          : todo
      )
    );
    setSubInput("");
    setShowSubInput(false);
  }

  function handleRemoveSubtask(subtaskName) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === taskId
          ? {
              ...todo,
              subtasks: (todo.subtasks || []).filter(
                (s) => s.name !== subtaskName
              ),
            }
          : todo
      )
    );
  }

  function handleToggleSubtask(subtaskName) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === taskId
          ? {
              ...todo,
              subtasks: (todo.subtasks || []).map((s) =>
                s.name === subtaskName ? { ...s, completed: !s.completed } : s
              ),
            }
          : todo
      )
    );
  }

  function handleCancelSubtask() {
    setShowSubInput(false);
    setSubInput("");
  }

  function handleToggleTaskCompleted() {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === taskId) {
          const newCompleted = !todo.completed;
          // Save to history if completed
          if (newCompleted) {
            const history = JSON.parse(
              localStorage.getItem("todo-history") || "[]"
            );
            history.push({
              ...todo,
              completedAt: new Date().toISOString(),
              type: "completed",
            });
            localStorage.setItem("todo-history", JSON.stringify(history));
          }
          return {
            ...todo,
            completed: newCompleted,
            subtasks: (todo.subtasks || []).map((s) => ({
              ...s,
              completed: newCompleted,
            })),
          };
        }
        return todo;
      })
    );
  }

  return (
    <div
      className={`mx-1 sm:mx-5 py-4 px-3 sm:py-5 sm:px-5 rounded-lg drop-shadow-md mb-4 transition-all transition-colors duration-300 ${
        isTaskCompleted ? "bg-green-100" : "bg-white"
      }`}
    >
      {/* Main task info */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start justify-between relative">
        <div className="flex items-start gap-2 w-full">
          <span
            className="cursor-pointer mt-1 transition-colors duration-200"
            onClick={handleToggleTaskCompleted}
            title={isTaskCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            {isTaskCompleted ? (
              <FaCheckCircle size={20} color="green" />
            ) : (
              <ImRadioUnchecked size={20} color="black" />
            )}
          </span>
          <div className="flex flex-col gap-2 w-full">
            <h2
              className={`text-base sm:text-lg font-semibold break-words transition-colors duration-200 ${
                isTaskCompleted
                  ? "text-green-700 line-through"
                  : "text-slate-900"
              }`}
            >
              {taskName}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full transition-colors duration-200">
                {taskCategory}
              </span>
              <span className="text-xs text-rose-400">{taskDate}</span>
              {total > 0 && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors duration-200 ${
                    progress === 100
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  Progress: {progress}%
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center gap-2 mt-2 sm:mt-0">
          <TiPlus
            size={20}
            className="cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => setShowSubInput((prev) => !prev)}
            title="Add subtask"
          />
          <button
            className="cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => deleteTask(taskId)}
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>

      {/* SubTasks Section */}
      <div className="mt-4 pl-3 sm:pl-7 border-l-2 border-slate-200 overflow-x-auto">
        {(showSubInput || subtasks.length > 0) && (
          <h3 className="text-sm text-slate-600 font-semibold mb-2">
            Subtasks:
          </h3>
        )}
        {showSubInput && subtasks.length === 0 && (
          <div className="text-xs text-slate-400 italic mb-2">
            No subtasks yet.
          </div>
        )}
        {showSubInput && (
          <div className="flex flex-col sm:flex-row gap-2 mb-2 animate-fadeIn">
            <input
              type="text"
              className="border rounded-md px-2 py-1 text-sm w-full sm:w-auto transition-all duration-200"
              placeholder="Subtask name"
              value={subInput}
              onChange={(e) => setSubInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSubtask();
              }}
              autoFocus
            />
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                className="bg-black text-white rounded-md px-3 py-1 text-xs hover:bg-slate-700 transition-all duration-200"
                onClick={handleAddSubtask}
              >
                Add
              </button>
              <button
                className="bg-gray-200 text-black rounded-md px-3 py-1 text-xs hover:bg-slate-700 hover:text-white transition-all duration-200"
                onClick={handleCancelSubtask}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <SubTasks
          subtasks={subtasks}
          onRemove={handleRemoveSubtask}
          onToggle={handleToggleSubtask}
        />
      </div>
    </div>
  );
};

export default Tasks;
