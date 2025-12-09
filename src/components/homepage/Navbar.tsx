"use client"
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  {href:"#home",label:"Home"},
  {href:"#about",label:"About"},
  {href:"#faq",label:"Faq"},
  {href:"#contact",label:"Contact"},
]


export default function Navbar() {
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  return (
    <nav className="px-6 sm:px-20 h-18 flex items-center justify-between z-20 relative">
        {/* logo */}
        <Logo/>

        {/* desktop menu */}
        <ul className="hidden md:flex opacity-90 bg-[#0f172a] gap-10 p-3 px-8 text-gray-300 rounded-full">
          {navLinks.map((link) => {
            return (
              <li key={link.href}>
                <Link className="hover:text-fuchsia-500 transition" href={link.href}>{link.label}</Link>
              </li>
            )
          })}          
        </ul>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50 text-gray-300 cursor-pointer">
          {isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>

        {/* signin button desktop */}
        <Link href="/login"className="hidden md:block bg-fuchsia-700 px-6 py-2 rounded-full font-semibold text-white hover:bg-fuchsia-600 transition-colors">Sign In</Link>

        {/* mobile menu */}
        <ul className={`md:hidden fixed top-0 left-0 w-full h-screen bg-slate-900 flex flex-col items-center justify-center gap-8 text-gray-300 z-40 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {navLinks.map((link) => {
            return (
              <li key={link.href}>
                <Link className="text-2xl hover:text-fuchsia-500 transition-colors" href={link.href}>{link.label}</Link>
              </li>
            )
          })}  

          {/* sign in button for mobile         */}
           <Link href="/login"className="md:hidden block bg-fuchsia-700 px-6 py-2 rounded-full font-semibold text-white hover:bg-fuchsia-600 transition-colors">Sign In</Link>

        </ul>

    </nav>
  )
}
