import React from 'react';

export default function Unauthorized() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* Red Circle with X */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <span className="text-red-600 text-3xl font-bold">!</span>
          </div>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Unauthorized Access</h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Sorry, you don’t have permission to view this page. Please log in with the correct account
          or return to the homepage.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* <a
            href="/login"
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Login
          </a> */}
          <a
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
