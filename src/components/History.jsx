import React from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const history = JSON.parse(localStorage.getItem("todo-history") || "[]");

  return (
    <div className="bg-white/90 w-full max-w-xs sm:max-w-md md:max-w-2xl min-h-[400px] flex flex-col rounded-2xl drop-shadow-lg p-4 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Task History</h2>
      {history.length === 0 ? (
        <div className="text-slate-500">No completed or deleted tasks yet.</div>
      ) : (
        <ul className="space-y-3">
          {history
            .slice()
            .reverse()
            .map((item, idx) => (
              <li key={idx} className="border rounded p-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.task}</span>
                  <span className="text-xs text-gray-400">
                    {item.type === "completed" ? "Completed" : "Deleted"}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.type === "completed" && item.completedAt && (
                    <>
                      Completed at:{" "}
                      {new Date(item.completedAt).toLocaleString()}
                    </>
                  )}
                  {item.type === "deleted" && item.deletedAt && (
                    <>Deleted at: {new Date(item.deletedAt).toLocaleString()}</>
                  )}
                </div>
                {item.category && (
                  <div className="text-xs text-indigo-600 mt-1">
                    Category: {item.category}
                  </div>
                )}
                {item.date && (
                  <div className="text-xs text-rose-400">Date: {item.date}</div>
                )}
              </li>
            ))}
        </ul>
      )}
      <button
        className="mt-6 bg-black text-white rounded-md px-4 py-2 text-sm hover:bg-slate-700 transition-all w-fit self-center"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default History;
