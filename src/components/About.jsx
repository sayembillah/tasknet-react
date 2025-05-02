import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white/90 w-full max-w-xs sm:max-w-md md:max-w-2xl min-h-[300px] flex flex-col rounded-2xl drop-shadow-lg p-6 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">About This App</h2>
      <p className="text-base text-slate-700 mb-4">
        <b>TaskNest</b> is a minimal, modern, and fully responsive task
        management app. You can add tasks, organize them by category, set due
        dates, and manage subtasks. Mark tasks as complete, delete them, and
        view your task history. All your data is stored locally in your browser
        for privacy. Use the settings menu to view your history, reset the app,
        or read about its features.
      </p>
      <ul className="list-disc pl-5 text-sm text-slate-600">
        <li>Fast, simple, and distraction-free interface</li>
        <li>Subtasks and progress tracking</li>
        <li>History of completed and deleted tasks</li>
        <li>One-click reset to clear all data</li>
        <li>Works great on mobile and desktop</li>
      </ul>
      <button
        className="mt-6 bg-black text-white rounded-md px-4 py-2 text-sm hover:bg-slate-700 transition-all w-fit self-center"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <a
        href="https://github.com/your-github-repo" // TODO: Replace with actual repo URL
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 text-slate-700 hover:text-black text-sm self-center"
        aria-label="View on GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.698.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        View on GitHub
      </a>
    </div>
  );
};

export default About;
