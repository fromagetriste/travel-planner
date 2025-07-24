"use client"

import Link from "next/link";
import Image from "next/image";
import GitHubIcon from "./icons/GitHubIcon";
import { login } from "@/lib/auth.actions";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link className="flex items-center" href={"/"}>
          <Image src={"/logo.png"} alt="logo" width={50} height={50} />
          <span className="text-2xl font-bold text-gray-800">
            Travel Planner
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href={"/trips"} className="text-slate-900 hover:text-sky-500">
            My Trips
          </Link>
          <Link href={"/globe"} className="text-slate-900 hover:text-sky-500">
            Globe
          </Link>
          <button
            className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-sm cursor-pointer"
            onClick={login}
          >
            Sign In
            <GitHubIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}
