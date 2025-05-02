import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiTodoFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { FcSerialTasks } from "react-icons/fc";
import AddTodo from "./AddTodo";
import Tasks from "./Tasks";

const LOCAL_STORAGE_KEY = "todo-tracker-todos";

const Todo = ({ onReset }) => {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    setShowAddTodo((prev) => !prev);
  }

  // Settings menu handlers
  const handleSettingsClick = () => setShowSettings((s) => !s);
  const handleHistory = () => {
    setShowSettings(false);
    navigate("/history");
  };
  const handleAbout = () => {
    setShowSettings(false);
    navigate("/about");
  };
  const handleReset = () => {
    setShowSettings(false);
    if (
      window.confirm(
        "Are you sure you want to reset? This will clear all your tasks and history."
      )
    ) {
      if (onReset) onReset();
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-md place-self-center w-full max-w-xs sm:max-w-md md:max-w-2xl min-h-[550px] flex flex-col rounded-2xl drop-shadow-lg relative mx-2 border border-white/30 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full p-4 gap-2 shadow-md">
        <div className="flex items-center gap-2">
          <FcSerialTasks size={30} />
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
            TaskNest
          </h1>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={addTodo}
            className="bg-black text-white rounded-md px-4 py-1 text-sm sm:text-base cursor-pointer hover:bg-slate-700 transition-all duration-200 ease-in-out w-full sm:w-auto"
          >
            Add +
          </button>
          {/* Settings button beside Add + */}
          <div className="relative">
            <button
              className="bg-gray-200 text-black rounded-md px-3 py-1 text-sm sm:text-base cursor-pointer hover:bg-gray-300 transition-all duration-200 ease-in-out ml-2"
              aria-label="Settings"
              onClick={handleSettingsClick}
              type="button"
            >
              <IoIosSettings size={22} />
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50 animate-fadeIn">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleHistory}
                >
                  History
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleAbout}
                >
                  About
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[400px] w-full mt-3 sm:mt-5">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Tasks
              taskName={todo.task}
              taskCategory={todo.category}
              taskDate={todo.date}
              taskId={todo.id}
              key={todo.id}
              todos={todos}
              setTodos={setTodos}
              onReset={onReset}
            />
          ))
        ) : (
          <p className="text-base sm:text-md text-slate-500 place-self-center mt-5">
            Kindly add a task to get started!
          </p>
        )}
      </div>

      {showAddTodo && (
        <AddTodo
          showAddTodo={showAddTodo}
          setShowAddTodo={setShowAddTodo}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};

export default Todo;
