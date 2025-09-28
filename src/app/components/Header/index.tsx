import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  return (
    <header className="flex bg-white justify-between items-center p-4">
      <button>
        <AiOutlineMenu size={25} color="#000000" />
      </button>
      <h1>Dashboard</h1>
      <div></div>
    </header>
  );
}
