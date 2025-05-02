import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";

const SubTasks = ({ subtasks = [], onRemove, onToggle }) => {
  if (!subtasks.length) {
    return null;
  }
  return (
    <div className="flex gap-2 flex-wrap">
      {subtasks.map((sub, idx) => (
        <span
          key={sub.name + idx}
          className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full cursor-pointer transition-all
            ${
              sub.completed
                ? "bg-green-200 text-green-700 line-through"
                : "bg-green-100 text-gray-600"
            }
          `}
          title={sub.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          <span onClick={() => onToggle && onToggle(sub.name)}>
            {sub.completed ? (
              <FaCheckCircle size={13} className="inline mr-1" />
            ) : (
              <ImRadioUnchecked size={13} className="inline mr-1" />
            )}
          </span>
          <span className="break-all">{sub.name}</span>
          <span
            className="ml-1 text-gray-400 hover:text-red-500"
            title="Remove subtask"
            onClick={() => onRemove && onRemove(sub.name)}
          >
            ×
          </span>
        </span>
      ))}
    </div>
  );
};

export default SubTasks;
