import React, { useRef, useState } from "react";

const AddTodo = ({ setShowAddTodo, setTodos }) => {
  const taskRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();
  const [error, setError] = useState("");

  function saveTodo(e) {
    e.preventDefault();
    const taskValue = taskRef.current.value.trim();
    const categoryValue = categoryRef.current.value;
    const dateValue = dateRef.current.value;

    if (!taskValue) {
      setError("Task name is required.");
      return;
    }
    if (!dateValue) {
      setError("Date is required.");
      return;
    }

    const todo = {
      id: Date.now(),
      task: taskValue,
      category: categoryValue,
      date: dateValue,
      completed: false,
      subtasks: [],
    };
    setTodos((prev) => [...prev, todo]);
    setShowAddTodo((prev) => !prev);
  }

  function cancelTodo(e) {
    e.preventDefault();
    setShowAddTodo((prev) => !prev);
    taskRef.current.value = "";
    categoryRef.current.value = "work";
    dateRef.current.value = "";
    setError("");
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-10 z-40 animate-fadeIn"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl min-h-[300px] w-11/12 max-w-xs sm:max-w-sm rounded-2xl z-50 animate-scaleIn">
        <form className="flex flex-col gap-2 p-4" onSubmit={saveTodo}>
          <label className="font-semibold text-sm">Task Name</label>
          <input
            ref={taskRef}
            type="text"
            placeholder="Task name"
            className="border rounded-md w-full p-1 text-sm"
          />
          <label className="font-semibold text-sm">Category</label>
          <select
            ref={categoryRef}
            className="border rounded-md w-full p-1 text-sm"
            defaultValue="work"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </select>
          <label className="font-semibold text-sm">Date</label>
          <input
            ref={dateRef}
            type="date"
            className="border rounded-md w-full p-1 text-sm"
          />
          {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
          <div className="flex gap-2 items-center justify-center mt-2">
            <button
              type="submit"
              className="bg-black text-white rounded-md px-4 py-1 text-sm cursor-pointer hover:bg-slate-700 transition-all duration-200 ease-in-out"
            >
              Save
            </button>
            <button
              onClick={cancelTodo}
              className="bg-gray-200 text-black rounded-md px-4 py-1 text-sm cursor-pointer hover:bg-slate-700 hover:text-white transition-all duration-200 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTodo;
