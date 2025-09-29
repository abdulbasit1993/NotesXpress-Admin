import React from "react";
import { SidebarProps } from "@/app/types/SidebarTypes";
import { navItems } from "@/app/constants/appData";

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed bg-white w-69 h-screen shadow transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-69"
      } lg:translate-x-0 lg:static`}
    >
      <div className="p-4 flex justify-between border-b">
        <div className="flex items-center">
          <div className="bg-blue-600 text-xl text-white font-bold p-2 rounded-md">
            NX
          </div>
          <p className="ml-2 text-gray-800 text-md">NotesXpress Admin</p>
        </div>

        <button className="lg:hidden" onClick={onClose}>
          X
        </button>
      </div>

      {/* navigation bar / list */}
      <div className="p-4 space-y-2">
        {navItems.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.name}</div>
            </div>
          );
        })}
      </div>

      {/* Dark/Light Theme toggle button */}
      <div className="p-4">
        <button
          onClick={() => {}}
          className="relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none
          bg-gradient-to-r from-blue-200 to-blue-400 dark:from-gray-800 dark:to-gray-900"
          aria-label="Toggle dark theme"
        >
          <span>
            {}
            ☀️🌙
          </span>
        </button>
      </div>
    </div>
  );
}
