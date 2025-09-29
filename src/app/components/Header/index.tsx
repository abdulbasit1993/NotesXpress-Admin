import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HeaderProps } from "@/app/types/HeaderTypes";
import { useAuth } from "@/app/contexts/AuthContext";
import initials from "initials";

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="flex bg-white justify-between items-center p-4">
      <button className="lg:hidden" onClick={onMenuClick}>
        <AiOutlineMenu size={25} color="#000000" />
      </button>
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      {user ? (
        <div className="bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">
            {initials(user?.username)}
          </span>
        </div>
      ) : (
        <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
      )}
    </header>
  );
}
