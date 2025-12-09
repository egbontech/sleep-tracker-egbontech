import React from "react";
import Logo from "../homepage/Logo";
import LogoutButton from "./LogoutButton";

interface HeaderProps {
  setShowAddForm: (show: boolean) => void;
}

export default function Header({ setShowAddForm }: HeaderProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex gap-3 items-center">
          <LogoutButton />
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            Add Sleep Record
          </button>
        </div>
      </div>
    </header>
  );
}
